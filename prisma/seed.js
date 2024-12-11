import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try{
    // Data for items
    const items = [
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
    const createdItems = await prisma.item.createMany({
      data: items,
    });
    console.log("Seeded items:", createdItems);

    // Data for pickup deliveries
    const deliveryMethods = [
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
    const createdDeliveryMethods = await prisma.deliveryMethod.createMany({
      data: deliveryMethods,
    });
    console.log("Seeded deliveryMethods:", createdDeliveryMethods);

    // Data for paymentMethods
    const paymentMethods = [
      { name: "Tunai" },
      { name: "Kartu Kredit" },
      { name: "Qr" },
      { name: "Transfer" },
    ];

    // Seed paymentMethods
    const createdPaymentMethods = await prisma.paymentMethod.createMany({
      data: paymentMethods,
    });
    console.log("Seeded paymentMethods:", createdPaymentMethods);

    // Data for person
    const persons = [
      {
        name: "Budi Santoso",
        address: "Jl. Merdeka No. 123, Jakarta Selatan, DKI Jakarta",
        phoneNumber: "+62 812-3456-7890",
      },
      {
        name: "Siti Aisyah",
        address: "Jl. Raya Cendana No. 45, Bandung, Jawa Barat",
        phoneNumber: "+62 811-2345-6789",
      },
      {
        name: "Agus Pratama",
        address: "Jl. Pahlawan No. 7, Surabaya, Jawa Timur",
        phoneNumber: "+62 813-4567-8901",
      },
    ];

    // Seed person
    const createdPersons = await prisma.person.createMany({
      data: persons,
    });
    console.log("Seeded persons:", createdPersons);

    // Data for order statuses
    const orderStatuses = [
      { name: "Downpayment" },
      { name: "Belum bayar" },
      { name: "Lunas" },
    ];

    // Seed order statuses
    const createdOrderStatuses = await prisma.orderStatus.createMany({
      data: orderStatuses,
    });
    console.log("Seeded orderStatuses:", createdOrderStatuses);
  } catch (error) {
    console.error("Error occurred during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the main function
main().catch((e) => {
console.error(e);
process.exit(1);
});
