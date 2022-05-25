import React from "react";
import {
  FiMail,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiRss,
} from "react-icons/fi";
import IconButton from "./icon-button";

const Footer = () => {
  return (
    <footer id="contact" className="relative py-24 md:py-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="none"
          stroke="var(--slate4)"
          strokeWidth="1px"
          strokeDasharray="2, 2"
          strokeLinejoin="round"
          d="M0,224L0,192L68.6,192L68.6,64L137.1,64L137.1,64L205.7,64L205.7,288L274.3,288L274.3,128L342.9,128L342.9,32L411.4,32L411.4,128L480,128L480,96L548.6,96L548.6,128L617.1,128L617.1,320L685.7,320L685.7,288L754.3,288L754.3,32L822.9,32L822.9,192L891.4,192L891.4,224L960,224L960,288L1028.6,288L1028.6,160L1097.1,160L1097.1,32L1165.7,32L1165.7,224L1234.3,224L1234.3,0L1302.9,0L1302.9,160L1371.4,160L1371.4,64L1440,64L1440,320L1371.4,320L1371.4,320L1302.9,320L1302.9,320L1234.3,320L1234.3,320L1165.7,320L1165.7,320L1097.1,320L1097.1,320L1028.6,320L1028.6,320L960,320L960,320L891.4,320L891.4,320L822.9,320L822.9,320L754.3,320L754.3,320L685.7,320L685.7,320L617.1,320L617.1,320L548.6,320L548.6,320L480,320L480,320L411.4,320L411.4,320L342.9,320L342.9,320L274.3,320L274.3,320L205.7,320L205.7,320L137.1,320L137.1,320L68.6,320L68.6,320L0,320L0,320Z"
        ></path>
      </svg>
      <div className="container mx-auto absolute top-1/2 md:top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1>
          <span className="text-1xl font-bold uppercase text-radix-slate11">
            Hire me for a project
          </span>
        </h1>
        <div className="md:flex justify-between">
          <div>
            <h2 className="text-6xl font-bold uppercase italic">Say hello</h2>
            <span
              className="text-sm text-radix-slate10 font-space-mono"
              aria-hidden
            >
              &copy; {new Date().getFullYear()} Sanna Jammeh
            </span>
          </div>
          <div className="mt-8 md:mt-0 justify-center md:justify-start flex gap-4 text-radix-slate11">
            <IconButton
              href="mailto:hello@sannajammeh.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FiMail size="2rem" className="inline-block" />
              </span>
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/sanna-jammeh-39b50016b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FiLinkedin size="2rem" className="inline-block" />
              </span>
            </IconButton>
            <IconButton
              href="https://www.instagram.com/sanjammeh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FiInstagram size="2rem" className="inline-block" />
              </span>
            </IconButton>
            <IconButton
              href="https://twitter.com/SannaJammeh5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FiTwitter size="2rem" className="inline-block" />
              </span>
            </IconButton>
            <IconButton
              href="https://github.com/sannajammeh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <FiGithub size="2rem" className="inline-block" />
              </span>
            </IconButton>
            <IconButton href="/rss/feed.xml" target="_blank">
              <span>
                <FiRss size="2rem" className="inline-block" />
              </span>
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
