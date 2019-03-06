/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions */
import React, { Component } from 'react';

import './index.less';

class AcEditorPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { htmlString } = this.props;
    const backColor = `<div class="sany-pdf-bgColor" style="position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);"></div>`;
    document.getElementById('html2Pdf').innerHTML = `${backColor}${htmlString}`;
  }

  onClickPrint = () => {
    const html = document.getElementById('html2Pdf').innerHTML;
    const WinPrint = window.open('', '', 'left=0,top=0, toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(html);
    WinPrint.document.write(`<style>
           @media print
            {
                 body {
                   -webkit-print-color-adjust: exact;
                }
                 input{
                     border: none;
                     border-bottom: 1px solid #000;
                     padding-bottom: 3px;
                     font-size: 14px;
                     height: 20px;
                     color: #000;
                 }
                 textarea{
                       border: none;
                        border-bottom: 1px solid #000;
                        font-size: 14px;
                        height: 20px;
                        color: #000;
                        padding-bottom: 5px;
                        vertical-align: sub;
                 }
                 select{
                  border: none;
                  appearance: none;
                  -moz-appearance: none;
                  -webkit-appearance: none;
                  border-radius: 0px;
                  border-bottom: 1px solid #000;
                  background-color: #fff;
                  padding: 0px 6px;
                 }
                 .sany-pdf-bgColor{
                  display: none;
                 }
            }
                       
           </style>`);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  render() {
    const { title = '导出PDF' } = this.props;
    return (
      <span className="editor-sany-pdf">
        <span onClick={this.onClickPrint}>{title}</span>
        <div id="html2Pdf" className="html2Pdf"/>
      </span>
    );
  }
}

export default AcEditorPDF;
