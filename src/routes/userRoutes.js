import express from 'express';
import { register, login, updateUser, deleteUser, forgotPassword, resetPassword } from '../controllers/userController.js';
import { isAuth } from '../middlewares/auth.mideleware.js';
import { isManager } from '../middlewares/role.mideleware.js';

const router = express.Router();

router.post('/users/register', register);
router.post('/login', login);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/admin', isAuth, isManager("admin"), (req, res) => {
    if (req.user) {
        res.json({
            message: 'Admin route',
            user: req.user,
            authenticated: true
        });
    } else {
        res.json({
            message: 'Admin route',
            authenticated: false
        });
    }
});

router.get('/manager', isAuth, isManager("admin" ,"manager" ), (req, res) => {
    if(req.user){
        res.json({
            message: 'Manager route',
            user: req.user,
            authenticated: true
        });
    }else{
        res.json({
            message: 'Manager route',
            authenticated: false
        });
    }
})

router.get('/user', isAuth, isManager("admin","user","manager" ), (req, res) => {
    if(req.user){
        res.json({
            message: 'User route',
            user: req.user,
            authenticated: true
        });
    }else{
        res.json({
            message: 'User route',
            authenticated: false
        });
    }
});

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


export default router;






