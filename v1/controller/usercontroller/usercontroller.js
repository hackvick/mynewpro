const { Register } = require("../../../models/register");
const multer = require("multer");
const path = require("path");
model1 = require("../../../models/index");
const taxim = require("../../../models/booktaxi");
const myCarRegister = require("../../../models/myCarRegister");
const taximg = require("../../../models/taximg");
const usersign = require("../../../models/usersign");
const otpverification = require("../../../models/userotpverify");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const { Storeimg } = require("../../../models/img");
const res = require("express/lib/response");

// =================================================Signup==============================================
async function register(req, res) {
  try {
    const user = new Register({
      fname: req.body.fname,
      sname: req.body.sname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      // image:req.file.path
    });

    await user.save();
    console.log("agshg");
    res.send("done");
    const _idd = user._id;
    const token = user.genAuthToken(_idd);
    Object.assign(user, { mytoken: token }).save();

    const userimg = new Storeimg({
      empid: _idd,
      image: req.file.path,
    });
    console.log(token);
    await userimg.save();
    res.redirect("/login");
  } catch (error) {
    console.log("This is my error", error);
  }
}

// =======================================Login==================================================

async function login(req, res) {
  try {
    var eemail = req.body.email;
    var ppassword = req.body.password;
    console.log(eemail);
    console.log(ppassword);
    var useremail = await Register.findOne({ email: eemail });
    console.log(useremail + "useremail data");

    const _iddrd = useremail._id;
    console.log(_iddrd, "useremail id");
    if (
      useremail &&
      useremail.email == eemail &&
      useremail.password == ppassword
    ) {
      const tokenn = useremail.genAuthToken(_iddrd);
      // console.log(genAuthToken());
      console.log(tokenn, "login side token");
      res.send(tokenn);
    } else {
      res.send("user not matched");
    }
  } catch (error) {
    res.send(error);
  }
}
// ====================================Login End=========================================

// ==========================================================================
async function findget(req, res) {
  res.send(Register.find());
}

// ===============================================================================================
async function servicesget(req, res) {
  res.send("This is your data");
}
// =============================================Home==========================================

async function homeget(req, res) {
  res.render("userpage2");
}

// =====================Showme=========================================

async function showmeget(req, res) {
  res.render("userpage3");
}

// ===================================Patch================================================

async function patchsignup(req, res) {
  try {
    const id = req.params.id;
    const updateemployee = await Register.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send(updateemployee);
  } catch (error) {
    console.log(error);
  }
}

// ==================================================================delete============================
async function deletesignupid(req, res) {
  try {
    const id = req.params.id;
    const demployee = await Register.findByIdAndDelete(id);
    res.status(201).send(demployee);
  } catch (error) {
    console.log(error);
  }
}

// ==================================================Signup by id(Get)==========================================

async function getsignupid(req, res) {
  try {
    const _id = req.params.id;
    const getemployee = await Register.findById({ _id: _id });
    res.status(201).send(getemployee);
  } catch (error) {
    console.log(error);
  }
}

// =============================================Contact=======================================
async function contactget(req, res) {
  res.send("You are verified Baby");
}

// ===========================Top for mongoose================================

async function topget(req, res) {
  try {
    const topa = await Register.aggregate([
      {
        $match: { phone: { $gte: 1 } },
      },
      {
        $group: {
          _id: null,
          avgprice: { $avg: "$phone" },
        },
      },
    ]);
    console.log(topa);
    res.status(200).json({
      status: "success",
      result: topa,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

// ===================================Signup Get===============================

async function signupget(req, res) {
  res.render("userpage");
}

// ======================================Getdata(function)===========================================
async function getdata(req, res) {
  const finder = await Storeimg.find({})
    .populate({ path: "empid", model: "Employee" })
    .exec((err, data) => {
      if (err) throw err;
      res.send(data);
    });
}

// ===================================================GetMyData Definataion===================================

async function getmydata(req, res) {
  const idd = req.data;
  console.log(idd + "aggregate side id");
  let data = await Storeimg.aggregate([
    {
      $match: {
        empid: mongoose.Types.ObjectId(idd),
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "empid",
        foreignField: "_id",
        as: "Show_user",
      },
    },
    {
      $project: {
        firstname: "$Show_user.fname",
        useremail: "$Show_user.email",
        posting: "$image",
      },
    },
  ])
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// ===========================Multer===========================================

const pic = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "image") {
      cb(null, "./views/uploads");
    } else {
      cb(null, "./views/profile");
    }
  },
  // "./views/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: pic });

// ===========================lognitude===============================================

// async function booktaxi(req, res) {
//   try {
//     let pcordinates = [];
//     let pickupadd = {};
//     if (req.body.latitude && req.body.longitude) {
//       pcordinates.push(Number(req.body.latitude));
//       pcordinates.push(Number(req.body.longitude));
//       pickupadd.type = "point";
//       pickupadd.pcordinates = pcordinates;
//     }
//     req.body.pickupadd = pickupadd;
//     let dcordinates = [];
//     let dropoffadd = {};
//     if (req.body.latitude && req.body.longitude) {
//       dcordinates.push(Number(req.body.latitude));
//       dcordinates.push(Number(req.body.longitude));
//       dropoffadd.type = point;
//       dropoffadd.dcordinates = dcordinates;
//     }
//     req.body.pickupadd = pickupadd;
//     let client = await clientModel.booktaxi(req.body).save();

//     res.status(201);
//     res.send(client);
//     console.log(client);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// }

// ===========================================================================

module.exports = {
  verify:verify,
  login: login,
  register: register,
  sendotpverificationemail: sendotpverificationemail,
  sendotpagain: sendotpagain,
  upload: upload,
  bookMyTaxi:bookMyTaxi,
  getdata: getdata,
  getmydata: getmydata,
  topget: topget,
  contactget: contactget,
  signupget: signupget,
  getsignupid: getsignupid,
  deletesignupid: deletesignupid,
  patchsignup: patchsignup,
  showmeget: showmeget,
  servicesget: servicesget,
  findget: findget,
  
  carRegister:carRegister,
  signuserdata: signuserdata,
  loginuserdata: loginuserdata,
  matchmyotp: matchmyotp,
  showtaxi:showtaxi
};

// =====================================================================


async function bookMyTaxi(req,res) {
  try {
    let pcordinates = [];
    let pickupaddress = {};
    console.log(req.body.latitude);
    // console.log(req.body.longitude);
    if (req.body.latitude && req.body.longitude) {
      pcordinates.push(Number(req.body.latitude));
      pcordinates.push(Number(req.body.longitude));
      pickupaddress.type = "point";
      pickupaddress.pcordinates = pcordinates;
      console.log(pcordinates + "first");
      // console.log(pickupaddress.pcordinates);
      // console.log(req.body.latitude);
    }
    req.body.pickupaddress = pickupaddress;
    console.log(pcordinates +  "second");
    
    let dcordinates = [];
    let dropoffaddress = {};
    if (req.body.latitude && req.body.longitude) {
      dcordinates.push(Number(req.body.latitude));
      dcordinates.push(Number(req.body.longitude));
      dropoffaddress.type = "point";
      dropoffaddress.dcordinates = dcordinates;
    }
    req.body.pickupaddress = pickupaddress;

    const Customers = new taxim.Booktaxi({
      otp: req.body.otp,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      passenger: req.body.passenger,
      pickupaddres: pcordinates,
      dropoffaddres: pcordinates,
      selectdate: req.body.selectdate,
      selecttime: req.body.selecttime,
    });
    await Customers.save();

    res.send("done");
  } catch (error) {

    console.log(error);
    res.send(error);
  }
}

async function carRegister(req, res) {


  // try {
    console.log(req.body); 
    const idt = req.data
    console.log(idt);
    const seller = new myCarRegister.CarRegistermodel({    
    name: req.body.name,
    model: req.body.model,
    chessy_num: req.body.chessy_num,
    template_no: req.body.template_no,
    vehicle: req.body.vehicle,
    rate_hourly: req.body.rate_hourly,
    rate_per_day: req.body.rate_per_day,
    passenger: req.body.passenger,
    driverId:idt
  });
  // console.log(seller);
  // let role=["user","driver"]
  // console.log(driverId);
  console.log(req.data);
  const data = await usersign.Userdetails.findOne({_id:req.data});
  console.log(data);

  // console.log(data);
  if (data.UserType == "driver") {
    await seller.save();
  
    const idd = seller._id;
    if (req.files.length > 0) {
      await req.files.forEach((file) => {
        const img = new taximg.Taxiimage({
          vehicle_id: idd,

          imgpath: file.path,
        });
        img.save();
      });
    
    
    res.send("donedanadone");
    };
  }else{
    res.send("Uh are not fuckin driver")
  }
    
  
  }

// ==================================================

// ==================================================================

// app.post("/signuserdata",upload.single('Profile_Pic'),
async function signuserdata(req, res) {
  const newuser = new usersign.Userdetails({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,

    Phone: req.body.Phone,
    Password: req.body.Password,
    UserType: req.body.UserType,
    Profile_Pic: req.file.path,
    otp: req.body.otp,
    isVerified: false,
  });
  // console.log(signuserdata);
  const myotp = Math.floor(1000 + Math.random() * 9000);
  Object.assign(newuser, { otp: myotp });
  let data1 = await usersign.Userdetails.findOne({ Phone: req.body.Phone });
  if (data1) {
    res.send("Same Data Exists");

    res.end();
  } else {
    let data = await newuser.save();
    res.send(data);
    console.log("Done");
  }

}

// ==================================Loginuser=================================
// app.post("/loginuserdata",
async function loginuserdata(req,res) {
  try {
    // console.log("HI");
    const Lemail = req.body.Lemail;
    const Lpassword = req.body.Lpassword;
    console.log(req.body);

    const loginuser = await usersign.Userdetails.findOne({ Email: Lemail });
    console.log(loginuser);
    console.log("loginuser.email", loginuser.Email);
    const myid = loginuser._id;
  
    if (loginuser.Email === Lemail && loginuser.Password === Lpassword) {
      const tokenn = jwt.sign({ _id: myid }, "adshashbdasbh");
      // loginuser.genAuthToken(myid);

      console.log(tokenn, "login side token");
      res.send(tokenn);
      // res.send("You Are Verified");
      // console.log("Verified");
    } else {
      console.log("hi");
      res.send("bhakk");
    }
  } catch (error) {
    res.send(error);
  }
}

// =========================JWT=====================================
// const tokenn =useremail.genAuthToken(_iddrd);
//         // console.log(genAuthToken());
//            console.log(tokenn,"login side token");
//            res.send( tokenn)

// ======================================================

async function sendOtp(req, res) {
  try {
    const userData = await usersign.Userdetails.findOne({
      phoneNo: req.body.phoneNo,
      countryCode: req.body.countryCode,
      isDeleted: false,
    });
    if (userData) {
      res.send("Phone Number Already Existed");
    }
    let optdata = await model.otp.findOne({
      phoneNo: req.body.phoneNo,
      countryCode: req.body.countryCode,
      eventType: "SEND_OTP",
    });
    if (optdata)
      await model.otp.deletemany({
        _id: optdata._id,
      });
    let sendotpobj = req.body;
    sendotpobj.eventType = "SEND_OTP";
    sendotpobj.message = "Your Code Is {{otpcode}}";
    let otpdata = await service.otpService.sendOtp(sendotpobj);
    res.send("otp code send to ur register number");
  } catch (error) {
    res.status(400).send(error);  
  }
}
// ==========================================

async function verifyotp(req, res) {
  try {
    const otpdata = await service.otpservice.verify(req.body);
    if (!otpdata) {
      res.send("invalid otp");
    }
    res.send("otp_verified");
  } catch (error) {
    res.status(400).send(error);
  }
}

// =========================================================================================

// =======================OTP======================

async function sendotpverificationemail(req, res) {
  try {
    const myotp = `${1000 + Math.random() * 9000}`;

    const newotpverification = new otpverification({
      myotp: myotp,
      createdAt: date.now(),
      expiresAt: date.now() + 3600000,
    });
    newotpverification.save();
    res.send("done");
  } catch (error) {
    res.send(error);
  }
}

async function matchmyotp(req, res) {
  // console.log(req.body)
  let otp = req.body.otp;
  let Number = req.body.Number;
  // console.log(otp, Number);
  let data = await usersign.Userdetails.findOne({ Phone: Number });
  console.log(data.otp);
  if (data.otp === otp) {
    let userData = await usersign.Userdetails.updateOne(
      { _id: data._id },

      { $set: { IsVerified: true } }
    );
    console.log("done");
    res.send("done");
  } else {
    console.log("not");
    res.send("error");
  }
}

async function sendotpagain(req, res) {
  try {
    const Mob = req.body.Phone;
    console.log(Mob);
    const data = await usersign.Userdetails.findOne({ Phone: Mob });
    if (!data) throw "mobile no not exist ";
    console.log(data);
    const otpcode = Math.floor(100000 + Math.random() * 900000);
    if (otpcode) {
      await usersign.Userdetails.updateOne(
        { Phone: data.Phone },
        { $set: { otp: otpcode } }
      );
    }
  } catch (error) {
    console.log(error);
  }

  res.send("send otp again success");
}
// =================================================
function verify(req,res,next){  
  const token = req.header("authorization")
  console.log(token + "verify side token");
  const tokenslice = token.slice(7);
 console.log(tokenslice);
    jwt.verify(tokenslice,"adshashbdasbh",function(err,decode){
      if(err) throw res.send("Pranjal kya krra hai tu")
      req.data = decode._id
      console.log(decode);
   
      // if(err)
      //   res.send("token is not set");
      next()
      
  })
}
// =========================================
async function showtaxi(req,res){
  let mytaxi= await myCarRegister.CarRegistermodel.aggregate([
    {
      $lookup:{
        from:"usersigndatas",
        localField:"driverId",
        foreignField:"_id",
        as:"users"
      }
    },{
      $project:{
          carname: "$name",
          modelname:"$model",
          vehicle_type:"$vehicle",

          drivername: "$users.FirstName",
          phone: "$users.Phone"
      }
    }
  ])
  res.send(mytaxi)
} 
async function showbookings(req,res){
  let mybooking= userdatas

}
