import toast from 'svelte-french-toast';

export function validateUrl(url: string): boolean {
	const trimmedValue = url.trim();
	const message = 'Please enter a valid URL format' as string;

	if (!trimmedValue) {
		toast.error(message, { position: 'bottom-center' });
		return false;
	}

	// const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
	// if (!urlPattern.test(trimmedValue)) {
	// 	toast.error(message, {
	// 		position: 'bottom-center'
	// 	});
	// 	return false;
	// }

	return true;
}
