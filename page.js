"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", file);

    // Call our API route
    const res = await axios.post("/api/convert", formData);
    alert("Server replied: " + res.data.message);
  };

  return (
    <div>
      <h1>PDF to Word Converter</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Convert</button>
      </form>
    </div>
  );
}
