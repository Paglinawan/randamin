const fetchUrl = (url: string) => {
  try {
    const response = UrlFetchApp.fetch(url)
    const html = response.getContentText()

    const document = HtmlService.createHtmlOutput(html).getContent()

    const titleMatch = document.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : '-'

    const descriptionMatch = document.match(
      /<meta\s+[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i,
    )
    const description = descriptionMatch ? descriptionMatch[1].trim() : '-'

    return { title, description }
  } catch (error) {
    Logger.log('Error fetching URL content: ' + error)
    return { title: '-', description: '-' }
  }
}
export default fetchUrl
