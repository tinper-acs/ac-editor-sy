/**
 *
 * @title AcEditorPDF
 * @description 展示用 AcEditorSany 组件生成的 html 字符串转换成PDF格式打印
 *
 */

import React, { Component } from 'react';
import { AcEditorShow, AcEditorPDF, } from '../../src/index';
import '../../src/index.less';


class Demo3 extends Component {


  getFormInfo = () => {
    // 为文本编辑器里的html字符串
    // const { doc, idList } = this.child.getHtml2String();
    // const { doc, idList } = this.child.getHtml2String();
    console.log('this.child.getHtml2String();', this.child.getHtml2String());
    return this.child.getHtml2String();
    // console.log('文本编辑器内容为', doc, idList);
  };

  render() {
    const defaultData =
      [{
        field: 'd9e40ab6-a2e1-48ea-8e5e-a5b451bdd132',
        direction: 'horizontal',
        data: '',
        type: 'text',
        defaultValue: ''
      },
        {
          field: '1d560209-1347-4133-9b7f-b01b6ff491f7',
          direction: 'horizontal',
          data: '',
          type: 'text',
          defaultValue: ''
        },
        {
          field: '2e5fcbf7-c7ff-4a3d-852f-b159549cfaf8',
          direction: 'horizontal',
          data: '2019-05-07',
          type: 'date',
          defaultValue: '2019-05-07'
        },
        {
          field: '26222e13-2782-4495-893a-b1eb13097450',
          direction: 'horizontal',
          data: '现金支付|||微信支付|||银行卡支付',
          type: 'select',
          defaultValue: '现金支付'
        },
        {
          field: '065c0a49-fb1d-4171-9c2d-057836b2220c',
          direction: 'horizontal',
          data: '1XXXXX|||2XXXXX|||3XXXXX',
          type: 'radio',
          defaultValue: '1XXXXX'
        },
        {
          field: '99c19ed0-2a89-4eca-8910-d79effd0fea3',
          direction: 'horizontal',
          data: '1YYYYY|||2YYYYY',
          type: 'checkbox',
          defaultValue: '1YYYYY'
        },
      ];
    const isActive = true;
    let htmlString = '<div><h1 style="text-align: center;">xxx公司供应商合同</h1><div>\n' +
      '<span style="color: rgb(117, 117, 117);">买方名称<input id="d9e40ab6-a2e1-48ea-8e5e-a5b451bdd132" type="text"  onkeyup="onKeyUpInput(event)" acType="text" /></span><span style="color: rgb(117, 117, 117);">卖方名称<input  id="1d560209-1347-4133-9b7f-b01b6ff491f7" type="text" value="" onkeyup="onKeyUpInput(event)" acType="text" /></span><span style="color: rgb(117, 117, 117);">合同签订日<input type="text" id="2e5fcbf7-c7ff-4a3d-852f-b159549cfaf8" value="2019-05-07" actype="date" style="width: 100px" readonly="true"><select id="26222e13-2782-4495-893a-b1eb13097450" class="select ac-select" onchange="onChangeSelect(event)"><option name="26222e13-2782-4495-893a-b1eb13097450" value="现金支付" selected="">现金支付</option>,<option name="26222e13-2782-4495-893a-b1eb13097450" value="微信支付">微信支付</option>,<option name="26222e13-2782-4495-893a-b1eb13097450" value="银行卡支付">银行卡支付</option></select><span id="99c19ed0-2a89-4eca-8910-d79effd0fea3" class="ac-checkbox-group"><span><input name="99c19ed0-2a89-4eca-8910-d79effd0fea3" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" checked="true" value="1YYYYY"><span style="margin: 0 10px">1YYYYY</span></span><span><input name="99c19ed0-2a89-4eca-8910-d79effd0fea3" onclick="onClickCheckbox(event)" type="checkbox" actype="checkbox" value="2YYYYY"><span style="margin: 0 10px">2YYYYY</span></span></span><span id="065c0a49-fb1d-4171-9c2d-057836b2220c" class="ac-radio-group"><span><input name="065c0a49-fb1d-4171-9c2d-057836b2220c" onclick="onClickRadio(event)" type="radio" checked="true" style="vertical-align: middle;" value="1XXXXX" actype="radio"><span style="margin: 0 10px">1XXXXX</span></span><span><input name="065c0a49-fb1d-4171-9c2d-057836b2220c" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="2XXXXX" actype="radio"><span style="margin: 0 10px">2XXXXX</span></span><span><input name="065c0a49-fb1d-4171-9c2d-057836b2220c" onclick="onClickRadio(event)" type="radio" style="vertical-align: middle;" value="3XXXXX" actype="radio"><span style="margin: 0 10px">3XXXXX</span></span></span></span><span style="color: rgb(117, 117, 117);"></span><span style="color: rgb(117, 117, 117);"></span> ';

    return (
      <div className="demoPadding">
        <div style={{
          marginLeft: '20px',
          marginBottom: '10px'
        }}>
          <AcEditorPDF
            pdfId="demo3EditorId"
            title={<button>打印PDF</button>}
            // htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
            formInfo={() => {
              return this.child.getHtml2String();
            }}
          />
        </div>
        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="demo3EditorId" // 组件 id
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

export default Demo3;
