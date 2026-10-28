// TREE scroll-spy + ASCII reading progress for the article TOC sidebar.
// Loaded by ArticleToc.astro; harmless on pages without #article-toc.

const TOC_OFFSET = 80 // reading line, px below viewport top (header h-16 + 16px)
const TOC_BAR_CELLS = 20
const TOC_FILLED = "█" // █
const TOC_EMPTY = "░" // ░

function tocUpdate() {
  const bar = document.getElementById("toc-progress")
  const article = document.querySelector("article")
  if (bar && article) {
    const top = article.getBoundingClientRect().top + window.scrollY
    const height = article.offsetHeight
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    // Cap by the distance the reading line can actually travel, or long
    // articles would never reach 100%.
    const travel = Math.max(1, Math.min(height, maxScroll + TOC_OFFSET - top))
    let pct = (window.scrollY + TOC_OFFSET - top) / travel
    pct = Math.min(1, Math.max(0, pct))
    const filled = Math.round(pct * TOC_BAR_CELLS)
    let cells = ""
    for (let i = 0; i < TOC_BAR_CELLS; i++) cells += i < filled ? TOC_FILLED : TOC_EMPTY
    bar.textContent = cells + " " + Math.round(pct * 100) + "%"
  }

  const links = document.querySelectorAll("#article-toc a[data-slug]")
  if (!links.length) return
  let activeSlug = null
  for (const link of links) {
    const slug = link.getAttribute("data-slug")
    const heading = document.getElementById(slug)
    if (heading && heading.getBoundingClientRect().top <= TOC_OFFSET + 8) activeSlug = slug
  }
  for (const link of links) {
    const on = link.getAttribute("data-slug") === activeSlug
    link.classList.toggle("toc-active", on)
    const conn = link.querySelector(".toc-conn")
    // "→ " is 2 cells like "├─"/"└─", so the tree art stays aligned
    if (conn) conn.textContent = on ? "→ " : link.getAttribute("data-conn")
  }
}

function tocClick(e) {
  const link = e.target && e.target.closest ? e.target.closest("#article-toc a[data-slug]") : null
  if (!link) return
  const slug = link.getAttribute("data-slug")
  const heading = document.getElementById(slug)
  if (!heading) return
  e.preventDefault()
  window.scrollTo({
    top: heading.getBoundingClientRect().top + window.scrollY - TOC_OFFSET,
    behavior: "smooth"
  })
  history.replaceState(null, "", "#" + slug)
}

document.addEventListener("scroll", tocUpdate)
document.addEventListener("click", tocClick)
document.addEventListener("DOMContentLoaded", tocUpdate)
document.addEventListener("astro:after-swap", tocUpdate)
tocUpdate()
