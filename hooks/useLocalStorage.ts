import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(
	key: string,
	initialValue?: T,
	changeCallback?: (val: T) => void
): [T, (val: T) => void] {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			if (typeof window === 'undefined' || !window.localStorage) {
				return initialValue;
			}

			// Get from local storage by key
			const item = localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: T) => {
		try {
			// Save state
			setStoredValue(value);
			// Save to local storage
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const cb = (event: StorageEvent) => {
			if (event.storageArea === localStorage && event.key === key) {
				changeCallback && changeCallback(JSON.parse(event.newValue!));
			}
		};

		window.addEventListener('storage', cb);

		return () => window.removeEventListener('storage', cb);
	}, [typeof window]);

	return [storedValue, setValue];
}
