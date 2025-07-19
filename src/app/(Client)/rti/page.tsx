"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, Loader2 } from "lucide-react";

const RTIPage = () => {
  // Configure PDF.js worker (with multiple fallback options)
  const configureWorker = async () => {
    try {
      // Try CDN first
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

      // Verify worker is available
      await new Promise((resolve, reject) => {
        const worker = new pdfjs.PDFWorker();
        worker.promise.then(resolve).catch(reject);
      });
    } catch (error) {
      console.warn("CDN worker failed, trying local worker");
      try {
        // Fallback to local worker
        const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.min.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
      } catch (e) {
        console.error("All worker initialization failed:", e);
        throw new Error("PDF viewer initialization failed");
      }
    }
  };

  const PDFViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Initialize PDF.js worker
    useEffect(() => {
      let mounted = true;

      const init = async () => {
        try {
          await configureWorker();
          if (mounted) setIsReady(true);
        } catch (err) {
          if (mounted) setError(err.message);
        }
      };

      init();
      return () => {
        mounted = false;
      };
    }, []);

    // Handle window resize
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onLoadSuccess = ({ numPages }) => setNumPages(numPages);
    const onLoadError = (error) => setError(error.message);

    const getPageWidth = () => {
      if (windowWidth < 640) return windowWidth - 32; // mobile
      if (windowWidth < 1024) return windowWidth - 64; // tablet
      return Math.min(800, windowWidth - 96); // desktop
    };

    if (error) {
      return (
        <div className="p-4 text-center text-red-600">
          <p>Error loading PDF: {error}</p>
          <a
            href={pdfUrl}
            className="text-blue-600 hover:underline mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF directly
          </a>
        </div>
      );
    }

    if (!isReady) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-2">
          <Loader2 className="animate-spin text-saffron" size={32} />
          <span className="text-sm">Initializing PDF viewer...</span>
        </div>
      );
    }

    return (
      <div className="w-full">
        <Document
          file={pdfUrl}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-saffron" size={32} />
            </div>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-6 last:mb-0">
              <Page
                pageNumber={index + 1}
                width={getPageWidth()}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading=""
              />
              <div className="text-center text-sm text-gray-500 mt-2">
                Page {index + 1} of {numPages}
              </div>
            </div>
          ))}
        </Document>
      </div>
    );
  };

  const pdfFile = "/documents/RTI.pdf"; // Verify this path exists in public folder

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow px-4 py-6 w-full">
        <div className="mx-auto bg-white rounded-lg shadow-md max-w-4xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 border-b">
            <h1 className="text-xl sm:text-2xl font-bold text-navy">
              Right to Information (RTI)
            </h1>
            <a
              href={pdfFile}
              download="RTI_Application_Form.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base"
            >
              <Download size={16} />
              Download Form
            </a>
          </div>

          {/* PDF Viewer Section */}
          <div className="p-4">
            <PDFViewer pdfUrl={pdfFile} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RTIPage;
