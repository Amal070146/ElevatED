import { useState } from "react";

// Define a type for the response data
type ReadData = {
  image_urls: any[]; // Consider specifying a more precise type than any if possible
  text?: string;
};

export const PdfReader = () => {
  // Initialize readData with a type annotation
  const [readData, setReadData] = useState<ReadData | undefined>(undefined);

  function uploadResume() {
    const resumeInput = document.getElementById(
      "resumeInput"
    ) as HTMLInputElement;
    if (resumeInput && resumeInput.files && resumeInput.files.length > 0) {
      const formData = new FormData();
      formData.append("pdf_file", resumeInput.files[0]);

      fetch("http://127.0.0.1:8000/pdf/extract/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          displayResponse(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No file selected.");
    }
  }

  function displayResponse(data: ReadData) {
    setReadData(data);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input type="file" id="resumeInput" name="resume" />
      <button onClick={uploadResume}>Upload Resume</button>
      {/* Render the text directly in JSX instead of appending to the body */}
      {readData?.text && <p style={{ color: "black" }}>{readData.text}</p>}
      {readData?.image_urls &&
        readData.image_urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Extracted Image ${index + 1}`}
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        ))}
    </div>
  );
};
