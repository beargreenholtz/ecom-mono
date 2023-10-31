const months = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december',
];

export const dateForamt = (date: Date) => {
	return `${months[date.getMonth()]} ${date.getDate()} - ${date.getFullYear()}`;
};
