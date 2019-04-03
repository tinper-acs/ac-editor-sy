/**
 *
 * @title AcEditorWord
 * @description 展示用 AcEditorSany 组件生成的 html 字符串转换成word 格式下载
 *
 */

import React, { Component } from 'react';
import { AcEditorShow, AcEditorWord, } from '../../src/index';
import '../../src/index.less';
import AcEditorPDF from '../../src/AcEditorPDF';


class Demo4 extends Component {

  render() {
    // word 样式
    const styles = '.testClass{background-color: #ff00ff;}';


    const defaultData = [
      {
        direction: 'horizontal',
        type: 'select',
        id: 'payterm',
        data: '微信支付|||支付宝支付|||银行卡支付|||现金支付',
        defaultValue: '银行卡支付',
      },
    ];
    const isActive = false;
    let htmlString = '<span>嘿嘿<textarea rows="1" cols="30" id="buyerqq" onkeyup="onKeyUpTextArea(\'buyerqq\')" style="resize: horizontal;vertical-align: middle;width: 80px;">asdfa</textarea>嘿嘿<textarea rows="1" cols="30" id="salernameqq" onkeyup="onKeyUpTextArea(\'salernameqq\')" style="resize: horizontal;vertical-align: middle;width: 80px;">adsf</textarea>嘿嘿<input type="text" id="contractsignqq" value="2019-04-17" actype="date" style="width: 100px" readonly="true">嘿嘿<input type="text" id="contractstr4" value="2019-04-24" actype="date" style="width: 100px" readonly="true">嘿嘿<select id="paytermqq" class="select ac-select" onchange="onChangeSelect()"><option name="payterm6" value="0">现金支付</option>,<option name="payterm6" value="1">微信支付</option>,<option name="payterm6" value="2" selected="true">支付宝支付</option></select><span id="isrebateqq"><span><input name="isrebateqq" onclick="onClickRadio(\'isrebateqq\')" type="radio" style="vertical-align: middle;" value="是" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="isrebateqq" onclick="onClickRadio(\'isrebateqq\')" type="radio" checked="" style="vertical-align: middle;" value="否" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;&nbsp;</span></span></span><div class="ac-date-body"><div><span class="datepicker-input-group u-input-group simple" style=""><input placeholder="选择日期" readonly="" type="text" class="u-form-control md" value="2019-04-24"><span shape="border" class="u-input-group-btn"><i class="uf uf-calendar"></i></span></span></div></div>'

    return (
      <div className="wordTest">
        <AcEditorWord
          wordId="wordTestId"
          fileName="合同"
          wordStyles={styles}
          title={<button>导出word</button>}
        />
        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="wordTestId" // 组件 id
          isActive={isActive} // 组件是否可以操作
          defaultData={defaultData} // 替换组件默认值
          waterMarkerText="用友网络" // 添加水印
        />
      </div>
    );
  }
}

export default Demo4;
