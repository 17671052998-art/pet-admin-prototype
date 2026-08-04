import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve("dist/client");
const indexHtml = await readFile(resolve(outputDir, "index.html"), "utf8");
const scriptPath = indexHtml.match(/src="\.\/(assets\/[^\"]+\.js)"/)?.[1];
const stylePath = indexHtml.match(/href="\.\/(assets\/[^\"]+\.css)"/)?.[1];

if (!scriptPath || !stylePath) {
  throw new Error("未找到本地预览所需的脚本或样式资源。");
}

const [script, style] = await Promise.all([
  readFile(resolve(outputDir, scriptPath), "utf8"),
  readFile(resolve(outputDir, stylePath), "utf8"),
]);

const localPreview = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>4Party 宠物运营后台</title>
    <style>${style}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>${script}</script>
  </body>
</html>
`;

await writeFile(resolve("本地预览.html"), localPreview, "utf8");
console.log("已生成 本地预览.html，可直接双击打开。");
