import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';


const router = express.Router();

router.post('/register', ValidateSchema(Schemas.user.create), controller.createUser);
router.get('/get/:userId', controller.readUser);
router.get('/alluser', controller.readAllUser);
router.patch('/update/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);
// router.post('', controller)

export = router;