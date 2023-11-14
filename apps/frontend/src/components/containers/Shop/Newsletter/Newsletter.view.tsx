import React from 'react';

import classes from './Newsletter.module.scss';

const NewsletterView = () => {
	return (
		<div className={classes['container']}>
			<h2 className={classes['container__title']}>Newsletter</h2>
			<p className={classes['container__text']}>Get timely update from your favorite products</p>
			<form className={classes['containerForm']}>
				<input className={classes['containerForm__input']} placeholder="Your Email" />
				<button className={classes['containerForm__button']} type="submit">
					Add Email
				</button>
			</form>
		</div>
	);
};

export default React.memo(NewsletterView);
