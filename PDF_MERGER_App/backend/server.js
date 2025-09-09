const express = require("express");
const app = express();
const port = 3000;
const PDFMerger = require("pdf-merger-js").default;
    
app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/merge", (req, res) => {
    const merger = new PDFMerger();
(async () => {
  await merger.add(`./assets/git-cheat-sheet-education.pdf`);  //merge all pages. parameter is the path to file and filename.
  await merger.add(`./assets/github-git-cheat-sheet.pdf`); // merge only page 2


 await merger.save('merged.pdf'); //save under given name and reset the internal document
  res.send("PDF merged successfully!");
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
})();
});

app.listen(port, () => {
  console.log(`Server is listning on ${port}`);
});
