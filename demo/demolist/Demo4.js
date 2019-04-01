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
    let htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div><div><span>买方名称</span><span rows="1" cols="30" id="buyer" onkeyup="onKeyUpTextArea(\'buyer\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</span><span>卖方名称</span><span rows="1" cols="30" id="salername" onkeyup="onKeyUpTextArea(\'salername\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</span><span>合同签订日期</span><span type="text" id="contractsign" value="2019-03-13" actype="date" style="width: 90px">2019-03-13<span>合同开始日期</span><input type="text" id="contractstr" value="2019-03-13" actype="date" style="width: 90px"><span>合同结束日期</span><input type="text" id="contractend" value="2019-03-13" actype="date" style="width: 90px"><span>付款条件</span><select id="payterm" class="select ac-select" onchange="onChangeSelect()"><option name="payterm" value="0" selected="">现金支付</option>,<option name="payterm" value="1">微信支付</option>,<option name="payterm" value="2">支付宝支付</option></select></div><br></div><div><br></div><ul><li><div class="form"><div class="row"></div></div></li></ul></div>';

    return (
      <div className="wordTest">
        <AcEditorWord
          wordId="wordTestId"
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
