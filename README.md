## 这是一个可视化项目

#### 项目别名配置

第一步安装 path 插件 npm i path

第二步在 vite.config.js 中先引入 import path from "path";

第三步在 vite.config.js 中添加如下配置

```js
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "/src"),
        //为 /src配置别名@
      },
      // 可以专门为组件文件路径设置别名
      {
        find: "C",
        replacement: path.resolve(__dirname, "/src/components"),
      },
    ],
  },
```

完整展示

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "/src"),
        //为 /src配置别名@
      },
      // 可以专门为组件文件路径设置别名
      {
        find: "C",
        replacement: path.resolve(__dirname, "/src/components"),
      },
    ],
  },
});
```

第四步在项目下新建 jsconfig.js

配置如下

```js
{
  "compilerOptions": {
    "target": "ES6",
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules"]
}

```

第五步安装 Path Intellisense vscode 插件

在插件界面点击设置按钮点击拓展设置

找到 Path-intellisense: Mappings 点击在 setting.json 中编辑

添加该配置项：

```js
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src",
    "components": "${workspaceRoot}/src/components",
    "views": "${workspaceRoot}/src/views",
    "network": "${workspaceRoot}/src/network",
    "common": "${workspaceRoot}/src/common"
  }
```
