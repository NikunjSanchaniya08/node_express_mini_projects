const express = require("express");
const app = express();
const port = 3000;
const PDFMerger = require("pdf-merger-js").default;
const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // uploaded PDFs will be stored in /uploads
const cors = require("cors");
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

// -------------- upload PDF from Frontend -------------------
app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  try {
    const merger = new PDFMerger();
    for (let file of req.files) {
      await merger.add(new Uint8Array(file.buffer));
      //// add PDFs directly from memory
    }
    // await merger.save("merged.pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
    const mergedPdfBuffer = await merger.saveAsBuffer();
    res.send(Buffer.from(mergedPdfBuffer));
    console.log(mergedPdfBuffer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listning on ${port}`);
});
