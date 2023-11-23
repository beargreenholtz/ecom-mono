import type { TClasses } from '../types/tools/component';

/**
 * The function returns the mapped class names list
 * @param classes The object of classes mapping
 * @param firstClass The first class to be used
 * @param secondClass The class class to be used
 * @param args The list of classes to get mapped
 * @returns The result string of the concatenation class names
 */

export const concatClasses = <T extends TClasses>(
	classes: T,
	firstClass: keyof T | null,
	secondClass: keyof T | null,
	...args: ReadonlyArray<keyof T | null>
) => {
	if (Object.keys(classes).length === 0) {
		return '';
	}

	const allClasses = [firstClass, secondClass, ...args];

	return allClasses.reduce<string>((finalClasses, className, index) => {
		if (!className || !classes[className]) {
			return finalClasses;
		}

		if (index === 0) {
			return classes[className]!;
		}

		return `${finalClasses} ${classes[className]}`;
	}, '');
};

/**
 * The function returns concatenation of classes
 * @param firstClass The first class to be used
 * @param secondClass The class class to be used
 * @param args The list of classes to concat
 * @returns The result string of the concatenation class names
 */
export const concatDiverseClasses = (...args: ReadonlyArray<string | undefined>) => {
	return args.join(' ');
};

export const classNames = (
	classes: { [key: string]: string },
	...args: (string | { [key: string]: unknown })[]
): string => {
	const classArray: string[] = [];

	args.forEach((arg) => {
		if (typeof arg === 'string' && classes[arg]) {
			classArray.push(classes[arg]!);
		} else if (typeof arg === 'object') {
			for (const key in arg) {
				// eslint-disable-next-line no-prototype-builtins
				if (arg.hasOwnProperty(key) && arg[key] && classes[key]) {
					classArray.push(classes[key]!);
				}
			}
		}
	});

	return classArray.join(' ');
};
