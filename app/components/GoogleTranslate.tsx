"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    const addScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    if (!window.google) {
      addScript();
    } else {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <div id="google_translate_element" className="google-translate-container">
      <style jsx global>{`
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          padding: 4px 8px !important;
          border-radius: 8px !important;
          font-family: inherit !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        .goog-te-gadget-simple:hover {
          background-color: rgba(59, 130, 246, 0.1) !important;
          border-color: rgba(59, 130, 246, 0.5) !important;
        }
        .goog-te-gadget-simple img {
          display: none !important;
        }
        .goog-te-gadget-simple span {
          color: #94a3b8 !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }
        .goog-te-gadget-simple span:hover {
          color: white !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        .goog-te-menu-value span:nth-child(5) {
            display: none !important;
        }
        .goog-te-menu-value span:nth-child(3) {
            display: none !important;
        }
        .goog-te-menu-value:after {
            content: '🌐';
            margin-left: 4px;
        }

        /* Force Single Column / Vertical List */
        .goog-te-menu2 {
          max-width: 280px !important;
          max-height: 450px !important;
          width: 280px !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          padding: 8px !important;
          background-color: #1e293b !important;
          border: 1px solid rgba(59, 130, 246, 0.4) !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
        }

        /* Essential: This forces the table cells to wrap and stack */
        .goog-te-menu2 table, 
        .goog-te-menu2 table tr, 
        .goog-te-menu2 table td {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .goog-te-menu2-item {
          display: block !important;
          padding: 0 !important;
          width: 100% !important;
        }

        .goog-te-menu2-item div {
          background-color: transparent !important;
          color: #cbd5e1 !important;
          padding: 10px 16px !important;
          font-family: inherit !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
          border-radius: 8px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .goog-te-menu2-item:hover div {
          color: white !important;
          background-color: rgba(59, 130, 246, 0.15) !important;
        }

        /* Hide the separator dots/checkmarks that Google adds */
        .goog-te-menu2 td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important;
        }

        .goog-te-menu2 td:last-child {
          border-bottom: none !important;
        }

        /* Customize Scrollbar for the menu */
        .goog-te-menu2::-webkit-scrollbar {
          width: 4px !important;
        }
        .goog-te-menu2::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .goog-te-menu2::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3) !important;
          border-radius: 10px !important;
        }
      `}</style>
    </div>
  );
}
