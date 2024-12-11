# Logs

## Setup PostgreSQL locally

Followed Odin Project guide

https://www.theodinproject.com/lessons/nodejs-using-postgresql

I also have logged it to local machine log file

## Open PostgreSQL prompt first

```bash
psql
```

## Make new db locally for local development uses

```bash
CREATE DATABASE swatt_lasagna_app;
```

## Connect to that db

This switches the active connection to the newly created swatt_lasagna_app database.

```bash
\c swatt_lasagna_app
```

## Install Prisma dep

```bash
npm install @prisma/client
npm install prisma --save-dev
```

## I am using Prisma so need to config connection there

Config connection in schema file

And also the schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Item {
    id          String      @id @default(cuid())
    name        String
    price       Int
    orders      OrderItem[]
    createdAt   DateTime    @default(now())
    updatedAt   DateTime    @updatedAt
}

model Order {
    id                 String         @id @default(cuid())
    buyer              Person         @relation("BuyerOrders", fields: [buyerId], references: [id])
    buyerId            String
    recipient          Person         @relation("RecipientOrders", fields: [recipientId], references: [id])
    recipientId        String
    orderDate          DateTime
    deliveryDate       DateTime
    totalPurchase      Int
    deliveryMethod     DeliveryMethod @relation(fields: [deliveryMethodId], references: [id])
    deliveryMethodId   String
    shippingCost       Int
    grandTotal         Int
    payment            PaymentMethod  @relation(fields: [paymentMethodId], references: [id])
    paymentMethodId    String
    items              OrderItem[]
    status             OrderStatus    @relation(fields: [statusId], references: [id])
    statusId           String
    note               String?
    createdAt          DateTime       @default(now())
    updatedAt          DateTime       @updatedAt

    @@index([buyerId], map: "idx_buyerId")
    @@index([recipientId], map: "idx_recipientId")
    @@index([orderDate], map: "idx_orderDate")
}

model OrderItem {
    quantity   Int
    order      Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)
    orderId    String
    item       Item   @relation(fields: [itemId], references: [id])
    itemId     String

    @@id([orderId, itemId])
    @@index([itemId], map: "idx_itemId")
}

model Person {
    id               String   @id @default(cuid())
    name             String
    address          String
    phoneNumber      String
    buyerOrders      Order[]  @relation("BuyerOrders")
    recipientOrders  Order[]  @relation("RecipientOrders")
    createdAt        DateTime @default(now())
    updatedAt        DateTime @updatedAt

    @@index([name], map: "idx_name")
    @@index([phoneNumber], map: "idx_phoneNumber")
}

model PaymentMethod {
    id          String   @id @default(cuid())
    name        String   @unique
    orders      Order[]
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}

model DeliveryMethod {
    id          String   @id @default(cuid())
    name        String   @unique
    orders      Order[]
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}

model OrderStatus {
    id          String   @id @default(cuid())
    name        String   @unique
    orders      Order[]
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}
```

## Then push schema to database

This is not migration, rather push

```bash
npx prisma db push
```

Check if the local db is updated with the schema

```bash
\dt
              List of relations
 Schema |      Name      | Type  |   Owner
--------+----------------+-------+-----------
 public | DeliveryMethod | table | cliffordw
 public | Item           | table | cliffordw
 public | Order          | table | cliffordw
 public | OrderItem      | table | cliffordw
 public | OrderStatus    | table | cliffordw
 public | PaymentMethod  | table | cliffordw
 public | Person         | table | cliffordw
(7 rows)
```

## Update prisma client with generate

```bash
npx prisma generate
```

## Then make seed.js in prisma dir

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Data for items
  const itemsData = [
    { name: "Lasagna Mini", price: 65000 },
    { name: "Lasagna Small", price: 95000 },
    { name: "Lasagna Medium", price: 180000 },
    { name: "Lasagna Long", price: 295000 },
    { name: "Lasagna Xtra Medium", price: 395000 },
    { name: "Lasagna Family", price: 495000 },
    { name: "Lasagna Xtra Family", price: 555000 },
    { name: "Lasagna Party Medium", price: 1350000 },
    { name: "Lasagna Party Large", price: 2750000 },

    { name: "Macaroni Mini", price: 50000 },
    { name: "Macaroni Small", price: 85000 },
    { name: "Macaroni Oval", price: 110000 },
    { name: "Macaroni Medium", price: 165000 },
    { name: "Macaroni Long", price: 250000 },
    { name: "Macaroni Xtra Medium", price: 335000 },
    { name: "Macaroni Family", price: 380000 },
    { name: "Macaroni Xtra Family", price: 445000 },
    { name: "Macaroni Party Medium", price: 1100000 },
    { name: "Macaroni Party Large", price: 2200000 },

    { name: "Marmer Cake 1 Loyang Bulat", price: 335000 },
    { name: "Marmer Cake 1 Loyang Dipotong", price: 335000 },
    { name: "Marmer Cake 1 Slice", price: 22000 },
    { name: "Marmer Cake 3 Slice", price: 63000 },
    { name: "Marmer Cake 6 Slice", price: 125000 },
    { name: "Marmer Cake 9 Slice", price: 185000 },
    { name: "Marmer Cake 12 Slice", price: 245000 },

    { name: "Nastar Bulat", price: 185000 },
    { name: "Nastar Kotak", price: 135000 },

    { name: "Kue Keju Bulat", price: 195000 },
    { name: "Kue Keju Kotak", price: 145000 },

    { name: "Lidah Kucing Bulat", price: 150000 },
    { name: "Lidah Kucing Kotak", price: 120000 },

    { name: "Sagu Keju Bulat", price: 150000 },
    { name: "Sagu Keju Kotak", price: 120000 },

    { name: "Almond Keju Bulat", price: 185000 },
    { name: "Almond Keju Kotak", price: 135000 },

    { name: "Cheese Stick Kotak", price: 160000 },

    { name: "Bolu Peuyeum 1 Slice", price: 11000 },
    { name: "Bolu Peuyeum 5 Slice", price: 50000 },
    { name: "Bolu Peuyeum 12 Slice", price: 110000 },
    { name: "Bolu Peuyeum 1 Loyang Utuh", price: 140000 },

    { name: "Roti Baso", price: 15000 },
    { name: "Roti Keju", price: 15000 },
    { name: "Roti Coklat", price: 15000 },

    { name: "Pudding 1 Cup", price: 30000 },
    { name: "Pudding 4 Cup ", price: 115000 },
    { name: "Pudding 6 Cup", price: 172500 },

    { name: "Box Hampers Box K3", price: 75000 },
    { name: "Box Hampers Box K4", price: 95000 },
    { name: "Box Hampers Box B3", price: 85000 },
    { name: "Box Hampers Box B4", price: 95000 },

    { name: "Tas Kain MC", price: 15000 },
    { name: "Tas Kain K3", price: 15000 },
    { name: "Tas Kain K4", price: 15000 },
    { name: "Tas Kain B3", price: 15000 },
    { name: "Tas Kain B4", price: 15000 },

    { name: "Hampers Marmer Cake", price: 350000 },
  ];

  // Seed items
  const createdItems = await Promise.all(
    itemsData.map((itemData) => prisma.item.create({ data: itemData })),
  );
  console.log("Seeded items:", createdItems);

  // Data for pickup deliveries
  const pickupDeliveries = [
    { name: "Pickup" },
    { name: "Delivery" },
    { name: "Gojek" },
    { name: "Citytran" },
    { name: "Paxel" },
    { name: "Daytrans" },
    { name: "Baraya" },
    { name: "Lintas" },
    { name: "Bineka" },
    { name: "Jne" },
  ];

  // Seed pickup deliveries
  const createdPickupDeliveries = await Promise.all(
    pickupDeliveries.map((pickupDelivery) =>
      prisma.pickupDelivery.create({ data: pickupDelivery }),
    ),
  );
  console.log("Seeded pickupDeliveries:", createdPickupDeliveries);

  // Data for payments
  const payments = [
    { name: "Tunai" },
    { name: "Kartu Kredit" },
    { name: "Qr" },
    { name: "Transfer" },
  ];

  // Seed payments
  const createdPayments = await Promise.all(
    payments.map((payment) =>
      prisma.payment.create({ data: payment }),
    ),
  );
  console.log("Seeded Payments:", createdPayments);

  // Data for people
  const people = [
    {
      name: "Whitney Shannon",
      address: "Ap #550-9194 Odio. St.",
      phone: "(257) 553-3602",
    },
    {
      name: "Octavia Curtis",
      address: "Ap #373-7046 Nullam Ave",
      phone: "(778) 543-3708",
    },
    {
      name: "Harding Holder",
      address: "141-9846 Sem, Road",
      phone: "1-562-460-5848",
    },
  ];

  // Seed people
  const createdPeople = await Promise.all(
    people.map((person) => prisma.person.create({ data: person })),
  );
  console.log("Seeded People:", createdPeople);

  // Data for order statuses
  const orderStatuses = [
    { name: "Downpayment" },
    { name: "Belum bayar" },
    { name: "Lunas" },
  ];

  // Seed order statuses
  const createdOrderStatuses = await Promise.all(
    orderStatuses.map((orderStatus) =>
      prisma.orderStatus.create({ data: orderStatus }),
    ),
  );
  console.log("Seeded OrderStatuses:", createdOrderStatuses);
}

// Execute the main function and handle errors
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

## Use Prisma to seed the local db

```bash
npx prisma db seed
```

Workflow
1. Update schema
2. Update seed to fit schema

Update database and client
1. Purge database `node prisma/purge.js`
2. Push schema to database `npx prisma db push`
3. Generate client `npx prisma generate`
4. Seed database `node prisma/seed.js`

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