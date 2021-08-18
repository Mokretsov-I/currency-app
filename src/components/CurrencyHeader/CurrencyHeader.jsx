import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import "./CurrencyHeader.css";

export const CurrencyHeader = ({ currentVal }) => {
	const { request, loading } = useHttp();
	const [currentCountry, setCurrentCountry] = useState(null);

	const fetching = useCallback(async () => {
		try {
			const countrys = await request('http://country.io/currency.json');
			const selectedCountry = Object.keys(countrys).find((country) => countrys[country] === currentVal.flag);
			setCurrentCountry(selectedCountry.toLocaleLowerCase());
		} catch (e) {}
	}, [request, currentVal]);

	useEffect(() => {
		fetching();
	}, [fetching]);

	if (loading) return <>Loading...</>;

	return (
		<div className="currency__header">
			<div className="currency__flag">
				<img src={`https://flagcdn.com/256x192/${currentCountry}.png`} alt={currentCountry} />
			</div>
			<h1 className="currency__title">{currentVal.name}</h1>
			<p className="currency__body">
				1 {currentVal.base} = {currentVal.rate}
			</p>
		</div>
	);
};
