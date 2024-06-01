import express from 'express';  
import { getDocuments, createDocument, updateDocument, deleteDocument, getDocumentById, flushDb } from '../Controllers/documentController.js';

const router = express.Router();

router.get('/get-all', getDocuments);
router.post('/create', createDocument);
router.put('/update/:id', updateDocument);
router.delete('/delete/:id', deleteDocument);
router.get('/:id', getDocumentById);
router.post('/flush', flushDb)

export default router;