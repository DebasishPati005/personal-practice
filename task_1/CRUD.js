const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let taskRecord = [];

app.post('/create', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const id = taskRecord.length + 1;
  taskRecord.push({ id, name });
  res.json(`User ${name} is created with id ${id}`);
});

app.get('/read', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: "Name query parameter is required" });
    }
    const userRes = taskRecord.find(user => user.name === name);
    if (!userRes) {
        return res.status(404).json({ error: "No user with given name found" });
    }
    res.json({ userDetail: userRes });
});

app.put('/update/:currentName', (req, res) => {
    const { currentName } = req.params;
    const { newName } = req.body;
    if (!newName) {
        return res.status(400).json({ error: "New name is required" });
    }
    let userRes = taskRecord.find(user => user.name === currentName);
    if (!userRes) {
        return res.status(404).json({ error: "No user with given name found" });
    }
    userRes.name = newName;
    res.json({result:`User ${currentName} updated to ${newName}`});
});

app.delete('/delete/:userName', (req, res) => {
    const { userName } = req.params;
    const index = taskRecord.findIndex(user => user.name === userName);
    if (index === -1) {
        return res.status(404).json({ error: "No user with given name found" });
    }
    taskRecord.splice(index, 1);
    res.json({result:`User ${userName} deleted successfully`});
});


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
