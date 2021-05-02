import {
  Channel as AmqplibChannel,
  ConfirmChannel as AmqplibConfirmChannel,
  ConsumeMessage,
  GetMessage,
  Message,
  Options
} from 'amqplib'
import Bluebird from 'bluebird'
import events from 'events'
import { QueueManager } from './queue-manager'
import { Replies } from './replies'

export class Channel extends events.EventEmitter implements AmqplibChannel {
  ack(message: Message, allUpTo?: boolean): void {}

  ackAll(): void {}

  // @ts-ignore
  assertExchange(
    exchange: string,
    type: 'direct' | 'topic' | 'headers' | 'fanout' | 'match' | string,
    options?: Options.AssertExchange
  ): Bluebird<Replies.AssertExchange> {
    return Bluebird.resolve(new Replies.AssertExchange())
  }

  // @ts-ignore
  assertQueue(
    queue: string,
    options?: Options.AssertQueue
  ): Bluebird<Replies.AssertQueue> {
    return Bluebird.resolve(QueueManager.assert(queue))
  }

  // @ts-ignore
  bindExchange(
    destination: string,
    source: string,
    pattern: string,
    args?: any
  ): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  // @ts-ignore
  bindQueue(
    queue: string,
    source: string,
    pattern: string,
    args?: any
  ): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  // @ts-ignore
  cancel(consumerTag: string): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  // @ts-ignore
  checkExchange(exchange: string): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  // @ts-ignore
  checkQueue(queue: string): Bluebird<Replies.AssertQueue> {
    return Bluebird.resolve(new Replies.AssertQueue())
  }

  // @ts-ignore
  close(): Bluebird<void> {
    return Bluebird.resolve()
  }

  // @ts-ignore
  consume(
    queue: string,
    onMessage: (msg: ConsumeMessage | null) => void,
    options?: Options.Consume
  ): Bluebird<Replies.Consume> {
    return Bluebird.resolve(new Replies.Consume())
  }

  // @ts-ignore
  deleteExchange(
    exchange: string,
    options?: Options.DeleteExchange
  ): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  // @ts-ignore
  deleteQueue(
    queue: string,
    options?: Options.DeleteQueue
  ): Bluebird<Replies.DeleteQueue> {
    return Bluebird.resolve(new Replies.DeleteQueue())
  }

  // @ts-ignore
  get(queue: string, options?: Options.Get): Bluebird<GetMessage | false> {
    return Bluebird.resolve(false)
  }

  nack(message: Message, allUpTo?: boolean, requeue?: boolean): void {}

  nackAll(requeue?: boolean): void {}

  // @ts-ignore
  prefetch(count: number, global?: boolean): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  publish(
    exchange: string,
    routingKey: string,
    content: Buffer,
    options?: Options.Publish
  ): boolean {
    return false
  }

  // @ts-ignore
  purgeQueue(queue: string): Bluebird<Replies.PurgeQueue> {
    return Bluebird.resolve(new Replies.PurgeQueue())
  }

  // @ts-ignore
  recover(): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  reject(message: Message, requeue?: boolean): void {}

  sendToQueue(
    queue: string,
    content: Buffer,
    options?: Options.Publish
  ): boolean {
    QueueManager.send(queue, content)
    return true
  }

  // @ts-ignore
  unbindExchange(
    destination: string,
    source: string,
    pattern: string,
    args?: any
  ): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }

  // @ts-ignore
  unbindQueue(
    queue: string,
    source: string,
    pattern: string,
    args?: any
  ): Bluebird<Replies.Empty> {
    return Bluebird.resolve(new Replies.Empty())
  }
}

export class ConfirmChannel extends Channel implements AmqplibConfirmChannel {
  publish(
    exchange: string,
    routingKey: string,
    content: Buffer,
    options?: Options.Publish,
    callback?: (err: any, ok: Replies.Empty) => void
  ): boolean {
    return false
  }

  sendToQueue(
    queue: string,
    content: Buffer,
    options?: Options.Publish,
    callback?: (err: any, ok: Replies.Empty) => void
  ): boolean {
    QueueManager.send(queue, content)
    return true
  }

  // @ts-ignore
  waitForConfirms(): Bluebird<void> {
    return Bluebird.resolve()
  }
}
