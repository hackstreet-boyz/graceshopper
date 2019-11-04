const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1
    }
  },
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Review
