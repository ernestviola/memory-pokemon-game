import { useState } from 'react';
import cloud1 from '../assets/cloud-1.png';
import cloud2 from '../assets/cloud-2.png';
import cloud3 from '../assets/cloud-3.png';
import cloud4 from '../assets/cloud-4.png';
import cloud5 from '../assets/cloud-5.png';
import cloud6 from '../assets/cloud-6.png';

const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6];

export default function CloudBg() {
  const [clouds, setClouds] = useState([]);

  function spawnCloud() {
    const cloudsCopy = [...clouds];
    const randomCloud = Math.floor(Math.random() * cloudImages.length);
    const cloudHeight = Math.floor(Math.random() * 200) + 100;
    // get a random height from 100 - 300px
    // give it a flip
    // give it a speed
    // spawn the cloud off map
    // give it a negative z-index
    cloudsCopy.push({
      html: (
        <img
          src={cloudImages[randomCloud]}
          alt=''
          style={`height:${cloudHeight}px`}
        />
      ),
      uuid: Crypto.uuid(),
    });
  }

  return (
    <div className='cloud-layer'>
      {clouds.map((cloud) => {
        return <div key={cloud.uuid}>{cloud.html}</div>;
      })}
    </div>
  );
}
