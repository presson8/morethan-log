function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function inlineMarkdown(value: string) {
  let html = escapeHtml(value)
  html = html.replace(/!\\[([^\\]]*)\\]\\((https?:\\/\\/[^\\s)]+)\\)/g, '<img src="$2" alt="$1" />')
  html = html.replace(/\\[([^\\]]+)\\]\\((https?:\\/\\/[^\\s)]+)\\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
  html = html.replace(/\\[([^\\]]+)\\]\\((\\/[^\\s)]+)\\)/g, '<a href="$2">$1</a>')
  html = html.replace(/\`([^\`]+)\`/g, "<code>$1</code>")
  html = html.replace(/\\*\\*([^*]+)\\*\\*/g, "<strong>$1</strong>")
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>")
  html = html.replace(/\\*([^*]+)\\*/g, "<em>$1</em>")
  return html
}

export function renderMarkdown(source: string) {
  const lines = source.replace(/\\r/g, "").split("\n")
  const output: string[] = []
  let paragraph: string[] = []
  let listTag: "ul" | "ol" | null = null
  let code: string[] | null = null

  const closeList = () => {
    if (listTag) {
      output.push(`</${listTag}>`)
      listTag = null
    }
  }
  const closeParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${paragraph.map(inlineMarkdown).join("<br />")}</p>`)
      paragraph = []
    }
  }

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      closeParagraph()
      closeList()
      if (code) {
        output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)
        code = null
      } else {
        code = []
      }
      return
    }
    if (code) {
      code.push(line)
      return
    }
    if (!line.trim()) {
      closeParagraph()
      closeList()
      return
    }

    const heading = line.match(/^(#{1,6})\\s+(.+)$/)
    if (heading) {
      closeParagraph()
      closeList()
      const level = heading[1].length
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
      return
    }

    const quote = line.match(/^>\\s?(.*)$/)
    if (quote) {
      closeParagraph()
      closeList()
      output.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`)
      return
    }

    if (/^([-*_])(?:\\s*\\1){2,}\\s*$/.test(line)) {
      closeParagraph()
      closeList()
      output.push("<hr />")
      return
    }

    const unordered = line.match(/^\\s*[-*+]\\s+(.+)$/)
    const ordered = line.match(/^\\s*\\d+\\.\\s+(.+)$/)
    if (unordered || ordered) {
      closeParagraph()
      const nextTag = unordered ? "ul" : "ol"
      if (listTag !== nextTag) {
        closeList()
        output.push(`<${nextTag}>`)
        listTag = nextTag
      }
      output.push(`<li>${inlineMarkdown((unordered || ordered)![1])}</li>`)
      return
    }

    closeList()
    paragraph.push(line)
  })

  closeParagraph()
  closeList()
  if (code) output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)
  return output.join("\n")
}
