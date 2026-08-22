export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available");
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    
    // Create an aria-live region for screen readers if it doesn't exist
    let ariaLive = document.getElementById('clipboard-aria-live');
    if (!ariaLive) {
      ariaLive = document.createElement('div');
      ariaLive.id = 'clipboard-aria-live';
      ariaLive.setAttribute('aria-live', 'polite');
      ariaLive.className = 'sr-only';
      ariaLive.style.position = 'absolute';
      ariaLive.style.width = '1px';
      ariaLive.style.height = '1px';
      ariaLive.style.padding = '0';
      ariaLive.style.margin = '-1px';
      ariaLive.style.overflow = 'hidden';
      ariaLive.style.clip = 'rect(0, 0, 0, 0)';
      ariaLive.style.whiteSpace = 'nowrap';
      ariaLive.style.borderWidth = '0';
      document.body.appendChild(ariaLive);
    }
    
    // Trigger screen reader announcement
    ariaLive.textContent = "Copied to clipboard";
    setTimeout(() => {
      if (ariaLive) ariaLive.textContent = "";
    }, 3000);
    
    return true;
  } catch (err) {
    console.error("Failed to copy!", err);
    return false;
  }
}
