import React from "react";
import { useState } from "react";

const PdfUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  //  state for modal
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpload = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("pdfs", selectedFiles[i]);
    }

    try {
      const res = await fetch("http://localhost:5000/merge", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      setShowModal(true); // show modal after merge
    } catch (err) {
      console.error(err);
      alert("Error merging PDFs");
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length > 2) {
      alert("You can only select 2 PDF files!");
      e.target.value = null; // Reset the input
      setSelectedFiles(null);
      return;
    }

    setSelectedFiles(files);
  };
  return (
    <>
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "#f0f2f5", // soft light gray
          backgroundImage:
            "radial-gradient(circle at top left, #d9e2f3, #f0f2f5)",
        }}
      >
        {" "}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">
                    Merge Your PDFs
                  </h3>

                  {/* File input */}
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Selected file count */}
                  {selectedFiles && (
                    <p className="text-muted">
                      {selectedFiles.length} file(s) selected
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg">
                      Upload & Merge
                    </button>
                    <button className="btn btn-secondary btn-lg">Reset</button>
                  </div>

                  {/* Placeholder for download link */}
                  <div className="mt-3 text-center">
                    {/* Example: */}
                    {/* <a href={mergedPdfUrl} download="merged.pdf" className="btn btn-success">
                  Download Merged PDF
                </a> */}

                    {/* Modal */}
                    <div
                      className={`modal fade ${
                        showModal ? "show d-block" : ""
                      }`}
                      tabIndex="-1"
                      role="dialog"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              PDF Merged Successfully!
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          <div className="modal-body text-center">
                            <p>Your merged PDF is ready to download.</p>
                            {mergedPdfUrl && (
                              <a
                                href={mergedPdfUrl}
                                download="merged.pdf"
                                className="btn btn-success"
                              >
                                Download Merged PDF
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Optional overlay */}
                    {showModal && (
                      <div className="modal-backdrop fade show"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfUploader;
