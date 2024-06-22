import { FlexMessage, FlexBubble } from '@line/bot-sdk'
const createCard = (
  data: {
    original: string
    translation: string
  }[],
): FlexMessage[] => {
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
          color: '#00ADA9',
          align: 'start',
          size: 'md',
          gravity: 'center',
          wrap: true,
        },
      ],
      backgroundColor: '#ffffff',
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
              text: translation,
              color: '#8C8C8C',
              size: 'sm',
              wrap: true,
            },
          ],
          flex: 1,
        },
      ],
      spacing: 'none',
      paddingBottom: '30px',
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
