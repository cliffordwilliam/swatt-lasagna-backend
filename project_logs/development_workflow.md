Workflow
1. Update schema
2. Update seed to fit schema

Update database and client
1. Drop all table, based off of the old schema `node prisma/purge.js`
2. Make new table, based off of the new schema `npx prisma db push`
3. Update client to new schema `npx prisma generate`
4. Use updated client to seed table `node prisma/seed.js`

shortcut to reset database

```bash
node prisma/purge.js
npx prisma db push
npx prisma generate
node prisma/seed.js
```

shortcut to see database locally

Enter PostgreSQL prompt first

```bash
psql
```

List all db

```bash
\l
```

Connect to the db you want

```bash
\c swatt_lasagna_app
```

GET all tables

```bash
\dt
```

GET all row from 1 table

```bash
SELECT * FROM public."Item";
```

Clear the prompt

```bash
\! clear
```

Run server on my local machine port 3000

```bash
node app.js
```

```bash
npx nodemon app.js
```
