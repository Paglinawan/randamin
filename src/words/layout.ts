import { FlexMessage, FlexBubble } from '@line/bot-sdk'

const createCard = (
  data: {
    label: string
    concept: string
    example: string
    url: string
  }[],
): FlexMessage[] => {
  const contents: FlexBubble[] = data.map(
    ({ label, concept, example, url }) => {
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
    },
  )

  return [
    {
      type: 'flex',
      altText: 'Flex Message',
      contents: {
        type: 'carousel',
        contents,
      },
    },
  ]
}

export default createCard
