const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src', 'app', 'tools'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('navigator.clipboard.writeText')) {
    // Add import if not exists
    if (!content.includes('@/lib/clipboard')) {
      // Find last import
      const importRegex = /^import .* from .*;/gm;
      let lastImportIndex = 0;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        lastImportIndex = match.index + match[0].length;
      }
      
      const newImport = '\nimport { copyToClipboard as secureCopy } from "@/lib/clipboard";';
      content = content.slice(0, lastImportIndex) + newImport + content.slice(lastImportIndex);
    }
    
    // Make copyToClipboard functions async
    content = content.replace(/const copyToClipboard = \((.*?)\) => {/g, 'const copyToClipboard = async ($1) => {');
    
    // Make handleCopy functions async (some might be called handleCopy)
    content = content.replace(/const handleCopy = \((.*?)\) => {/g, 'const handleCopy = async ($1) => {');
    
    // Add async to specific inline onClick if needed (unlikely)
    
    // Replace the clipboard pattern
    const pattern = /navigator\.clipboard\.writeText\((.*?)\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), (.*?)\);/g;
    
    content = content.replace(pattern, (match, p1, p2) => {
      return `const success = await secureCopy(${p1});
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), ${p2});
    }`;
    });
    
    // Some might use a different state setter, let's catch standard writeText
    // if the above pattern didn't catch everything, we might have issues.
    // Let's verify if there are any writeText left
    if (content.includes('navigator.clipboard.writeText')) {
       console.log("File still has writeText (manual fix needed): " + file);
    } else {
       console.log("Fixed: " + file);
    }
    
    fs.writeFileSync(file, content, 'utf8');
  }
});
