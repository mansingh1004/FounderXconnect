// // const UserModel = require("../models/userModel");
// // const bcrypt = require('bcrypt');
// // const jwt =require("jsonwebtoken");
// // const  nodemailer = require('nodemailer');

// import UserModel from "../models/userModel.js";
// import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken";
// import nodemailer from 'nodemailer';




// const userLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const User = await UserModel.findOne({ email: email });

//     if (!User) {
//       return res.status(400).send({ msg: "Invalid Email" });
//     }

//     const passwordMatch = await bcrypt.compare(password, User.password);
//     if (!passwordMatch) {
//       return res.status(400).send({ msg: "Password does not match" });
//     }

//     const token = jwt.sign(
//       { _id: User._id },   // _id use karo
//       process.env.SECRETE_KEY,
//       { expiresIn: "1d" }
//     );

//     res.status(200).send({ token: token, userName: User.name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ msg: "Server error" });
//   }
// };















// // const userLogin = async (req, res) => {

// //   const {email,password}=req.body;
// //   try {

// //     const User= await UserModel.findOne({email:email})

// //     if(!User){
// //       res.status(400).send({msg:"Invalid Email"})

// //     }

// //     const passwordMatch = await bcrypt.compare(password, User.password);
// //     if(!passwordMatch){
// //       res.status(400).send({msg:"Password does not match"});
// //     }


// //    const token = await jwt.sign({id:User._id},process.env.SECRETE_KEY,{ expiresIn: "1d" })

// //   // console.log(token);
// //    res.status(200).send({token:token})
// //   } catch (error) {
// //     console.log(error)
    
// //   }


// // }
 











// // const userRegistration = async (req, res) => {
// //    const { name, email, password } =req.body;
// // try {
  

// //   const saltRounds = 10; // 10 rounds is the default
// // const salt = await bcrypt.genSalt(saltRounds);
// // const hashedPassword = await bcrypt.hash(password, salt);

// //    const Data=await UserModel.create({
// //     name:name,
// //     email:email,
// //     password:hashedPassword
// //    })
// //        res.status(200).send({msg:" User Succesfully  Registered !!!"});

// // }
// // catch (error) {
// //   console.log(error)
  
// // }

// // }

   




// const userRegistration = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).send({ msg: "All fields are required" });
//   }

//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     await UserModel.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(200).send({ msg: "User Successfully Registered!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ msg: "Server error" });
//   }
// };











// const userAuth = async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.status(401).json({ error: "Token missing" });

//     const verified = jwt.verify(token, process.env.SECRETE_KEY); // yahan bhi fix
//     if (!verified || !verified._id)
//       return res.status(401).json({ error: "Invalid token" });

//     const user = await UserModel.findById(verified._id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json(user);
//   } catch (error) {
//     console.log("Token verification error:", error.message);
//     return res.status(401).json({ error: "JWT malformed or expired" });
//   }
// };





// // const userAuth = async (req, res) => {
// //   try {
// //     const token = req.header("x-auth-token");
// //     if (!token) return res.status(401).json({ error: "Token missing" });

// //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
// //     if (!verified || !verified._id) return res.status(401).json({ error: "Invalid token" });

// //     const user = await UserModel.findById(verified._id);
// //     if (!user) return res.status(404).json({ error: "User not found" });

// //     res.json(user);
// //   } catch (error) {
// //     console.log("Token verification error:", error.message);
// //     return res.status(401).json({ error: "JWT malformed or expired" });
// //   }
// // };




// //forgot password


// export const UserForgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // Create reset token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.SECRET_KEY,   // spelling fix
//       { expiresIn: "15m" }      // 15 minutes is safer
//     );

//     // Email config
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // use app password
//       },
//     });

//     let mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Reset Password Link",
//       html: `
//         <h3>Password Reset</h3>
//         <p>Click the link below to reset your password:</p>
//         <a href="http://localhost:5173/reset-password/${user._id}/${token}">
//           Reset Password
//         </a>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({
//       status: "success",
//       msg: "Reset link sent to your email",
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Server error" });
//   }
// };











//  export  const ResetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const user = await user.findOne({
//       _id: decoded.id,
//       resetToken: token,
//       resetExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Token expired or invalid" });
//     }

//     const hash = await bcrypt.hash(password, 10);
//     user.password = hash;
//     user.resetToken = null;
//     user.resetExpire = null;
//     await user.save();

//     res.json({ msg: "Password reset successfully" });
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid token" });
//   }
// };







// export {
//     userRegistration,
//     userLogin,
//     userAuth,
//     // UserForgotPassword,
//     ResetPassword 
// };






// // module.exports = {
// //     userRegistration,
// //     userLogin,
// //   userAuth,
// //   // UserForgotPassword
// // }




























import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

// --- User Registration ---
export const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ msg: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).send({ msg: "User Successfully Registered!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

// --- User Login ---
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({ email: email });

    if (!User) {
      return res.status(400).send({ msg: "Invalid Email" });
    }

    const passwordMatch = await bcrypt.compare(password, User.password);
    if (!passwordMatch) {
      return res.status(400).send({ msg: "Password does not match" });
    }

    const token = jwt.sign(
      { _id: User._id },
      process.env.SECRET_KEY, 
      { expiresIn: "1d" }
    );

    res.status(200).send({ token: token, userName: User.name });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

// --- User Auth (Get Profile) ---
export const userAuth = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ error: "Token missing" });

    const verified = jwt.verify(token, process.env.SECRET_KEY); 
    if (!verified || !verified._id)
      return res.status(401).json({ error: "Invalid token" });

    const user = await UserModel.findById(verified._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.log("Token verification error:", error.message);
    return res.status(401).json({ error: "JWT malformed or expired" });
  }
};

// --- Forgot Password ---
export const UserForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password Link",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="http://localhost:5173/reset-password/${user._id}/${token}">
          Reset Password
        </a>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: "success",
      msg: "Reset link sent to your email",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// --- Reset Password ---
export const ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    await user.save();

    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};

// -----------------------------------------------------
// IMPORTANT: The bottom export block was deleted here.
// The code will now run without "Duplicate export" errors.
// -----------------------------------------------------