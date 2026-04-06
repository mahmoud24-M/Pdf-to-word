let selectedFile = null;
let currentTab = 'pdf-to-word';

// Tab switching
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    const tabName = btn.getAttribute('data-tab');
    document.getElementById(tabName).classList.add('active');
    currentTab = tabName;
  });
});

// Drag and drop
function setupDragDrop(uploadAreaId, fileInputId) {
  const uploadArea = document.getElementById(uploadAreaId);
  const fileInput = document.getElementById(fileInputId);

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      handleFileSelect(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  });
}

setupDragDrop('uploadArea1', 'fileInput1');
setupDragDrop('uploadArea2', 'fileInput2');

function handleFileSelect(file) {
  selectedFile = file;
  displayFile(file);
}

function displayFile(file) {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = `
    <div class="file-item">
      <div>
        <div class="file-name">📄 ${file.name}</div>
        <div class="file-size">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      <button class="remove-btn" onclick="removeFile()">Remove</button>
    </div>
  `;
}

function removeFile() {
  selectedFile = null;
  document.getElementById('fileList').innerHTML = '';
  document.getElementById('fileInput1').value = '';
  document.getElementById('fileInput2').value = '';
}

// Convert button
document.getElementById('convertButton').addEventListener('click', async () => {
  if (!selectedFile) {
    showMessage('Please select a file first', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  const endpoint = currentTab === 'pdf-to-word' 
    ? '/api/convert/pdf-to-word' 
    : '/api/convert/word-to-pdf';

  try {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('convertButton').disabled = true;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('✅ Conversion successful!', 'success');
      removeFile();
    } else {
      showMessage('❌ ' + (data.error || 'Conversion failed'), 'error');
    }
  } catch (error) {
    showMessage('❌ Error: ' + error.message, 'error');
  } finally {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('convertButton').disabled = false;
  }
});

function showMessage(text, type) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  
  setTimeout(() => {
    messageEl.classList.remove('success', 'error');
  }, 5000);
}
