import React from 'react';
import classes from './NotFound.module.scss';

const NotFoundView = () => {
	return (
		<section className={classes.page_404}>
			<div className={classes.container}>
				<div className={classes.row}>
					<div className="col-sm-12 ">
						<div className={`col-sm-10 ${classes.col_sm_offset_1} text-center`}>
							<div className={classes.four_zero_four_bg}>
								<h1 className="text-center">404</h1>
							</div>

							<div className={classes.contant_box_404}>
								<h3 className={classes.h2}>Look like youre lost</h3>

								<p>the page you are looking for not available!</p>

								<a href="/auth/login" className={classes.link_404}>
									Go to Home
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

NotFoundView.displayName = 'NotFoundView';
NotFoundView.defaultProps = {};

export default React.memo(NotFoundView);
