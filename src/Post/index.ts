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
        handlePostback(
          postbackData.type,
          postbackData.id,
          '1-English',
          postbackData.label,
        )
        break
      case 'Words':
        handlePostback(
          postbackData.type,
          postbackData.id,
          '2-Words',
          postbackData.label,
        )
        break
      case 'Messages':
        handlePostback(
          postbackData.type,
          postbackData.id,
          '3-Messages',
          postbackData.label,
        )
        break
      case 'Articles':
        handlePostback(
          postbackData.type,
          postbackData.id,
          '4-Articles',
          postbackData.label,
        )
        break
      case 'Amazon':
        handlePostback(
          postbackData.type,
          postbackData.id,
          '5-Amazon',
          postbackData.label,
        )
        break
      default:
        break
    }
  } else if (e.type === 'message') {
    writeSheet(e.message.text, '6-WriteSheet')
  }
}

const handlePostback = (
  type: string,
  currentId: number,
  sheetName: string,
  label: string,
) => {
  if (type === 'Done') {
    doDone(currentId, sheetName, label)
  } else if (type === 'lowerVisibility') {
    doLowerVisibility(currentId, sheetName, label)
  } else if (type === 'raiseVisibility') {
    doRaiseVisibility(currentId, sheetName, label)
  }
}
