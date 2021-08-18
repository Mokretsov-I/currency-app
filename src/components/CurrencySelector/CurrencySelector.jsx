import React from "react";
import "./CurrencySelector.css";

export const CurrencySelector = ({ rates, symbols }) => {
	const symbolsList = Object.keys(rates)?.map((rate) => (
		<option className="currency__option" value={rate} key={rate}>
			{symbols[rate]}
		</option>
	));

	return (
		<select className="currency__selector">
			<option className="currency__option" value="" disable="true" checked hidden>
				Choose currency
			</option>
			{symbolsList}
		</select>
	);
};
