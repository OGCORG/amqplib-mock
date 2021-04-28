import {
  ServerProperties as AmqplibServerProperties,
  Connection as AmqplibConnection,
  Options
} from 'amqplib'
import Bluebird from 'bluebird'
import events from 'events'
import { Channel, ConfirmChannel } from './channel'
import { ServerProperties } from './server'

export class Connection
  extends events.EventEmitter
  implements AmqplibConnection {
  connection: { serverProperties: AmqplibServerProperties }

  constructor() {
    super()
    this.connection = { serverProperties: new ServerProperties() }
  }

  // @ts-ignore
  close(): Bluebird<void> {
    return Bluebird.resolve()
  }

  // @ts-ignore
  createChannel(): Bluebird<Channel> {
    return Bluebird.resolve(new Channel())
  }

  // @ts-ignore
  createConfirmChannel(): Bluebird<ConfirmChannel> {
    return Bluebird.resolve(new ConfirmChannel())
  }
}

export function connect(
  url: string | Options.Connect,
  socketOptions?: any
): Bluebird<Connection> {
  return Bluebird.resolve(new Connection())
}
