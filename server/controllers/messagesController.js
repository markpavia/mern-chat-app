import Message from '../model/messageModel.js';

export async function create(req, res, next) {
	try {
		const { from, to, message } = req.body;
		const data = await Message.create({
			message: message,
			users: [from, to],
			sender: from,
		});

		const resMsg = data ? 'Message sent!' : 'Message sending failed!';
		const resStatus = data ? true : false;

		return res.json({ msg: resMsg, status: resStatus });
	} catch (error) {
		next(error);
	}
}

export async function getMessages(req, res, next) {
	try {
		const { from, to } = req.body;

		const messages = await Message.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updatedAt: 1 });

		const projectedMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message,
			};
		});

		return res.json(projectedMessages);
	} catch (error) {
		next(error);
	}
}
