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