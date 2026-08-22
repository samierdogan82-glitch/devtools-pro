"use client";

import { useState } from "react";
import SmartBanner from "@/components/SmartBanner";

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const domains = ["example.com", "test.org", "demo.net", "sample.co", "mockup.io"];
const companies = ["TechCorp", "GlobalSolutions", "Innovate LLC", "Synergy Inc", "Alpha Group", "Omega Systems", "NextGen", "Pioneer", "Quantum", "Apex"];

type DataType = "uuid" | "firstName" | "lastName" | "fullName" | "email" | "phone" | "company" | "age" | "boolean";

interface Field {
  id: string;
  name: string;
  type: DataType;
}

export default function DummyDataPage() {
  const [rows, setRows] = useState(10);
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [isGenerating, setIsGenerating] = useState(false);
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "id", type: "uuid" },
    { id: "2", name: "firstName", type: "firstName" },
    { id: "3", name: "lastName", type: "lastName" },
    { id: "4", name: "email", type: "email" },
    { id: "5", name: "phone", type: "phone" },
  ]);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const getUniqueFields = () => {
    const seen = new Set();
    return fields.map(f => {
      let uniqueName = f.name || "field";
      let counter = 1;
      while (seen.has(uniqueName)) {
        uniqueName = `${f.name || "field"}_${counter}`;
        counter++;
      }
      seen.add(uniqueName);
      return { ...f, uniqueName };
    });
  };

  const generateDataAsync = async () => {
    const data = [];
    const uniqueFields = getUniqueFields();
    
    // Chunking to prevent main thread blocking
    for (let i = 0; i < rows; i += 1000) {
      // Yield to main thread every 1000 rows
      await new Promise(resolve => setTimeout(resolve, 0));
      const chunkEnd = Math.min(i + 1000, rows);
      
      for (let j = i; j < chunkEnd; j++) {
        const row: any = {};
        const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        uniqueFields.forEach(field => {
          switch(field.type) {
            case "uuid": row[field.uniqueName] = generateUUID(); break;
            case "firstName": row[field.uniqueName] = fName; break;
            case "lastName": row[field.uniqueName] = lName; break;
            case "fullName": row[field.uniqueName] = `${fName} ${lName}`; break;
            case "email": row[field.uniqueName] = `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`; break;
            case "phone": row[field.uniqueName] = `+1 (${Math.floor(Math.random() * 800) + 200}) ${Math.floor(Math.random() * 800) + 200}-${Math.floor(Math.random() * 9000) + 1000}`; break;
            case "company": row[field.uniqueName] = companies[Math.floor(Math.random() * companies.length)]; break;
            case "age": row[field.uniqueName] = Math.floor(Math.random() * 50) + 18; break;
            case "boolean": row[field.uniqueName] = Math.random() > 0.5; break;
          }
        });
        data.push(row);
      }
    }
    return { data, uniqueFields };
  };

  const escapeCsv = (val: any) => {
    if (val === null || val === undefined) return "";
    let str = String(val);
    // Prevent spreadsheet formula injection
    if (/^[=+\-@]/.test(str)) str = "'" + str;
    // Escape quotes and wrap in quotes if contains comma, newline, or quotes
    if (str.includes('"') || str.includes(',') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const downloadData = async () => {
    setIsGenerating(true);
    const { data, uniqueFields } = await generateDataAsync();
    
    let content = "";
    let mimeType = "";
    let filename = "";

    if (format === "json") {
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
      filename = "dummy_data.json";
    } else {
      // CSV
      const headers = uniqueFields.map(f => escapeCsv(f.uniqueName)).join(",");
      const csvRows = data.map(row => {
        return uniqueFields.map(f => escapeCsv(row[f.uniqueName])).join(",");
      });
      content = [headers, ...csvRows].join("\n");
      mimeType = "text/csv";
      filename = "dummy_data.csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsGenerating(false);
  };

  const addField = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFields([...fields, { id: newId, name: `field_${fields.length + 1}`, type: "firstName" }]);
  };

  const removeField = (id: string) => {
    if (fields.length <= 1) return;
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, key: "name" | "type", value: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Dummy Data Generator</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        Instantly generate thousands of rows of realistic mock data for your database, API, or application testing.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem', maxWidth: '900px', margin: '0 auto 4rem auto' }}>
        
        {/* Generator Controls */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Number of Rows</label>
              <input 
                type="number" 
                className="input-field" 
                value={rows}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > 0 && val <= 10000) setRows(val);
                }}
                min="1"
                max="10000"
                style={{ width: '100%', padding: '0.8rem' }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Max 10,000 rows</span>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Export Format</label>
              <select 
                className="input-field"
                value={format}
                onChange={(e) => setFormat(e.target.value as "json" | "csv")}
                style={{ width: '100%', padding: '0.8rem', cursor: 'pointer' }}
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Data Schema</h3>
            <button className="btn btn-outline" onClick={addField} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
              + Add Field
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {fields.map((field, index) => (
              <div key={field.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  value={field.name}
                  onChange={(e) => updateField(field.id, "name", e.target.value)}
                  placeholder="Field Name"
                  style={{ flex: 1, padding: '0.6rem' }}
                />
                <select 
                  className="input-field"
                  value={field.type}
                  onChange={(e) => updateField(field.id, "type", e.target.value as DataType)}
                  style={{ flex: 1, padding: '0.6rem', cursor: 'pointer' }}
                >
                  <option value="uuid">UUID (ID)</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="fullName">Full Name</option>
                  <option value="email">Email Address</option>
                  <option value="phone">Phone Number</option>
                  <option value="company">Company</option>
                  <option value="age">Age (Number)</option>
                  <option value="boolean">Boolean (True/False)</option>
                </select>
                <button 
                  onClick={() => removeField(field.id)}
                  style={{ 
                    background: 'rgba(239, 68, 68, 0.2)', 
                    color: '#ef4444', 
                    border: 'none', 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                  title="Remove Field"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <button 
            className="btn btn-primary"
            onClick={downloadData}
            disabled={isGenerating}
            style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', marginTop: '1rem', opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? "Generating..." : `Download ${rows.toLocaleString()} Rows as ${format.toUpperCase()}`}
          </button>

        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <SmartBanner type="developer" />
      </div>
      
      <article style={{ marginTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Why use Mock Data?</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          When building applications, APIs, or designing user interfaces, using realistic mock data is crucial. It helps you catch edge cases, understand how your layout behaves with varying text lengths, and ensures your database queries are optimized for large datasets.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Our Dummy Data Generator produces highly realistic names, emails, UUIDs, and more, all generated entirely on your device. Since the processing happens in your browser, your data is generated instantly, even for thousands of rows, without waiting for server responses.
        </p>
      </article>
    </div>
  );
}
