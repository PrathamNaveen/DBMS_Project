// WhereToWatch.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const WhereToWatch = () => {
  const [whereToWatch, setWhereToWatch] = useState([]);

  useEffect(() => {
    const fetchWhereToWatch = async () => {
      try {
        const response = await axios.get("/api/wheretowatch");
        setWhereToWatch(response.data);
      } catch (error) {
        console.error("Error fetching where to watch options:", error);
      }
    };

    fetchWhereToWatch();
  }, []);

  return (
    <div className="m-4 p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Where to Watch</h2>
      <ul>
        {whereToWatch.map((wtw) => (
          <li key={wtw.WtwID} className="mb-2">
            {wtw.WtwName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhereToWatch;
