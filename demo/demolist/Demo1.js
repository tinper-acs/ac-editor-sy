/* eslint-disable prefer-const,spaced-comment,no-multi-spaces,react/sort-comp */
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
      field: 'buyerwwyy1',
      type: 'text',
      filedType: '文本',
      fieldName: '买方名称',
      data: 'xxxx',
      defaultValue: '买方名称',
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
    const defaultData = [
      {
        field: 'buyerwwyy1',
        direction: 'horizontal',
        data: '买方名称',
        type: 'text',
        defaultValue: '买方名称'
      },
      {
        field: 'salernameyy22',
        direction: 'horizontal',
        data: '卖方名称',
        type: 'text',
        defaultValue: '卖方名称'
      },
      {
        field: 'contractswwwignyy3',
        direction: 'horizontal',
        data: '2019-02-20',
        type: 'date',
        defaultValue: '2019-02-20'
      },
    ];
    let htmlString = '<h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span><input id="buyerwwyy1" type="text" value="买方名称" onkeyup="onKeyUpInput(event)" actype="text" style="width: 116px"><input id="salernameyy22" type="text" value="卖方名称" onkeyup="onKeyUpInput(event)" actype="text" style="width: 116px"><input type="text" id="contractswwwignyy3" value="2019-02-20" actype="date" style="width: 100px" readonly="true"></span><br></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul>';

    return (
      <div className="demoPadding">
        <button
          onClick={this.saveFunc}
          style={{
            marginLeft: '20px',
            marginBottom: '10px',
          }}
        >
          保存
        </button>

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
          height="300px"  // 文本框默认最小高
          fixedDate={this.fixedDate} // 固定字段
        />
      </div>
    );
  }
}

export default Demo1;
