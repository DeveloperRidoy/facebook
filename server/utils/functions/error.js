const error = (err, req, res, next) => {
      return res.status(500).json({err, message: 'this is coming from error handling middleware'})
}
    

module.exports = error;