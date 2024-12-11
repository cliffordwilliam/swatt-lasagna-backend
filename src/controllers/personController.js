import { prisma } from '../lib/prisma.js';

// GET: Retrieve all persons
export const getAllPersons = async (req, res) => {
  try {
    const persons = await prisma.person.findMany();
    res.json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve persons' });
  }
};

// POST: Create a new person
export const createPerson = async (req, res) => {
  const { name, address, phoneNumber } = req.body;

  if (!name || !address || !phoneNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const person = await prisma.person.create({
      data: {
        name,
        address,
        phoneNumber,
      },
    });
    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create person' });
  }
};

// GET: Retrieve a person by ID
export const getPersonById = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await prisma.person.findUnique({
      where: { id },
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve person' });
  }
};

// PUT: Update an existing person
export const updatePerson = async (req, res) => {
  const { id } = req.params;
  const { name, address, phoneNumber } = req.body;

  try {
    const person = await prisma.person.update({
      where: { id },
      data: {
        name,
        address,
        phoneNumber,
      },
    });

    res.json(person);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(500).json({ error: 'Failed to update person' });
  }
};

// DELETE: Delete a person by ID
export const deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await prisma.person.delete({
      where: { id },
    });

    res.json({ message: 'Person deleted successfully', person });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(500).json({ error: 'Failed to delete person' });
  }
};
