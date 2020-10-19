// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  siteUrl: 'https://www.slaven92.tk',
  plugins: [
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
    }

  ],
  transformers: {
    remark: {}
  }
}
