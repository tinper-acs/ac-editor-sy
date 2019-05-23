/* eslint-disable padded-blocks,indent,arrow-body-style,no-multi-spaces */
/**
 *
 * @title AcEditorPDF
 * @description 展示用 AcEditorSany 组件生成的 html 字符串转换成PDF格式打印
 *
 */

import React, { Component } from 'react';
import { AcEditorShow, AcEditorPDF } from '../../src/index';
import '../../src/index.less';


class Demo3 extends Component {

  render() {
    const defaultData = [{
      field: 'd9e40ab6-a2e1-48ea-8e5e-a5b451bdd132',
      direction: 'horizontal',
      data: 'xxx',
      type: 'text',
      defaultValue: 'xxx',
    },
      {
        field: '1d560209-1347-4133-9b7f-b01b6ff491f7',
        direction: 'horizontal',
        data: '',
        type: 'text',
        defaultValue: '',
      },
      {
        field: '2e5fcbf7-c7ff-4a3d-852f-b159549cfaf8',
        direction: 'horizontal',
        data: '2019-05-07',
        type: 'date',
        defaultValue: '2019-05-07',
      },
      {
        field: '26222e13-2782-4495-893a-b1eb13097450',
        direction: 'horizontal',
        data: '现金支付|||微信支付|||展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印',
        type: 'select',
        defaultValue: '展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印',
      },
      {
        field: '065c0a49-fb1d-4171-9c2d-057836b2220c',
        direction: 'horizontal',
        data: '1XXXXX|||2XXXXX|||3XXXXX',
        type: 'radio',
        defaultValue: '1XXXXX',
      },
      {
        field: '99c19ed0-2a89-4eca-8910-d79effd0fea3',
        direction: 'horizontal',
        data: '1YYYYY|||2YYYYY',
        type: 'checkbox',
        defaultValue: '1YYYYY',
      },
      {
        data: '发速度发顺丰的↵fasdfasdf',
        defaultValue: '发速度发顺丰的↵fasdfasdf',
        direction: 'horizontal',
        field: '3cb3d3f0-fb05-4ad8-9bbc-9e85a32e6d4a',
        type: 'textarea',
      },

    ];
    const isActive = true;
    const htmlString = '<div class="always"><h1 style="text-align: center;" >xxx公司供应商合同</h1><div>\n'
      + '<div class="table-page" style="transform: rotate(90deg);width: 1500px;height: 1500px;background-color: #0c6251;"><div style="padding-top:430px;"><table border="1" width="100%" cellpadding="0" cellspacing="0" class="rich-table"><tbody><tr> <th>111</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td> <td>展示用 AcEditorSany 组件生成的 html 字符串，生成的内容可以交互，同时支持生成水印</td></tr><tr> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>1</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>11</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr><tr> <td>111</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td></tr></tbody></table></div></div>';

    return (
      <div className="demoPadding">
        <div style={{
          marginLeft: '20px',
          marginBottom: '10px',
        }}
        >
          <AcEditorPDF
            title={<button>打印PDF</button>}
            formInfo={() => { // 回调获取打印数据

              // return {
              //   doc: htmlString, // dom 节点
              //   idList: defaultData, // dom 要被替换的内容
              //
              // };

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
          onRef={(ref) => {  // 设置ref属性
            this.child = ref;
          }}
        />
      </div>
    );
  }
}

export default Demo3;
