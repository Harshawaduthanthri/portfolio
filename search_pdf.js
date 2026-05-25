import fs from 'fs';

const pdfPath = 'd:/SLIIT/Portfolio/Harsha_Waduthanthri_CV.pdf';
const buffer = fs.readFileSync(pdfPath);

const keywords = [
    'Data warehousing project',
    'IoT-Based Predictive Maintenance',
    'SewMetrics',
    'Predictive Maintenance System'
];

keywords.forEach(keyword => {
    let index = -1;
    while ((index = buffer.indexOf(Buffer.from(keyword), index + 1)) !== -1) {
        console.log(`--- Match for "${keyword}" at ${index} ---`);
        const start = Math.max(0, index - 200);
        const end = Math.min(buffer.length, index + 500);
        const excerpt = buffer.slice(start, end).toString('utf8');
        console.log(excerpt.replace(/[^\x20-\x7E]/g, ' '));
        console.log('\n');
    }
});
