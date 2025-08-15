import React, { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [zoom, setZoom] = useState(12);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call backend API with query, location, zoom
    alert(`Search: ${query}\nLocation: ${location}\nZoom: ${zoom}`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvHeaders(results.meta.fields);
        setCsvData(results.data);
      },
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Lead Generation Search</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Search Query: </label>
          <input value={query} onChange={e => setQuery(e.target.value)} required />
        </div>
        <div>
          <label>Location: </label>
          <input value={location} onChange={e => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Zoom: </label>
          <input type="number" value={zoom} onChange={e => setZoom(e.target.value)} min={1} max={20} />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Search</button>
      </form>

      <div style={{ marginBottom: '2rem' }}>
        <label>Upload CSV Results: </label>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>

      {csvData.length > 0 && (
        <div>
          <h2>Results</h2>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {csvHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, idx) => (
                <tr key={idx}>
                  {csvHeaders.map((header) => (
                    <td key={header}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
