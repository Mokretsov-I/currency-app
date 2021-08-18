import { useCallback, useState } from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);

	const request = useCallback(async (url) => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}

			setLoading(false);

			return data;
		} catch (e) {
			setLoading(false);
			throw e;
		}
	}, []);

	return { loading, request };
};
