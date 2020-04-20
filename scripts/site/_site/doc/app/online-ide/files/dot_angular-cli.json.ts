export default `
{
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": ["assets", "favicon.ico"],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "prefix": "app",
      "styles": [
        "styles.css",
        "node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css",
        "node_modules/ng-zorro-antd/resizable/style/index.min.css"
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ]
}
`;
