module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/xiaotian/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        app: 'components/app',
        common: 'components/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views',
      },
    },
  },
};
