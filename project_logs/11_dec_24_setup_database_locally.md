# Logs

## Initialize new Node.js project

```bash
npm init -y
```

## Install Express

```bash
npm install express
```

## Install Nodemon

```bash
npm install --save-dev nodemon
```

## Create app.js

```bash
touch app.js
```

## Make basic Express

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Swatt Lasagna Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Run server on my local machine port 3000

```bash
node app.js
```

```bash
npx nodemon app.js
```

## Initialize Git local repo

```bash
git init
```