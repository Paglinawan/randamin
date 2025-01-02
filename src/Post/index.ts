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

    switch (postbackData.sheet) {
      case 'English':
        handlePostback(postbackData.type, postbackData.currentId, '1-English')
        break
      case 'Words':
        handlePostback(postbackData.type, postbackData.currentId, '2-Words')
        break
      case 'Messages':
        handlePostback(postbackData.type, postbackData.currentId, '3-Messages')
        break
      case 'Articles':
        handlePostback(postbackData.type, postbackData.currentId, '4-Articles')
        break
      case 'Amazon':
        handlePostback(postbackData.type, postbackData.currentId, '5-Amazon')
        break
      default:
        break
    }
  } else if (e.type === 'message') {
    writeSheet(e.message.text, '6-WriteSheet')
  }
}

const handlePostback = (type: string, currentId: number, sheetName: string) => {
  if (type === 'Done') {
    doDone(currentId, sheetName)
  } else if (type === 'lowerVisibility') {
    doLowerVisibility(currentId, sheetName)
  } else if (type === 'raiseVisibility') {
    doRaiseVisibility(currentId, sheetName)
  }
}
