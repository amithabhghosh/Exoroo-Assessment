// import React, { useEffect, useState } from 'react';

// export const Navbar = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const dark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
//     setIsDarkMode(dark);
//     document.documentElement.classList.toggle('dark', dark);
//   }, []);

//   // Toggle theme
//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     document.documentElement.classList.toggle('dark', newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'grey');
//   };

//   return (
//     <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
//       <h1 className="text-2xl font-bold text-blue-600 dark:text-white">Exoroo</h1>
//       <button
//         onClick={toggleTheme}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition duration-300"
//       >
//         {isDarkMode ? '☀️ Grey Mode' : '🌙 Dark Mode'}
//       </button>
//     </nav>
//   );
// };


// import React, { useEffect, useState } from 'react';

// export const Navbar = () => {
//   const [theme, setTheme] = useState('dark');

//   useEffect(() => {
//     const saved = localStorage.getItem('theme') || 'dark';
//     setTheme(saved);
//     applyTheme(saved);
//   }, []);


//   const applyTheme = (theme) => {
//     document.documentElement.classList.remove('dark', 'grey');
//     document.documentElement.classList.add(theme);
//   };


//   const toggleTheme = () => {
//     const next = theme === 'dark' ? 'grey' : theme === 'grey' ? 'dark' : 'dark';
//     setTheme(next);
//     applyTheme(next);
//     localStorage.setItem('theme', next);
//   };

//   const getLabel = () => {
//     if (theme === 'grey') return '🌙 Dark';
//     if (theme === 'dark') return '🩶 Grey';
  
//   };

//   return (
//     <nav className="flex items-center justify-between p-4 shadow-md transition-all duration-300 bg-white dark:bg-gray-900 grey:bg-greytheme">
//       <h1 className="text-2xl font-bold text-blue-600 dark:text-white grey:text-white">Exoroo</h1>
//       <button
//         onClick={toggleTheme}
//         className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
//       >
//         {getLabel()}
//       </button>
//     </nav>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.classList.remove( 'dark', 'grey');
    document.documentElement.classList.add(theme);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'grey' : theme === 'grey' ? 'dark' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem('theme', next);
  };

  const getLabel = () => {
    if (theme === 'grey') return '🌙 Dark';
    if (theme === 'dark') return '🩶 Grey';
    
  };

  return (
   <nav className="flex items-center justify-between p-4 shadow-md transition-all duration-300 bg-white dark:bg-gray-900 grey:bg-greytheme">
  <h1 className="text-2xl font-bold text-blue-600 dark:text-white grey:text-white cursor-pointer" onClick={()=>navigate("/")}>Exoroo</h1>


  <div className="hidden md:flex space-x-4">
    <button
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      onClick={() => navigate("/addpost")}
    >
      ➕ Add Post
    </button>

    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {getLabel()}
    </button>

    <button
      onClick={() => navigate("/profile")}
      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
    >
      👤 Profile
    </button>
  </div>


  <div className="md:hidden">
    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white bg-blue-600 px-3 py-2 rounded">
      ☰
    </button>
  </div>


  {menuOpen && (
    <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 grey:bg-greytheme border rounded shadow-md p-4 space-y-3 z-50 md:hidden">
      <button
        onClick={() => navigate("/addpost")}
        className="w-full text-left px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        ➕ Add Post
      </button>

      <button
        onClick={toggleTheme}
        className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {getLabel()}
      </button>

      <button
        onClick={() => navigate("/profile")}
        className="w-full text-left px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        👤 Profile
      </button>
    </div>
  )}
</nav>

  );
};
