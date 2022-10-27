const { userService } = require('../services')
const { catchAsync } = require('../utils/error')

const signUp = catchAsync(async (req, res) => {  
  const { name, email, residentNumberFront, residentNumberBack, password } = req.body;

  const insertId = await userService.signUp(name, email, residentNumberFront, residentNumberBack, password);

  res.status(201).json({ insertId });
})

const signIn = async (req, res) => {
const { email, password } = req.body;

    try {
        const accessToken = await userService.signIn(email, password)
        res.status(200).json({ 
            accessToken,
            message : 'SUCCESS'
        })
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
}

module.exports = {
    signUp,
    signIn
}

    