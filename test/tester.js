import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture, options = {}) => {

  const tester = webpack(
  {
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, '../src/spark-resource-loader.js'),
          options: {
              base:
              {
                  "base" : path.resolve(__dirname, './'),
                  "base2": path.resolve(__dirname, './')
              }
          }
        }
      }]
    }
  });//webpack

  tester.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    tester.run((err, stats) => 
    {
      if (err || stats.hasErrors()) 
      {
        reject(err);
      }

      resolve(stats);
    });
  });
};
