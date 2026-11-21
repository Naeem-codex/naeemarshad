// Shows a description with real headings, bullet points and bold text.
// HOW TO WRITE IN THE DESCRIPTION (src/content/...):
//   ## MAIN HEADING        -> big bold heading
//   ### Small heading.     -> smaller bold heading
//   * point  (or - point, • point) -> bullet point
//   **bold words**         -> bold inside a sentence
//   a blank line starts a new paragraph
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.length > 4 && part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part)
}

export default function RichText({ text = '', className = '' }) {
  const blocks = []
  let list = null
  text.split('\n').forEach(raw => {
    const line = raw.trim()
    const bullet = line.match(/^[*•-]\s+(.*)$/)
    if (bullet) {
      if (!list) { list = []; blocks.push({ type: 'ul', items: list }) }
      list.push(bullet[1])
      return
    }
    list = null
    if (!line) return
    if (line.startsWith('### ')) blocks.push({ type: 'h4', text: line.slice(4) })
    else if (line.startsWith('## ')) blocks.push({ type: 'h3', text: line.slice(3) })
    else blocks.push({ type: 'p', text: line })
  })
  return <div className={`rich ${className}`}>{blocks.map((b, i) => {
    if (b.type === 'ul') return <ul key={i}>{b.items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ul>
    if (b.type === 'h3') return <h3 key={i}>{inline(b.text)}</h3>
    if (b.type === 'h4') return <h4 key={i}>{inline(b.text)}</h4>
    return <p key={i}>{inline(b.text)}</p>
  })}</div>
}
