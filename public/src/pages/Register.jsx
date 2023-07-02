import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import { toastOptions } from '../utils/Utils';

function Register() {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirm_password: '',
	});

	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/');
		}
	}, [navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (handleValidation()) {
			const { username, email, password } = values;
			const { data } = await axios.post(registerRoute, {
				username,
				email,
				password,
			});

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}

			if (data.status === true) {
				localStorage.setItem('chat-app-user', JSON.stringify(data.user));
				navigate('/');
			}
		}
	};

	const handleValidation = () => {
		const { username, email, password, confirm_password } = values;

		if (password !== confirm_password) {
			toast.error('Password is not confirmed', toastOptions);
			return false;
		} else if (username.length < 4) {
			toast.error(
				'Username must be greater than or equal to 4 characters',
				toastOptions
			);
			return false;
		} else if (password.length < 8) {
			toast.error(
				'Password must be greater than or equal to 8 characters',
				toastOptions
			);
			return false;
		} else if (email === '') {
			toast.error('Email is required', toastOptions);
			return false;
		}

		return true;
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	return (
		<>
			<div className='flex flex-col justify-center h-screen w-screen items-center bg-gray-100'>
				<form
					onSubmit={(event) => handleSubmit(event)}
					className='flex flex-col gap-2 border rounded-lg bg-white p-6 shadow-lg w-96'
				>
					<div className='flex items-center justify-center mb-6'>
						<h1 className='font-bold text-center text-4xl'>Chat App</h1>
					</div>
					<input
						type='text'
						placeholder='Username'
						name='username'
						className='border rounded p-2 mt-2'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='email'
						placeholder='Email'
						name='email'
						className='border rounded p-2 mt-2'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						className='border rounded p-2 mt-2'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='password'
						placeholder='Confirm Password'
						name='confirm_password'
						className='border rounded p-2 mt-2'
						onChange={(e) => handleChange(e)}
					/>
					<button
						type='submit'
						className='bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg py-2 mt-2 font-semibold'
					>
						Create User
					</button>
					<span className='mt-4 text-gray-500'>
						Already have an account?
						<Link
							to='/login'
							className='text-indigo-500 hover:text-indigo-600 font-bold'
						>
							Login
						</Link>
					</span>
				</form>
			</div>

			<ToastContainer />
		</>
	);
}

export default Register;
