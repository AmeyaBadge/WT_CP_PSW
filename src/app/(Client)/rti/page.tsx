"use client";
import React, { useState } from "react";
import { Download, ExternalLink, FileText, AlertCircle } from "lucide-react";

const RTIPage = () => {
  const pdfFile = "/documents/RTI.pdf";
  const [iframeError, setIframeError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow px-4 py-6 w-full">
        <div className="mx-auto bg-white rounded-lg shadow-md max-w-6xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4 border-b">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">
                Right to Information (RTI)
              </h1>
              <p className="text-gray-600 text-sm">
                Download and submit RTI application form
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href={pdfFile}
                download="RTI_Application_Form.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium shadow-sm"
              >
                <Download size={18} />
                Download
              </a>
              <a
                href={pdfFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium shadow-sm"
              >
                <ExternalLink size={18} />
                Open in New Tab
              </a>
            </div>
          </div>

          {/* Information Section */}
          <div className="p-6 bg-blue-50 border-b">
            <div className="flex items-start gap-3">
              <FileText className="text-blue-600 mt-1" size={20} />
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">
                  About RTI Application
                </h2>
                <p className="text-sm text-gray-700">
                  The Right to Information Act gives citizens the right to
                  access information from public authorities. Use this form to
                  submit your RTI application.
                </p>
              </div>
            </div>
          </div>

          {/* PDF Viewer Section */}
          <div className="p-6">
            {iframeError ? (
              <div className="text-center py-12 px-4">
                <AlertCircle
                  className="mx-auto text-orange-500 mb-4"
                  size={48}
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  PDF Preview Unavailable
                </h3>
                <p className="text-gray-600 mb-6">
                  Unable to display PDF in browser. Please download the form or
                  open it in a new tab.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a
                    href={pdfFile}
                    download="RTI_Application_Form.pdf"
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    <Download size={20} />
                    Download PDF
                  </a>
                  <a
                    href={pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    <ExternalLink size={20} />
                    Open in New Tab
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative w-full" style={{ minHeight: "800px" }}>
                <iframe
                  src={`${pdfFile}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full border border-gray-300 rounded-lg shadow-sm"
                  style={{ height: "800px" }}
                  title="RTI Application Form PDF"
                  onError={() => setIframeError(true)}
                >
                  <p className="p-4 text-center">
                    Your browser does not support PDF viewing.{" "}
                    <a
                      href={pdfFile}
                      className="text-blue-600 hover:underline font-medium"
                      download
                    >
                      Download the PDF
                    </a>{" "}
                    instead.
                  </p>
                </iframe>

                {/* Mobile-friendly message */}
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg sm:hidden">
                  <p className="text-sm text-amber-800">
                    <strong>Mobile Users:</strong> For better viewing
                    experience, please download the PDF or open it in a new tab.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Instructions Section */}
          <div className="p-6 bg-gray-50 border-t">
            <h3 className="font-semibold text-gray-900 mb-3">
              How to Submit RTI Application
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Download and fill the RTI application form completely</li>
              <li>Attach required documents and application fee</li>
              <li>
                Submit the form to the concerned Public Information Officer
                (PIO)
              </li>
              <li>Keep a copy of the acknowledgment for reference</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RTIPage;
