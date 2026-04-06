import { useState } from 'react'

export default function FileUploader({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0])
    }
  }

  return (
    <div className={`upload-area ${dragActive ? 'active' : ''}`}
         onDragEnter={handleDrag}
         onDragLeave={handleDrag}
         onDragOver={handleDrag}
         onDrop={handleDrop}>
      <input 
        type="file" 
        onChange={handleChange}
        accept=".pdf,.doc,.docx"
        className="file-input"
        id="file-input"
      />
      <label htmlFor="file-input">
        <p>📤 Drag & drop your file here or click to browse</p>
        <p className="small">Supports: PDF, DOC, DOCX (Max 25MB)</p>
      </label>
    </div>
  )
}