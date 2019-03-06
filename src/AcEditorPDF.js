/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions */
import React, { Component } from 'react';
import print from 'print-js';
import { uuid } from './utils';

import './index.less';

class AcEditorPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { htmlString } = this.props;
    document.getElementById('html2Pdf').innerHTML = htmlString;
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
                 /*div {color: red}*/
                 /*h1 {page-break-after: always;}*/
                 /*p {page-break-inside: avoid;} */
                 /*#nav-area {display: none;}*/
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
            }
                       
           </style>`);

    WinPrint.document.write(`<style>
           /*html{padding:1cm;background-color: rgba(0, 0, 0, 0.25)}*/
           </style>`);

    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  render() {
    return (
      <span className="editor-pdf">
        <button type="button" onClick={this.onClickPrint}>导出PDF</button>
        <div id="html2Pdf" className="html2Pdf"/>
      </span>
    );
  }
}

export default AcEditorPDF;
