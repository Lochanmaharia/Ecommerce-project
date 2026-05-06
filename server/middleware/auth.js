var jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// const protect = async (req, res, next) => {
//     let token = null;

//     // Get token from cookies
//     if (req.cookies && req.cookies.jwt) {
//         token = req.cookies.jwt;
//     }

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Token is missing",
//         })
//     }
//     // Verify token
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
//     req.user = await UserModel.findOne({ _id: decoded.id });

//     if (!req.user) {
//         return res.status(401).json({
//             success: false,
//             message: "User not found",
//         });
//     }
//     next();
// }





// const protect = async (req, res, next) => {
//   try {
//     let token = null;

//     // 1. Cookie se token
//     if (req.cookies?.jwt) {
//       token = req.cookies.jwt;
//     }

//     // 2. Header se token
//     if (!token && req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // 3. Token missing
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is missing",
//       });
//     }

//     // 4. Verify token
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     console.log(decoded, "decoded");

//     // 5. Find user
//     const user = await UserModel.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // 6. Attach user
//     req.user = user;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// Authorization applies

//protect 



const protect = async (req, res, next) => {
  try {
    let token = null;

    // Get token from cookies
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
       token = req.headers.authorization
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
   

    // Find user
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const authorized = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Not authorized",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
};

module.exports = { protect,authorized }