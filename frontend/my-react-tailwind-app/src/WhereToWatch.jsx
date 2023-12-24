// WhereToWatch.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WhereToWatch = ({ handleWTWClick }) => {
  const [wtwLocations, setWTWLocations] = useState([]);

  useEffect(() => {
    const fetchWTWLocations = async () => {
      try {
        const response = await axios.get("/api/wtw");
        console.log("API Response Type:", typeof response.data);
        console.log("API Response:", response);

        // Typecast response.data to an array, assuming it's an object
        const locationsArray = Array.isArray(response.data) ? response.data : [response.data];

        setWTWLocations(locationsArray);
      } catch (error) {
        console.error("Error fetching Where to Watch locations:", error);
      }
    };

    fetchWTWLocations();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-4 p-4 border border-gray-300 rounded text-center">
        <h2 className="text-lg font-semibold mb-4">Where to Watch</h2>
        <ul>
          {/* Loop through the wtwLocations array and display names */}
          {wtwLocations.map((wtwLocation) => (
            <li
              key={wtwLocation.WtwID}
              className="mb-2 cursor-pointer hover:underline"
              onClick={() => handleWTWClick(wtwLocation.WtwID)}
            >
              <Link to={`/movies/wtw/${wtwLocation.WtwName}`}>
                {wtwLocation.WtwName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhereToWatch;
