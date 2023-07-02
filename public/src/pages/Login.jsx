import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { toastOptions } from '../utils/Utils';

function Login() {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		username: '',
		password: '',
	});

	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/');
		}
	}, [navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (handleValidation()) {
			const { username, password } = values;
			const { data } = await axios.post(loginRoute, {
				username,
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
		const { username, password } = values;

		if (password === '') {
			toast.error('Password is required', toastOptions);
			return false;
		} else if (username.length === '') {
			toast.error('Username is required', toastOptions);
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
						min='3'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						className='border rounded p-2 mt-2'
						onChange={(e) => handleChange(e)}
					/>
					<button
						type='submit'
						className='bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg py-2 mt-2 font-semibold'
					>
						Login
					</button>
					<span className='mt-4 text-gray-500'>
						Don't have an account?
						<Link
							to='/register'
							className='text-indigo-500 hover:text-indigo-600 font-bold ml-1'
						>
							Register
						</Link>
					</span>
				</form>
			</div>

			<ToastContainer />
		</>
	);
}

export default Login;
