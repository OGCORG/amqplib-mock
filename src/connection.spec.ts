import { deepStrictEqual } from 'assert'
import { connect } from './connection'

describe(__filename, () => {
  it('assertQueue', async () => {
    const connection = await connect('test')
    const channel = await connection.createChannel()

    deepStrictEqual(await channel.assertQueue('test_queue'), {
      messageCount: 0,
      consumerCount: 0,
      queue: 'test_queue'
    })

    channel.sendToQueue('test_queue', Buffer.from('message'))

    deepStrictEqual(await channel.assertQueue('test_queue'), {
      messageCount: 1,
      consumerCount: 0,
      queue: 'test_queue'
    })
  })
})
