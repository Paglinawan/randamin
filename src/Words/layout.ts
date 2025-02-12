import { FlexMessage, FlexBubble } from '@line/bot-sdk'
import { textColor } from '../constants/semantic-colors'
type DataType = { id: number; [key: string]: string | number | boolean }

const createCard = (data: DataType[]): FlexMessage[] => {
  return [
    {
      type: 'flex',
      altText: `${data[0].title} : ${data[0].desc}`,
      contents: {
        type: 'carousel',
        contents: data.map(({ id, title, desc, url }) => {
          const shortTitle =
            typeof title === 'string' && title.length > 50
              ? title.substring(0, 20) + '...'
              : String(title)

          const body: FlexBubble['body'] = {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: String(desc),
                size: 'xxs',
                color: textColor.black,
                wrap: true,
              },
              {
                type: 'text',
                text: String(title),
                size: 'lg',
                color: textColor.primary,
                weight: 'bold',
                wrap: true,
              },
            ],
            paddingTop: '12px',
            paddingBottom: '0px',
            paddingStart: '16px',
            paddingEnd: '16px',
            spacing: 'sm',
          }
          const footer: FlexBubble['footer'] & {
            contents: { contents: any[] }[]
          } = {
            type: 'box',
            layout: 'vertical',
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
                        url: 'https://thumbs.lateensail.net/randamin/button-archive.jpg',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'Words',
                        type: 'Done',
                        id: id + 1,
                        label: shortTitle,
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
                        url: 'https://thumbs.lateensail.net/randamin/button-decrease.jpg',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'Words',
                        type: 'lowerVisibility',
                        id: id + 1,
                        label: shortTitle,
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
                        url: 'https://thumbs.lateensail.net/randamin/button-increase.jpg',
                        aspectMode: 'fit',
                      },
                    ],
                    action: {
                      type: 'postback',
                      label: 'action',
                      data: JSON.stringify({
                        sheet: 'Words',
                        type: 'raiseVisibility',
                        id: id + 1,
                        label: shortTitle,
                      }),
                    },
                  },
                ],
              },
            ],
          }

          if (url) {
            footer.contents[0].contents.splice(1, 0, {
              type: 'box',
              layout: 'vertical',
              maxWidth: '40px',
              contents: [
                {
                  type: 'image',
                  url: 'https://thumbs.lateensail.net/randamin/button-more.jpg',
                  aspectMode: 'fit',
                },
              ],
              action: {
                type: 'uri',
                label: 'action',
                uri: String(url),
              },
            })
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
