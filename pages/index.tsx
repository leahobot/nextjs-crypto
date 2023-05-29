import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import CrypoList from "../components/CrypoList";

export type Coin = {
	id: string;
	name: string;
	symbol: string;
	price: number;
	icon: string;
	priceChange1d: number;
	marketCap: number;
};

type Coins = {
	coins: Coin[];
};

export default function Home({ coins }: { coins: Coins }) {
	return (
		<div>
			<Head>
				<title>NextJs Typescript</title>
				<meta
					name="description"
					content="A nextjs typescript projeect"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<main>
				<Layout>
					<Hero />
					<CrypoList coins={coins.coins} />
				</Layout>
			</main>
		</div>
	);
}

export const getStaticProps = async () => {
	const response = await fetch(
		"https://api.coinstats.app/public/v1/coins?skip=0&limit=10",
	);

	const data = await response.json();
	return {
		props: {
			coins: data,
		},
	};
};
