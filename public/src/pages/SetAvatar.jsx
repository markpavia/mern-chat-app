import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import { toastOptions } from '../utils/Utils';
import { Buffer } from 'buffer';

export default function SetAvatar() {
	const api = 'https://api.multiavatar.com/45678945';
	const navigate = useNavigate();
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);

	useEffect(() => {
		if (!localStorage.getItem('chat-app-user')) {
			navigate('/login');
		}
	}, [navigate]);

	const setProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error('Please select an avatar', toastOptions);
			return;
		}

		const user = await JSON.parse(localStorage.getItem('chat-app-user'));
		const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
			image: avatars[selectedAvatar],
		});

		if (data.isSet) {
			user.isAvatarImageSet = true;
			user.avatarImage = data.image;
			localStorage.setItem('chat-app-user', JSON.stringify(user));
			navigate('/');
		} else {
			toast.error('Error setting avatar. Please try again.', toastOptions);
		}
	};

	useEffect(() => {
		async function getAvatars() {
			const data = [];
			for (let i = 0; i < 4; i++) {
				let image;

				try {
					image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);

					const buffer = new Buffer(image.data);
					data.push(buffer.toString('base64'));
				} catch (error) {
					console.log(error);
				}
			}

			setAvatars(data);
			setIsLoading(false);
		}

		getAvatars();
	}, []);

	if (isLoading) {
		return (
			<>
				<div className='flex justify-center items-center flex-col h-screen w-screen bg-gray-100'>
					<span alt='loader' className='max-h-full max-w-full'>
						Loading...
					</span>
				</div>
			</>
		);
	}

	return (
		<>
			<div className='flex justify-center items-center flex-col h-screen w-screen bg-gray-100'>
				<h1 className='font-bold text-3xl text-gray-700'>
					Pick an avatar as your profile picture
				</h1>
				<div className='flex gap-8 mt-8'>
					{avatars.map((avatar, index) => {
						return (
							<div
								key={index}
								className={`${
									selectedAvatar === index
										? 'ring ring-indigo-700 ring-offset-4'
										: ''
								} rounded-full flex justify-center items-center border-1 ease-in-out duration-150`}
							>
								<img
									src={`data:image/svg+xml;base64,${avatar}`}
									alt='avatar'
									className='h-24 w-24'
									onClick={() => setSelectedAvatar(index)}
								/>
							</div>
						);
					})}
				</div>
				<button
					className='bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg py-2 px-4 mt-6 font-semibold'
					onClick={setProfilePicture}
				>
					Set as Profile Picture
				</button>
			</div>

			<ToastContainer />
		</>
	);
}
