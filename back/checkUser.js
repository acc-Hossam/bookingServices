const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const checkUser = async () => {
    try {
        const id = '694a8745ab4f6bd284d4e2f7'; // ID from the token provided by user
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid ObjectId format');
            // Try to find by email if ID is messed up, or just list all users
            const users = await User.find({});
            console.log('All users:', users);
            process.exit();
        }

        const user = await User.findById(id);

        if (user) {
            console.log('User Found:');
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`); // This is the critical part
        } else {
            console.log('User NOT found with this ID.');
            const users = await User.find({});
            console.log('Listing all users to find the admin:');
            users.forEach(u => console.log(`${u.id} - ${u.email} - ${u.role}`));
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
