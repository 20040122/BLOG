import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "230's Blog",
  DESCRIPTION: "科研记录",
  AUTHOR: "张长明",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "记录科研工作中遇到的各种问题和解决方案。",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "记录我参与的科研项目。",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "搜索",
  DESCRIPTION: "按关键字搜索所有文章和项目。",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "z2307692313@gmail.com",
    HREF: "mailto:z2307692313@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "20040122",
    HREF: "https://github.com/20040122"
  },
]

