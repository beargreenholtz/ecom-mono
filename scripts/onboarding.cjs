const chalk = require('chalk');
const figlet = require('figlet');

figlet('Ecom Now', (err, figletText) => {
	if (err) {
		return;
	}

	(chalk.bold(figletText));

	(chalk.bold.blue('Welcome to Ecom Site'));

	('🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨\n');

	(chalk.bold('Please follow these rules:'));

	(
		chalk.bold.blue('- 📦️ Use "git cmt" instead of "git commit" in order to commit your changes'),
	);
	(chalk.bold.blue('- 🛂 Follow the code conventions (our linters will enforce you..)'));
	(chalk.bold.blue('- 📝 Document/Modify your new feature/fix in the README.md file'));
});
