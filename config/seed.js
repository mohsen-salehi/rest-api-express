const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:./database.sqlite'); // مسیر فایل پایگاه داده شما

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true }); // حذف و ایجاد مجدد جداول
        console.log('Database synchronized.');

        // داده‌های نمونه
        const users = [
            { email: 'user1@example.com', password: 'password1' },
            { email: 'user2@example.com', password: 'password2' },
            { email: 'user3@example.com', password: 'password3' }
        ];

        for (const user of users) {
            await User.create(user);
        }

        console.log('Sample data added to the database.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();
