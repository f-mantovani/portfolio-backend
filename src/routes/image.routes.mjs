import Router from 'express'
import fileUpload from '../configs/cloudinary.mjs'
import throwError from '../utils/throwError.mjs'

const router = Router()

router.post('/', fileUpload.single('image'), (req, res, next) => {
  const file = req.file ? req.file.path : undefined
  try {
    throwError(!fileUpload, 'File not uploaded', 'File upload', 400)     
    res.status(200).json({ imageUrl: file})
  } catch (error) {
    next(error)
  }

})

export default router