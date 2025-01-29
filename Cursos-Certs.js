const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://www.alura.com.br/api/dashboard/f3f9ff5bce7d04fb3925e9ff8cc54cc49bebbdabeeb43b9861af5d7f9bab821a';

async function fetchCertificates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

async function updateReadme(data) {
    const readmePath = path.join(__dirname, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');
    
    const newContent = data.map(cert => `### ${cert.curso}\n\n${cert.descricao}`).join('\n\n');

    const updatedReadme = readmeContent.replace(/<!-- ALURA_CERTIFICATES_START -->[\s\S]*<!-- ALURA_CERTIFICATES_END -->/, `<!-- ALURA_CERTIFICATES_START -->\n${newContent}\n<!-- ALURA_CERTIFICATES_END -->`);

    fs.writeFileSync(readmePath, updatedReadme);
}

fetchCertificates().then(data => updateReadme(data)).catch(err => console.error(err));
