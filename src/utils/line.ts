import { FlexMessage } from '@line/bot-sdk'
const prop = PropertiesService.getScriptProperties().getProperties()
const CHANEL_ACCESS_TOKEN = prop.CHANEL_ACCESS_TOKEN

export const sendMessage = (messages: FlexMessage[]) => {
  const ENDPOINT_URL = 'https://api.line.me/v2/bot/message/broadcast'
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + CHANEL_ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      messages,
    }),
  }
  return UrlFetchApp.fetch(ENDPOINT_URL, options)
}
export const getMessage = (e: any) => {
  const EVENTS = JSON.parse(e.postData.contents).events
  for (const event of EVENTS) {
    if (!event.message.text) return
    return event.message.text
  }
}
