import React from "react";
import Layout from "../components/Layout";
import { Coin } from ".";
import { checkPrice, formatNumbers } from "../components/CrypoList";
import Image from "next/image";

const CoinDetails = ({ coin }: any) => {
	const {
		id,
		icon,
		name,
		symbol,
		price,
		priceChange1d,
		priceChange1h,
		priceChange1w,
		marketCap,
		totalSupply,
		websiteUrl,
		rank,
	} = coin.coin;

	return (
		<Layout>
			<section style={{ backgroundColor: "#eee" }}>
				<div className="container">
					<h1>Coin Details</h1>

					<div className="--flex-start --column-reverse">
						<div className="--card --card-blue --mr">
							<h4 className="--color-danger">~ {name} </h4>
							<h4 className="">
								~ Price: {formatNumbers(price.toFixed(2))}
							</h4>
							<h4 className="">~ Rank: {rank}</h4>
							<ul className="coin-details">
								<li>
									<span>Change in 1Hr :</span>
									<span className={checkPrice(priceChange1h)}>
										{priceChange1h}
									</span>
								</li>
								<li>
									<span>Change in 24Hr :</span>
									<span className={checkPrice(priceChange1d)}>
										{priceChange1d}
									</span>
								</li>
								<li>
									<span>Change in 1Week :</span>
									<span className={checkPrice(priceChange1w)}>
										{priceChange1w}
									</span>
								</li>
								<li>
									<span>Market Cap: </span>
									<span>
										{formatNumbers(marketCap.toFixed(2))}
									</span>
								</li>
								<li>
									<span>Total Supply: </span>
									<span>{formatNumbers(totalSupply)}</span>
								</li>
								<li>
									<span>Website: </span>
									<span>
										<a
											href={websiteUrl}
											target="_blank"
											className="--color-primary"
											rel="noreferrer">
											{websiteUrl
												.replace("http://www.", "")
												.replace("https://www.", "")
												.replace("https://", "")
												.replace("/", "")}
										</a>
									</span>
								</li>
							</ul>
						</div>

						<div className="--card --bg-primary">
							<div className="--flex-start --align-center">
								<Image
									src={icon}
									alt={name}
									width="50"
									height="50"
								/>
								&nbsp; &nbsp;
								<span>
									<p className="--text-light">{symbol}</p>
									<h2 className="--text-light">{name}</h2>
								</span>
							</div>
						</div>
					</div>
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
