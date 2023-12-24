// Languages.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Languages = ({ handleLanguageClick }) => {
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
    <div className="flex justify-center items-center h-screen">
      <div className="m-4 p-4 border border-gray-300 rounded text-center">
        <h2 className="text-lg font-semibold mb-4">Languages</h2>
        <ul>
          {languages.map((language) => (
            <li
              key={language.LanguageID} // Add unique key prop
              className="mb-2 cursor-pointer hover:underline"
              onClick={() => handleLanguageClick(language.LanguageID)}
            >
              <Link to={`/movies/${language.LanguageName}`}>
                {language.LanguageName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Languages;
