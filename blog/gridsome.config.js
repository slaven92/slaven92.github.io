// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Slaven blog',
  siteUrl: 'https://www.slaven92.tk',
  plugins: [
    {
      use: "gridsome-plugin-pwa",
      options: {
        title: "Gridsome",
        startUrl: "/",
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "manifest.json",
        disableServiceWorker: false,
        serviceWorkerPath: "service-worker.js",
        cachedFileTypes: "js,json,css,html,png,jpg,jpeg,svg",
        shortName: "Gridsome",
        themeColor: "#666600",
        backgroundColor: "#ffffff",
        icon: "src/favicon.png", // must be provided like 'src/favicon.png'
        msTileImage: "",
        msTileColor: "#666600",
        gcmSenderId: undefined,
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'BlogPost',
        baseDir: './content/blog',
        path: '**/*.md',
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
    },
    {
      use: 'gridsome-plugin-robots-txt',
    },
  ],
  transformers: {
    remark: {}
  }
}
