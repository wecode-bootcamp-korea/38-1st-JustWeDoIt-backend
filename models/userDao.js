const createCheckOut = async (userId, phoneNumber, address ) => { 
    const result = await database.query(`
        INSERT INTO user
                              id,
                              phone_number,
                              address, 
                              
                            
                              
              ) VALUES (
                              ?,
                              ?, 
                              ?               
              )`,
      [userId, phoneNumber, address]
    )

    return result.insertOption
}

module.exports = { 
    createUser,
    createCheckOut,
    getUserByEmail,
    getUserById
}
