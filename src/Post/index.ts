import { sendMessage } from '../utils/lineMessage'
import { doDone } from './doDone'
import { doLowerVisibility } from './doLowerVisibility'
import { doRaiseVisibility } from './doRaiseVisibility'
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
    const postbackData = JSON.parse(e.postback.data)
    if (postbackData.type === 'Done') {
      doDone(postbackData.currentId, '1-English')
      sendMessage([
        {
          type: 'text',
          text: 'アーカイブしました',
        },
      ])
    } else if (postbackData.type === 'lowerVisibility') {
      doLowerVisibility(postbackData.currentId, '1-English')
      sendMessage([
        {
          type: 'text',
          text: '今後、表示回数を減らします',
        },
      ])
    } else if (postbackData.type === 'raiseVisibility') {
      doRaiseVisibility(postbackData.currentId, '1-English')
      sendMessage([
        {
          type: 'text',
          text: '今後、表示回数を増やします',
        },
      ])
    }
  } else if (e.type === 'message') {
    writeSheet(e.message.text, '6-WriteSheet')
  }
}
