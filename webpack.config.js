const path = require('path');
const fs = require('fs-extra');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './go-daddy/src/index.js',
  output: {
    filename: 'install-widget-on-godaddy.js',
    path: path.resolve(__dirname, './go-daddy/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tapAsync('AfterEmitPlugin', (_, callback) => {
          const sourceFile = path.resolve(
            __dirname,
            'go-daddy/install-widget-on-godaddy.js'
          );
          const destinationFile = path.resolve(
            __dirname,
            'hostinger/install-widget-on-hostinger.js'
          );

          fs.pathExists(sourceFile, (err, exists) => {
            if (err) {
              console.error('Error checking file existence:', err);
              return callback(err);
            }

            if (exists) {
              fs.copy(sourceFile, destinationFile, (copyErr) => {
                if (copyErr) {
                  console.error('Error copying file:', copyErr);
                  return callback(copyErr);
                }

                console.log('File copied successfully to Hostinger directory!');
                callback();
              });
            } else {
              console.warn('Source file does not exist yet. Skipping copy.');
              callback();
            }
          });
        });
      }
    }
  ],
  mode: 'production'
};
