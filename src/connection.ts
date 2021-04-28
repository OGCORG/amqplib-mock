import { ServerProperties as AmqplibServerProperties, Connection as AmqplibConnection } from "amqplib";
import Bluebird from "bluebird";
import { Channel, ConfirmChannel } from "./channel";
import { ServerProperties } from "./server";

export class Connection implements AmqplibConnection {
  connection: { serverProperties: AmqplibServerProperties };

  constructor () {
    this.connection = {serverProperties: new ServerProperties}
  }

  // @ts-ignore
  close (): Bluebird<void> {
    return Bluebird.resolve()
  }

  // @ts-ignore
  createChannel (): Bluebird<Channel> {
    return Bluebird.resolve(new Channel());
  }

  // @ts-ignore
  createConfirmChannel (): Bluebird<ConfirmChannel> {
    return Bluebird.resolve(new ConfirmChannel());
  }
}
