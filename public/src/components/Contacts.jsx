import React, { useState, useEffect } from 'react';

export default function Contacts({ contacts, user, changeChat }) {
	const [userUsername, setUserUsername] = useState(undefined);
	const [userImage, setUserImage] = useState(undefined);
	const [selectedContact, setSelectedContact] = useState(undefined);

	useEffect(() => {
		if (user) {
			setUserUsername(user.username);
			setUserImage(user.avatarImage);
		}
	}, [user]);

	const changeCurrentChat = (index, contact) => {
		setSelectedContact(index);
		changeChat(contact);

		contacts[index].newMessage = false;
	};

	return (
		<>
			{userUsername && userImage && (
				<div className='flex flex-col w-96 text-gray-700 bg-gray-100'>
					{/* app name */}
					<div className='flex items-center h-16 justify-center p-2 bg-gray-200'>
						<h1 className='font-bold text-3xl'>Chat App</h1>
					</div>

					{/* contact list */}
					<div className='flex-1 flex-col overflow-auto'>
						{contacts.map((contact, index) => {
							return (
								<div
									className='cursor-pointer rounded flex justify-between items-center py-2 px-4 hover:bg-gray-50'
									key={index}
									onClick={() => changeCurrentChat(index, contact)}
								>
									<div className='flex items-center'>
										<img
											src={`data:image/svg+xml;base64,${contact.avatarImage}`}
											alt='avatar'
											className='h-12 w-12'
										/>
										<span
											className={`${
												selectedContact === index
													? 'font-bold text-black'
													: 'font-semibold'
											} ml-2`}
										>
											{contact.username}
										</span>
									</div>
									{contact.newMessage && (
										<span className='bg-red-500 h-2 w-2 rounded-full'></span>
									)}
								</div>
							);
						})}
					</div>

					{/* user */}
					<div className='bg-gray-200'>
						<div className='flex justify-center items-center p-2'>
							<img
								src={`data:image/svg+xml;base64,${userImage}`}
								alt='avatar'
								className='h-14 w-14'
							/>

							<h3 className='font-semibold ml-2'>{userUsername}</h3>
						</div>
						<span className='flex justify-center text-xs text-gray-500 font-mono italic text-center'>
							{user._id}
						</span>
					</div>
				</div>
			)}
		</>
	);
}
