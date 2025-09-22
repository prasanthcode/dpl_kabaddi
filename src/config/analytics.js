import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(`${process.env.REACT_APP_MEASUREMENT_ID}`);
};
