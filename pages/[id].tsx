import React from "react";
import Layout from "../components/Layout";
import { Coin } from ".";

const CoinDetails = ({ coin }: any) => {
	return (
		<Layout>
			<section style={{ backgroundColor: "#eee" }}>
				<div className="container">
					<h1>Coin Details</h1>
				</div>
			</section>
		</Layout>
	);
};

export const getStaticPaths = async () => {
	const res = await fetch(
		"https://api.coinstats.app/public/v1/coins?skip=0&limit=50",
	);
	const data = await res.json();
	const paths = data.coins.map((coin: any) => {
		return {
			params: {
				id: coin.id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context: any) => {
	const id = context.params.id;
	const res = await fetch("https://api.coinstats.app/public/v1/coins/" + id);
	const data = await res.json();

	return {
		props: {
			coin: data,
		},
	};
};

export default CoinDetails;
