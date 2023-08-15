module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      })
    }
    return config
  },

  swcMinify: true,

  compiler: {
    styledComponents: true
  }
}
