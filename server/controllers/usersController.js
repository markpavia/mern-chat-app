import User from '../model/userModel.js';
import bcrypt from 'bcrypt';

export async function register(req, res, next) {
	try {
		const { username, email, password } = req.body;

		const usernameCheck = await User.findOne({ username });
		if (usernameCheck) {
			return res.json({ msg: 'Username already used', status: false });
		}

		const emailCheck = await User.findOne({ email });
		if (emailCheck) {
			return res.json({ msg: 'Email is already used', status: false });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			email,
			username,
			password: hashedPassword,
		});

		delete user.password;
		return res.json({ status: true, user });
	} catch (error) {
		next(error);
	}
}

export async function login(req, res, next) {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.json({ msg: 'Incorrect username or password', status: false });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.json({ msg: 'Incorrect username or password', status: false });
		}

		delete user.password;
		return res.json({ status: true, user });
	} catch (error) {
		next(error);
	}
}

export async function setAvatar(req, res, next) {
	try {
		const userId = req.params.id;
		const avatarImage = req.body.image;
		const userData = await User.findByIdAndUpdate(
			userId,
			{
				isAvatarImageSet: true,
				avatarImage,
			},
			{ new: true }
		);

		return res.json({
			isSet: userData.isAvatarImageSet,
			image: userData.avatarImage,
		});
	} catch (error) {
		next(error);
	}
}

export async function getAllUsers(req, res, next) {
	try {
		const users = await User.find({ _id: { $ne: req.params.id } }).select([
			'_id',
			'email',
			'username',
			'avatarImage',
		]);

		return res.json({
			users,
		});
	} catch (error) {
		next(error);
	}
}
