import { ServerProperties as AmqplibServerProperties } from 'amqplib/properties'

export class ServerProperties implements AmqplibServerProperties {
  // eslint-disable-next-line no-undef
  [key: string]: string | undefined

  host: string
  information: string
  platform: string
  product: string
  version: string

  constructor() {
    this.host = ''
    this.information = ''
    this.platform = ''
    this.product = ''
    this.version = ''
  }
}
