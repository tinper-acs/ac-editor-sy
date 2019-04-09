/**
 *
 * @title AcEditorSany
 * @description 复杂文本编辑器，可以插入下拉、日期、输入框、单选框和多选框等dom元素
 *
 */

import React, { Component } from 'react';
import { AcEditorSany } from '../../src/index';
import '../../src/index.less';
import AcEditorShow from '../../src/AcEditorShow';

class Demo1 extends Component {
  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为组件的id,type,direction
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };

  fixedDate = [
    {
      field: 'buyer1',
      type: 'text',
      filedType: '文本',
      fieldName: '买方名称',
      data: 'xxxx',
    },
    {
      field: 'salername2',
      type: 'text',
      filedType: '文本',
      fieldName: '卖方名称',
      data: 'xxxx',
    },
    {
      field: 'contractsign3',
      type: 'date',
      fieldName: '合同签订日期',
      filedType: '日期',
      data: '2019-02-20',
    },
    {
      field: 'contractstr4',
      type: 'date',
      fieldName: '合同开始日期',
      filedType: '日期',
      data: '2019-02-20',
    },
    {
      field: 'contractend5',
      type: 'date',
      fieldName: '合同结束日期',
      filedType: '日期',
      data: '2019-02-20',
    },
    {
      field: 'payterm6',
      type: 'select',
      filedType: '下拉',
      fieldName: '付款条件',
      data: '现金支付|||微信支付|||支付宝支付',
      defaultValue: '微信支付',
    },
    {
      field: 'isrebate7',
      type: 'radio',
      filedType: '单选',
      fieldName: '是否返利',
      data: '是|||否',
      defaultValue: '否',
    },
  ];


  render() {
    const defaultData = [
      {
        direction: 'horizontal',
        type: 'select',
        field: 'payterm1',
        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付|||其他支付',
        defaultValue: '银行卡支付',
      },
    ];
    let htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows="1" cols="30" id="buyer1" onkeyup="onKeyUpTextArea(\'buyer1\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>卖方名称</span><textarea rows="1" cols="30" id="salername" onkeyup="onKeyUpTextArea(\'salername\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>合同签订日期</span><input type="text" id="contractsign" value="2019-03-13" actype="date" style="width: 90px"><span>合同开始日期</span><input type="text" id="contractstr" value="2019-03-13" actype="date" style="width: 90px"><span>合同结束日期</span><input type="text" id="contractend" value="2019-03-13" actype="date" style="width: 90px"><span>付款条件</span><select id="payterm1" class="select ac-select" onchange="onChangeSelect()"><option name="payterm" value="0" selected="">现金支付</option>,<option name="payterm" value="1">微信支付</option>,<option name="payterm" value="2">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul></div>';

    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc} style={{ marginLeft: '20px', marginBottom: '10px' }}>保存</button>
        <AcEditorSany
          // 组件id
          editorId="acEditorSanyId"
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
          // 文本框默认值
          htmlString={htmlString}
          defaultData={defaultData} // 替换组件默认值
          // 文本框默认最小高
          height="300px"
          fixedDate={this.fixedDate}
        />
      </div>
    );
  }
}

export default Demo1;
