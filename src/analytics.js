import ReactGA from "react-ga4";

const measurementId = process.env.REACT_APP_MEASUREMENT_ID; // Replace with your GA4 Measurement ID

export const initGA = () => {
  ReactGA.initialize(measurementId);
};
