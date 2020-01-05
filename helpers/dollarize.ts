export default function dollarize(num: string, compact = false): string {
	const all = parseFloat(num);
	if (compact && Math.floor(all) === all) {
		return `$${Math.floor(all)}`;
	}

	return `$${all.toFixed(2)}`;
}
