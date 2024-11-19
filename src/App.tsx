// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import JSONEditor from './components/JSONEditor';
// import FormGenerator from './components/FormGenerator';

// function App() {
//   const [jsonSchema, setJsonSchema] = useState('');

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-50">
//       {/* Left Panel: JSON Editor */}
//       <div className="w-full md:w-1/2 p-4 bg-gray-100 border-r">
//         <h1 className="text-2xl font-bold mb-4 text-red-800">JSON Editor</h1>
//         <JSONEditor jsonSchema={jsonSchema} setJsonSchema={setJsonSchema} />
//       </div>

//       {/* Right Panel: Form Preview */}
//       <div className="w-full md:w-1/2 p-4 bg-white">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Generated form preview</h1>
//         <FormGenerator jsonSchema={jsonSchema} />
//       </div>
//     </div>
//   );
// };

// export default App


// import { useState } from 'react';
// import './App.css';
// import JSONEditor from './components/JSONEditor';
// import FormGenerator from './components/FormGenerator';

// function App() {
//   const [jsonSchema, setJsonSchema] = useState('');

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-50">
//       {/* Left Panel: JSON Editor */}
//       <div className="w-full md:w-1/2 p-4 bg-gray-100 border-b md:border-r">
//         <h1 className="text-2xl md:text-3xl font-bold mb-4 text-red-800">JSON Editor</h1>
//         <JSONEditor jsonSchema={jsonSchema} setJsonSchema={setJsonSchema} />
//       </div>

//       {/* Right Panel: Form Preview */}
//       <div className="w-full md:w-1/2 p-4 bg-white overflow-auto">
//         <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Generated form preview</h1>
//         <FormGenerator jsonSchema={jsonSchema} />
//       </div>
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from 'react';
import './App.css';
import JSONEditor from './components/JSONEditor';
import FormGenerator from './components/FormGenerator';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  const [jsonSchema, setJsonSchema] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply the dark mode class to the body when isDarkMode is true
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);


  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 justify-center items-center">
      {/* Left Panel: JSON Editor */}
      <div className="w-full h-full md:w-1/2 p-4 bg-gray-100 border-b md:border-r flex flex-col justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-red-800">JSON Editor</h1>
        <JSONEditor jsonSchema={jsonSchema} setJsonSchema={setJsonSchema} />
      </div>

      {/* Right Panel: Form Preview */}
      <div className="w-full h-full md:w-1/2 p-4 bg-white overflow-auto flex flex-col justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Generated form preview</h1>
        <FormGenerator jsonSchema={jsonSchema} />
      </div>
      <ToastContainer position="top-right" />

      {/* <button onClick={toggleTheme}>
        Toggle {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button> */}

    </div>
  );
};

export default App;
