import Figma from "components/logo/figma";
import Firebase from "components/logo/firebase";
import JSLogo from "components/logo/javascript";
import NextJSLogo from "components/logo/nextjs";
import Node from "components/logo/node";
import Supabase from "components/logo/supabase";
import TSLogo from "components/logo/typescript";
import Vercel from "components/logo/vercel";
import React from "react";
import { SiReact, SiNestjs } from "react-icons/si";

const SkillSlider = () => {
  return (
    <div className="main">
      <span className="cover"></span>
      <div className="track slide">
        <div>
          <Vercel />
        </div>
        <div>
          <NextJSLogo />
        </div>
        <div>
          <SiReact fontSize="60px" />
        </div>
        <div>
          <SiNestjs fontSize="60px" />
        </div>
        <div>
          <Node />
        </div>
        <div>
          <Supabase />
        </div>
        <div>
          <Firebase />
        </div>
        <div>
          <Figma />
        </div>
        <div>
          <TSLogo />
        </div>
        <div>
          <JSLogo />
        </div>
        <div>
          <Vercel />
        </div>
        <div>
          <NextJSLogo />
        </div>
        <div>
          <SiReact fontSize="60px" />
        </div>
        <div>
          <SiNestjs fontSize="60px" />
        </div>
        <div>
          <Node />
        </div>
        <div>
          <Supabase />
        </div>
        <div>
          <Figma />
        </div>
        <div>
          <TSLogo />
        </div>
        <div>
          <JSLogo />
        </div>
      </div>
      <style jsx>
        {`
          .main {
            position: relative;
            z-index: 200;
            display: flex;
            overflow: hidden;
            width: 100%;
            height: 60px;
            justify-content: flex-start;
            align-items: center;
            filter: grayscale();
            opacity: 0.75;
          }

          .track {
            display: flex;
            align-items: center;
          }
          .track > div {
            margin-right: 8vw;
          }
          .slide {
            position: absolute;
            white-space: nowrap;
            will-change: transform;
            animation: marquee-horizontal 20s linear infinite;
            /* manipulate the speed of the marquee by changing "40s" line above*/
          }
          .reverse {
            animation-direction: reverse;
          }
          .cover {
            position: absolute;
            left: 0%;
            top: 0%;
            right: 0%;
            bottom: 0%;
            z-index: 10;
            background-image: linear-gradient(
                90deg,
                hsla(0, 0%, 100%, 0) 80%,
                var(--slate1)
              ),
              linear-gradient(90deg, var(--slate1), hsla(0, 0%, 100%, 0) 20%);
          }

          @keyframes marquee-horizontal {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SkillSlider;
