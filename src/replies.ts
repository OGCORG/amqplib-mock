import { Replies as amqplibReplies } from 'amqplib'

export namespace Replies {
  export class Empty implements amqplibReplies.Empty {}
  export class AssertQueue implements amqplibReplies.AssertQueue {
    consumerCount: number
    messageCount: number
    queue: string
    constructor() {
      this.consumerCount = 0
      this.messageCount = 0
      this.queue = ''
    }
  }

  export class PurgeQueue implements amqplibReplies.PurgeQueue {
    messageCount: number
    constructor() {
      this.messageCount = 0
    }
  }

  export class DeleteQueue implements amqplibReplies.DeleteQueue {
    messageCount: number
    constructor() {
      this.messageCount = 0
    }
  }

  export class AssertExchange implements amqplibReplies.AssertExchange {
    exchange: string
    constructor() {
      this.exchange = ''
    }
  }

  export class Consume implements amqplibReplies.Consume {
    consumerTag: string
    constructor() {
      this.consumerTag = ''
    }
  }
}
