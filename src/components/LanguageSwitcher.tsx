"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");
  // const router = useRouter();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "mr" : "en";
    setLanguage(newLanguage);
    // In a real app, you would update the language context or i18n configuration
    // For now, we'll just toggle a class on the html element
    document.documentElement.lang = newLanguage;
  };

  return (
    <div className="mt-2 md:mt-0">
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 bg-white border border-govt-blue text-govt-blue rounded-md hover:bg-govt-blue hover:text-white transition"
        aria-label={`Switch to ${language === "en" ? "Marathi" : "English"}`}
      >
        {language === "en" ? "मराठी" : "English"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
