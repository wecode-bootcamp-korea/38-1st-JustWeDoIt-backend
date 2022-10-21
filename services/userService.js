const checkOut = async (userId, phoneNumber, address) => {
 
    const createCheckOut = await userDao.createCheckOut(
      userId,
      phoneNumber,
      address
    );
    
    
    return createCheckOut;
  };
  
  
  module.exports = {
    signUp,
    signIn,
    checkOut,
    getUserById
  }