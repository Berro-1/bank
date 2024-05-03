import React from "react";
export default function Home() {
  return (
    <div className="w-full flex flex-wrap justify-around items-center bg-pink-300 py-12">
      <div className="text-center p-4">
        <div className="w-40 h-40 flex items-center justify-center rounded bg-white mb-4">
          <div className=""></div>
        </div>
      </div>
      <div className="text-center p-4">
        <div className="w-40 h-40 flex items-center justify-center rounded bg-white mb-4">
          <img src="/path-to-your-icon/business-icon.png" alt="Business Development"/>
        </div>
      </div>
      <div className="text-center p-4">
        <div className="w-40 h-40 flex items-center justify-center rounded bg-white mb-4">
          <img src="/path-to-your-icon/capacity-icon.png" alt="Capacity Building & Organizational Development"/>
        </div>
      </div>
      <div className="text-center p-4">
        <div className="w-40 h-40 flex items-center justify-center rounded bg-white mb-4">
          <img src="/path-to-your-icon/social-icon.png" alt="Social & Communication Skills"/>
        </div>
      </div>
    </div>
  );
}
