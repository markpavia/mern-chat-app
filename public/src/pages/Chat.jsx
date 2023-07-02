import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

function Chat() {
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);
	const [newMessageReceived, setNewMessageReceived] = useState(null);

	useEffect(() => {
		const getLoggedInUser = async () => {
			if (!localStorage.getItem('chat-app-user')) {
				navigate('/login');
			} else {
				setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
				setIsLoaded(true);
			}
		};

		getLoggedInUser();
	}, []);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit('add-user', currentUser._id);
		}
	}, [currentUser]);

	useEffect(() => {
		const getAllUsers = async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const { data } = await axios.get(
						`${allUsersRoute}/${currentUser._id}`
					);
					setContacts(data.users);
				} else {
					navigate('/set-avatar');
				}
			}
		};

		getAllUsers();
	}, [currentUser]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-receive', (data) => {
				console.log(data);
				setNewMessageReceived(data);
			});
		}
	}, []);

	useEffect(() => {
		if (newMessageReceived) {
			console.log(newMessageReceived);
			contacts.map((contact) => {
				console.log(contact.newMessage);
			});
		}
	}, [newMessageReceived]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<div className='w-screen h-screen flex'>
				<Contacts
					contacts={contacts}
					user={currentUser}
					changeChat={handleChatChange}
				/>

				{isLoaded && !currentChat && <Welcome user={currentUser} />}

				{isLoaded && currentChat && (
					<ChatContainer
						currentChat={currentChat}
						user={currentUser}
						socket={socket}
					/>
				)}
			</div>
		</>
	);
}

export default Chat;
