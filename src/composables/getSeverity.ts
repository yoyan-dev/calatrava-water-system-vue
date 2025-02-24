export function getSeverity(billStatus: string) {
	if (billStatus === 'pending') {
		return 'warn';
	} else if (billStatus === 'paid') {
		return 'success';
	} else if (billStatus === 'unpaid') {
		return 'danger';
	} else {
		return 'error';
	}
}
