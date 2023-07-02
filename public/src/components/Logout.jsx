import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

export default function Logout() {
	const navigate = useNavigate();
	const handleClick = async () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<button className='mr-2' onClick={handleClick}>
			<BiPowerOff className='h-6 w-6' />
		</button>
	);
}
