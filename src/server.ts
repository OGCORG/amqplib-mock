import { ServerProperties as AmqplibServerProperties } from "amqplib/properties";

export class ServerProperties implements AmqplibServerProperties {
  [key: string]: string | undefined;

  host: string;
  information: string;
  platform: string;
  product: string;
  version: string;

  constructor () {
    this.host = ''
    this.information = ''
    this.platform = ''
    this.product = ''
    this.version = ''
  }
}
