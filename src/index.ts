import { run } from '@grammyjs/runner'
import { bot } from './bot'

import { ignoreOld, sequentialize } from 'grammy-middlewares'

import composer from './handlers/main'

bot
  .use(ignoreOld(30 * 60))
  .use(sequentialize())
  .use(composer)

const runner = run(bot)

const shutdown = async () => {
  await runner.stop()

  process.exit(0)
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
