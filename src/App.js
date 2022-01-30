import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar.js'
import News from './components/News.js'
import LoadingBar from 'react-top-loading-bar'
import {
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 20;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route exact path="/" element={<News progress={setProgress} key={"general"} pageSize={pageSize} country="in" category='general' apiKey={apiKey} />} />
        <Route exact path="/science" element={<News progress={setProgress} key={"science"} pageSize={pageSize} country="in" category='science' apiKey={apiKey} />} />
        <Route exact path="/business" element={<News progress={setProgress} key={"business"} pageSize={pageSize} country="in" category='business' apiKey={apiKey} />} />
        <Route exact path="/entertainment" element={<News progress={setProgress} key={"entertainment"} pageSize={pageSize} country="in" category='entertainment' apiKey={apiKey} />} />
        <Route exact path="/health" element={<News progress={setProgress} key={"health"} pageSize={pageSize} country="in" category='health' apiKey={apiKey} />} />
        <Route exact path="/sports" element={<News progress={setProgress} key={"sports"} pageSize={pageSize} country="in" category='sports' apiKey={apiKey} />} />
        <Route exact path="/technology" element={<News progress={setProgress} key={"technology"} pageSize={pageSize} country="in" category='technology' apiKey={apiKey} />} />
      </Routes>
    </div>
  )
}

export default App;