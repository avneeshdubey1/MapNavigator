// import React, { useEffect, useState, useCallback } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   Tooltip,
//   useMap,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-polylinedecorator";
// import { useLocation } from "react-router-dom";

// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // Fix Leaflet icon issues
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const AnimatedPolyline = ({ positions }) => {
//   const [animatedPath, setAnimatedPath] = useState([]);
//   const speed = 100;

//   useEffect(() => {
//     if (!Array.isArray(positions) || positions.length === 0) return;

//     let i = 0;
//     setAnimatedPath([]);

//     const interval = setInterval(() => {
//       const pos = positions[i];
//       if (
//         Array.isArray(pos) &&
//         pos.length === 2 &&
//         !isNaN(pos[0]) &&
//         !isNaN(pos[1])
//       ) {
//         setAnimatedPath((prev) => [...prev, L.latLng(pos[0], pos[1])]);
//       }
//       i++;
//       if (i >= positions.length) clearInterval(interval);
//     }, speed);

//     return () => clearInterval(interval);
//   }, [positions]);

//   return (
//     <>
//       {animatedPath.length > 1 && (
//         <>
//           <Polyline positions={animatedPath} color="blue" weight={5} />
//           <PolylineDecorator positions={animatedPath} />
//         </>
//       )}
//     </>
//   );
// };

// const PolylineDecorator = ({ positions }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!positions || positions.length < 2) return;

//     const decorator = L.polylineDecorator(positions, {
//       patterns: [
//         {
//           offset: 25,
//           repeat: 50,
//           symbol: L.Symbol.arrowHead({
//             pixelSize: 10,
//             polygon: false,
//             pathOptions: { stroke: true, color: "blue", weight: 2 },
//           }),
//         },
//       ],
//     });

//     decorator.addTo(map);

//     return () => {
//       try {
//         decorator.removeFrom(map);
//       } catch (e) {
//         console.warn("Failed to remove decorator:", e);
//       }
//     };
//   }, [positions, map]);

//   return null;
// };

// const MapView = () => {
//   const [locations, setLocations] = useState([]);
//   const [path, setPath] = useState([]);
//   const [selectedStart, setSelectedStart] = useState("");
//   const [selectedEnd, setSelectedEnd] = useState("");
//   const [estimatedTime, setEstimatedTime] = useState(null);
//   const [transportMode, setTransportMode] = useState("walking");

//   const location = useLocation();

//   useEffect(() => {
//     fetch("http://localhost:8080/locations/all")
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) setLocations(data);
//         else {
//           console.error("Unexpected response format:", data);
//           setLocations([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching locations:", err);
//       });
//   }, []);

//   const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
//     const toRad = (x) => (x * Math.PI) / 180;
//     const R = 6371;
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   const calculateTravelTime = useCallback((points) => {
//     let totalDistance = 0;
//     for (let i = 1; i < points.length; i++) {
//       totalDistance += haversineDistance(points[i - 1], points[i]);
//     }

//     const speedKmph = transportMode === "bicycling" ? 15 : 5;
//     const timeHours = totalDistance / speedKmph;
//     setEstimatedTime(Math.round(timeHours * 60));
//   }, [transportMode]);

//   const fetchPath = useCallback(
//     async (start = selectedStart, end = selectedEnd) => {
//       if (!start || !end || start === end) return;

//       try {
//         const res = await fetch(
//           `http://localhost:8080/locations/shortest-path?startName=${start}&endName=${end}`
//         );
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//         const data = await res.json();
//         if (data && data.path && data.path.length > 1) {
//           const points = data.path.map((loc) => [loc.latitude, loc.longitude]);
//           setPath(points);
//           calculateTravelTime(points);
//         } else {
//           setPath([]);
//           setEstimatedTime(null);
//           alert("No valid path found.");
//         }
//       } catch (err) {
//         console.error("Error fetching path:", err);
//       }
//     },
//     [selectedStart, selectedEnd, calculateTravelTime]
//   );

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const start = query.get("start");
//     const end = query.get("end");

//     if (start) setSelectedStart(start);
//     if (end) setSelectedEnd(end);

//     if (start && end && start !== end) fetchPath(start, end);
//   }, [location.search, fetchPath]);

//   return (
//     <div>
//       <div className="controls" style={{ padding: 10 }}>
//         <select
//           value={selectedStart}
//           onChange={(e) => setSelectedStart(e.target.value)}
//         >
//           <option value="">Start Location</option>
//           {locations.map((loc) => (
//             <option key={loc.id} value={loc.name}>
//               {loc.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedEnd}
//           onChange={(e) => setSelectedEnd(e.target.value)}
//         >
//           <option value="">End Location</option>
//           {locations.map((loc) => (
//             <option key={loc.id} value={loc.name}>
//               {loc.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={transportMode}
//           onChange={(e) => setTransportMode(e.target.value)}
//         >
//           <option value="walking">Walking</option>
//           <option value="bicycling">Bicycling</option>
//         </select>

//         <button onClick={() => fetchPath()}>Find Path</button>

//         {estimatedTime && (
//           <span style={{ marginLeft: "20px", fontWeight: "bold" }}>
//             Estimated time ({transportMode}): {estimatedTime} min
//           </span>
//         )}
//       </div>

//       <MapContainer
//         center={[20.353, 85.818]}
//         zoom={17}
//         style={{ height: "90vh", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         {locations.map((loc) => (
//           <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
//             <Popup>{loc.name}</Popup>
//             <Tooltip permanent direction="top" offset={[0, -20]}>
//               {loc.name}
//             </Tooltip>
//           </Marker>
//         ))}

//         {path.length > 1 && <AnimatedPolyline positions={path} />}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;


import React, { useEffect, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";
import { useLocation } from "react-router-dom";
import styles from "./MapView.module.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AnimatedPolyline = ({ positions }) => {
  const [animatedPath, setAnimatedPath] = useState([]);
  const speed = 100;

  useEffect(() => {
    if (!Array.isArray(positions) || positions.length === 0) return;

    let i = 0;
    setAnimatedPath([]);

    const interval = setInterval(() => {
      const pos = positions[i];
      if (
        Array.isArray(pos) &&
        pos.length === 2 &&
        !isNaN(pos[0]) &&
        !isNaN(pos[1])
      ) {
        setAnimatedPath((prev) => [...prev, L.latLng(pos[0], pos[1])]);
      }
      i++;
      if (i >= positions.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [positions]);

  return (
    <>
      {animatedPath.length > 1 && (
        <>
          <Polyline positions={animatedPath} color="cyan" weight={5} />
          <PolylineDecorator positions={animatedPath} />
        </>
      )}
    </>
  );
};

const PolylineDecorator = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (!positions || positions.length < 2) return;

    const decorator = L.polylineDecorator(positions, {
      patterns: [
        {
          offset: 25,
          repeat: 50,
          symbol: L.Symbol.arrowHead({
            pixelSize: 10,
            polygon: false,
            pathOptions: { stroke: true, color: "cyan", weight: 2 },
          }),
        },
      ],
    });

    decorator.addTo(map);

    return () => {
      try {
        decorator.removeFrom(map);
      } catch (e) {
        console.warn("Failed to remove decorator:", e);
      }
    };
  }, [positions, map]);

  return null;
};

const MapView = () => {
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState([]);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [transportMode, setTransportMode] = useState("walking");

  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/locations/all")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLocations(data);
        else setLocations([]);
      })
      .catch(console.error);
  }, []);

  const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateTravelTime = useCallback(
    (points) => {
      let totalDistance = 0;
      for (let i = 1; i < points.length; i++) {
        totalDistance += haversineDistance(points[i - 1], points[i]);
      }
      const speedKmph = transportMode === "bicycling" ? 15 : 5;
      const timeHours = totalDistance / speedKmph;
      setEstimatedTime(Math.round(timeHours * 60));
    },
    [transportMode]
  );

  const fetchPath = useCallback(
    async (start = selectedStart, end = selectedEnd) => {
      if (!start || !end || start === end) return;

      try {
        const res = await fetch(
          `http://localhost:8080/locations/shortest-path?startName=${start}&endName=${end}`
        );
        const data = await res.json();
        if (data?.path?.length > 1) {
          const points = data.path.map((loc) => [loc.latitude, loc.longitude]);
          setPath(points);
          calculateTravelTime(points);
        } else {
          setPath([]);
          setEstimatedTime(null);
          alert("No valid path found.");
        }
      } catch (err) {
        console.error("Error fetching path:", err);
      }
    },
    [selectedStart, selectedEnd, calculateTravelTime]
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const start = query.get("start");
    const end = query.get("end");
    if (start) setSelectedStart(start);
    if (end) setSelectedEnd(end);
    if (start && end && start !== end) fetchPath(start, end);
  }, [location.search, fetchPath]);

  return (
    <div className={styles.mapViewContainer}>
      <div className={styles.controls}>
        <select
          value={selectedStart}
          onChange={(e) => setSelectedStart(e.target.value)}
        >
          <option value="">Start Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>

        <select
          value={selectedEnd}
          onChange={(e) => setSelectedEnd(e.target.value)}
        >
          <option value="">End Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>

        <select
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
        >
          <option value="walking">Walking</option>
          <option value="bicycling">Bicycling</option>
        </select>

        <button onClick={() => fetchPath()}>Find Path</button>

        {estimatedTime && (
          <span className={styles.estimatedTime}>
            Estimated time ({transportMode}): {estimatedTime} min
          </span>
        )}
      </div>

      <MapContainer
        center={[20.353, 85.818]}
        zoom={17}
        className={styles.mapContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
            <Popup>{loc.name}</Popup>
            <Tooltip permanent direction="top" offset={[0, -20]}>
              {loc.name}
            </Tooltip>
          </Marker>
        ))}

        {path.length > 1 && <AnimatedPolyline positions={path} />}
      </MapContainer>
    </div>
  );
};

export default MapView;
