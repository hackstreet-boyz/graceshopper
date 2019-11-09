const adminGate = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    next('not admin')
  }
}

const userAdminGate = (req, res, next) => {
  if (
    (req.user && req.user.isAdmin) ||
    (req.user && req.user.id === +req.params.userId)
  ) {
    next()
  } else {
    next('forbidden')
  }
}

const userGate = (req, res, next) => {
  if (req.user && req.user.id === +req.params.userId) {
    next()
  } else {
    next('please sign in')
  }
}

module.exports = {userAdminGate, adminGate, userGate}
