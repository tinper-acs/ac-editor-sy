# 富文本编辑器sany版本 AcEditorSany

React复杂文本编辑器组件，可插入日期、下拉框、单选框、多选框、单行文本输入框、多行文本输入框、固定字段等常用组件，同时提供文本编辑生成的页面支持动态交互(表单提交)、内容动态替换(设置默认值)和生成水印功能，生成的页面支持前端打印(表格分页带表头、表格横排打印、自定义打印样式)和导出word功能。


## 如何使用


1.AcEditorSany使用
```js
import { AcEditorShow } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';

class Demo1 extends Component {
  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为插入组件属性(field,direction,type,data,defaultValue) 数组
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };


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
      field: 'contractswwwignyy3',
      type: 'date',
      fieldName: '合同签订日期',
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
    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc}>保存</button>
        <AcEditorSany
          editorId="acEditorSanyId" // 组件id
          onRef={ref => this.child = ref} // 设置ref属性
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
import { AcEditorSany } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';
class Demo2 extends Component {


  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为插入组件属性(field,direction,type,data,defaultValue) 数组
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };

  render() {

    const defaultData = [
      {
        field: 'buyerww1', // 被替换对象的唯一标识
        direction: 'horizontal', // 组件布局方向(horizontal,vertical)
        data: '买方名称', // 组件值(select、checkbox、radio 用 "|||" 链接)
        type: 'text', // 组件类型
        defaultValue: '买方名称eee' // 组件默认值( checkbox用 "|||" 链接)
      },
      {
        field: 'salername22',
        direction: 'horizontal',
        data: '卖方名称',
        type: 'text',
        defaultValue: '卖方名称'
      },
      {
        field: 'contractswwwign3',
        direction: 'horizontal',
        data: '2019-02-20',
        type: 'date',
        defaultValue: '2019-02-20'
      },
      {
        field: 'contractstrwww4',
        direction: 'horizontal',
        data: '2019-02-20',
        type: 'date',
        defaultValue: '2019-02-20'
      },
      {
        field: 'contractendxxx5',
        direction: 'horizontal',
        data: '2019-02-20',
        type: 'date',
        defaultValue: '2019-02-20'
      }, {
        field: 'paytewwwrm6',
        direction: 'horizontal',
        data: '现金支付|||微信支付|||支付宝支付',
        type: 'select',
        defaultValue: '微信支付'
      },
      {
        field: 'isrebatwwwe7',
        direction: 'horizontal',
        data: '是|||否',
        type: 'radio',
        defaultValue: '是'
      },
      {
        field: 'dd74eab6-bccd-4b0c-843d-c33eecfe2580',
        direction: 'horizontal',
        data: '1YYYYY|||2YYYYY|||3YYYYY',
        type: 'checkbox',
        defaultValue: '1YYYYY|||3YYYYY',
      },
    ];
    const isActive = true;
    const htmlString = '<span><input type="text" value="买方名称" onkeyup="onKeyUpInput(event)" id="buyerww1" acType="text" /><input type="text" value="买方名称" onkeyup="onKeyUpInput(event)" id="salername22" value="卖方名称" acType="text" /><input type="text" id="contractswwwign3" value="2019-02-20" actype="date" style="width: 100px" readonly="true"><input type="text" id="contractstrwww4" value="2019-02-20" actype="date" style="width: 100px" readonly="true"><input type="text" id="contractendxxx5" value="2019-02-20" actype="date" style="width: 100px" readonly="true"><select id="paytewwwrm6" class="select ac-select" onchange="onChangeSelect(event)"><option name="paytewwwrm6" value="现金支付">现金支付</option>,<option name="paytewwwrm6" value="微信支付" selected="">微信支付</option>,<option name="paytewwwrm6" value="支付宝支付">支付宝支付</option></select><span id="dd74eab6-bccd-4b0c-843d-c33eecfe2580" class="ac-checkbox-group"><span><input name="dd74eab6-bccd-4b0c-843d-c33eecfe2580" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" checked="true" value="1YYYYY"><span style="margin: 0 10px">1YYYYY</span></span><span><input name="dd74eab6-bccd-4b0c-843d-c33eecfe2580" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="2YYYYY"><span style="margin: 0 10px">2YYYYY</span></span><span><input name="dd74eab6-bccd-4b0c-843d-c33eecfe2580" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="3YYYYY"><span style="margin: 0 10px">3YYYYY</span></span></span><span id="isrebatwwwe7" class="ac-radio-group"><span><input name="isrebatwwwe7" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="是" actype="radio" checked="true"><span style="margin: 0 10px">是</span></span><span><input name="isrebatwwwe7" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="否" actype="radio"><span style="margin: 0 10px">否</span></span></span></span>';
    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc}>保存</button>
        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="showId" // 组件 id
          isActive={isActive} // 组件是否可以操作 disable
          defaultData={defaultData} // 替换组件默认值
          waterMarkerText="用友网络" // 添加水印
          onRef={ref => this.child = ref}  // 设置ref属性
        />
      </div>
    );
  }
}

export default Demo2;

```

3.AcEditorPDF 使用

```js
import { AcEditorShow,AcEditorPDF } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';
class Demo3 extends Component {

  // 生成随机字符串
  randomText = (len) => {
    let i = 0;
    let str = '';
    const base = 20000;
    const range = 1000;
    while (i < len) {
      i++;
      const lower = parseInt(Math.random() * range);
      str += String.fromCharCode(base + lower);
    }
    return str;
  };


  // 生成 table 函数
  initTable = (rowNum, colNum, id, tableTitle,) => {
    // 表头
    let thList = '';
    for (let num = 0; num < colNum; num += 1) {
      thList += ` <th>${tableTitle + num}</th>`;
    }
    const trTh = `<tr>${thList}</tr>`;
    // 多少行
    let trTdList = '';
    for (let trNum = 0; trNum < rowNum; trNum += 1) {
      let tdList = '';
      for (let num = 0; num < colNum; num += 1) {
        const title = this.randomText(parseInt(20 * Math.random()));
        if (num === 0) {
          tdList += `<td> ${trNum}</td>`;
        } else {
          tdList += `<td> ${title}</td>`;
        }

      }
      trTdList += `<tr>${tdList}</tr>`;
    }
    return `<table id="${id}" border="1" width="100%" cellPadding="0" cellSpacing="0" class="rich-table">${trTh}${trTdList}</table>`;
  };


  render() {
    const defaultData = [
      {
        field: 'd9e40ab6-a2e1-48ea-8e5e-a5b451bdd132',
        direction: 'horizontal',
        data: 'xxx',
        type: 'text',
        defaultValue: 'xxx',
      },
      {
        field: '1d560209-1347-4133-9b7f-b01b6ff491f7',
        direction: 'horizontal',
        data: '',
        type: 'text',
        defaultValue: '',
      },
      {
        field: '2e5fcbf7-c7ff-4a3d-852f-b159549cfaf8',
        direction: 'horizontal',
        data: '2019-05-07',
        type: 'date',
        defaultValue: '2019-05-07',
      },
      {
        field: '26222e13-2782-4495-893a-b1eb13097450',
        direction: 'horizontal',
        data: '现金支付|||微信支付',
        type: 'select',
        defaultValue: '微信支付',
      },
      {
        field: '065c0a49-fb1d-4171-9c2d-057836b2220c',
        direction: 'horizontal',
        data: '1XXXXX|||2XXXXX|||3XXXXX',
        type: 'radio',
        defaultValue: '1XXXXX',
      },
      {
        field: '99c19ed0-2a89-4eca-8910-d79effd0fea3',
        direction: 'horizontal',
        data: '1YYYYY|||2YYYYY',
        type: 'checkbox',
        defaultValue: '1YYYYY',
      },
      {
        data: '发速度发顺丰的↵fasdfasdf',
        defaultValue: '发速度发顺丰的↵fasdfasdf',
        direction: 'horizontal',
        field: '3cb3d3f0-fb05-4ad8-9bbc-9e85a32e6d4a',
        type: 'textarea',
      },
    ];


    const isActive = true;

    const htmlString = `<div class="always"><h1 style="text-align: center;" >xxx公司供应商合同</h1><div>\n'
      <div>合同内容</div> 
      ${this.initTable(100, 4, 'table-page', '分页')}
      ${this.initTable(100, 5, 'table-page-two', '分页2')}
       <h3 id="tableTitleId" class='print-display'>附件一</h3>
      ${this.initTable(500, 8, 'rotate-table-sany', '旋转')}
      <h3 id="tableNoticeId" class='print-display'>注：以上单价均为不含税单价，卖方应向买方提供税率约定的增值税专用发票</h3>
         
`;

    return (
      <div className="demoPadding">
        <div style={{
          marginLeft: '20px',
          marginBottom: '10px',
        }}
        >
          {/* 只能一个表格旋转 而且表格的id 为 rotate-table-sany */}
          <AcEditorPDF
            title={<button>打印PDF</button>}
            tablePageList={[
              {
                id: 'table-page', // 分页表格id
                rowNum: 35 // 分页条数
              },
              {
                id: 'table-page-two',
                rowNum: 35
              },
            ]}
            formInfo={() => { // 回调获取打印数据
              // return {
              //   doc: htmlString, // dom 节点
              //   idList: defaultData, // dom 要被替换的内容
              //
              // };
              return this.child.getHtml2String();
            }}

            tableRow={21} // 最后一个旋转table 的A4 最多多少行
            tableTitleId="tableTitleId" // 表标题 例如："附件一"
            tableNoticeId="tableNoticeId" // 表格备注 例如:"注:xxxx"
          />
        </div>

        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="demo3EditorId" // 组件 id
          isActive={isActive} // 组件是否可以操作
          defaultData={defaultData} // 替换组件默认值
          waterMarkerText="用友网络" // 添加水印
          onRef={ref => this.child = ref}
        />
      </div>
    );
  }
}

export default Demo3;
```

4.AcEditorWord 使用

```js
import { AcEditorShow,AcEditorWord } from 'ac-editor-sany';
import 'ac-editor-sany/dist/index.css';

class Demo4 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: false, // 导出状态
    };
  }

  render() {
    // 自定义导出样式
    const styles = '.testClass{background-color: #ff00ff;}';
    const defaultData = [
      {
        field: 'ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9',
        direction: 'horizontal',
        data: '1YYYYY|||2YYYYY|||3YYYYY|||4YYYYY',
        type: 'checkbox',
        defaultValue: '1YYYYY',
      },
      {
        field: '629180d0-ff59-44a5-8f86-9c7360961e12',
        direction: 'horizontal',
        data: '1XXXXX|||2XXXXX|||3XXXXX',
        type: 'radio',
        defaultValue: '1XXXXX',
      },
      {
        field: '9013b8fc-e610-419d-bba0-196ec76b73cd',
        direction: 'horizontal',
        data: '法师打发斯蒂芬',
        type: 'text',
        defaultValue: '法师打发斯蒂芬',
      },
      {
        field: 'a0a8252d-94b3-4436-9433-d37e589508eb',
        direction: 'horizontal',
        data: '支付宝|||银行卡|||微信',
        type: 'select',
        defaultValue: '支付宝',
      },
    ];

    const isActive = false;
    const htmlString = '<span id="ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9" class="ac-checkbox-group"><span><input name="ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" checked="true" value="1YYYYY"><span style="margin: 0 10px">1YYYYY</span></span><span><input name="ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="2YYYYY"><span style="margin: 0 10px">2YYYYY</span></span><span><input name="ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="3YYYYY"><span style="margin: 0 10px">3YYYYY</span></span><span><input name="ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="4YYYYY"><span style="margin: 0 10px">4YYYYY</span></span></span><span style="color: rgb(66, 66, 66);">互<span id="629180d0-ff59-44a5-8f86-9c7360961e12" class="ac-radio-group"><span><input name="629180d0-ff59-44a5-8f86-9c7360961e12" onclick="onClickRadio(event)" type="radio" checked="true" style="vertical-align: middle;" value="1XXXXX" actype="radio"><span style="margin: 0 10px">1XXXXX</span></span><span><input name="629180d0-ff59-44a5-8f86-9c7360961e12" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="2XXXXX" actype="radio"><span style="margin: 0 10px">2XXXXX</span></span><span><input name="629180d0-ff59-44a5-8f86-9c7360961e12" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="3XXXXX" actype="radio"><span style="margin: 0 10px">3XXXXX</span></span></span></span><span style="color: rgb(66, 66, 66);">交<input id="9013b8fc-e610-419d-bba0-196ec76b73cd" type="text" value="法师打发斯蒂芬" onkeyup="onKeyUpInput(event)" actype="text" style="width: 158px;"><select id="a0a8252d-94b3-4436-9433-d37e589508eb" class="select ac-select" onchange="onChangeSelect(event)"><option name="a0a8252d-94b3-4436-9433-d37e589508eb" value="支付宝" selected="">支付宝</option>,<option name="a0a8252d-94b3-4436-9433-d37e589508eb" value="银行卡">银行卡</option>,<option name="a0a8252d-94b3-4436-9433-d37e589508eb" value="微信">微信</option></select></span>';
    const _this = this;

    return (
      <div className="wordTest">
        <AcEditorWord
          wordId="wordTestId" // 与要导出的 dom id 保持一致
          fileName="合同"  // 导出 word 名称
          wordStyles={styles}  // 替换样式
          title={<button>导出word</button>}

          getDefaultInfo={() => { // 获取默认值回调函数
            _this.setState({ status: true }); // 正在导出
            // return defaultData || []; // 替换数据
            const { idList = [] } = _this.child.getHtml2String();
            return idList;
          }}

          success={() => { // 导出成功回调
            _this.setState({ status: true });
          }}

        />

        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorSany 生成的 html字符串
          editorId="wordTestId" // 组件 id
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

export default Demo4;


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

