import React, { useState, useEffect, useRef } from 'react';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, user, socket }) {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);

	const scrollRef = useRef();

	useEffect(() => {
		setMessages([]);

		const chatChanged = async () => {
			const response = await axios.post(getMessagesRoute, {
				from: user._id,
				to: currentChat._id,
			});

			setMessages(response.data);
		};

		chatChanged();
	}, [currentChat, user]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-receive', (data) => {
				setArrivalMessage(data);
			});
		}
	}, []);

	useEffect(() => {
		if (arrivalMessage && arrivalMessage.from === currentChat._id) {
			setMessages((prev) => [
				...prev,
				{
					fromSelf: false,
					message: arrivalMessage.message,
				},
			]);
		}
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleSendMsg = async (msg) => {
		await axios.post(sendMessageRoute, {
			from: user._id,
			to: currentChat._id,
			message: msg,
		});

		socket.current.emit('send-msg', {
			to: currentChat._id,
			from: user._id,
			message: msg,
		});

		const msgs = [...messages, { fromSelf: true, message: msg }];
		setMessages(msgs);
	};

	return (
		<div className='flex flex-col w-full h-screen'>
			{/* header */}
			<div className='flex items-center justify-between p-4 bg-gray-100 h-16'>
				<div className='flex items-center'>
					<img
						src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
						alt='avatar'
						className='h-10 w-10'
					/>
					<h3 className='font-semibold ml-2'>{currentChat.username}</h3>
				</div>
				<Logout />
			</div>

			{/* messages */}
			<Messages messages={messages} scrollRef={scrollRef} />

			{/* input */}
			<ChatInput handleSendMsg={handleSendMsg} />
		</div>
	);
}
