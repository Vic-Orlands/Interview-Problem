import React, { useState, useReducer } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import classes from './Login.module.css';
import { useHistory } from 'react-router-dom';

import loaderGif from '../../assets/loading.gif';
import axios from 'axios';

// import { withCookies, Cookies } from 'react-cookie';
const Login = () => {
	let history = useHistory();
	const [ show, setShow ] = useState(false);
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState(false);

	const [ userLogin, setUserLogin ] = useReducer((state, nextState) => ({ ...state, ...nextState }), {
		username: '',
		password: ''
	});

	const onClickShow = () => {
		setShow(true);
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setUserLogin({ [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			let response = await axios.post('/user_api/login', userLogin);
			console.log({ response });
			if (response.data === 'success') {
				localStorage.setItem('knack_login', 'true');
				setIsLoggedIn(true);
				setIsSubmitting(false);
				history.push('/home');
			} else {
				setIsLoggedIn(false);
				setError(response.data);
				setIsSubmitting(false);
				setTimeout(() => {
					setError(false);
				}, 4000);
			}
		} catch (error) {
			setIsSubmitting(false);
			console.log({ error });
			setError('Network Error');

			setTimeout(() => {
				setError(false);
			}, 4000);
		}
	};

	return (
		<main className={classes['login-container']}>
			<div className={classes['center-container']}>
				<p>
					<b>Knacklab.co</b> <br /> Building a happier, engaged and <b> productive Workforce</b>
				</p>

				<form>
					<label htmlFor="username">
						Username
						<input
							type="text"
							name="username"
							value={userLogin.username}
							onChange={handleChange}
							autoComplete="username"
						/>
					</label>

					<br />
					<br />

					<label htmlFor="password">Password</label>

					<label htmlFor="password" className={classes['innerPasswrd']}>
						{!show ? (
							<input
								type="password"
								name="password"
								value={userLogin.password}
								onChange={handleChange}
								autoComplete="current-password"
							/>
						) : (
							<input
								type="text"
								name="password"
								value={userLogin.password}
								onChange={handleChange}
								autoComplete="current-password"
							/>
						)}
						<span onClick={onClickShow}>Show</span>
					</label>

					{error ? <p className={classes['errorMsg']}>{error}</p> : ''}

					<br />
					<br />

					<div className={classes['btnLabel']} onClick={handleSubmit}>
						<button disabled={!userLogin.username || !userLogin.password}>Submit</button>
						{isSubmitting ? (
							<img src={loaderGif} alt="img" className={classes['loadingGif']} />
						) : (
							<IoIosArrowRoundForward id={classes['btnArrow']} />
						)}
					</div>
				</form>
			</div>
		</main>
	);
};

export default Login;
