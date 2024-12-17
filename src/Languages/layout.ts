import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { textStyle } from '../constants/semantic-colors'
type DataType = { id: number; [key: string]: string | number | boolean }

const createCard = (data: DataType[]): FlexMessage[] => {
  const contents: FlexBubble[] = data.map(({ id, original, translation }) => ({
    type: 'bubble',
    size: 'kilo',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: String(original),
          weight: 'bold',
          size: 'lg',
          wrap: true,
          color: textStyle.light.primary,
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: String(translation),
              color: textStyle.light.gray,
              size: 'xxs',
              wrap: true,
            },
          ],
          paddingTop: 'md',
        },
      ],
      paddingAll: 'xl',
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          style: 'secondary',
          action: {
            type: 'postback',
            label: '✔️',
            data: JSON.stringify({ action: 'checkedDone', row: id }),
          },
          color: '#e8e8e8',
          height: 'sm',
        },
      ],
      alignItems: 'flex-end',
      paddingTop: '0px',
      paddingStart: '0px',
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
