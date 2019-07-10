
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'assets/main.less'    
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      const sassResourcesLoader = {
        loader: 'sass-resources-loader',
        options: {
          resources: ['assets/style/theme.less', 'assets/style/mixins.less']
        }
      }
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.less.push(sassResourcesLoader)
        }
        if (rule.test.toString() === '/\\.less$/') {
          rule.use.push(sassResourcesLoader)
        }
      })
    }
  }
}

