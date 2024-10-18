import express from 'express';
import UserController from './userController.js';
import passport from 'passport';
const router = express.Router();

router.get('/',UserController.showLoginPage);
router.get('/home',UserController.dashboard);
router.get("/register",UserController.showRegisterPage)
router.post("/insert-data",UserController.register);
router.post('/check-login',passport.authenticate('local',{failureRedirect:'/failRedirect'}),UserController.checkLogin);
router.get("/failRedirect",async(req,res)=>{
    req.flash("error","invalid email or password");
    res.redirect("/admin/")
});
router.get("/logout",async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log("somthing went wrong");
            return res.redirect('home');
        }
        else{
            return res.redirect("/")
        }
       })
})
export default router;
