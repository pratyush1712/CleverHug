import ReactGA from "react-ga4";

export const pageView = (page: string, title: string) => {
	ReactGA.initialize(process.env.REACT_APP_GA_ID as string);
	ReactGA.send({ hitType: "pageview", page: page, title: title });
};
