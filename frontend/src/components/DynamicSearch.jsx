import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const DynamicSearch = () => {
  const placeholders = [
    "Search for project topics...",
    "Find supervisors by name...",
    "Look up project documents...",
    "Explore trending research areas...",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = placeholders[index];
    let typing;

    if (charIndex < current.length) {
      typing = setTimeout(() => {
        setText((prev) => prev + current[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); // typing speed
    } else {
      typing = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % placeholders.length);
      }, 2000); // pause before clearing
    }

    return () => clearTimeout(typing);
  }, [charIndex, index, placeholders]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4">
      <div className="relative flex items-center bg-white rounded-full shadow-md overflow-hidden">
        <Search className="absolute left-4 text-gray-400" size={20} />

        <input
          type="text"
          placeholder={text}
          className="w-full py-3 pl-12 pr-4 rounded-full focus:outline-none text-gray-700"
        />

        <button className="absolute right-2 bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default DynamicSearch;
