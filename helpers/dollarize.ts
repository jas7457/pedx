export default function dollarize(num: string): string {
	return `$${parseFloat(num).toFixed(2)}`;
}
