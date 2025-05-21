import React, { useState, useEffect } from 'react';

interface BackgroundProps {
  type: 'image' | 'video';
  src: string | string[];
  transitionInterval?: number;
}

const Background: React.FC<BackgroundProps> = ({ type, src, transitionInterval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (type === 'image' && Array.isArray(src) && src.length > 1) {
      const intervalId = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex(prevIndex => (prevIndex + 1) % src.length);
          setIsTransitioning(false);
        }, 1000); // 1 second for transition effect
      }, transitionInterval);

      return () => clearInterval(intervalId);
    }
  }, [type, src, transitionInterval]);

  if (type === 'image') {
    if (Array.isArray(src)) {
      return (
        <>
          {src.map((image, index) => (
            <div
              key={image}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1,
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }}
            />
          ))}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: -1,
              opacity: isTransitioning ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        </>
      );
    } else {
      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }}
        />
      );
    }
  } else if (type === 'video') {
    return (
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={src as string} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return null;
};

export default Background;
