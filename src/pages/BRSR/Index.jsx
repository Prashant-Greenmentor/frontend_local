import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Header from "../../components/common/Header";
import { ReactComponent as DownloadIcon } from "../../app/assets/DownloadIcon.svg";
import axios from 'axios';

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Index() {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/v1/energy/fuel/fuel-data/pdf-download", {
        // const response = await axios.get("https://greenmentor-local.onrender.com/api/v1/energy/fuel/fuel-data/pdf-download", {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setPdfUrl(url); // Save the URL to state
      } catch (error) {
        setError("Error fetching PDF");
        console.error("Error fetching PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the PDF file upon component mount
    fetchPdf();

    // Clean up function to revoke the URL when component unmounts
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  const handleDownload = () => {
    if (pdfUrl) {
      
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("download", "environmental_report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="h-screen">
      <Header scope={""} pageTitle={"BRSR"} />
      <div className="mt-4 flex justify-end px-5" id="BRSR">
        <div
          onClick={handleDownload}
          className="flex flex-row justify-center items-center w-28 h-8 cursor-pointer border border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white mr-2"
        >
          <span className="mr-2">
            <DownloadIcon className="colored-svg w-6 h-6" />
          </span>
          <span className="text-xs">Download</span>
        </div>
      </div>

      <div className="pdf-container flex justify-center p-5">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {pdfUrl && !loading && !error && (
          <Document
            file={pdfUrl} // Updated the file path with the correct path to your PDF file
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onError={(error) => setError("Error loading PDF")}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div className="">

              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={800}
                height={800}
                renderTextLayer={false} 
                renderAnnotationLayer={false} 
              />

              </div>
            ))}
          </Document>
        )}
      </div>

      <style>{`
        .pdf-container {
          margin: 0 auto;
          max-width: 800px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .page-number {
          text-align: center;
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  );
}

export default Index;
