const Controller = require('./usercontroller/index');
const model1=require("../../models/index")
const express = require('express');
const { mymulter, upload, booktaxi, ctaxi, verify, showbookings } = require('./usercontroller/usercontroller');
const usercontroller = require('./usercontroller/usercontroller');
const router = express.Router();

// router.post('/register',upload.single('image'),booktaxi,Controller.usercontroller.register);
router.post('/loginuser',Controller.usercontroller.loginuserdata);

// router.get('/register',Controller.usercontroller.signupget);
router.post('/signupuser',upload.single('Profile_Pic'),Controller.usercontroller.signuserdata);
router.post("/verify",Controller.usercontroller.matchmyotp)
// router.post("/sendotpagain",Controller.usercontroller.sendotpagain)
router.post("/carregister",Controller.usercontroller.verify,upload.array('image'),Controller.usercontroller.carRegister)
router.post('/bookthetaxi',upload.single('image'),Controller.usercontroller.verify,Controller.usercontroller.bookMyTaxi)
router.post('/bookthiscar',Controller.usercontroller.verify,Controller.usercontroller.bookthiscar)
router.post('/canceltaxi',Controller.usercontroller.verify,Controller.usercontroller.cancelbooking)
router.post('/resendotp',Controller.usercontroller.verify,Controller.usercontroller.sendotpagain)
// ===================================
router.get('/showtaxi',Controller.usercontroller.showtaxi)
router.get('/showbooking',Controller.usercontroller.showdriverbookings)
router.get('/mycartype',usercontroller.mycartype)
// router.post("/verification",sendot)


router.get('/registerr',Controller.usercontroller.signupget);
router.post('/login',Controller.usercontroller.login);


// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
// router.get('/register',Controller.usercontroller.signupget);
module.exports = router;
