export function formatToPeso(amount: number) {
	return `₱${amount.toLocaleString('en-PH', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}
