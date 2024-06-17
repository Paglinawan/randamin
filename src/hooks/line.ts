const prop = PropertiesService.getScriptProperties().getProperties()
const CHANEL_ACCESS_TOKEN = prop.CHANEL_ACCESS_TOKEN

export const sendMessage = (messages: string) => {
  const ENDPOINT_URL = 'https://api.line.me/v2/bot/message/broadcast'
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + CHANEL_ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      messages: [
        {
          type: 'text',
          text: messages,
        },
      ],
    }),
  }
  return UrlFetchApp.fetch(ENDPOINT_URL, options)
}
