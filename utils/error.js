/* 
 * simply wrapped asynchronous function inside of the catchAsync function.
 * This function will return a new anonymous function, 
 * which will then be assigned to asynchronous contoller
 */
const catchAsync = func => {
	return (req, res, next) => {
		func(req, res, next).catch((error) => next(error))
	}
}

const globalErrorHandler = (err, req, res, next) => {
	console.error(err.stack)

	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({ message: err.message })
}


module.exports = { catchAsync, globalErrorHandler }
