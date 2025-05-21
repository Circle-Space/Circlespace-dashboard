import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import backgroundImage1 from '../../assets/img/photos/img1.jpg';
import backgroundImage2 from '../../assets/img/photos/img2.jpg';
import backgroundImage3 from '../../assets/img/photos/img3.jpg';
import avatar from '../../assets/img/spartanlogo.png';
import SignIn from '../../components/auth/SignIn';
import Background from '../../components/Background';

const SignInPage: React.FC = () => {
  const backgroundImages = [backgroundImage1, backgroundImage2, backgroundImage3];

  const randomizedBackgroundImages = useMemo(() => {
    return [...backgroundImages].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Sign In" />
      <Background type="image" src={randomizedBackgroundImages} transitionInterval={10000} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <div className="card-container">
          <Card className="glassy-card">
            <Card.Body>
              <div className="m-sm-4">
                <div className="mb-4 text-center">
                  <img src={avatar} alt="" className="img-fluid avatar-img" width={90} height={90} />
                </div>
                <SignIn />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          max-width: 400px;
          width: 100%;
          animation: floating 4s ease-in-out infinite;
        }

        .glassy-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.18) inset, 0 0 100px 0 rgba(255, 255, 255, 0.1);
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .glassy-card:hover {
          box-shadow: 0 15px 35px 0 rgba(31, 38, 135, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 0 120px 0 rgba(255, 255, 255, 0.2);
        }

        .glassy-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          transform: rotate(30deg);
          pointer-events: none;
        }

        .avatar-img {
          transition: transform 0.3s ease;
          border-radius: 10px;
        }

        .avatar-img:hover {
          transform: scale(1.05);
        }

        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default SignInPage;
