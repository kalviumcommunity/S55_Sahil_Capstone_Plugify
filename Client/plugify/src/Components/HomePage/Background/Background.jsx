import React from 'react';
import './Background.css';
import video1 from '../../../assets/vid1.mp4';
import video2 from '../../../assets/vid2.mp4';
import video3 from '../../../assets/vid3.mp4';
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import image3 from '../../../assets/image3.png';

const Background = ({ playStatus, heroCount }) => {
  if (playStatus) {
    return (
      <video className='background fade-in' autoPlay loop muted>
        {heroCount === 0 && <source src={video1} type='video/mp4' />}
        {heroCount === 1 && <source src={video2} type='video/mp4' />}
        {heroCount === 2 && <source src={video3} type='video/mp4' />}
      </video>
    );
  } else if (heroCount === 0) {
    return <img src={image1} className='background fade-in' alt='' />;
  } else if (heroCount === 1) {
    return <img src={image2} className='background fade-in' alt='' />;
  } else if (heroCount === 2) {
    return <img src={image3} className='background fade-in' alt='' />;
  }
};

export default Background;
