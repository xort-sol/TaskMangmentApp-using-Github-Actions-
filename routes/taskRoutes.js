const express = require('express');
const router = express.Router();

let tasks = [];

router.post('/tasks', (req, res) => {
    const { title, description, dueDate, category, priority } = req.body;
    const newTask = { 
        id: tasks.length + 1,
        title,
        description,
        dueDate,
        category,
        priority,
        completed: false 
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.get('/tasks/category/:category', (req, res) => {
    const { category } = req.params;
    const filteredTasks = tasks.filter(task => task.category === category);
    res.json(filteredTasks);
});

router.put('/tasks/:id/complete', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) {
        res.status(404).json({ message: 'Task not found' });
    } else {
        task.completed = true;
        res.status(200).json(task);
    }
});


router.get('/tasks/sort/:sortType', (req, res) => {
    const { sortType } = req.params;
    let sortedTasks = [...tasks];
    switch (sortType) {
        case 'dueDate':
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        case 'category':
            sortedTasks.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'completionStatus':
            sortedTasks.sort((a, b) => a.completed - b.completed);
            break;
        default:
            res.status(400).json({ message: 'Invalid sort type' });
            return;
    }
    res.json(sortedTasks);
});


router.put('/tasks/:id/priority', (req, res) => {
    const taskId = req.params.id;
    const { priority } = req.body;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) {
        res.status(404).json({ message: 'Task not found' });
    } else {
        task.priority = priority;
        res.status(200).json(task);
    }
});


module.exports = router;
