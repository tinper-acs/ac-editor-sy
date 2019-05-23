/* eslint-disable react/require-default-props,no-unused-expressions,no-multi-spaces,react/prop-types,react/destructuring-assignment,padded-blocks,react/no-unused-prop-types,consistent-return */

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
  styles: 'table{width:100%} ',
};

class ExportWord extends Component {

  exportWord = () => {
    const { wordId, fileName } = this.props;
    this.getBlob(wordId, fileName);
  };


  initContent = (defaultData) => { // 修改默认值

    if (defaultData && Array.isArray(defaultData) && defaultData.length > 0) {
      // 插入组件的类型 (text,select,radio,checkbox,date)
      for (const item of defaultData) {
        const { type, field, defaultValue } = item;
        const doc = document.getElementById(field);

        if (!doc) {  // id是否存在
          continue;
        }
        // 用于包裹 select radio checkbox
        const newDoc = document.createElement('span');
        let status = false; // 是否创建新元素

        const width = defaultValue ? `${getStringLenght(defaultValue) * 7 + 60}px` : '80px';

        switch (type) {  // 根据类型替换元素
          case 'text':  // 文本类型
          case 'select':  // 下拉
          case 'radio':  // 单选
          case 'checkbox':  // 下拉
          case 'date': // 日期直接修改值
            newDoc.innerHTML = `<span class="text-div" style="width: ${width}">${defaultValue || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span>`;
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
    const { getDefaultInfo } = this.props;
    const idList = getDefaultInfo() || []; // 获取默认值

    this.initContent(idList); // 执行默认替换

    const activeDoc = document.getElementById(wordId) // 获取 dom 节点
      .cloneNode(true);

    const { wordStyles: styles } = this.props; // 文件样式
    // 默认样式
    const defaultStyle = '.text-div{ text-decoration: underline; margin-right: 15px; } .textarea-div{ text-decoration: underline; }';
    const mHtmlBottom = '\n--NEXT.ITEM-BOUNDARY--';// 文件尾信息

    // 替换模板里的内容
    const fileContent = mHtml.top.replace('_html_', mHtml.head.replace('_styles_', defaultStyle + styles) + mHtml.body.replace('_body_', activeDoc.innerHTML)) + mHtmlBottom;
    // 创建包含文件内容的blob
    const blob = new Blob([fileContent], { type: 'application/msword;charset=utf-8' });
    // 下载word文件
    this.saveAs(blob, `${fileName}.doc`);
    // 下载成功后执行回调方法
    this.props.success();
  };


  saveAs = (blob, name) => { // 实现下载操作
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
      </span>
    );
  }
}

ExportWord.propTypes = propTypes;
ExportWord.defaultProps = defaultProps;
export default ExportWord;
