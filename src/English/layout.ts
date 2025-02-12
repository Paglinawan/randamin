import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { textColor } from '../constants/semantic-colors'
type DataType = { id: number; [key: string]: string | number | boolean }

const createCard = (data: DataType[]): FlexMessage[] => {
  return [
    {
      type: 'flex',
      altText: `${data[0].original} : ${data[0].translation}`,
      contents: {
        type: 'carousel',
        contents: data.map(({ id, original, translation }) => {
          const body: FlexBubble['body'] = {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: String(original),
                size: 'lg',
                color: textColor.primary,
                weight: 'bold',
                wrap: true,
              },
              {
                type: 'text',
                text: String(translation),
                size: 'xxs',
                color: textColor.subtle,
                wrap: true,
              },
            ],
            paddingTop: '12px',
            paddingBottom: '8px',
            paddingStart: '16px',
            paddingEnd: '16px',
            spacing: 'sm',
          }

          const footer: FlexBubble['footer'] = {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'button',
                    action: {
                      type: 'postback',
                      label: '▼',
                      data: JSON.stringify({
                        sheet: 'English',
                        type: 'lowerVisibility',
                        id: id + 1,
                        label: String(original),
                      }),
                    },
                    style: 'primary',
                    height: 'sm',
                  },
                  {
                    type: 'button',
                    action: {
                      type: 'postback',
                      label: '▲',
                      data: JSON.stringify({
                        sheet: 'English',
                        type: 'raiseVisibility',
                        id: id + 1,
                        label: String(original),
                      }),
                    },
                    style: 'primary',
                    height: 'sm',
                  },
                  {
                    type: 'button',
                    action: {
                      type: 'postback',
                      data: JSON.stringify({
                        sheet: 'English',
                        type: 'Done',
                        id: id + 1,
                        label: String(original),
                      }),
                      label: '✗',
                    },
                    style: 'secondary',
                    height: 'sm',
                  },
                ],
                spacing: 'md',
              },
            ],
            alignItems: 'flex-end',
            paddingTop: '8px',
            paddingBottom: '12px',
            paddingStart: '16px',
            paddingEnd: '16px',
          }

          return {
            type: 'bubble',
            size: 'kilo',
            body,
            footer,
          }
        }),
      },
    },
  ]
}
export default createCard
