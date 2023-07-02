import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import messageRoute from './routes/messageRoute.js';
import { Server } from 'socket.io';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoute);

connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('DB Connection Successfull');
	})
	.catch((err) => {
		console.log(err.message);
	});

const server = app.listen(process.env.PORT, () => {
	console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);

		if (sendUserSocket) {
			socket
				.to(sendUserSocket)
				.emit('msg-receive', { from: data.from, message: data.message });
		}
	});
});
