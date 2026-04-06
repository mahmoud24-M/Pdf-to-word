export default function ConversionTools() {
  return (
    <div className="tools">
      <h2>🛠️ File Tools Available</h2>
      <div className="tools-grid">
        <div className="tool-card">
          <h3>📄 PDF to Word</h3>
          <p>Convert PDF files to editable Word documents</p>
        </div>
        <div className="tool-card">
          <h3>📝 Word to PDF</h3>
          <p>Convert Word documents to PDF format</p>
        </div>
        <div className="tool-card">
          <h3>🖼️ Extract Images</h3>
          <p>Extract all images from PDF files</p>
        </div>
        <div className="tool-card">
          <h3>📊 Merge PDFs</h3>
          <p>Combine multiple PDF files into one</p>
        </div>
      </div>
    </div>
  )
}