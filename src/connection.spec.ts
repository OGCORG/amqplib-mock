import { Connection } from './connection'

describe(`${__filename}`, () => {
  it('test connection', async () => {
    const connection = new Connection()
    const channel = await connection.createChannel()
    console.log(channel)
  })
})
