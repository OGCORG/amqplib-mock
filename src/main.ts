import { Connection } from "./connection";

async function main() {
  const connection = new Connection()
  const channel = await connection.createChannel()
  console.log(await channel.bindExchange('','','',''))
  console.log('test')
}

main().then(() => {
  console.log('finish')
})