import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json('Token not valid!')
      req.user = user
      next()
    })
  } else {
    return res.status(400).json('You are not authenticated!')
  }
}
