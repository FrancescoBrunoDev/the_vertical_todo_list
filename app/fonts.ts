import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

export const body = Source_Sans_3({ subsets: ["latin"] });

export const display = localFont({
  src: [
    {
      path: "../fonts/PPRaderBold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/PPRaderBoldItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/PPRaderItalic.otf",
      weight: "630",
      style: "italic",
    },
    {
      path: "../fonts/PPRaderRegular.otf",
      weight: "630",
      style: "normal",
    },
    {
      path: "../fonts/PPRaderThin.otf",
      weight: "260",
      style: "normal",
    },
    {
      path: "../fonts/PPRaderThinItalic.otf",
      weight: "260",
      style: "italic",
    },
  ],
});
