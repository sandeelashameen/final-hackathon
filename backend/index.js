const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define your secret key (you can use environment variables for better security)
const secretKey = '2hP#G8Z!mY@v$uQ9'; // Replace with your actual secret key

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@sandeela.qpbwdqa.mongodb.net/?retryWrites=true&w=majority', {

});

// MongoDB User Schema
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', UserSchema);

// MongoDB Project Schema
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    url: String,
    developerName: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied - no token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('Error verifying token:', err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

// Example generateAuthToken function
const generateAuthToken = (user) => {
    const { _id, firstName, lastName } = user;
    const token = jwt.sign({ userId: _id, firstName, lastName }, secretKey, { expiresIn: '1h' });
    return token;
};

// Express routes
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const authToken = generateAuthToken(user);

        res.json({ authToken });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/currentUser', authenticateToken, async (req, res) => {
    try {
        const currentUser = req.user;
        res.json(currentUser);
    } catch (error) {
        console.error('Error fetching current user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/logout', (req, res) => {
    // Perform any logout logic, if needed
    res.json({ message: 'Logout successful' });
});

app.post('/api/addProject', authenticateToken, async (req, res) => {
    try {
        const { title, image, description, url, developerName } = req.body;

        const newProject = new Project({
            title,
            image,
            description,
            url,
            developerName,
        });

        await newProject.save();

        res.json({ message: 'Project added successfully' });
    } catch (error) {
        console.error('Error adding project:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getAllProjects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

