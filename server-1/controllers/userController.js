import User from '../models/User.js';

// @desc  Get all users
// @route GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        // const users = await User.find();
        res.status(200).json({ message: 'Get all users (placeholder)' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
