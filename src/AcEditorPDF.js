/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions */
import React, { Component } from 'react';

import './index.less';
import { initCheckbox, initRadio, getStringLenght } from './utils';

class AcEditorPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  initContent = (defaultData) => {
    // 修改默认值
    if (defaultData && Array.isArray(defaultData) && defaultData.length > 0) {
      // 插入组件的类型 (text,select,radio,checkbox,date)
      for (const item of defaultData) {

        const { type, field, data, defaultValue, } = item;
        const doc = document.getElementById(field);

        // id是否存在
        if (!doc) {
          continue;
        }
        // 用于包裹 select radio checkbox
        const newDoc = document.createElement('span');
        let status = false; // 是否创建新元素

        const width = defaultValue ? `${getStringLenght(defaultValue) * 7 + 60}px` : '60px';

        switch (type) {  // 判断组件类型
          case 'text':  // 文本类型
          case 'date': // 日期直接修改值
            doc.setAttribute('value', defaultValue);
            doc.style.width = width;
            break;
          case 'select':
            newDoc.innerHTML = `<input type="text" value="${defaultValue}" acType="date" style="width: ${width}" readOnly="true"/>`;
            status = true;
            break;
          case 'radio':
            newDoc.innerHTML = initRadio({
              ...item,
              data: data.split('|||'),
            });
            status = true;
            break;
          case 'checkbox':
            newDoc.innerHTML = initCheckbox({
              ...item,
              data: data.split('|||'),
            });
            status = true;
            break;
          default:

        }

        if (status && newDoc.firstElementChild && doc.parentNode) { // 有子节点才替换
          doc.parentNode.replaceChild(newDoc.firstElementChild, doc);
        }

      }
    }
  };

  onClickPrint = () => {
    const { pdfId, formInfo } = this.props;
    let { doc, idList } = formInfo();
    document.getElementById('editor-sany-pdf-id').innerHTML = doc;
    const newIdList = [...idList].map((item) => {
      item.data = item.defaultValue;
      return item;
    });

    this.initContent(newIdList);
    const htmlString = document.getElementById('editor-sany-pdf-id').innerHTML;

    const newDoc = document.createElement('span');
    newDoc.innerHTML = htmlString;

    // 添加遮罩
    const backColor = `<div class="sany-pdf-bgColor" style="position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);"></div>`;

    const WinPrint = window.open('', '', 'left=0,top=0, toolbar=0,scrollbars=0,status=0');
    // 拼接打印内容
    WinPrint.document.write(`${backColor}${newDoc.innerHTML}`);

    WinPrint.document.write(`<style>
           @media print
            {
                 body {
                   -webkit-print-color-adjust: exact;
                }
                 input{
                     border: none;
                     border-bottom: 1px solid #000;
                     font-size: 16px;
                     height: 20px;
                     color: #000;
                 }
                 input[type="radio"] {
                  vertical-align: middle;
                 }
                 input[type="checkbox"] {
                  vertical-align: middle;
                 }
                 
                 select{
                  border: none;
                  appearance: none;
                  -moz-appearance: none;
                  -webkit-appearance: none;
                  border-radius: 0px;
                  border-bottom: 1px solid #000;
                  font-size: 16px;
                  color: #000;
                 }
                 .sany-pdf-bgColor{
                  display: none;
                 }
                 .ac-date-body{
                   display: none ;
                 }
                 div{
                 font-size: 16px !important;
                 }
                 p{
                 font-size: 16px !important;
                 }
                 span{
                 font-size: 16px !important;
                 }
                 table{
                   border: 1px solid #999;
                   border-collapse:collapse;
                 }
            }
                       
           </style>`);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    let el = document.getElementById('editor-sany-pdf-id'); // 清空缓存元素
    let childs = el.childNodes;
    for (let child of childs) {
      el.removeChild(child);
    }
    WinPrint.close();
  };


  render() {
    const { title } = this.props;

    return (
      <span className="editor-sany-pdf">
         <span onClick={this.onClickPrint}>{title}</span>
         <div id='editor-sany-pdf-id'></div>
       </span>
    );
  }
}

export default AcEditorPDF;
