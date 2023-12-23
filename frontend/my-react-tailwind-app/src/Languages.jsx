// Languages.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const Languages = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("/api/languages");
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="m-4 p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.LanguageID} className="mb-2">
            {language.LanguageName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
