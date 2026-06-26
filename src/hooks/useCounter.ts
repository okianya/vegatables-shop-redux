import { useState } from 'react';
import { useCallback } from 'react';

export const useCounter = (initialValue = 1, min = 1) => {
	const [count, setCount] = useState(initialValue);

	const increment = () => setCount((num) => num + 1);

	const decrement = () => setCount((num) => Math.max(min, num - 1));

	const reset = useCallback(() => {
		setCount(initialValue);
	}, [initialValue]);

	return { count, increment, decrement, reset };
};
