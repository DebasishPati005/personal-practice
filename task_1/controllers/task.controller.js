const Task = require("../models/task.model");
const User = require("../models/user.model");

const createTask = async (req, res) => {
    const userId = req.userId;
    try {        
        const { name } = req.body;
        const task = new Task({ name, createdBy: userId });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const readTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {
    const userId = req.userId;
    try {
        const role = await getUserRole(userId);
        if(role != "admin"){
            return res.status(413).json({ error: 'Not allowed to update the task' });
        }
        const taskId = req.params.id;
        const { name } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { name });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTask = async (req, res) => {
    const userId = req.userId;
    try {
        const userRole = await getUserRole(userId);
        if(userRole != "admin"){           return res.status(413).json({ error: 'Not allowed to delete a task' });
        }
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

async function getUserRole(userId) {
    const user = await User.findById(userId);
    console.log({role:user.role});
    return user.role;
}

module.exports = { createTask, readTask, updateTask, deleteTask };
