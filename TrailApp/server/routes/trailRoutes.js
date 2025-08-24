import express from 'express';
import { 
    getTrail,
    getAllTrails,
    updateCoordinate,
    deleteCoordinate,
    insertCoordinate,
} from '../controllers/trailController.js';

const router = express.Router();

//GET all trails
router.get('/trails', getAllTrails);
//GET a single trail
router.get('/:id', getTrail);
//PATCH a coordinate
router.patch('/:trailId/coordinate/:index', updateCoordinate);
//DELETE a coordinate
router.delete('/:trailId/coordinate/:index', deleteCoordinate);
//CREATE new coordinate
router.patch('/:trailId/coordinate', insertCoordinate);

export default router;