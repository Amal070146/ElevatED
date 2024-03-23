export const PdfReader = () => {
  function uploadResume() {
    // Use type assertion to tell TypeScript this is an HTMLInputElement
    const resumeInput = document.getElementById(
      "resumeInput"
    ) as HTMLInputElement;

    // Now TypeScript knows resumeInput is an HTMLInputElement, so it expects the 'files' property to exist
    if (resumeInput && resumeInput.files && resumeInput.files.length > 0) {
      const formData = new FormData();
      formData.append("pdf_file", resumeInput.files[0]);

      fetch("http://127.0.0.1:8000/pdf/extract/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Process the server response here
          // Display response
          displayResponse(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No file selected.");
    }
  }

function displayResponse(data: { images: any[]; text?: string }) {
  // Create a container for images to separate them from text content
  const imagesContainer = document.createElement("responseDisplay");
  imagesContainer.id = "imagesContainer";
  document.body.appendChild(imagesContainer); // Append the container to the body or a specific element of your choice

  // Setting styles for the images container if necessary
  imagesContainer.style.maxWidth = "100%";

  data.images.forEach((imageBase64, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = `data:image/jpeg;base64,${imageBase64}`;
    imgElement.alt = `Extracted image ${index + 1}`;
    imgElement.style.maxWidth = "100%"; // Ensure image max width is 100%
    imagesContainer.appendChild(imgElement); // Append image to the images container

    // Add a blank line (line break) after each image
    imagesContainer.appendChild(document.createElement("br"));
  });

  // If there's also text data to be displayed, create and append a new paragraph or div for it
  if (data.text) {
    const textContentElement = document.createElement("p");
    textContentElement.textContent = data.text;
      textContentElement.style.color = "black";
    document.body.appendChild(textContentElement); // Append the text content below the images container
  }
}


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <input type="file" id="resumeInput" name="resume" />
      <button onClick={uploadResume}>Upload Resume</button>
      <p id="responseDisplay" style={{color:"black"}}></p> 
    </div>
  );
};
