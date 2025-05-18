import React from "react";
const BitPurlLogo = ({ width = 160, height = 32 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    <defs>
      <linearGradient id="bitpurl-gradient" x1="0" y1="0" x2="120" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00D1FF" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <text
      x="0"
      y="24"
      fontFamily="Inter, Arial, sans-serif"
      fontWeight="bold"
      fontSize="28"
      fill="url(#bitpurl-gradient)"
      letterSpacing="2"
    >
      BIT PURL
    </text>
  </svg>
);

export default BitPurlLogo;