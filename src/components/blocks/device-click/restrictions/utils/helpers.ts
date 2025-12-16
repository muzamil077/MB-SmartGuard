import { DROPDOWN_STYLES } from './constants';

export const formatDropdownValue = (value: string): string => {
	const specialCases: Record<string, string> = {
		none: 'None',
		all: 'All',
		limit_adult_content: 'Limit Adult Content',
		whitelist: 'White List'
	};

	if (specialCases[value]) return specialCases[value];
	if (value.startsWith('TV-')) return value;
	if (['G', 'PG', 'PG-13', 'R', 'NC-17'].includes(value)) return value;
	if (value.endsWith('+')) return value;

	return value
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const getDropdownStyle = (
	value: string,
	options: { value: string; styles?: string }[]
): string => {
	const formattedValue = formatDropdownValue(value);
	const option = options.find((opt) => opt.value === formattedValue);
	return option?.styles || DROPDOWN_STYLES.success;
};

export const getOptionValue = (item: { option?: { value: string; styles?: string } }): string =>
	item.option?.value || '';
