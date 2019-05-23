/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions,react/prop-types,prefer-const,no-param-reassign,no-restricted-syntax */
import React, { Component } from 'react';

import './index.less';
import { getStringLenght } from './utils';

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

        const { type, field, defaultValue } = item;
        const doc = document.getElementById(field);

        // id是否存在
        if (!doc) {
          continue;
        }
        // 用于包裹 select radio checkbox
        const newDoc = document.createElement('span');
        // 计算宽
        const width = defaultValue ? `${getStringLenght(defaultValue) * 7 + 60}px` : '80px';

        switch (type) {  // 判断组件类型
          case 'text':  // 文本类型
          case 'select':  // 下拉
          case 'radio':  // 下拉
          case 'checkbox':  // 下拉
          case 'date': // 日期直接修改值
            newDoc.innerHTML = `<span class="text-div" style="width: ${width}">${defaultValue ? defaultValue : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`;
            break;

          case 'textarea':
            newDoc.innerHTML = `<div class="textarea-div">${defaultValue}</div>`;
            break;
          default:

        }

        if (newDoc.firstElementChild && doc.parentNode) { // 有子节点才替换
          doc.parentNode.replaceChild(newDoc.firstElementChild, doc);
        }

      }
    }
  };

  onClickPrint = () => {

    const { formInfo } = this.props;
    let { doc, idList } = formInfo();
    document.getElementById('editor-sany-pdf-id').innerHTML = doc;

    const newIdList = [...idList]; // 拷贝数组
    this.initContent(newIdList); // 初始化

    const htmlString = document.getElementById('editor-sany-pdf-id').innerHTML; // 获取 dom 节点
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

    // 添加打印样式
    WinPrint.document.write(`<style>
           @media print
            {
                 body {
                   -webkit-print-color-adjust: exact;
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
               
                 .text-div{
                  text-decoration: underline;
                  margin-right: 15px;
                 
                 }
                 .textarea-div{
                     text-decoration: underline;
                 }
            }
                       
           </style>`);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();

    let el = document.getElementById('editor-sany-pdf-id'); // 清空缓存元素
    let childs = el.childNodes;
    for (let child of childs) { // 删除所有子节点
      el.removeChild(child);
    }
    WinPrint.close(); // 关闭打印
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
