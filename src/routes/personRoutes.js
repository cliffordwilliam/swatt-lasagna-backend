import express from 'express';
import { getAllPersons, createPerson, getPersonById, updatePerson, deletePerson } from '../controllers/personController.js';

const router = express.Router();

// CRUD routes for persons
router.get('/persons', getAllPersons);
router.post('/persons', createPerson);
router.get('/persons/:id', getPersonById);
router.put('/persons/:id', updatePerson);
router.delete('/persons/:id', deletePerson);

export default router;
