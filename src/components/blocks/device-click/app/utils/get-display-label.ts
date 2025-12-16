export function getDisplayLabel(status: string): string {
	let result = '';
	switch (status) {
		case 'open':
			result = 'Open';
			break;
		case 'closed':
			result = 'Closed';
			break;
		case 'no_protection':
			result = 'No Protection';
			break;
		case 'iab':
			result = 'Bypass (IAB Blocked)';
			break;
		case 'not_defined':
			result = 'Not Defined';
			break;
		default:
			result = 'Select';
	}
	return result;
}
