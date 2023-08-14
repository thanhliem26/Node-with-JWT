const { userValidate } = require('../helper/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../helper/jwt_service")
const createError = require("http-errors");
const User = require("../Models/User.modal");

module.exports = {
    register:  async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const { error } = userValidate(req.body);
      
          if (error) {
            throw createError(error.details[0].message);
          }
      
          const isExits = await User.findOne({
              username: email
          })
      
          if(isExits) {
              throw createError.Conflict(`${email} is ready been register!`)
          }
      
          const user = new User({
            username: email,
            password,
          })
      
          const saveUser = await user.save();
      
          return res.json({status: 'ok', element: saveUser})
        } catch (err) {
          next(err);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
          const { refreshToken } = req.body;
      
          if(!refreshToken) throw createError.BadRequest();
      
          const { userId } = await verifyRefreshToken(refreshToken);
          const accessToken = await signAccessToken(userId);
          const refhToken = await signRefreshToken(userId);
      
          res.json({
            accessToken,
            refhToken,
          })
        } catch(err) {
          next(createError(err))
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        const { error } = userValidate(req.body);
      
        if (error) {
          throw createError(error.details[0].message);
        }
      
        try {
          const user = await User.findOne({ username: email }) 
      
          if(!user) {
            throw createError.NotFound("User not registered")
          }
      
          const isValid = await user.isCheckPassword(password);
      
          if(!isValid) {
            throw createError.Unauthorized('Password wrong')
          }
      
          const accessToken = await signAccessToken(user._id);
          const refreshToken = await signRefreshToken(user._id);
      
          res.json({
            accessToken,
            refreshToken,
          })
      
        } catch(error) {
          next(error)
        }
    },
    logout: async (req, res, next) => {
        try {
          const { refreshToken } = req.body;
      
          if(!refreshToken) {
            throw createError.BadRequest();
          }
      
          const { userId } = await verifyRefreshToken(refreshToken);
          res.json({
            message: "logout succes."
          })
        } catch(err) {
          next(err)
        }
    },
    getListsts: async (req, res, next) => {
        const listUsers = [
          {
            email: 'abc@gmail.com',
          },
          {
            email: 'def@gmail.com'
          }
        ]
      
        res.json({
          listUsers
        })
    },
}