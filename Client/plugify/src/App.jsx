import { useEffect, useState } from 'react';
import './App.css'
import Background from './Components/HomePage/Background/Background';
import Navbar from './Components/HomePage/Navbar/Navbar';
import Hero from './Components/HomePage/Hero/Hero';

const App = () => {
  let heroData = [
    {text1: "Dive into", text2:"what you love"},
    {text1: "Indulge", text2:"your passions"},
    {text1: "Give in to", text2:"your passions"}
  ]
  const [heroCount, setHeroCount] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(()=> {
    setInterval(()=>{
      setHeroCount((count)=>{return count===2?0:count+1})
    }, 15000);
  }, [])

  return(
    <>
      <Background playStatus={playStatus} heroCount = {heroCount}/>
      <Navbar/>
      <Hero 
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
    </>
  )
}

export default App