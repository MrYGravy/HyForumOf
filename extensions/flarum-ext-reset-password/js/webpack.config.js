const path = require('path');

module.exports = {
  entry: './src/forum.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'forum.js',
    library: {
      type: 'var',
      name: ['flarum', 'extensions', 'miforums-reset-password-redesign'],
    },
  },
  externals: {
    'flarum/forum/app': 'flarum.core.compat[\'flarum/forum/app\']',
    'flarum/common/extend': 'flarum.core.compat[\'flarum/common/extend\']',
    'flarum/common/utils/Stream': 'flarum.core.compat[\'flarum/common/utils/Stream\']',
    'flarum/common/utils/classList': 'flarum.core.compat[\'flarum/common/utils/classList\']',
    'flarum/forum/components/ResetPasswordPage': 'flarum.core.compat[\'flarum/forum/components/ResetPasswordPage\']',
    'flarum/forum/components/LogInModal': 'flarum.core.compat[\'flarum/forum/components/LogInModal\']',
    'flarum/common/components/Button': 'flarum.core.compat[\'flarum/common/components/Button\']',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'm' }],
            ],
          },
        },
      },
    ],
  },
};
