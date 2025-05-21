import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Background from '../../components/Background';
import backgroundImage1 from '../../assets/img/photos/img1.jpg';
import backgroundImage2 from '../../assets/img/photos/img2.jpg';
import backgroundImage3 from '../../assets/img/photos/img3.jpg';
import avatar from '../../assets/img/spartanlogo.png';

import ResetPassword from '../../components/auth/ResetPassword';

const ResetPasswordPage: React.FC = () => {
  const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3];

  const randomizedBackgroundImages = useMemo(() => {
    return [...backgroundImages].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Reset Password" />
      <div className="reset-container">
        <div className="background-section">
          <Background type="image" src={randomizedBackgroundImages} transitionInterval={10000} />
        </div>
        <ResetPassword avatar={avatar} />
      </div>

      <style jsx>{`
        .reset-container {
          display: flex;
          height: 100vh;
        }

        .background-section {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </React.Fragment>
  );
};

export default ResetPasswordPage;
