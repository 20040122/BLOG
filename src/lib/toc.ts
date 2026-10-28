import type { MarkdownHeading } from "astro"

export type TocLine = {
  slug: string
  text: string
  prefix: string    // "│  " / "   " per ancestor level
  connector: string // "├─" | "└─"
  depth: number     // normalized, 0-based
}

type TocNode = {
  h: MarkdownHeading
  rel: number
  children: TocNode[]
}

// Build ASCII tree lines from flat markdown headings. Depth is normalized to
// the shallowest heading, so h1-based posts produce the same art as h2/h3 ones.
export function buildTocTree(headings: MarkdownHeading[]): TocLine[] {
  if (headings.length === 0) return []
  const minDepth = Math.min(...headings.map(h => h.depth))

  // Parent each heading under the nearest previous heading with smaller rel depth
  const root: TocNode[] = []
  const stack: TocNode[] = []
  for (const h of headings) {
    const node: TocNode = { h, rel: h.depth - minDepth, children: [] }
    while (stack.length && stack[stack.length - 1].rel >= node.rel) stack.pop()
    const parent = stack[stack.length - 1]
    if (parent) parent.children.push(node)
    else root.push(node)
    stack.push(node)
  }

  const lines: TocLine[] = []
  const walk = (nodes: TocNode[], prefix: string) => {
    nodes.forEach((node, i) => {
      const isLast = i === nodes.length - 1
      lines.push({
        slug: node.h.slug,
        text: node.h.text,
        prefix,
        connector: isLast ? "└─" : "├─",
        depth: node.rel
      })
      walk(node.children, prefix + (isLast ? "   " : "│  "))
    })
  }
  walk(root, "")
  return lines
}
