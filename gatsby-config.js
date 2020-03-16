/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://api-uswest.graphcms.com/v1/ck7r0uthr05u401ek1etyd7ps/master',
      },
    },
    {
      resolve: 'gatsby-alias-imports',
      options: {
        aliases: {
          '~modules': 'src/modules',
          '~queries': 'src/queries',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
};
