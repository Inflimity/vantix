"use client";

import { useEffect, useState, useRef } from "react";

// Comprehensive list of languages with codes, names, and flag emojis
const languages = [
  // Major Languages
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },

  // Asian Languages
  { code: "zh-CN", name: "中文 (简体)", flag: "🇨🇳" },
  { code: "zh-TW", name: "中文 (繁體)", flag: "🇹🇼" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "��" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "اردو", flag: "🇵�" },
  { code: "th", name: "ไทย", flag: "🇹�" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "fil", name: "Filipino", flag: "🇵🇭" },
  { code: "my", name: "မြန်မာ", flag: "🇲🇲" },
  { code: "km", name: "ភាសាខ្មែរ", flag: "�🇭" },
  { code: "lo", name: "ລາວ", flag: "🇱🇦" },
  { code: "ne", name: "नेपाली", flag: "🇳🇵" },
  { code: "si", name: "සිංහල", flag: "🇱🇰" },

  // Middle Eastern & African Languages
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ku", name: "کوردی", flag: "🇮🇶" },
  { code: "ps", name: "پښتو", flag: "🇦🇫" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "zu", name: "isiZulu", flag: "��" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" },

  // European Languages
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polski", flag: "��" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", flag: "�🇮" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "bg", name: "Български", flag: "🇧�🇬" },
  { code: "sr", name: "Српски", flag: "🇷🇸" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "sl", name: "Slovenščina", flag: "🇸🇮" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
  { code: "lv", name: "Latviešu", flag: "🇱🇻" },
  { code: "et", name: "Eesti", flag: "🇪🇪" },
  { code: "is", name: "Íslenska", flag: "🇮🇸" },
  { code: "ga", name: "Gaeilge", flag: "🇮🇪" },
  { code: "cy", name: "Cymraeg", flag: "�󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "mt", name: "Malti", flag: "🇲🇹" },
  { code: "sq", name: "Shqip", flag: "🇦�🇱" },
  { code: "mk", name: "Македонски", flag: "🇲🇰" },
  { code: "bs", name: "Bosanski", flag: "🇧🇦" },
  { code: "ca", name: "Català", flag: "🇪🇸" },
  { code: "gl", name: "Galego", flag: "🇪🇸" },
  { code: "eu", name: "Euskara", flag: "🇪🇸" },
  { code: "be", name: "Беларуская", flag: "🇧🇾" },

  // Central Asian Languages
  { code: "kk", name: "Қазақ", flag: "�🇿" },
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ky", name: "Кыргызча", flag: "🇰🇬" },
  { code: "tg", name: "Тоҷикӣ", flag: "🇹🇯" },
  { code: "tk", name: "Türkmen", flag: "🇹🇲" },
  { code: "az", name: "Azərbaycan", flag: "🇦🇿" },
  { code: "hy", name: "Հայերdelays", flag: "🇦🇲" },
  { code: "ka", name: "ქართული", flag: "🇬🇪" },
  { code: "mn", name: "Монгол", flag: "��" },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

// Globe Icon Component
const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-400"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

// Chevron Icon Component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// Check Icon Component
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-400"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter languages based on search term
  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load Google Translate script
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    if (!window.google) {
      addScript();
    } else {
      window.googleTranslateElementInit();
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to trigger Google Translate
  const translatePage = (langCode: string) => {
    const lang = languages.find((l) => l.code === langCode);
    if (lang) {
      setSelectedLang(lang);
    }
    setIsOpen(false);
    setSearchTerm("");

    // Set Google Translate cookie
    const googleTranslateCookie = `/en/${langCode}`;
    document.cookie = `googtrans=${googleTranslateCookie}; path=/`;
    document.cookie = `googtrans=${googleTranslateCookie}; path=/; domain=${window.location.hostname}`;

    // Use the hidden Google Translate element to trigger translation
    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event("change"));
    } else {
      // Fallback: reload page with cookie set
      window.location.reload();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-transparent border border-blue-500/30 rounded-lg text-slate-300 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
        <span className="text-sm font-medium">{selectedLang.flag}</span>
        <span className="text-xs font-semibold uppercase tracking-wide hidden sm:inline">
          {selectedLang.code.split("-")[0]}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-slate-800 border border-blue-500/30 rounded-xl shadow-2xl z-50 overflow-hidden"
          role="listbox"
        >
          {/* Search Input */}
          <div className="p-2 border-b border-slate-700">
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Language List */}
          <div className="max-h-72 overflow-y-auto p-2">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => translatePage(lang.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${selectedLang.code === lang.code
                    ? "bg-blue-500/20 text-white"
                    : "text-slate-300 hover:bg-blue-500/10 hover:text-white"
                    }`}
                  role="option"
                  aria-selected={selectedLang.code === lang.code}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="flex-1 text-sm font-medium">{lang.name}</span>
                  <span className="text-xs text-slate-500 uppercase">
                    {lang.code}
                  </span>
                  {selectedLang.code === lang.code && <CheckIcon />}
                </button>
              ))
            ) : (
              <div className="text-center py-4 text-slate-400 text-sm">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
