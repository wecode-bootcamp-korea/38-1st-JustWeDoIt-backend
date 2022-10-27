const {database} = require('./dataSource')
const createUser = async (name, email, residentNumberFront, residentNumberBack, password) => { 
  const result = await database.query(`
	  INSERT INTO users (
	    name, 
			email, 
			resident_number_front,
			resident_number_back, 
			password
	  ) VALUES (
			?,
			?, 
			?, 
			?,
			?
	  )`, [name, email, residentNumberFront, residentNumberBack, password]
  )
	
  return result.insertId
}

const getUserByEmail = async (email) => { 
	const result = await database.query(`
		SELECT 
			id,
			name,
			email,
			password,
			resident_number_front AS residentNumberFront,
			resident_number_back AS residentNumberBack
		FROM users
		WHERE email=?`, [email]
	)

	return result[0]
}

const getUserById = async (id) => {
	const result = await database.query(`
		SELECT 
			id,
			name,
			email,
			password,
			resident_number_front AS residentNumberFront,
			resident_number_back AS residentNumberBack
		FROM users
		WHERE id=?`, [id]
	)

	return result[0]
}

module.exports = { 
	createUser,
	getUserByEmail,
	getUserById
}
