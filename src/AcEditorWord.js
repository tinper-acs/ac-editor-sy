/* eslint-disable react/require-default-props,no-unused-expressions */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import PropTypes from 'prop-types';

// todo 支持图表，例如echart
const propTypes = {
  wordId: PropTypes.string, // wordID
  fileName: PropTypes.string, // 导出文件的名字
  worksheet: PropTypes.string, //导出工作簿名字
  title: PropTypes.element, //名称标题
  styles: PropTypes.string, //word中的样式
};

const defaultProps = {
  wordId: '',
  fileName: 'filename',
  worksheet: 'worksheet',
  title: '导出Word',
  styles: 'table{width:100%}',
};

class ExportWord extends Component {
  exportWord = () => {
    const { wordId, fileName } = this.props;
    this.getBlob(wordId, fileName);
  };

  getBlob = (wordId, fileName) => {
    // IE10 以下
    if (typeof window === 'undefined' || (typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent))) {
      return;
    }

    let template = {
      mHtml: {
        top: 'Mime-Version: 1.0\nContent-Base: ' + location.href + '\nContent-Type: Multipart/related; boundary="NEXT.ITEM-BOUNDARY";type="text/html"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset="utf-8"\nContent-Location: ' + location.href + '\n\n<!DOCTYPE html>\n<html>\n_html_</html>',
        head: '<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>\n_styles_\n</style>\n</head>\n',
        body: '<body>_body_</body>'
      }
    };
    let markUp = document.getElementById(wordId)
      .cloneNode(true);
    const mHtmlBottom = '\n--NEXT.ITEM-BOUNDARY--';
    const { wordStyles: styles } = this.props;
    // Aggregate parts of the file together
    let fileContent = template.mHtml.top.replace('_html_', template.mHtml.head.replace('_styles_', styles) + template.mHtml.body.replace('_body_', markUp.innerHTML)) + mHtmlBottom;
    // Create a Blob with the file contents
    let blob = new Blob([fileContent], { type: 'application/msword;charset=utf-8' });
    this.saveAs(blob, fileName + '.doc');
  };

  saveAs = (blob, name) => {
    // IE 10+ (native saveAs)
    if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
      return navigator.msSaveOrOpenBlob(blob, name);
    } else {
      const urlObj = window.URL || window.webkitURL || window;
      const objectUrl = urlObj.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = name;
      a.click();  // 下载
    }
  };

  render() {
    const {title } = this.props;
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
