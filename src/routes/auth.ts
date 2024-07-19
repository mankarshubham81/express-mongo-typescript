import express from 'express';
import controller from '../controllers/auth';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.validUser.authUser), controller.authu);

export = router;