/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions */
import React, { Component } from 'react';

import './index.less';

class AcEditorPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClickPrint = () => {
    const { pdfId } = this.props;
    const oldDoc = document.getElementById(pdfId).parentElement;
    const htmlString = oldDoc.innerHTML;
    const newDoc = document.createElement('span');
    newDoc.innerHTML = htmlString;

    const textAreaList = newDoc.getElementsByTagName('textarea');
    // 在textarea后面插入兄弟节点 最后通过隐藏textarea
    for (const textArea of textAreaList) {
      const newTextAreaParent = document.createElement('span');
      const date = textArea.innerHTML;
      const stringInput = `<input type="text" value="${date}" style="width: ${textArea.style.width}"/>`;
      newTextAreaParent.innerHTML = stringInput;
      textArea.parentNode.insertBefore(newTextAreaParent.firstElementChild, textArea.nextSibling);
    }
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
                 
                 textarea{
                        display: none;
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
    WinPrint.close();
  };


  render() {
    const { title } = this.props;

    return (
      <span className="editor-sany-pdf">
         <span onClick={this.onClickPrint}>{title}</span>
       </span>
    );
  }
}

export default AcEditorPDF;
