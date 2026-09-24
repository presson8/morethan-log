const CONFIG = {
  profile: {
    name: "Presson8",
    image: "/avatar.svg",
    role: "学习与生活记录",
    bio: "记录学习、生活与值得分享的片段。",
    email: "",
    linkedin: "",
    github: "presson8",
    instagram: "",
  },
  projects: [
    {
      name: "hellowen",
      href: "https://github.com/presson8/hellowen",
    },
  ],
  blog: {
    title: "Hellowen",
    description: "一个不依赖 Notion 的中文个人日志。",
    scheme: "dark",
  },

  link: "https://github.com/presson8/morethan-log",
  since: 2026,
  lang: "zh-CN",
  ogImageGenerateURL: "https://og-image-korean.vercel.app",

  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "",
    },
  },
  isProd: process.env.VERCEL_ENV === "production",
  revalidateTime: 21600 * 7,
}

module.exports = { CONFIG }
