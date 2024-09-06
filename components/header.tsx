"use client";
import { useEffect, useState } from "react";
import { PPR } from "@/app/fonts";
import Bowser from "bowser";

export const Header = () => {
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setIsFirefox(browser.getBrowserName() === "Firefox");
  }, []);

  return (
    <div className="fixed inset-x-0 -top-8 z-50 scale-75 bg-background pb-0 md:pb-8">
      <h2
        className={`${PPR.className} flex w-full justify-center p-2 text-center font-black`}
      >
        <div className="relative">
          <span
            className="absolute -left-8 top-[0.7rem] text-[1.5rem] uppercase text-primary"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              lineHeight: isFirefox ? "2.85rem" : "-2.85rem",
              letterSpacing: isFirefox ? "0.29rem" : "-0.18rem",
              transform: isFirefox ? "translate(-0.4rem, -0.4rem)" : "",
            }}
          >
            Vertical
          </span>
          <span className="text-8xl">The</span>
          <br />
          <span className="text-[3.6rem] uppercase leading-[1] text-primary">
            Todo
          </span>
          <br />
          <span className="text-7xl uppercase text-primary">List</span>
        </div>
      </h2>
    </div>
  );
};
