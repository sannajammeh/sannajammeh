import React from "react";

const Performance = ({ score = 100 }) => {
  const maxOut = 301.59289474462014;

  return (
    <>
      <svg
        className="score_score__O0F77 w-[100px] md:w-[128px]"
        fill="none"
        strokeLinejoin="round"
        height="128"
        width="128"
        viewBox="0 0 128 128"
      >
        <g shape-rendering="geometricPrecision">
          <circle cx="64" cy="64" fill="#0CCE6B" r="64"></circle>
          <circle
            cx="64"
            cy="64"
            fill="none"
            r="48"
            stroke="rgba(0,0,0,.1)"
            stroke-width="10"
          ></circle>
          <circle
            className="origin-center rotate-[-80deg]"
            cx="64"
            cy="64"
            fill="none"
            r="48"
            stroke="white"
            stroke-dasharray="301.59289474462014"
            stroke-dashoffset={maxOut - score * 3 + 10}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="10"
          ></circle>
          <text
            fill="white"
            font-size="32"
            font-weight="800"
            text-anchor="middle"
            x="64"
            y="75"
          >
            {score}
          </text>
        </g>
      </svg>
    </>
  );
};

export default Performance;
