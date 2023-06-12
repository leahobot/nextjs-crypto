import React, { useState, useEffect } from "react";
import styles from "../styles/CryptoList.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Search from "./Search";
import ReactPaginate from "react-paginate";

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
	const [search, setSearch] = useState("");
	const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

	const handleDetails = (name: string) => {
		router.push(`/${name}`);
	};

	//Search Functionality
	useEffect(() => {
		setFilteredCoins(
			coins.filter((c) =>
				c.name.toLowerCase().includes(search.toLocaleLowerCase()),
			),
		);
	}, [coins, search]);

	//Begin Pagination
	const itemsPerPage = 10;
	const [currentItems, setCurrentItems] = useState<Coin[]>([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(filteredCoins.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(filteredCoins.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, filteredCoins]);

	const handlePageClick = (e: { selected: number }) => {
		const newOffset = (e.selected * itemsPerPage) % filteredCoins.length;
		setItemOffset(newOffset);
	};
	//End Pagination

	return (
		<section className="coin-list">
			<div className="container">
				<div className={styles.table}>
					<Search
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
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
							{currentItems.map((coin, i) => {
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
										onClick={() => handleDetails(id)}>
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
												parseFloat(price.toFixed(2)),
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
				<ReactPaginate
					breakLabel="..."
					nextLabel="Next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="Prev"
					renderOnZeroPageCount={null}
					containerClassName="pagination"
					pageLinkClassName="page-num"
					previousLinkClassName="page-num"
					nextLinkClassName="page-num"
					activeLinkClassName="active"
				/>
			</div>
		</section>
	);
};

export default CrypoList;
