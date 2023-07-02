import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({ handleSendMsg }) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [msg, setMsg] = useState('');

	const toggleEmojiPicker = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmojiClick = (emoji, event) => {
		setMsg(msg + emoji.emoji);
	};

	const sendChat = (event) => {
		event.preventDefault();

		if (msg.length) {
			handleSendMsg(msg);
			setMsg('');
		}
	};

	return (
		<div className='flex items-center p-2'>
			{/* button container */}
			<div>
				{/* emoji */}
				<div className=' text-indigo-500 hover:text-indigo-600 text-2xl cursor-pointer mr-2 relative'>
					<BsEmojiSmileFill onClick={toggleEmojiPicker} />
					{showEmojiPicker && (
						<div className='absolute bottom-10'>
							<Picker onEmojiClick={handleEmojiClick} />
						</div>
					)}
				</div>
			</div>

			{/* input container */}
			<form
				action=''
				className='flex w-full border rounded-lg items-center overflow-hidden'
				onSubmit={(e) => sendChat(e)}
			>
				<input
					type='text'
					placeholder='Type your message here'
					className='flex-1 focus:outline-none p-2 text-gray-700'
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<button className='text-indigo-500 hover:text-indigo-600 mx-2'>
					<IoMdSend />
				</button>
			</form>
		</div>
	);
}
