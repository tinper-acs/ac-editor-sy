/* eslint-disable react/require-default-props,no-unused-expressions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        newDoc.innerHTML = item.getAttribute('value');
        newDoc.style.textDecoration = 'underline';
      }
      item.parentNode.replaceChild(newDoc, item);
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
      newDoc.innerHTML = item.value;
      newDoc.style.textDecoration = 'underline';
      item.parentNode.replaceChild(newDoc, item);
    }
    if (activeDoc.getElementsByTagName('textarea').length > 0) {
      this.replaceTextArea(activeDoc, 'textarea');
    }
  };

  // 替换下拉框
  replaceSelect=(activeDoc) => {
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
  }


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
    const activeDoc = document.getElementById(wordId)
      .cloneNode(true);
    // 替换单选 多选 input
    this.replaceInput(activeDoc);
    // 对 textarea 处理
    this.replaceTextArea(activeDoc);

    this.replaceSelect(activeDoc);


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
      <span className="editor-sany-pdf">
        <span onClick={this.exportWord}>{title}</span>
      </span>
    );
  }
}

ExportWord.propTypes = propTypes;
ExportWord.defaultProps = defaultProps;
export default ExportWord;
