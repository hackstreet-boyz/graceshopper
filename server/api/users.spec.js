/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Cody',
        lastName: 'Johnson',
        address: '123 main st',
        email: 'cody@puppybook.com',
        phone: '123-45-67',
        password: 'bones',
        isAdmin: true
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(500)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
