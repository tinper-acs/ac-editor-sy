/**
 *
 * @title AcEditorWord
 * @description 展示用 AcEditorSany 组件生成的 html 字符串转换成word 格式下载
 *
 */

import React, { Component } from 'react';
import { AcEditorShow, AcEditorWord } from '../../src/index';
import '../../src/index.less';

class Demo4 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: false,
      isRender:true,
    };
  }

  render() {
    // word 样式
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
    const _this=this;

    return (
      <div className="wordTest">
        <AcEditorWord
          wordId="wordTestId"
          fileName="合同"
          wordStyles={styles}
          title={<button>导出word</button>}
          // htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          formInfo={() => {
            _this.setState({ status: false,isRender:false });
            return _this.child.getHtml2String();
          }} // 数据格式 {doc, idList}
          success={() => {
            _this.setState({ status: true ,isRender:true});
          }} // 数据格式 {doc, idList}
        />
        <AcEditorShow
          isShow={this.state.isRender}
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
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
