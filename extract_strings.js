import fs from 'fs';

const pdfPath = 'd:/SLIIT/Portfolio/Harsha_Waduthanthri_CV.pdf';
const buffer = fs.readFileSync(pdfPath);
const content = buffer.toString('utf8');

// Find sequences of printable characters
const regex = /[a-zA-Z\s,.\-]{15,}/g;
const matches = content.match(regex);

if (matches) {
    console.log('--- EXTRACTED STRINGS ---');
    // Filter out common PDF garbage
    matches.filter(m => m.trim().length > 15 && !m.includes('%%') && !m.includes('>>')).forEach(m => {
        if (m.includes('SewMetrics') || m.includes('Predictive') || m.includes('IoT') || m.includes('Project')) {
            console.log(m.trim());
        }
    });
} else {
    console.log('No matches found.');
}
