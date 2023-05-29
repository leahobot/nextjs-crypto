import React from "react";
import styles from "../styles/CryptoList.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Coin = {
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

export const formatNumbers = (x: number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const checkPrice = (p: number) => {
	const priceChange = Math.sign(p);
	if (priceChange === -1) {
		return "red";
	}
	return "green";
};

const CrypoList = ({ coins }: Coins) => {
	const router = useRouter();

	const handleDetails = (name: string) => {
		router.push(`/${name}`);
	};

	return (
		<section className="coin-list">
			<div className="container">
				<div className={styles.table}>
					<table>
						<thead>
							<tr>
								<th>S/No.</th>
								<th>Coin</th>
								<th>Price</th>
								<th>Change 24h</th>
								<th>Market Cap</th>
							</tr>
						</thead>
						<tbody>
							{coins &&
								coins.map((coin, i) => {
									const {
										id,
										name,
										icon,
										price,
										priceChange1d,
										marketCap,
										symbol,
									} = coin;
									return (
										<tr
											key={id}
											onClick={() => handleDetails(name)}>
											<td>{i + 1}</td>
											<td className="--flex-start">
												<Image
													src={icon}
													alt={name}
													width={20}
													height={20}
												/>
												&nbsp;
												{symbol}
											</td>
											<td>
												$
												{formatNumbers(
													parseFloat(
														price.toFixed(2),
													),
												)}
											</td>
											<td
												className={checkPrice(
													priceChange1d,
												)}>
												{priceChange1d}
											</td>
											<td>
												$
												{formatNumbers(
													parseFloat(
														marketCap.toFixed(2),
													),
												)}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default CrypoList;
