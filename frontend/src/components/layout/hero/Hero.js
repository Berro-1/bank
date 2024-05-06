import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router if needed
const Hero = () => {
  return (
    <div>
      <div className="full-page-image d-flex justify-content-start px-5 align-items-center text-white">
        <div className="text-start" id="coverImage">
          <h1>Watch Valorant Masters Madrid!</h1>
          <h4>Tune in from March 14th-24th as eight VALORANT teams from around the world face off!</h4>
          <div className="mt-5">
            <button className="p-3 gradient-button d-flex justify-content-center align-items-center gap-3">
              <div className="large-icon solid bg-black p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fs-3"
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="bevel"
                >
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
              </div>
              <Link to="/watch-now" className="font-weight-bold text-decoration-none text-white bold wsn">
                Watch Now
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
