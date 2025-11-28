import React, { useEffect, useState } from "react";
import { getUserHistory } from "../services/api";

const userId = "67ee7c9de01bf111373daadc"; // Replace with actual user ID

const UserHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getUserHistory(userId);
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>User Location History</h1>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry.locationName} - {entry.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserHistory;
