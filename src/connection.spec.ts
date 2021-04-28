import { connect } from './connection'

describe(`${__filename}`, () => {
  it('test connection', async () => {
    const connection = await connect('test')
    const channel = await connection.createChannel()
    console.log(channel)
  })
})
