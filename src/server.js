const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Menggunakan port 3000 atau dari environment

// Pastikan Anda melayani file statis dari folder yang benar
// Misalnya, folder 'build' setelah Anda menjalankan 'npm run build'
app.use(express.static(path.join(__dirname, 'build')));

// Aturan yang paling penting
// Untuk semua permintaan yang tidak cocok dengan file statis,
// kirimkan kembali index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});