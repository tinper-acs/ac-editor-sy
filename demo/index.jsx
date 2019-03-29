
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'bee-button';
import './demo.scss';
const pkg = require('../package.json')




const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


import Demo1 from "./demolist/Demo1";import Demo2 from "./demolist/Demo2";import Demo3 from "./demolist/Demo3";
var DemoArray = [{"example":<Demo1 />,"title":" AcEditorSany","code":"/**\n *\n * @title AcEditorSany\n * @description 复杂文本编辑器，可以插入下拉、日期、输入框、单选框和多选框等dom元素\n *\n */\n\nimport React, { Component } from 'react';\nimport { AcEditorSany } from '../../src/index';\nimport '../../src/index.less';\n\nclass Demo1 extends Component {\n  saveFunc = () => {\n    // doc 为文本编辑器里的html字符串\n    // idList 为组件的id,type,direction\n    const { doc, idList } = this.child.getHtml2String();\n    console.log('文本编辑器内容为', doc, idList);\n  };\n\n  fixedDate = [\n    {\n      field: 'buyer1',\n      type: 'text',\n      filedType: '文本',\n      fieldName: '买方名称',\n      data: ['xxxx'],\n    },\n    {\n      field: 'salername2',\n      type: 'text',\n      filedType: '文本',\n      fieldName: '卖方名称',\n      data: ['xxxx'],\n    },\n    {\n      field: 'contractsign3',\n      type: 'date',\n      fieldName: '合同签订日期',\n      filedType: '日期',\n      data: ['2019-02-20'],\n    },\n    {\n      field: 'contractstr4',\n      type: 'date',\n      fieldName: '合同开始日期',\n      filedType: '日期',\n      data: ['2019-02-20'],\n    },\n    {\n      field: 'contractend5',\n      type: 'date',\n      fieldName: '合同结束日期',\n      filedType: '日期',\n      data: ['2019-02-20'],\n    },\n    {\n      field: 'payterm6',\n      type: 'select',\n      filedType: '下拉',\n      fieldName: '付款条件',\n      data: ['现金支付', '微信支付', '支付宝支付'],\n    },\n    {\n      field: 'isrebate7',\n      type: 'radio',\n      filedType: '单选',\n      fieldName: '是否返利',\n      data: ['是', '否'],\n    },\n  ];\n\n  render() {\n    const htmlString = '<h3>xxxx公司供应商合同</h3>';\n    return (\n      <div className=\"demoPadding\">\n        <button onClick={this.saveFunc} style={{ marginLeft: '20px', marginBottom: '10px' }}>保存</button>\n        <AcEditorSany\n          // 组件id\n          editorId=\"acEditorSanyId\"\n          // 设置ref属性\n          onRef={(ref) => {\n            this.child = ref;\n          }}\n          // 文本框默认值\n          htmlString={htmlString}\n          // 文本框默认最小高\n          height=\"300px\"\n          fixedDate={this.fixedDate}\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 复杂文本编辑器，可以插入下拉、日期、输入框、单选框和多选框等dom元素"},{"example":<Demo2 />,"title":" AcEditorShow","code":"/**\n *\n * @title AcEditorShow\n * @description 展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印\n *\n */\n\nimport React, { Component } from 'react';\nimport { AcEditorShow } from '../../src/index';\nimport '../../src/index.less';\n\nclass Demo2 extends Component {\n\n  saveFunc = () => {\n    // 为文本编辑器里的html字符串\n    const html = this.child.getHtml2String();\n    console.log('文本编辑器内容为', html);\n  };\n\n  render() {\n    const defaultData = [\n      {\n        direction: 'horizontal',\n        type: 'select',\n        id: 'payterm',\n        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付',\n        defaultValue: '银行卡支付',\n      },\n    ];\n    const isActive = true;\n    const htmlString = '<div><h1 style=\"text-align: center;\">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows=\"1\" cols=\"30\" id=\"buyer\" onkeyup=\"onKeyUpTextArea(\\'buyer\\')\" style=\"resize: horizontal;vertical-align: middle;width: 80px;\">xxxx</textarea><span>卖方名称</span><textarea rows=\"1\" cols=\"30\" id=\"salername\" onkeyup=\"onKeyUpTextArea(\\'salername\\')\" style=\"resize: horizontal;vertical-align: middle;width: 80px;\">xxxx</textarea><span>合同签订日期</span><input type=\"text\" id=\"contractsign\" value=\"2019-03-13\" actype=\"date\" style=\"width: 90px\"><span>合同开始日期</span><input type=\"text\" id=\"contractstr\" value=\"2019-03-13\" actype=\"date\" style=\"width: 90px\"><span>合同结束日期</span><input type=\"text\" id=\"contractend\" value=\"2019-03-13\" actype=\"date\" style=\"width: 90px\"><span>付款条件</span><select id=\"payterm\" class=\"select ac-select\" onchange=\"onChangeSelect()\"><option name=\"payterm\" value=\"0\" selected=\"\">现金支付</option>,<option name=\"payterm\" value=\"1\">微信支付</option>,<option name=\"payterm\" value=\"2\">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class=\"form\"><div class=\"row\"></div></div></li></ul></div>';\n    return (\n      <div className=\"demoPadding\">\n        <button onClick={this.saveFunc} style={{marginLeft:'20px',marginBottom:\"10px\"}}>保存</button>\n        <AcEditorShow\n          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串\n          editorId=\"showId\" // 组件 id\n          isActive={isActive} // 组件是否可以操作\n          defaultData={defaultData} // 替换组件默认值\n          waterMarkerText=\"用友网络\" // 添加水印\n          // 设置ref属性\n          onRef={(ref) => {\n            this.child = ref;\n          }}\n        />\n      </div>\n    );\n  }\n}\n\n","desc":" 展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印"},{"example":<Demo3 />,"title":" AcEditorPDF","code":"/**\n *\n * @title AcEditorPDF\n * @description 展示用 AcEditorSany 组件生成的 html 字符串转换成PDF格式打印\n *\n */\n\nimport React, { Component } from 'react';\nimport { AcEditorShow, AcEditorPDF, } from '../../src/index';\nimport '../../src/index.less';\n\n\nclass Demo3 extends Component {\n\n  render() {\n    const defaultData = [\n      {\n        direction: 'horizontal',\n        type: 'select',\n        id: 'payterm',\n        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付',\n        defaultValue: '银行卡支付',\n      },\n    ];\n    const isActive = true;\n    let htmlString = '<div><h1 style=\"text-align: center;\">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows=\"1\" cols=\"30\" id=\"buyer\" onkeyup=\"onKeyUpTextArea(\\'buyer\\')\" style=\"resize: horizontal;vertical-align: middle;width: 80px;\">xxxx</textarea><span>卖方名称</span><textarea rows=\"1\" cols=\"30\" id=\"salername\" onkeyup=\"onKeyUpTextArea(\\'salername\\')\" style=\"resize: horizontal;vertical-align: middle;width: 80px;\">xxxx</textarea><span>合同签订日期</span><input type=\"text\" id=\"contractsign\" value=\"2019-03-13\" actype=\"date\" style=\"width: 90px\"><span>合同开始日期</span><input type=\"text\" id=\"contractstr\" value=\"2019-03-13\" actype=\"date\" style=\"width: 90px\"><span>合同结束日期</span><input type=\"text\" id=\"contractend\" value=\"2019-03-13\" actype=\"date\" style=\"width: 90px\"><span>付款条件</span><select id=\"payterm\" class=\"select ac-select\" onchange=\"onChangeSelect()\"><option name=\"payterm\" value=\"0\" selected=\"\">现金支付</option>,<option name=\"payterm\" value=\"1\">微信支付</option>,<option name=\"payterm\" value=\"2\">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class=\"form\"><div class=\"row\"></div></div></li></ul></div>';\n\n    return (\n      <div className=\"demoPadding\">\n        <div style={{\n          marginLeft: '20px',\n          marginBottom: '10px'\n        }}>\n          <AcEditorPDF\n            pdfId=\"demo3EditorId\"\n            title={<button>打印</button>}\n          />\n        </div>\n        <AcEditorShow\n          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串\n          editorId=\"demo3EditorId\" // 组件 id\n          isActive={isActive} // 组件是否可以操作\n          defaultData={defaultData} // 替换组件默认值\n          waterMarkerText=\"用友网络\" // 添加水印\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 展示用 AcEditorSany 组件生成的 html 字符串转换成PDF格式打印"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ process.env.NODE_ENV==='development'?code:code.replace('../../src/index.js',pkg.name).replace('../../src/index',pkg.name) }</code></pre>
                </Panel>
            </Col>
        )
    }
}

export default class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

