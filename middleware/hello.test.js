import request from 'supertest'
import app from '../testSupport/serverSideApp'

const PATH = '/hello'

describe('GET /hello', () => {
  describe('when query param "name" provided', () => {
    describe('when "name" is blank', () => {
      const params = { name: '' }
      it('responds with status code 500', async () => {
        const response = await request(app).get(PATH).query(params)
        expect(response.status).toEqual(500)
        // done()
      })
    })
    describe('when "name" is not blank', () => {
      const params = { name: 'John' }
      it('responds with status code 200', async () => {
        const response = await request(app).get(PATH).query(params)
        expect(response.status).toEqual(200)
        // done()
      })
      describe('response body', () => {
        it('is a JSON object with correct "name" and "message"', async () => {
          const response = await request(app).get(PATH).query(params)
          expect(response.body).toEqual({
            name: params.name,
            message: `Hello, ${params.name}.`
          })
        //   done()
        })
      })
    })
  })
  describe('when query param "name" not provided', () => {
    it('responds with status code 500', async () => {
      const response = await request(app).get(PATH)
      expect(response.status).toEqual(500)
    //   done()
    })
  })
})