import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>

      <h1 className={styles.title}>Welcome to Map Navigator</h1>
      <p className={styles.subtitle}>Navigate through KIIT campus with ease</p>
      <div className={styles.buttons}>
        <Link to="/map" className={styles.button}>
          Explore Map
        </Link>
        <Link to="/AvailableLocations" className={styles.button}>
          View Locations
        </Link>
        <Link to="/user" className={styles.button}>
          User History
        </Link>
      </div>
    </div>
  );
};

export default Home;



// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
//       {/* Header */}
//       <header className="p-6 bg-white shadow-md">
//         <h1 className="text-3xl font-bold text-blue-700">KIIT Map Navigator</h1>
//       </header>

//       {/* Hero Section */}
//       <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
//         <h2 className="text-4xl md:text-5xl font-bold mb-4">Navigate Your Campus Smarter</h2>
//         <p className="text-lg md:text-xl mb-8 max-w-xl">
//           Find the shortest paths between places at KIIT. Choose your mode of transport and explore the campus like never before.
//         </p>
//         <Link
//           to="/map"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
//         >
//           Launch the Map
//         </Link>
//       </main>

//       {/* Features */}
//       <section className="bg-white py-10">
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
//           <div className="p-4 bg-blue-50 rounded-xl shadow">
//             <h3 className="text-xl font-semibold mb-2">Shortest Paths</h3>
//             <p className="text-gray-600">Uses Dijkstra's algorithm to give you the optimal route.</p>
//           </div>
//           <div className="p-4 bg-blue-50 rounded-xl shadow">
//             <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
//             <p className="text-gray-600">Visual markers, tooltips, and live path animations.</p>
//           </div>
//           <div className="p-4 bg-blue-50 rounded-xl shadow">
//             <h3 className="text-xl font-semibold mb-2">Walking & Cycling</h3>
//             <p className="text-gray-600">Choose your mode and get estimated travel times.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-100 text-center py-4 text-sm text-blue-700">
//         Built with ❤️ by [Your Name] • KIIT University • 2025
//       </footer>
//     </div>
//   );
// };

// export default Home;

