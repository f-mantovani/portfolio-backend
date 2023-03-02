export function isOwner (req, _, next) {
	const { username, email } = req.payload
  try {
    if (username !== process.env.USERNAME || email !== process.env.EMAIL) {
      const error = new Error ()
      error.message = 'Sorry, but you are not authorized to execute this action'
      error.place = 'Owner validation'
      throw error
    }   
  } catch (error) {
    next(error)
  }

  next()
}
