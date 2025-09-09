const express = require("express");
const app = express();
const port = 3000;
const PDFMerger = require("pdf-merger-js").default;
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // uploaded PDFs will be stored in /uploads

app.get("/", (req, res) => {
  res.send("hello");
});
// --------- This is the first way , which take pdf from location ------
// app.post("/merge", (req, res) => {
//     const merger = new PDFMerger();
// (async () => {
//   await merger.add(`./assets/git-cheat-sheet-education.pdf`);  //merge all pages. parameter is the path to file and filename.
//   await merger.add(`./assets/github-git-cheat-sheet.pdf`); // merge only page 2

//  await merger.save('merged.pdf'); //save under given name and reset the internal document
//   res.send("PDF merged successfully!");
//   // Export the merged PDF as a nodejs Buffer
//   // const mergedPdfBuffer = await merger.saveAsBuffer();
//   // fs.writeSync('merged.pdf', mergedPdfBuffer);
// })();
// });

// -------------- upload PDF from Storage -------------------
app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  try {
    const merger = new PDFMerger();
    for (const file of req.files) {
      await merger.add(file.path);
    }
    await merger.save("merged.pdf");
    res.send("PDFs merged successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listning on ${port}`);
});
