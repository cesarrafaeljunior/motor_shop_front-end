import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Link } from "./components/Link";

const globalTheme = {
  colors: {
    brand: {
      1: "#4529E6",
      2: "#5126EA",
      3: "#B0A6F0",
      4: "#EDEAFD",
    },
    grey: {
      whiteFixed: "#FFFFFF",
      0: "#0B0D0D",
      1: "#212529",
      2: "#495057",
      3: "#868E96",
      4: "#ADB5BD",
      5: "#CED4DA",
      6: "#DEE2E6",
      7: "#E9ECEF",
      8: "#F1F3F5",
      9: "#F8F9FA",
      10: "#FDFDFD",
    },
    feedback: {
      alert1: "#CD2B31",
      alert2: "#FDD8D8",
      alert3: "#FFE5E5",
      sucess1: "#18794E",
      sucess2: "#CCEBD7",
      sucess3: "#DDF3E4",
    },
    random_profile: {
      1: "#E34D8C",
      2: "#C04277",
      3: "#7D2A4D",
      4: "#7000FF",
      5: "#6200E3",
      6: "#36007D",
      7: "#349974",
      8: "#2A7D5F",
      9: "#153D2E",
      10: "#6100FF",
      11: "#5700E3",
      12: "#30007D",
    },
  },
  fonts: {
    body: {
      fontFamilys: "Inter, sans-serif",
      fontSizes: {
        1: "16px",
        2: "14x",
      },
      fontWeights: {
        400: "400",
        600: "600",
      },
    },
    heading: {
      fontFamilys: "Lexend",
      fontSizes: {
        1: "44px",
        2: "36px",
        3: "32px",
        4: "28px",
        5: "24px",
        6: "20px",
        7: "16px",
      },
      fontWeights: {
        400: "400",
        600: "600",
        700: "700",
      },
    },
    button: {
      fontFamilys: "Inter",
      fontWeights: "600",
      fontSizes: {
        big: "16px",
        medium: "14px",
      },
      imput: {
        fontFamilys: "Inter",
        fontWeights: "600",
        fontSizes: {
          big: "16px",
          medium: "14px",
        },
      },
    },
  },
  buttons: {
    radius: "4px",
    size: {
      big: {
        height: "48px",
        width: "146px",
        border: "1.5px",
      },
      medium: {
        height: "38px",
        width: "119px",
        border: "1.5px",
      },
    },
  },
  components: {
    Button,
    Link,
  },
};

export const theme = extendTheme(globalTheme);
