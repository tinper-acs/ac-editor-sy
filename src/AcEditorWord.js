/* eslint-disable react/require-default-props,no-unused-expressions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStringLenght } from './utils';

// todo 支持图表，例如echart
const propTypes = {
  wordId: PropTypes.string, // wordID
  fileName: PropTypes.string, // 导出文件的名字
  title: PropTypes.element, // 名称标题
  styles: PropTypes.string, // word中的样式
};

const defaultProps = {
  wordId: '',
  fileName: 'filename',
  title: '导出Word',
  styles: 'table{width:100%}',
};

class ExportWord extends Component {


  exportWord = () => {
    const { wordId, fileName } = this.props;
    this.getBlob(wordId, fileName);
  };

  // 替换input
  replaceInput = (activeDoc) => {
    const inputList = activeDoc.getElementsByTagName('input');

    // console.log("ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9",activeDoc.getElementById("ff55b00a-f4aa-43b7-b7eb-f545ccac0fd9"))


    for (const item of inputList) {
      const newDoc = document.createElement('span');

      const type = item.getAttribute('type');
      const { checked } = item;
      // 单选框 选中
      if (type === 'radio' && checked) {
        newDoc.innerHTML = '●';
      }

      // 单选框 未选中
      if (type === 'radio' && !checked) {
        newDoc.innerHTML = '○';
        item.parentNode.parentNode.replaceChild(newDoc, item.parentNode);
      }

      // 多选框 选中
      if (type === 'checkbox' && checked) {
        newDoc.innerHTML = '■';
      }
      // 多选框 未选中
      if (type === 'checkbox' && !checked) {
        newDoc.innerHTML = '□';
      }
      // input
      if (type === 'text') {
        const htmlText = item.getAttribute('value');
        newDoc.innerHTML = htmlText || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        newDoc.style.textDecoration = 'underline';
      }

    }
    if (activeDoc.getElementsByTagName('input').length > 0) {
      this.replaceInput(activeDoc, 'input');
    }
  };

  // 替换 textarea
  replaceTextArea = (activeDoc) => {
    const textareaList = activeDoc.getElementsByTagName('textarea');
    for (const item of textareaList) {
      const newDoc = document.createElement('span');
      const htmlText = item.value;
      newDoc.innerHTML = htmlText || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
      newDoc.style.textDecoration = 'underline';
      item.parentNode.replaceChild(newDoc, item);
    }
    if (activeDoc.getElementsByTagName('textarea').length > 0) {
      this.replaceTextArea(activeDoc, 'textarea');
    }
  };

  // 替换下拉框
  replaceSelect = (activeDoc) => {
    const selectList = activeDoc.getElementsByTagName('select');
    for (const item of selectList) {
      const newDoc = document.createElement('span');
      let title = '';
      const options = item.getElementsByTagName('option');
      for (const option of options) {
        // 获取选中的slect
        if (option.selected) {
          title = option.innerText;
          break;
        }
      }
      newDoc.innerHTML = title;
      newDoc.style.textDecoration = 'underline';
      item.parentNode.replaceChild(newDoc, item);
    }

    if (activeDoc.getElementsByTagName('select').length > 0) {
      this.replaceSelect(activeDoc, 'select');
    }
  };


  // 删除日期弹框
  delDateModal = (activeDoc) => {
    const acDateBody = activeDoc.getElementsByClassName('ac-date-body');
    // 删除日期弹框
    for (const dateItem of acDateBody) {
      // 删除子节点
      if (dateItem) {
        dateItem.parentNode.removeChild(dateItem);
      }
    }

    // 检查是否都替换了
    const twoAcDateBody = activeDoc.getElementsByClassName('ac-date-body');
    if (twoAcDateBody && twoAcDateBody.length > 0) {
      this.delDateModal(activeDoc);
    }
  };


  parseToDOM = (str) => {
    const div = document.createElement('div');
    if (typeof str === 'string') {
      div.innerHTML = str;
    }
    return div.childNodes;
  };


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

        const width = defaultValue ? `${getStringLenght(defaultValue) * 7 + 60}px` : '80px';

        switch (type) {  // 判断组件类型
          case 'text':  // 文本类型
          case 'select':  // 下拉
          case 'radio':  // 下拉
          case 'checkbox':  // 下拉
          case 'date': // 日期直接修改值
            newDoc.innerHTML = `<span class="text-div" style="width: ${width}">${defaultValue ? defaultValue : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`;
            status = true;
            break;

          case 'textarea':
            newDoc.innerHTML = `<div class="textarea-div">${defaultValue}</div>`;
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


  getBlob = (wordId, fileName) => {
    // IE10 以下
    if (typeof window === 'undefined' || (typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent))) {
      return;
    }

    const mHtml = {
      top: `Mime-Version: 1.0\nContent-Base: ${location.href}\nContent-Type: Multipart/related; boundary="NEXT.ITEM-BOUNDARY";type="text/html"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset="utf-8"\nContent-Location: ${location.href}\n\n<!DOCTYPE html>\n<html>\n_html_</html>`,
      head: '<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>\n_styles_\n</style>\n</head>\n',
      body: '<body>_body_</body>',
    };

    // 获取导出文本dom 节点


    const { pdfId, formInfo } = this.props;
    let { doc, idList } = formInfo();
    this.initContent(idList);


    const activeDoc = document.getElementById(wordId)
      .cloneNode(true);

    // 文件尾信息
    const mHtmlBottom = '\n--NEXT.ITEM-BOUNDARY--';
    // 文件样式
    const { wordStyles: styles } = this.props;
    // 替换模板里的内容
    const fileContent = mHtml.top.replace('_html_', mHtml.head.replace('_styles_', styles) + mHtml.body.replace('_body_', activeDoc.innerHTML)) + mHtmlBottom;
    // 创建包含文件内容的blob
    const blob = new Blob([fileContent], { type: 'application/msword;charset=utf-8' });
    // 下载word文件
    this.saveAs(blob, `${fileName}.doc`);
    this.props.success();
  };

  saveAs = (blob, name) => {
    // IE 10+ (native saveAs)
    if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
      return navigator.msSaveOrOpenBlob(blob, name);
    }
    const urlObj = window.URL || window.webkitURL || window;
    const objectUrl = urlObj.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    // 模拟点击事件
    a.download = name;
    a.click(); // 下载

  };


  render() {
    const { title } = this.props;
    return (
      <span className="editor-sany-word">
        <span onClick={this.exportWord}>{title}</span>
        <div id="editor-sany-word"></div>
      </span>
    );
  }
}

ExportWord.propTypes = propTypes;
ExportWord.defaultProps = defaultProps;
export default ExportWord;
