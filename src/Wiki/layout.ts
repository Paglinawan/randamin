import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { textStyle, buttonStyle } from '../constants/semantic-colors'
type DataType = { id: number; [key: string]: string | number | boolean }

const createCard = (data: DataType[]): FlexMessage[] => {
  const contents: FlexBubble[] = data.map(({ label, concept, url }) => {
    let content: FlexBubble = {
      type: 'bubble',
      size: 'kilo',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: String(label),
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
                text: String(concept),
                color: textStyle.light.gray,
                size: 'xxs',
                wrap: true,
              },
            ],
            paddingTop: 'md',
          },
        ],
        paddingStart: 'xl',
        paddingEnd: 'xl',
        paddingBottom: 'xl',
      },
    }

    if (url) {
      content = {
        ...content,
        footer: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'button',
              action: {
                type: 'uri',
                label: 'MORE',
                uri: String(url),
              },
              height: 'sm',
              style: 'primary', // #ffffff
              color: buttonStyle.secondary.bg,
            },
          ],
          paddingAll: 'md',
        },
      }
    }

    return content
  })

  return [
    {
      type: 'flex',
      altText: `${data[0].label} : ${data[0].concept}`,
      contents: {
        type: 'carousel',
        contents,
      },
    },
  ]
}

export default createCard
