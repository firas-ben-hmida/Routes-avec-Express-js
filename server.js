const express = require('express');
const path = require('path');
const users = require('./routes/routes.js');
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);

app.listen(port, () => console.log(`Server is running on port ${port}`));
