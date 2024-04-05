import { useEffect, useState } from 'react';
import Background from '../HomePage/Background/Background';
import Navbar from '../HomePage/Navbar/Navbar';
import Hero from '../HomePage/Hero/Hero';

function ParentComponent() {
  let heroData = [
    {text1: "Dive into", text2:"what you love"},
    {text1: "Indulge", text2:"your passions"},
    {text1: "Give in to", text2:"your passions"}
  ]
  const [heroCount, setHeroCount] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(()=> {
    const intervalId = setInterval(() => {
      setHeroCount((count) => { return count === 2 ? 0 : count + 1 })
    }, 15000);

    return () => clearInterval(intervalId);
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

export default ParentComponent