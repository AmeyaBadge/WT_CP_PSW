"use client";
import React, { useState, useEffect } from "react";

const RTS = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow px-4 py-6 w-full">
        <div className="mx-auto bg-white rounded-lg shadow-md max-w-4xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-3 border-b">
            <h1 className="text-xl sm:text-2xl font-bold text-navy">
              Right to Public Services (RTS)
            </h1>
          </div>

          {/* PDF Viewer Section */}
          <div className="p-4">
            <img src="/documents/RTS.jpg" alt="" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RTS;
