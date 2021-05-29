import { ConsumeMessage } from 'amqplib'
import { Replies } from './replies'

type Queue = {
  meta: {
    queueName: string
    exchangeName: string
    messageCount: number
    consumerCount: number
    consumerTag: string
  }
  messageList: Buffer[]
  /** list of consumer tag */
  consumerList: string[]
}

export class QueueManager {
  private static _terminate = false
  private static _queueMap: { [queueName: string]: Queue } = {}

  static destroy() {
    this._terminate = true
  }

  // TODO: add assert option
  static assert(queueName: string): Replies.AssertQueue {
    let queue = this._queueMap[queueName]
    if (!queue) {
      queue = this._queueMap[queueName] = {
        meta: {
          queueName,
          exchangeName: '',
          messageCount: 0,
          consumerCount: 0,
          consumerTag: ''
        },
        messageList: [],
        consumerList: []
      }
    }

    return {
      queue: queue.meta.queueName,
      messageCount: queue.meta.messageCount,
      consumerCount: queue.meta.consumerCount
    }
  }

  static send(queueName: string, message: Buffer) {
    const queue = this._queueMap[queueName]
    if (queue) {
      queue.messageList.unshift(message)
      queue.meta.messageCount++
    }
  }

  static consume(
    queueName: string,
    consumerTag: string,
    onMessage: (msg: ConsumeMessage | null) => void
  ) {
    const queue = this._queueMap[queueName]
    if (!queue) {
      // todo: there should be more suitable error type for here
      throw Error(`${queueName} not found`)
    }

    queue.consumerList.push(consumerTag)
    queue.meta.consumerCount++
    this._registerMessage(queue, onMessage)
  }

  private static _registerMessage(
    queue: Queue,
    onMessage: (msg: ConsumeMessage | null) => void
  ) {
    if (this._terminate) {
      return
    }

    const message = queue.messageList?.pop()
    if (message) {
      // todo: implement this laster
      const consumerMessage: ConsumeMessage = {
        content: message,
        fields: {
          deliveryTag: 0,
          redelivered: false,
          exchange: '',
          routingKey: ''
        },
        properties: {
          headers: {},
          contentType: undefined,
          contentEncoding: undefined,
          deliveryMode: undefined,
          priority: undefined,
          correlationId: undefined,
          replyTo: undefined,
          expiration: undefined,
          messageId: undefined,
          timestamp: Date.now(),
          type: undefined,
          userId: undefined,
          appId: undefined,
          clusterId: undefined
        }
      }

      onMessage(consumerMessage)
      queue.meta.messageCount--
    }

    setImmediate(() => {
      this._registerMessage(queue, onMessage)
    })
  }
}
