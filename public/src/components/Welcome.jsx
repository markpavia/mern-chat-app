import React from 'react';

export default function Welcome({ user }) {
	return (
		<div className='flex flex-col justify-center items-center w-full'>
			<h1 className='font-bold text-4xl'>
				Welcome <span>{user.username}</span>!
			</h1>
			<h3 className='text-xl mt-4'>Select a chat to start messaging</h3>
		</div>
	);
}
