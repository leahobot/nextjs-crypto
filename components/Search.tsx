import React, { ChangeEvent } from "react";

type Props = {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const Search = ({ value, onChange }: Props) => {
	return (
		<div className="--form-control">
			<input
				type="text"
				placeholder="Search Coin..."
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default Search;
