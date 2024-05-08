import React from "react";
import pdfjs from "pdfjs-dist";

interface State {
  images: string[]; // Assuming images are strings (URLs)
}

class PDFImageExtractor extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.initializePdfJs();
  }

  initializePdfJs = async () => {
    try {
      await pdfjs.GlobalWorkerOptions.workerSrc;
      if (pdfjs.GlobalWorkerOptions.workerPort) {
         pdfjs.GlobalWorkerOptions.workerPort.postMessage({
          pw: pdfjs.GlobalWorkerOptions.workerPort,
        });
      }

      pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.js`;
      await this.extractImagesFromPDF();
    } catch (error) {
      console.error("Error initializing pdf.js:", error);
    }
  };

  extractImagesFromPDF = async () => {
    try {
      const pdfData = await this.fetchPDFData(); // Fetch your PDF file
      const images = await this.parsePDFImages(pdfData);
      this.setState({ images });
    } catch (error) {
      console.error("Error extracting images from PDF:", error);
    }
  };

  fetchPDFData = async () => {
    // Implement a function to fetch your PDF file data (e.g., using fetch)
    const response = await fetch("path/to/your/pdf/file.pdf");
    const pdfData = await response.arrayBuffer();
    return pdfData;
  };

  parsePDFImages = async (pdfData: any) => {
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
    const images: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const operatorList = await page.getOperatorList();

      for (let j = 0; j < operatorList.fnArray.length; j++) {
        const op = operatorList.fnArray[j];
        if (op === pdfjs.OPS.paintImageXObject) {
          const image = await this.extractImageFromXObject(
            operatorList.argsArray[j][0]
          );
          images.push(image);
        }
      }
    }

    return images;
  };

  extractImageFromXObject = async (xobj: any) => {
    const image = await xobj.obj
      .getBitmap({ useAlpha: true })
      .then((data: any) => data.dataUrl);
    return image;
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <h2>Extracted Images</h2>
        {images.map((image: any, index: any) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
    );
  }
}

export default PDFImageExtractor;
