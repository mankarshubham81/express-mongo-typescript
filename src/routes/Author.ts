import express from 'express';
import controller from '../controllers/Author';

const router = express.Router();

router.post('/create', controller.createAuthor);
router.get('/get/:authorId', controller.readAuthor);
router.get('/allauthor', controller.readAllAuthor);
router.patch('/update/:authorId', controller.updateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);
// router.post('', controller)

export = router;