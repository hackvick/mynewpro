const { Register } = require("./register");
const { Storeimg } = require("./img");
const { comment } = require("./comments");
const { Taxim } = require("./booktaxi");
const { Taxiimage } = require("./taximg");
const { Taxiowner } = require("./myCarRegister");
const { Userdetails } = require("./usersign")




const register=Register;
const img=Storeimg;
const Comment=comment;
const taxim=Taxim;
const taximg=Taxiimage;
const taxiow =Taxiowner;
const usersign=Userdetails;

module.exports= {register,img,Comment,taxim,taximg,taxiow,usersign}