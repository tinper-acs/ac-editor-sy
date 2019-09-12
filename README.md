# 富文本编辑器 版本 AcEditorSy

React复杂文本编辑器组件，可插入日期、下拉框、单选框、多选框、单行文本输入框、多行文本输入框、固定字段等常用组件，同时提供文本编辑生成的页面支持动态交互(表单提交)、内容动态替换(设置默认值)和生成水印功能，生成的页面支持前端打印(表格分页带表头、表格横排打印、自定义打印样式)和导出word功能。


## 如何使用
```js
npm install ac-editor-sany --save
// 文本编辑器组件,内容展示组件, 导出pdf组件,word组件
import { AcEditorSany,AcEditorShow,AcEditorPDF,AcEditorWord } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';
```


## 代码演示

## API

### AcEditorSany API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|--------------
editorId  | string               | 必填项        | 文本编辑器唯一id
onRef     | function             | 非必须        | 设置ref属性
htmlString| string               | ""           | 文本编辑器默认字符串
height    | string               | "0px"        | 文本编辑器默认最小高
fixedDate | array                | []           | 支持插入固定字段，参照demo1
defaultData| array               | []           | 默认值替换，替换htmlString 中组件

### AcEditorShow API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
editorId  | string               | 必填项        | 展示文本内容组件唯一id
onRef     | function             | 非必须        | 设置ref属性
htmlString| string               | ""           | 展示文本内容
isActive  | boolean              | true         | 文本内容可交互
defaultData| array               | []           | 文本内容被替换信息
waterMarkerText| string          | “”           | 生成水印

### AcEditorPDF API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
formInfo  | function             | 必填项        | 回调函数，返回值{doc,idList}(要打印的dom，替换值数组)
title     | string/element       | "打印"        | 打印按钮
tablePageList| array             | []           | 指定table 分页打印(id:表格id，rowNum：A4纸上打印多少条记录)
tableRow  | number               | 非必须        | 最后一个旋转table 的A4 最多多少行
tableTitleId| string             | 非必须         | 表标题 例如："附件一"
tableNoticeId| string            |  非必须             | 表格备注 例如:"注:xxxx"

### AcEditorWord API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
wordId    | string               | 必填项        | 与要导出的 dom id 保持一致
fileName  | string               | 非必须        | 导出word名
wordStyles| string               | 非必须        | 导出word 样式
title     | string/element       | "导出wrod"    | 导出word按钮
getDefaultInfo| function         | 非必须        | 获取导出默认值
success| function                |  非必须       | 导出成功回调

### fixedDate 参数

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
field     | string               | 必填项        | 固定字段唯一标识
direction | string               |"horizontal"  | 固定字段布局方向(horizontal,vertical)
data      | string               | ""           | 固定字段值(select、checkbox、radio 用 "|||" 链接)
type      | string               | "text"       | 固定字段类型(text,date,checkbox,radio,select,textarea)
filedType | string               | "文本"        | 固定字段中文类型
defaultValue| string               | ""           | 固定字段默认值( checkbox用 "|||" 链接)

### defaultData 参数

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
field     | string               | 必填项        | 分页表格id
direction | string               |"horizontal"  | 组件布局方向(horizontal,vertical)
data      | string               | ""           | 组件值(select、checkbox、radio 用 "|||" 链接)
type      | string               | "text"       | 组件类型(text,date,checkbox,radio,select,textarea)
defaultValue| string               | ""           | 组件默认值( checkbox用 "|||" 链接)



### tablePageList 参数

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|------------------
id        | string               | 必填项        | 分页表格id
rowNum    | number               | 20           | 分页条数

## 注意事项

暂无

## 更新日志

