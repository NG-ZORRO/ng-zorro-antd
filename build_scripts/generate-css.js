const fs = require('fs');
const path = require('path');
const less = require('less');
const targetPath = path.resolve(__dirname, '../publish/src');
const componentsLessFilePath = `${targetPath}/components.less`;
const antLessFilePath = `${targetPath}/ng-zorro-antd.less`;


function parseLess(lessContent, path) {
  less.render(
    lessContent.toString('utf-8'),
    {
      compress: true,
      paths: [],
      filename: path,
      javascriptEnabled: true
    }
  )
  .then(out => {
    fs.writeFileSync(
      path.replace('.less', '.css'),
      out.css,
    );
  })
  .catch((err) => {
    console.log(err);
  })
}



const antdLessContent = fs.readFileSync(antLessFilePath);
parseLess(
  antdLessContent,
  antLessFilePath,
);

const componentsLessContent = fs.readFileSync(componentsLessFilePath);
parseLess(
  componentsLessContent,
  componentsLessFilePath,
);
