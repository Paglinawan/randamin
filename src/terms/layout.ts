import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { RowsType } from './types'

const createCard = (data: RowsType[]): FlexMessage[] => {
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
            text: label,
            weight: 'bold',
            size: 'lg',
            wrap: true,
            color: '#333333',
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: concept,
                color: '#999999',
                size: 'xxs',
                wrap: true,
              },
            ],
            paddingTop: 'md',
          },
        ],
        paddingStart: 'xl',
        paddingEnd: 'xl',
        paddingBottom: 'none',
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
                uri: url,
              },
              height: 'sm',
              style: 'secondary',
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
