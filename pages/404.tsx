import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const NotFound = () => {
	return (
		<Layout>
			<section>
				<div className="container">
					<div className="--center-all">
						<h1>Opps!!! It seems like you are lost.</h1>
						<p>This page does not exist. Return to home page</p>
						<br />
						<Link href={"/"}>
							<button className="--btn --btn-primary">
								Back to Home
							</button>
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default NotFound;
