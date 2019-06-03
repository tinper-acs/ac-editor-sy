# 富文本编辑器sany版本 AcEditorSany

React复杂文本编辑器组件，可插入日期、下拉框、单选框、多选框、单行文本输入框、多行文本输入框、固定字段等常用组件，同时提供文本编辑生成的页面支持动态交互(表单提交)、内容动态替换(设置默认值)和生成水印功能，生成的页面支持前端打印(表格分页带表头、表格横排打印、自定义打印样式)和导出word功能。

## 何时使用

富文本编辑器

## 如何使用


1.AcEditorSany使用
```js
import { AcEditorSany } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';

class Demo1 extends Component {
  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为插入组件属性(field,direction,type,data,defaultValue) 数组
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };

  // 固定字段数据
  fixedDate = [
    {
      field: 'buyerwwyy1', // 固定字段唯一标识
      type: 'text', // 字段类型 (text,date,checkbox,radio,select,textarea)
      filedType: '文本', //字段类型中文名
      fieldName: '买方名称', // 字段名称
      data: 'xxxx', // 字段值(checkbox、select、radio值用 "|||" 链接)
      defaultValue: '买方名称', // 默认选中值(checkbox 用 "|||")
    },
    {
      field: 'salernameyy22',
      type: 'text',
      filedType: '文本',
      fieldName: '卖方名称',
      data: 'xxxx',
      defaultValue: '卖方名称',
    },
    {
      field: 'contractswwwignyy3',
      type: 'date',
      fieldName: '合同签订日期',
      filedType: '日期',
      data: '2019-02-20',
      defaultValue: '2019-02-20',
    },
    {
      field: 'contractstrwwwyy4',
      type: 'date',
      fieldName: '合同开始日期',
      filedType: '日期',
      data: '2019-02-20',
      defaultValue: '2019-02-20',
    },
    {
      field: 'contractendxxxyy5',
      type: 'date',
      fieldName: '合同结束日期',
      filedType: '日期',
      data: '2019-02-20',
      defaultValue: '2019-02-20',
    },
    {
      field: 'paytewwwrmyy6',
      type: 'select',
      filedType: '下拉',
      fieldName: '付款条件',
      data: '现金支付|||微信支付|||支付宝支付',
      defaultValue: '微信支付',
    },
    {
      field: 'isrebatwwweyy7',
      type: 'radio',
      filedType: '单选',
      fieldName: '是否返利',
      data: '是|||否',
      defaultValue: '否',
    },
  ];


  render() {

    // 默认值替换
    const defaultData = [
      {
        field: 'buyerwwyy1', // 被替换对象的唯一标识
        direction: 'horizontal', // 组件布局方向(horizontal,ver)
        data: '买方名称', // 组件值
        type: 'text', // 组件类型
        defaultValue: '买方名称', // 组件默认值
      },
      {
        field: 'salernameyy22',
        direction: 'horizontal',
        data: '卖方名称',
        type: 'text',
        defaultValue: '卖方名称',
      },
      {
        field: 'contractswwwignyy3',
        direction: 'horizontal',
        data: '2019-02-20',
        type: 'date',
        defaultValue: '2019-02-20',
      },
    ];
    let htmlString = '<h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span><input id="buyerwwyy1" type="text" value="买方名称" onkeyup="onKeyUpInput(event)" actype="text" style="width: 116px"><input id="salernameyy22" type="text" value="卖方名称" onkeyup="onKeyUpInput(event)" actype="text" style="width: 116px"><input type="text" id="contractswwwignyy3" value="2019-02-20" actype="date" style="width: 100px" readonly="true"></span><br></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul>';

    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc}>保存</button>
        <AcEditorSany
          // 组件id
          editorId="acEditorSanyId"
          // 设置ref属性
          onRef={ref => this.child = ref}
          htmlString={htmlString}  // 文本框默认值
          defaultData={defaultData} // 替换组件默认值
          height="300px"  // 文本框默认最小高
          fixedDate={this.fixedDate} // 固定字段
        />
      </div>
    );
  }
}

export default Demo1;

```

2.AcEditorShow 使用

```js
class Demo2 extends Component {

  saveFunc = () => {
    // 为文本编辑器里的html字符串
    const html = this.child.getHtml2String();
    console.log('文本编辑器内容为', html);
  };

  render() {
    const defaultData = [
      {
        direction: 'horizontal',
        type: 'select',
        id: 'payterm',
        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付',
        defaultValue: '银行卡支付',
      },
    ];
    const isActive = true;
    const htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows="1" cols="30" id="buyer" onkeyup="onKeyUpTextArea(\'buyer\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>卖方名称</span><textarea rows="1" cols="30" id="salername" onkeyup="onKeyUpTextArea(\'salername\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>合同签订日期</span><input type="text" id="contractsign" value="2019-03-13" actype="date" style="width: 90px"><span>合同开始日期</span><input type="text" id="contractstr" value="2019-03-13" actype="date" style="width: 90px"><span>合同结束日期</span><input type="text" id="contractend" value="2019-03-13" actype="date" style="width: 90px"><span>付款条件</span><select id="payterm" class="select ac-select" onchange="onChangeSelect()"><option name="payterm" value="0" selected="">现金支付</option>,<option name="payterm" value="1">微信支付</option>,<option name="payterm" value="2">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul></div>';
    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc} style={{marginLeft:'20px',marginBottom:"10px"}}>保存</button>
        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="showId" // 组件 id
          isActive={isActive} // 组件是否可以操作
          defaultData={defaultData} // 替换组件默认值
          waterMarkerText="用友网络" // 添加水印
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
        />
      </div>
    );
  }
}
export default Demo2;


```

2.AcEditorPDF 使用

```js

class Demo3 extends Component {

  render() {
    const defaultData = [
      {
        direction: 'horizontal',
        type: 'select',
        id: 'payterm',
        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付',
        defaultValue: '银行卡支付',
      },
    ];
    const isActive = true;
    const htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows="1" cols="30" id="buyer" onkeyup="onKeyUpTextArea(\'buyer\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>卖方名称</span><textarea rows="1" cols="30" id="salername" onkeyup="onKeyUpTextArea(\'salername\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>合同签订日期</span><input type="text" id="contractsign" value="2019-03-13" actype="date" style="width: 90px"><span>合同开始日期</span><input type="text" id="contractstr" value="2019-03-13" actype="date" style="width: 90px"><span>合同结束日期</span><input type="text" id="contractend" value="2019-03-13" actype="date" style="width: 90px"><span>付款条件</span><select id="payterm" class="select ac-select" onchange="onChangeSelect()"><option name="payterm" value="0" selected="">现金支付</option>,<option name="payterm" value="1">微信支付</option>,<option name="payterm" value="2">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul></div>';
    return (
      <div className="demoPadding">
        <div style={{
          marginLeft: '20px',
          marginBottom: '10px'
        }}>
          <AcEditorPDF
            pdfId="demo3EditorId"
            title={<button>打印</button>}
          />
        </div>
        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="demo3EditorId" // 组件 id
          isActive={isActive} // 组件是否可以操作
          defaultData={defaultData} // 替换组件默认值
          waterMarkerText="用友网络" // 添加水印
        />
      </div>
    );
  }
}

export default Demo3;


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
pdfId     | string               | 必填项        | 被打印部分id
title     | string|element       | "打印"        | 打印按钮



## 注意事项

暂无

## 更新日志

