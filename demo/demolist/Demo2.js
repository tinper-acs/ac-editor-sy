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
    // 为文本编辑器里的html字符串
    const {doc,idList} = this.child.getHtml2String();
    console.log('文本编辑器内容为', doc,idList);
  };

  render() {
    const defaultData = [
      {
        direction: 'horizontal',
        type: 'select',
        field: 'paytermDemo2',
        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付',
        defaultValue: '银行卡支付',
      },
    ];
    const isActive = true;
    const htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span>买方名称</span><textarea rows="1" cols="30" id="buyer" onkeyup="onKeyUpTextArea(\'buyer\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span>卖方名称</span><textarea rows="1" cols="30" id="salername" onkeyup="onKeyUpTextArea(\'salername\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea><span id="d11df29a-9f36-452c-8de8-b3b4a9c4ef62"><span><input name="d11df29a-9f36-452c-8de8-b3b4a9c4ef62" onclick="onClickRadio(\'d11df29a-9f36-452c-8de8-b3b4a9c4ef62\')" type="radio" style="vertical-align: middle;" value="1xxxxxxx" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;1xxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="d11df29a-9f36-452c-8de8-b3b4a9c4ef62" onclick="onClickRadio(\'d11df29a-9f36-452c-8de8-b3b4a9c4ef62\')" type="radio" style="vertical-align: middle;" value="2xxxxxxx" actype="radio" checked>&nbsp;&nbsp;&nbsp;&nbsp;2xxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span></span><span>合同签订日期</span><input type="text" id="contractsign" value="2019-03-13" actype="date" style="width: 90px"><span>合同开始日期</span><input type="text" id="contractstr" value="2019-03-13" actype="date" style="width: 90px"><span>合同结束日期</span><input type="text" id="contractend" value="2019-03-13" actype="date" style="width: 90px"><span>付款条件</span><select id="paytermDemo2" class="select ac-select" onchange="onChangeSelect()"><option name="paytermDemo2" value="0" selected="">现金支付</option>,<option name="paytermDemo2" value="1">微信支付</option>,<option name="paytermDemo2" value="2">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul></div>';
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
