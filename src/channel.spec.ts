import { deepStrictEqual } from 'assert'
import { Channel } from './channel'
import { connect } from './connection'

describe(__filename, () => {
  let channel: Channel

  const queueName = 'test_queue'
  before(async () => {
    const connection = await connect('test')
    channel = await connection.createChannel()
  })

  it('send to queue', async () => {
    deepStrictEqual(await channel.assertQueue(queueName), {
      messageCount: 0,
      consumerCount: 0,
      queue: queueName
    })

    channel.sendToQueue(queueName, Buffer.from('message'))

    deepStrictEqual(await channel.assertQueue(queueName), {
      messageCount: 1,
      consumerCount: 0,
      queue: queueName
    })
  })

  it('consume queue', async () => {
    await channel.assertQueue(queueName)
    const messageList: string[] = []
    channel.consume(queueName, msg => {
      // todo: test other properties in the future
      messageList.push(msg?.content.toString() || '')
    })

    await channel.sendToQueue(queueName, Buffer.from('message 2'))
    deepStrictEqual(messageList, ['message', 'message 2'])

    await channel.close()
  })
})
