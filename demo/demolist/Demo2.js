/**
 *
 * @title AcEditorShow
 * @description 展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印
 *
 */

import React, { Component } from 'react';
import { AcEditorShow } from '../../src/index';
import '../../src/index.less';

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
      {
        field: 'g56513e8-f41e-4a71-af32-8c9c69720fa1',
        direction: 'horizontal',
        data: '',
        type: 'textarea',
        defaultValue: '测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化测试高度变化',
      },
    ];
    const isActive = false;
    const htmlString = '<span><textarea id="g56513e8-f41e-4a71-af32-8c9c69720fa1" actype="textarea" style="width: 100%;height: 60px" disable="">XXXddd</textarea><input type="text" value="买方名称" onkeyup="onKeyUpInput(event)" id="buyerww1" acType="text" /><input type="text" value="买方名称" onkeyup="onKeyUpInput(event)" id="salername22" value="卖方名称" acType="text" /><input type="text" id="contractswwwign3" value="2019-02-20" actype="date" style="width: 100px" readonly="true"><input type="text" id="contractstrwww4" value="2019-02-20" actype="date" style="width: 100px" readonly="true"><input type="text" id="contractendxxx5" value="2019-02-20" actype="date" style="width: 100px" readonly="true"><select id="paytewwwrm6" class="select ac-select" onchange="onChangeSelect(event)"><option name="paytewwwrm6" value="现金支付">现金支付</option>,<option name="paytewwwrm6" value="微信支付" selected="">微信支付</option>,<option name="paytewwwrm6" value="支付宝支付">支付宝支付</option></select><span id="dd74eab6-bccd-4b0c-843d-c33eecfe2580" class="ac-checkbox-group"><span><input name="dd74eab6-bccd-4b0c-843d-c33eecfe2580" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" checked="true" value="1YYYYY"><span style="margin: 0 10px">1YYYYY</span></span><span><input name="dd74eab6-bccd-4b0c-843d-c33eecfe2580" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="2YYYYY"><span style="margin: 0 10px">2YYYYY</span></span><span><input name="dd74eab6-bccd-4b0c-843d-c33eecfe2580" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="3YYYYY"><span style="margin: 0 10px">3YYYYY</span></span></span><span id="isrebatwwwe7" class="ac-radio-group"><span><input name="isrebatwwwe7" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="是" actype="radio" checked="true"><span style="margin: 0 10px">是</span></span><span><input name="isrebatwwwe7" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="否" actype="radio"><span style="margin: 0 10px">否</span></span></span></span>';
    return (
      <div className="demoPadding">
        <button onClick={this.saveFunc} style={{
          marginLeft: '20px',
          marginBottom: '10px',
        }}>保存</button>
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
