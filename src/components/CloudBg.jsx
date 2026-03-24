import { useState, useEffect } from 'react';
import cloud1 from '../assets/cloud-1.png';
import cloud2 from '../assets/cloud-2.png';
import cloud3 from '../assets/cloud-3.png';
import cloud4 from '../assets/cloud-4.png';
import cloud5 from '../assets/cloud-5.png';
import cloud6 from '../assets/cloud-6.png';
import { v4 as uuidv4 } from 'uuid';

import '../styles/cloud.css';

const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6];

export default function CloudBg() {
  const [clouds, setClouds] = useState([]);

  function spawnCloud() {
    setClouds((prevClouds) => {
      const randomCloud = Math.floor(Math.random() * cloudImages.length);
      const cloudHeight = Math.floor(Math.random() * 100) + 20;
      const cloudTop = Math.floor(Math.random() * 80);
      const duration = Math.floor(Math.random() * 10) + 20;
      return [
        ...prevClouds,
        {
          src: cloudImages[randomCloud],
          height: cloudHeight,
          top: cloudTop,
          duration,
          uuid: uuidv4(),
        },
      ];
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      spawnCloud();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='cloud-layer'>
      {clouds.map((cloud) => {
        return (
          <span
            className='cloud'
            key={cloud.uuid}
            style={{
              top: `${cloud.top}%`,
              '--duration': `${cloud.duration}s`,
            }}
            ref={(el) => {
              if (el) {
                setTimeout(() => {
                  el.classList.add('animate');
                }, 50);
                setTimeout(() => {
                  setClouds((prev) =>
                    prev.filter((c) => c.uuid !== cloud.uuid),
                  );
                }, cloud.duration * 1000);
              }
            }}
          >
            <img src={cloud.src} style={{ height: `${cloud.height}px` }} />
          </span>
        );
      })}
    </div>
  );
}
