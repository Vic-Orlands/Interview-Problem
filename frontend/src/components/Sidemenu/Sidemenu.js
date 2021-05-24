import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdMail } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

import classes from './Sidemenu.module.css';

const Sidemenu = () => {
	const signOut = () => {
		window.localStorage.removeItem('knack_login');
		window.location.reload();
	};

	return (
		<div className={classes['sidemenu-container']}>
			<h1>
				<b>Knacklab.co</b>
			</h1>

			<hr />

			<ul className={classes['sidemenu-list']}>
				<NavLink exact to="/home" className={classes['active']}>
					<MdMail className={classes['listIcon']} />
					<li>Home</li>
				</NavLink>
			</ul>

			<footer>
				<ul>
					<FaSignOutAlt className={`${classes.listIcon} ${classes.footIcon}`} />
					<li onClick={signOut}>Sign out</li>
				</ul>
			</footer>
		</div>
	);
};
export default Sidemenu;
