/* eslint-disable padded-blocks,indent,arrow-body-style,no-multi-spaces,jsx-quotes,no-return-assign */
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

  // 生成随机字符串
  randomText = (len) => {
    let i = 0;
    let str = '';
    const base = 20000;
    const range = 1000;
    while (i < len) {
      i++;
      const lower = parseInt(Math.random() * range);
      str += String.fromCharCode(base + lower);
    }
    return str;
  };


  // 生成 table 函数
  initTable = (rowNum, colNum, id, tableTitle,) => {
    // 表头
    let thList = '';
    for (let num = 0; num < colNum; num += 1) {
      thList += ` <th>${tableTitle + num}</th>`;
    }
    const trTh = `<tr>${thList}</tr>`;
    // 多少行
    let trTdList = '';
    for (let trNum = 0; trNum < rowNum; trNum += 1) {
      let tdList = '';
      for (let num = 0; num < colNum; num += 1) {
        const title = this.randomText(parseInt(20 * Math.random()));
        if (num === 0) {
          tdList += `<td> ${trNum}</td>`;
        } else {
          tdList += `<td> ${title}</td>`;
        }

      }
      trTdList += `<tr>${tdList}</tr>`;
    }
    return `<table id="${id}" border="1" width="100%" cellPadding="0" cellSpacing="0" class="rich-table">${trTh}${trTdList}</table>`;
  };


  render() {
    const defaultData = [
      {
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
        data: '现金支付|||微信支付',
        type: 'select',
        defaultValue: '微信支付',
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

    const htmlString = `<div class="always"><h1 style="text-align: center;" >xxx公司供应商合同</h1><div>\n'
      <div>合同内容</div> 
      ${this.initTable(60, 4, 'table-page', '分页')}
       <h3 id="tableTitleId" class='print-display'>附件一</h3>
      ${this.initTable(40, 8, 'rotate-table-sany', '旋转')}
      <h3 id="tableNoticeId" class='print-display'>注：以上单价均为不含税单价，卖方应向买方提供税率约定的增值税专用发票</h3>
         
`;

    return (
      <div className="demoPadding">
        <div style={{
          marginLeft: '20px',
          marginBottom: '10px',
        }}
        >
          {/* 只能一个表格旋转 而且表格的id 为 rotate-table-sany */}
          <AcEditorPDF
            title={<button>打印PDF</button>}
            tablePageList={[
              {
                id: 'table-page', // 分页表格id
                rowNum: 35 // 分页条数
              },
            ]}
            formInfo={() => { // 回调获取打印数据
              // return {
              //   doc: htmlString, // dom 节点
              //   idList: defaultData, // dom 要被替换的内容
              //
              // };
              return this.child.getHtml2String();
            }}

            tableRow={21} // 最后一个旋转table 的A4 最多多少行
            tableTitleId="tableTitleId" // 表标题 例如："附件一"
            tableNoticeId="tableNoticeId" // 表格备注 例如:"注:xxxx"
          />
        </div>

        <AcEditorShow
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="demo3EditorId" // 组件 id
          isActive={isActive} // 组件是否可以操作
          defaultData={defaultData} // 替换组件默认值
          waterMarkerText="用友网络" // 添加水印
          onRef={ref => this.child = ref}
        />
      </div>
    );
  }
}

export default Demo3;
