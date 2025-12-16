const mapToApiValue = (uiValue: string, type: 'image' | 'explicit' | 'text'): string => {
	const imageMap: Record<string, string> = {
		'All People': 'all_people',
		'Women - Strict': 'women_strict',
		'Women - Moderate': 'women_moderate',
		Off: 'off'
	};

	const explicitMap: Record<string, string> = {
		'Very Strict': 'very_strict',
		Strict: 'strict',
		Moderate: 'moderate',
		Lenient: 'lenient'
	};

	const textMap: Record<string, string> = {
		Strict: 'strict',
		Moderate: 'moderate',
		Lenient: 'lenient',
		Off: 'off'
	};

	switch (type) {
		case 'image':
			return imageMap[uiValue] || 'off';
		case 'explicit':
			return explicitMap[uiValue] || 'strict';
		case 'text':
			return textMap[uiValue] || 'off';
		default:
			return 'off';
	}
};

export default mapToApiValue;
