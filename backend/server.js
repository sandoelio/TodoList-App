const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_tasks'
});

const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado.');
})

app.use(cors());
app.use(express.json());

// rotas
// ----------------------------------------
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    })
});

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

// ----------------------------------------
app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

// ----------------------------------------
app.post("/user/tasks/update_status/", (req, res) => {
    connection.query("UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ?", [req.body.status, req.body.id_task], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
    })

    res.json('ok');
})

// ----------------------------------------
app.post("/user/tasks/new_task/", (req, res) => {
    connection.query("INSERT INTO tasks VALUES(0, ?, ?, 'new', NOW(), NOW())", [req.body.id_user, req.body.task_text], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
    })

    res.json('ok');
})

// ----------------------------------------
app.get("/user/tasks/get_task/:id_task", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id = ?", [req.params.id_task], (err, results) => {
        if (err) {
            res.send('MySQL connection error. ' + err.message);
        }
        res.json(results);
    })
});

// ----------------------------------------
app.post("/user/tasks/update_task/", (req, res) => {
    connection.query("UPDATE tasks SET task_text = ?, updated_at = NOW() WHERE id = ?", [req.body.task_text, req.body.id_task], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
    })

    res.json('ok');
})