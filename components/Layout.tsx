import Footer from "./Footer";
import React from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
