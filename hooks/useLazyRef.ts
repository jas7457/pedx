import {useRef, MutableRefObject} from 'react';

// using an object here instead of something like "null" or "undefined" or "Infinity"
// that way we truly know if we need to call the init function or not because the user of this can never pass something that === initialValue
const initialValue = {};

/**
 * Allows for lazy refs that only call the callback once
 * This also helps guarantee values between renders, unlike useMemo or useCallback which makes no such guarantee
 */
export default function useLazyRef<T>( init:() => T ):MutableRefObject<T> {
	const ref = useRef<T | typeof initialValue>( initialValue );

	if ( ref.current === initialValue ) {
		ref.current = init();
	}

	return ref as MutableRefObject<T>;
}
