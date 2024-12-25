import { sendMessage } from '../utils/lineMessage'
import { checkedDone } from './checkedDone'
import { writeSheet } from './writeSheet'

// イベントを受け取って実行する
export const doPost = (e: any) => {
  const EVENTS = JSON.parse(e.postData.contents).events
  for (const event of EVENTS) {
    execute(event)
  }
}

// イベントを実行する
export const execute = (e: any) => {
  if (e.type === 'postback') {
    checkedDone(Number(e.postback.data), '1-English')
    sendMessage([
      {
        type: 'text',
        text: 'アーカイブしました',
      },
    ])
  } else if (e.type === 'message') {
    writeSheet(e.message.text, '6-WriteSheet')
  }
}
