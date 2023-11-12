import React, { useState } from "react";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const fileType = file.type;
      // Immediately convert the file to a URL and set it for preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    // Here you would handle uploading the file to the server
    console.log("File ready for upload:", selectedFile);

    // Reset the file input after handling
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        accept="image/png, image/jpeg, image/tiff, application/pdf"
      />
      {previewUrl && (
        <div className="preview-container" style={{ overflow: "auto" }}>
          {selectedFile?.type === "application/pdf" ? (
            <object
              data={previewUrl}
              type="application/pdf"
              width="100%"
              height="500px"
              className="mb-4"
            >
              <p>
                Your browser does not support PDFs. Please download the PDF to
                view it: <a href={previewUrl}>Download PDF</a>.
              </p>
            </object>
          ) : selectedFile?.type === "image/tiff" ? (
            <img
              src={previewUrl}
              alt="TIFF Preview"
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="mb-4 max-w-xs rounded-md"
            />
          )}
        </div>
      )}
      <button
        onClick={handleUpload}
        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload File
      </button>
    </div>
  );
};

export default UploadFile;