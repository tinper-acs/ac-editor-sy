/* eslint-disable prefer-const,spaced-comment,no-multi-spaces,react/sort-comp,no-return-assign */
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
        <button onClick={this.saveFunc} style={{
          marginLeft: '20px',
          marginBottom: '10px',
        }}>保存</button>
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
