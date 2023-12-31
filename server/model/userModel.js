import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 4,
		max: 20,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: true,
	},
	isAvatarImageSet: {
		type: Boolean,
		default: false,
	},
	avatarImage: {
		type: String,
		default: '',
	},
});

export default mongoose.model('Users', userSchema);
