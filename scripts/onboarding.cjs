const chalk = require('chalk');
const figlet = require('figlet');

figlet('Ecom Now', (err, figletText) => {
	if (err) {
		return;
	}

	console.log(chalk.bold(figletText));

	console.log(chalk.bold.blue('Welcome to Ecom Site'));

	console.log('🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨\n');

	console.log(chalk.bold('Please follow these rules:'));

	console.log(
		chalk.bold.blue('- 📦️ Use "git cmt" instead of "git commit" in order to commit your changes'),
	);
	console.log(chalk.bold.blue('- 🛂 Follow the code conventions (our linters will enforce you..)'));
	console.log(chalk.bold.blue('- 📝 Document/Modify your new feature/fix in the README.md file'));
});
