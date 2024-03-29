const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task.controller")

router.post('/create', taskController.createTask);

router.get('/read/:id', taskController.readTask);

router.put('/update/:id', taskController.updateTask);

router.delete('/delete/:id', taskController.deleteTask);

module.exports = router;