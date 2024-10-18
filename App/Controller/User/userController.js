import User from "../../Models/User.js";
import bcrypt from 'bcrypt';
const showLoginPage = async (req, res) => {
    try {
        res.render('login', { title: 'Login Page' });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).render('error', { message: 'Unable to load the login page. Please try again later.' });
    }
};

const showRegisterPage = async (req, res) => {
    try {
        res.render('register', { title: 'Register Page' });
    } catch (error) {
        console.error('Error rendering register page:', error);
        res.status(500).render('error', { message: 'Unable to load the Register page. Please try again later.' });
    }
};

const dashboard = async (req, res) => {
    try {
        if(!req.user) return res.redirect("/")
         console.log(req.user);
            
        res.render('dashboard', { title: 'Dashboard' });
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).render('error', { message: 'Unable to load the dashboard. Please try again later.' });
    }
};


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) console.log('User already exists with this email.');

        const hashedPassword = await bcrypt.hash(password, 10);
        let userData = {
            name,
            email,
            password: hashedPassword
        }
        let user = await User.create(userData)
        if (!user) {
            console.log('Failed to create user');
            return res.redirect('back')
        }
        return res.redirect('/')
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).render('error', { message: 'Unable to register. Please try again later.' });
    }
};

const checkLogin = async (req, res) => {
    try {
        console.log("login ssuccessfully");
        return res.redirect('/home');
        
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).render('error', { message: 'Unable to Login. Please try again later.' });
    }
}

export default { showLoginPage, showRegisterPage, dashboard, checkLogin, register };
