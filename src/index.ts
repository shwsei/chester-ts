import {initHandler} from './handlers/main'
import {bot} from './bot'
import env from './env'
(async () => {

  initHandler()
  bot.catch(err => console.log('Ocorreu um erro!', err))
  await bot.launch({
    webhook: {
      domain: `${env.APP_NAME}.herokuapp.com`,
      port: Number(env.PORT)
    }
  })
  console.log(`@${bot.botInfo?.username} está sendo executado!`);

})()
