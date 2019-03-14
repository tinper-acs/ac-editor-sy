## ac-editor-sany

复杂文本编辑器

[![npm version](https://img.shields.io/npm/v/ac-editor-sany.svg)](https://www.npmjs.com/package/ac-editor-sany)
[![NPM downloads](http://img.shields.io/npm/dt/ac-editor-sany.svg?style=flat)](https://npmjs.org/package/ac-editor-sany)

在线演示：https://tinper-acs.github.io/ac-editor-sany/

## 代码演示


### 1. 简介

React复杂文本编辑器组件，可插入日期、下拉框、单选框、多选框、文本输入框等dom元素的复杂文本编辑器，同时提供文本编辑生成的页面支持动态交互、生成水印和内容动态替换功能，生成的页面支持前端打印功能。

### 2. 安装

1. 通过`npm`安装
    ```bash
    npm install ac-editor-sany --save
    ```
2. 国内镜像通过`cnpm`安装
    ```bash
    cnpm install ac-editor-sany --save
    ```
3. 用友内网通过`ynpm`安装
    ```bash
    ynpm install ac-editor-sany --save
    ```

### 3. 使用

```js
import { AcEditorSany } from 'ac-editor-sany';

class Demo1 extends Component {
  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为组件的id,type,direction
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };
  render() {
    const htmlString = '<h3>xxxx公司供应商合同</h3>';
    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc}>保存</button>
        <AcEditorSany
          // 组件id
          editorId="acEditorSanyId"
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
          // 文本框默认值
          htmlString={htmlString}
          // 文本框默认最小高
          height="300px"
        />
      </div>
    );
  }
}

export default Demo1;

```

### 4. AcEditorSany API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|--------------
editorId  | string               | 必填项        | 文本编辑器唯一id
onRef     | function             | 非必须        | 设置ref属性
htmlString| string               | ""           | 文本编辑器默认字符串
height    | string               | "0px"        | 文本编辑器默认最小高

### 5. AcEditorShow API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
editorId  | string               | 必填项        | 展示文本内容组件唯一id
onRef     | function             | 非必须        | 设置ref属性
htmlString| string               | ""           | 展示文本内容
isActive  | boolean              | true         | 文本内容可交互
defaultData| array               | []           | 文本内容被替换信息
waterMarkerText| string          | “”           | 生成水印

### 6. AcEditorShow API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
pdfId     | string               | 必填项        | 被打印部分id
title     | string|element       | "打印"        | 打印按钮



### 目录结构

```bash
.
├── config
│   ├── webpack.base.js
│   ├── webpack.config.dev.js       # 开发环境配置
│   ├── webpack.config.ghpages.js   # 打包放到github.io环境配置
│   ├── webpack.config.prod.js      # 发布组件环境配置
├── demo
│   ├── demolist
│   │   └── Demo1.js                # 实例1，调用src中的 AcEditorSany 组件，进行展示
│   │   └── Demo2.js                # 实例1，调用src中的 AcEditorShow 组件，进行展示
│   │   └── Demo3.js                # 实例1，调用src中的 AcEditorPDF 组件，进行展示
│   ├── demo.scss                   # demo中需要的基础样式
│   ├── index-demo-base.js          # demo模版文件
│   └── index.js                    # ac-tools sample生成的文件
├── package.json
├── docs
│   ├── demolist
│   │   └── Demo1.js                # 实例1，调用src中的组件，进行展示
│   │   └── Demo2.js                # 实例2，调用src中的组件，进行展示
│   │   └── Demo3.js                # 实例3，调用src中的组件，进行展示
│   ├── demo.scss                   # demo中需要的基础样式
│   ├── index-demo-base.js          # demo模版文件
│   └── index.js                    # ac-tools sample生成的文件
├── ghpages                         # 实例打包文件
├── mock                            # mock数据
├── src
│   ├── assets                      # ac-tools md需要的静态文件
│   ├── EditorModal
│   │   └── index.js                # 弹框组件
│   │   └── index.less  			      # 弹框组件样式
│   ├── PreviewModal
│   │   └── index.js                # 文本编辑内容预览
│   │   └── index.less  			      # 文本编辑器预览样式
│   └── AcEditorPDF.js              # 打印PDF组件
│   └── AcEditorSany.js             # 复杂文本编辑器组件
│   └── AcEditorSave.js             # 获取编辑器里的内容组件
│   └── AcEditorSeal.js             # 页面盖章组件
│   └── AcEditorShow.js             # 展示文本内容组件
│   └── index.js                    # 组件出口
│   └── index.less                  # 组件样式
├── static                          # 模版静态文件
├── .babelrc
├── .editorconfig                   # 给编辑器的规范
├── .eslitrc                        # 代码规范(采用airbnb规范，默认不打开的，在webpack.config.dev.js 中注释部分放开就启用)
├── .package.json
└── .postcss.config.js
```

### 常用命令

将 demo合并到demolist的实例中

```
ac-tools sample
```

启动开发环境

```
npm run dev
```

实例代码打包

```
npm run deploy
```

将markdown 文件转为静态文件，并上传github.io网站

```
ac-tools md
```

生成组件

```
npm run build
```

上传ynpm或者npm

```
ynpm publish      # npm publish
```

