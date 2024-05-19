const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'docs')));

app.get('/api/categories', (req, res) => {
  const directoryPath = path.join(__dirname, 'docs/assets/img'); // Adjust the path accordingly
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading directory');
      return;
    }
    res.json(files);
  });
});

app.get('/api/images/:category', (req, res) => {
  const category = req.params.category
  const directoryPath = path.join(__dirname, 'docs/assets/img/' + category); // Adjust the path accordingly
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading directory');
      return;
    }
    const filePaths = []
    files.forEach(value => {
      filePaths.push('/assets/img/' + category + '/' + value)
    })
    res.json(filePaths);
  });
})

// Route to serve the Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});