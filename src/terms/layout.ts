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
            color: '#ffffff',
            align: 'start',
            size: 'md',
            gravity: 'center',
            wrap: true,
          },
        ],
        backgroundColor: '#00ADA9',
        spacing: 'none',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: concept,
                color: '#8C8C8C',
                size: 'sm',
                wrap: true,
              },
            ],
            flex: 1,
          },
        ],
        spacing: 'none',
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
                label: '参考',
                uri: url,
              },
              color: '#00ADA9',
            },
          ],
        },
        styles: {
          footer: {
            separator: true,
          },
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
