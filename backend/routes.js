import express from 'express';
import { createUser } from './src/components/userCreated.js';
import { updatedUser } from './src/components/userUpdated.js';
import { getUser } from './src/components/userGet.js';
import { userLogin } from './src/components/userLogin.js';

const router = express.Router();

router.get('/get-user', getUser);
router.put('/update-user', updatedUser);
router.post('/create-user', createUser);
router.post('/Loginstore', userLogin);
router.post('/ticket', createdTickets);

export default router;