import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Messages({ messages, scrollRef }) {
	const messageSender = (msg) => {
		return msg.fromSelf ? 'justify-end' : 'justify-start';
	};

	const messageLayout = (msg) => {
		return msg.fromSelf ? 'bg-blue-600 text-white' : 'bg-gray-200';
	};

	return (
		<div className='flex-1 px-8 overflow-auto'>
			<div>
				{messages.map((msg, idx) => {
					return (
						<div
							ref={scrollRef}
							key={uuidv4()}
							className={messageSender(msg) + ' flex my-1'}
						>
							<div className={messageLayout(msg) + ' px-4 py-2 rounded-xl'}>
								<p>{msg.message}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
