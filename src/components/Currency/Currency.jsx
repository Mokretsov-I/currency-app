import React, { useCallback, useEffect, useState } from "react";

import { useHttp } from "../../hooks/useHttp";
import { CurrencyHeader } from "../CurrencyHeader";
import { CurrencySelector } from "../CurrencySelector";

import "./Currency.css";

export const Currency = () => {
	const access_key = process.env.REACT_APP_ACCESS_KEY;
	const { request, loading } = useHttp();
	const [cursData, setCurData] = useState(null);
	const [simbolsData, setSimbolsData] = useState(null);
	const [currentVal, setCurrentVal] = useState({ flag: null, name: null });

	const fetching = useCallback(() => {
		try {
			const cursData = request(`http://data.fixer.io/api/latest?access_key=${access_key}`);
			cursData.then((data) => setCurData(data));

			const symbolsData = request(`http://data.fixer.io/api/symbols?access_key=${access_key}`);
			symbolsData.then((data) => setSimbolsData(data));
		} catch (e) {}
	}, [request, access_key]);

	const chooseCurrency = (e) => {
		const target = e.target;
		setCurrentVal((prevState) => ({
			...prevState,
			name: target.querySelector("option:checked").innerText,
			flag: target.value,
		}));
	};

	useEffect(() => {
		fetching();

		window.addEventListener("change", chooseCurrency);

		return () => {
			window.removeEventListener("change", chooseCurrency);
		};
	}, [fetching]);

	if (loading || !cursData || !simbolsData) return <>Loading...</>;

	return (
		<div className="currency__container">
			{currentVal.flag && (
				<CurrencyHeader
					currentVal={{
						...currentVal,
						rate: `${cursData.rates[currentVal.flag]} ${currentVal.flag}`,
						base: cursData.base,
					}}
				/>
			)}
			<CurrencySelector rates={cursData.rates} symbols={simbolsData.symbols} />
			<p className="currency__refresh">
				Обновлено: {cursData.date} {new Date(cursData.timestamp * 1000).toLocaleTimeString()}
			</p>
		</div>
	);
};
