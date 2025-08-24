// Import dependencies
import express from 'express'

// Import controllers for API calls
import {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    updateUserRole,
    signin,
    logout
} from '../controllers/userController.js'

const router = express.Router()

// GET all users || ADMIN OLY
router.get('/users', getAllUsers)
// GET a single user
router.get('/:id', getUser)
// POST a new user
router.post('/signup', createUser)
// DELETE a user
router.delete('/:id', deleteUser)
// UPDATE a user profile
router.patch('/updateProfile/:id', updateUser)
// UPDATE a user role
router.patch('/updateRole/:id', updateUserRole)
// HANDLE SIGN IN & LOGOUT
router.post('/signin', signin);
router.post('/logout', logout);
// TODO: Google OAuth
// router.post('/googleLogin', googleSignIn);


export default router;
