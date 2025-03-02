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
            paddingTop: 'md',
            paddingBottom: 'md',
            paddingStart: 'lg',
            paddingEnd: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'ー English',
                size: 'xxs',
                color: textColor.subtle,
                wrap: true,
              },
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
                color: textColor.black,
                wrap: true,
              },
            ],
          }

          const footer: FlexBubble['footer'] = {
            type: 'box',
            layout: 'vertical',
            paddingTop: '0px',
            paddingBottom: 'md',
            paddingStart: 'lg',
            paddingEnd: 'lg',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                spacing: 'md',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '40px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-delete.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'English',
                        type: 'Done',
                        id: id + 1,
                        label: String(original),
                      }),
                    },
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '56px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-decrease.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'English',
                        type: 'lowerVisibility',
                        id: id + 1,
                        label: String(original),
                      }),
                    },
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    maxWidth: '56px',
                    contents: [
                      {
                        type: 'image',
                        url: 'https://thumbs.lateensail.net/randamin/btn-increase.png',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'English',
                        type: 'raiseVisibility',
                        id: id + 1,
                        label: String(original),
                      }),
                    },
                  },
                ],
              },
            ],
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
