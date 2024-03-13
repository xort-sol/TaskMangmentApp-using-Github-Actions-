const express = require('express');
const router = express.Router();

let users = [];

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;
