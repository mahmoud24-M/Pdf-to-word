import { useState } from 'react'
import axios from 'axios'
import FileUploader from '../components/FileUploader'
import ConversionTools from '../components/ConversionTools'

export default function Home() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile)
    setResult(null)
  }

  const convertPDFtoWord = async () => {
    if (!file) {
      alert('Please upload a file first!')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await axios.post('/api/convert', formData, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `converted_${Date.now()}.docx`)
      document.body.appendChild(link)
      link.click()
      link.parentChild.removeChild(link)
      
      setResult('Conversion successful!')
    } catch (error) {
      setResult('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>📄 PDF to Word Converter</h1>
      <p>Convert PDF files to Word documents instantly</p>
      
      <FileUploader onFileUpload={handleFileUpload} />
      
      <button 
        className="convert-btn" 
        onClick={convertPDFtoWord}
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert to Word'}
      </button>

      {result && <p className="result">{result}</p>}

      <ConversionTools />
    </div>
  )
}