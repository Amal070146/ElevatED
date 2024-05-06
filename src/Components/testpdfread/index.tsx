import pdfToText from "react-pdftotext";

export const PdfReaderTest = () => {
  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text: any, image: any) => console.log(text, image))
      .catch((error: any) =>
        console.error("Failed to extract text from pdf", error)
      );
  }
  return (
    <>
      <input type="file" accept="application/pdf" onChange={extractText} />
    </>
  );
};
