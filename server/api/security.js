const adminGate = (req, res, next) => {
  console.log('>>>>>>>>', req.user.isAdmin)
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    const error = new Error('401 Inaccessible')
    error.status = 401
    next(error)
  }
}

const userAdminGate = (req, res, next) => {
  if (
    (req.user && req.user.isAdmin) ||
    (req.user && req.user.id === +req.params.userId)
  ) {
    next()
  } else {
    const error = new Error('401 Inaccessible')
    error.status = 401
    next(error)
  }
}

const userGate = (req, res, next) => {
  if (req.user && req.user.id === +req.params.userId) {
    next()
  } else {
    const error = new Error('401 Inaccessible')
    error.status = 401
    next(error)
  }
}

module.exports = {userAdminGate, adminGate, userGate}
