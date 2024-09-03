import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { RowsType } from './types'

const createCard = (data: RowsType[]): FlexMessage[] => {
  const contents: FlexBubble[] = data.map(({ original, translation }) => ({
    type: 'bubble',
    size: 'kilo',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: original,
          weight: 'bold',
          size: 'lg',
          wrap: true,
          color: '#00ADA9',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: translation,
              color: '#999999',
              size: 'xxs',
              wrap: true,
            },
          ],
          paddingTop: 'md',
        },
      ],
      paddingAll: 'xl',
    },
  }))
  return [
    {
      type: 'flex',
      altText: `${data[0].original} : ${data[0].translation}`,
      contents: {
        type: 'carousel',
        contents,
      },
    },
  ]
}
export default createCard
