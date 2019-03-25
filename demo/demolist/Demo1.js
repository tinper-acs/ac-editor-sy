/**
 *
 * @title AcEditorSany
 * @description 复杂文本编辑器，可以插入下拉、日期、输入框、单选框和多选框等dom元素
 *
 */

import React, { Component } from 'react';
import { AcEditorSany } from '../../src/index';
import '../../src/index.less';

class Demo1 extends Component {
  saveFunc = () => {
    // doc 为文本编辑器里的html字符串
    // idList 为组件的id,type,direction
    const { doc, idList } = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc, idList);
  };

  fixedDate = [
    {
      id: 'buyer',
      type: 'text',
      type_cn: '文本',
      title: '买方名称',
      data: ['xxxx'],
      defaultVal: 'xxxx',
      status: false,
    },
    {
      id: 'salername',
      type: 'text',
      type_cn: '文本',
      title: '卖方名称',
      data: ['xxxx'],
      defaultVal: 'xxxx',
      status: false,
    },
    {
      id: 'contractsign',
      type: 'date',
      title: '合同签订日期',
      type_cn: '日期',
      data: ['2019-02-20'],
      defaultVal: '2019-02-20',
      status: false,
    },
    {
      id: 'contractstr',
      type: 'date',
      title: '合同开始日期',
      type_cn: '日期',
      data: ['2019-02-20'],
      defaultVal: '2019-02-20',
      status: false,
    },
    {
      id: 'contractend',
      type: 'date',
      title: '合同结束日期',
      type_cn: '日期',
      data: ['2019-02-20'],
      defaultVal: '2019-02-20',
      status: false,
    },
    {
      id: 'payterm',
      type: 'select',
      type_cn: '下拉',
      title: '付款条件',
      data: ['现金支付', '微信支付', '支付宝支付'],
      defaultVal: '现金支付',
      isEdit: false,
      status: false,
    },
    {
      id: 'isrebate',
      type: 'radio',
      type_cn: '单选',
      title: '是否返利',
      data: ['是', '否'],
      defaultVal: '是',
      status: false,
    },
  ];

  render() {
    const htmlString = '<h3>xxxx公司供应商合同</h3>';
    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc} style={{marginLeft:'20px',marginBottom:"10px"}}>保存</button>
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
          fixedDate={this.fixedDate}
        />
      </div>
    );
  }
}

export default Demo1;
