import express from 'express';
import { 
    getAllBenches,
    createBench,
    updateBench,
    deleteBench,
    addVideoToBench,
    deleteVideoFromBench 
} from '../controllers/benchController.js';

const router = express.Router();

router.get('/benches', getAllBenches);
router.post('/bench', createBench);
router.patch('/bench/:id', updateBench);
router.delete('/bench/:id', deleteBench);
router.patch('/bench/:id/add-video', addVideoToBench);
router.patch('/bench/:id/delete-video/:videoId', deleteVideoFromBench);

export default router;