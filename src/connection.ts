import { ServerProperties as AmqplibServerProperties, Connection as AmqplibConnection } from "amqplib";
import Bluebird from "bluebird";
import events from 'events';
import { Channel, ConfirmChannel } from "./channel";
import { ServerProperties } from "./server";

export class Connection implements AmqplibConnection, events.EventEmitter {
  connection: { serverProperties: AmqplibServerProperties };

  constructor () {
    this.connection = {serverProperties: new ServerProperties}
  }

  addListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    on(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    once(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    off(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: string | symbol): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    rawListeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    emit(event: string | symbol, ...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    listenerCount(event: string | symbol): number {
        throw new Error("Method not implemented.");
    }
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
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
