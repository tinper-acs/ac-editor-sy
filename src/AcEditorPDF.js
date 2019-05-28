/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions,react/prop-types,prefer-const,no-param-reassign,no-restricted-syntax,no-trailing-spaces */
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
            newDoc.innerHTML = `<span class="text-div" style="width: ${width}">${defaultValue || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`;
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

  // 表格分页
  onPageTable = (tablePageList) => {

    if (tablePageList && Array.isArray(tablePageList)) {
      for (const tablePage of tablePageList) {
        const tableStart = '<table class="table-page" border="1" cellpadding="0" cellspacing="0" >';
        const tableEnd = '</table>';
        const { id, rowNum } = tablePage;
        const table = document.getElementById(id);
        const trList = table ? table.getElementsByTagName('tr') : '';

        let trString = `<tr>${trList[0].innerHTML}</tr>`;
        let newTableList = [];
        if (trList.length > rowNum) { // 大于多行分页
          for (let i = 1; i < trList.length; i++) {
            trString += `<tr>${trList[i].innerHTML}</tr>`;
            if (i % rowNum === 0 || (trList.length - 1 === i)) {
              newTableList.push(tableStart + trString + tableEnd);
              // 设置表头
              trString = `<tr>${trList[0].innerHTML}</tr>`;
            }
          }
        }

        // 创建一个新元素
        const newDoc = document.createElement('div');
        newDoc.innerHTML = `<div>${newTableList.join('')}</div>`;
        table.parentNode.replaceChild(newDoc.firstElementChild, table);
      }
    }
  };


  onClickPrint = () => {
    const { formInfo, tableRow = 15, tablePageList, tableTitleId = 'tableTitleId', tableNoticeId = 'tableNoticeId' } = this.props;
    let { doc, idList } = formInfo();


    document.getElementById('editor-sany-pdf-id').innerHTML = doc;


    // 表格分页
    this.onPageTable(tablePageList);

    const rotateTable = document.getElementById('rotate-table-sany');

    // 拆分表格数组
    const newTableList = [];

    const trList = rotateTable ? rotateTable.getElementsByTagName('tr') : '';


    // let marginLeftWidth = 0;
    // 将一个大的table 分解成几个小table
    if (trList && trList.length > 0) {
      let trString = `<tr>${trList[0].innerHTML}</tr>`;
      const rotateStart = '<table class="always" border="1" cellpadding="0" cellspacing="0" style="float: left;width:1500px;margin-right: 72px">';
      const rotateEnd = '</table>';

      // 页面table tr 小于 A4 容纳行数
      if (tableRow > trList.length) {
        for (let i = 1; i < trList.length; i++) {
          trString += `<tr>${trList[i].innerHTML}</tr>`;
        }
        newTableList.push(rotateStart + trString + rotateEnd);
      } else { // 当打印行数>= A4 最大函数
        for (let i = 1; i < trList.length; i++) {
          trString += `<tr>${trList[i].innerHTML}</tr>`;
          if (i % tableRow === 0 || (trList.length - 1 === i)) {
            newTableList.push(rotateStart + trString + rotateEnd);
            // 设置表头
            trString = `<tr>${trList[0].innerHTML}</tr>`;
          }
        }
      }

      // 将分解的表格拼接成一个字符串
      let tableString = '';
      for (let [index, tableItem] of newTableList.entries()) {
        let newTable = tableItem;
        if (index === 0) {
          // 表格第一页一页 添加表格标题
          const tableTitle = document.getElementById(tableTitleId);
          newTable = `${tableTitle ? `<h4>${tableTitle.innerHTML}</h4>` : ''}${tableItem}`;
        }

        if (index === (newTableList.length - 1)) { // 表格最后一页 添加注意事项
          const tableNotice = document.getElementById(tableNoticeId);
          newTable = `${newTable}${tableNotice ? `<h4>${tableNotice.innerHTML}</h4>` : ''}`;
        }
        tableString += newTable;
      }

      // 创建一个新元素
      const newDoc = document.createElement('span');
      // 动态计算表格容器的宽
      const paddingWidth = `${newTableList.length * 1572}px`;

      // 替换元素
      newDoc.innerHTML = `<div class="table-page-star" style="transform: rotate(90deg);width: 1500px;height: 1500px;"><div style="padding-top:430px;width: ${paddingWidth}">${tableString}</div></div>`;
      rotateTable.parentNode.replaceChild(newDoc.firstElementChild, rotateTable);
    }

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
                 .print-display{
                    display: none ;
                 }
                 
                 
                 @page {
                      size: A4 portrait;
                  }
                 
                /*section {page-break-before: always;}*/
                .table-page-star {page-break-before: always;} /*单页*/
                .table-page-end {page-break-after: always;} /*单页*/
                /*.table-page {page-break-after: always;page-break-before: always;} !*单页*!*/
                .always{
                   page-break-after: always;
                }
                
                .table-page{
                  page-break-before: always;
                }
                    
                tr {height: 40px}
                /*p {page-break-inside: avoid;}*/
                p {orphans:3; widows:2;}
                
                th{
                  background-color: #80808029;
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
                     page-break-after: always;
                 }
            }
            
        
            @page {
                size: A4 portrait;
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
        <div id="editor-sany-pdf-id"/>
      </span>
    );
  }
}

export default AcEditorPDF;
