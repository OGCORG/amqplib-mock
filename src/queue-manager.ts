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
}

export class QueueManager {
  private static _queueMap: { [queueName: string]: Queue } = {}
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
        messageList: []
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
}
