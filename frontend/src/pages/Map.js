// import React, { useEffect, useState } from "react";
// import { getAllLocations } from "../services/api";

// const Map = () => {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       const data = await getAllLocations();
//       setLocations(data);
//     };
//     fetchLocations();
//   }, []);

//   return (
//     <div>
//       <h1>Map Page</h1>
//       <h2>Available Locations:</h2>
//       <ul>
//         {locations.map((location) => (
//           <li key={location.id}>{location.name} - {location.category}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Map;

import React, { useEffect, useState } from "react";
import { getAllLocations } from "../services/api";
import MapView from "../components/MapView"; // ✅ Import MapView

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getAllLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🗺️ Map Page</h1>

     
      {/* ✅ Render MapView here */}
      <MapView locations={locations} />    </div>
  );
};

export default Map;
