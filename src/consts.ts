import type { Site, Page, Links, Socials, Friends } from "@types"

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

// Mates Page
export const MATES: Page = {
  TITLE: "Mates",
  DESCRIPTION: "友链存放处，欢迎朋友们来串门。",
}

// Friends
export const FRIENDS: Friends = [
  {
    NAME: "XenWayne's Blog",
    HREF: "https://xenwayne.top/",
    AVATAR: "https://gcore.jsdelivr.net/gh/XenWayne/sitefile/img/avatar.webp",
    DESCR: "寸进具欢喜，万物皆可爱。",
  },
  {
    NAME: "e哥の自我修养",
    HREF: "https://alexanderqwq.top/",
    AVATAR: "https://s21.ax1x.com/2024/10/09/pAJZTn1.jpg",
    DESCR: "e哥の自我修养",
  },
  {
    NAME: "Kuaimiaoda's Blog",
    HREF: "https://kuaimiaoda.cn/",
    AVATAR: "https://gcore.jsdelivr.net/gh/kuaimiaoda/random-menu/xxx/asus/202410261937471.webp",
    DESCR: "Kuaimiaoda's Blog",
  },
]

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
  {
    TEXT: "Mates",
    HREF: "/mates",
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

