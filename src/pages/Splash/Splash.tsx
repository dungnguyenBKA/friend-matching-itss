import React from 'react';
import lottie from 'lottie-web';
import { LOADING_ANIM } from '../../assets/path';
import Column from '../../components/Column/Column';

const Splash: React.FC = () => {
  const loadDiv = React.useRef(null);
  React.useEffect(() => {
    if (loadDiv.current) {
      lottie.loadAnimation({
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: LOADING_ANIM,
        container: loadDiv.current,
      });
    }
    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <Column
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: 100,
        }}
        ref={loadDiv}
      />
    </Column>
  );
};

export default Splash;
