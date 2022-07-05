import { useEffect, useState } from 'react';
import './App.css';
import { Logo } from './components/Logo';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import JsonData from './data.json';
import Intro from './components/Intro';

function App() {
  const [pageData, setLandingPageData] = useState({ JsonData });
  useEffect(() => {}, []);

  return (
    <>
      <Navigation></Navigation>
      <Home data={pageData}></Home>
    </>
  );
}

export default App;
