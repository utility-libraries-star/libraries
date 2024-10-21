const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');
const yaml = require('js-yaml');

const projectsConfig = yaml.load(fs.readFileSync('projects.yaml', 'utf8'));

const entry = {};

projectsConfig.projects.forEach((project) => {
  const projectPath = path.resolve(__dirname, `src/${project.name}/index.js`);

  if (fs.existsSync(projectPath)) {
    const projectName =
      project.name + (project.parent ? `_${project.parent}` : '');
    entry[projectName] = projectPath;
  }
});

module.exports = {
  mode: 'production',
  entry: entry,

  output: {
    filename: (pathData) => {
      const project = projectsConfig.projects.find((p) => {
        const nameWithParent = pathData.chunk.name.split('_');
        const projectName = nameWithParent[0];
        const parentName = nameWithParent[1];

        return p.name === projectName && (!p.parent || p.parent === parentName);
      });

      const outputDir = project.parent || project.name;

      return `${outputDir}/${project.outputName}`;
    },
    path: path.resolve(__dirname)
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'src/components'),
          path.resolve(__dirname, 'src/utils')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true
        }
      })
    ]
  },

  watch: false
};
