import React, { useEffect, useState } from "react";
import { getAllLocations } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./AV.module.css";

const AV = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getAllLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const handleNavigate = (locationName, type) => {
    navigate(`/map?${type}=${encodeURIComponent(locationName)}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>These are the Available Locations</h1>

      <div className={styles.listWrapper}>
        <h2 className={styles.subheading}>Available Locations:</h2>
        <ul className={styles.list}>
          {locations.map((location) => (
            <li key={location.id} className={styles.listItem}>
              <span>
                {location.name} - {location.category}
              </span>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => handleNavigate(location.name, "start")}
                  className={styles.button}
                >
                  Start From
                </button>
                <button
                  onClick={() => handleNavigate(location.name, "end")}
                  className={styles.button}
                >
                  Go To
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AV;
