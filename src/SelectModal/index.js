/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';

class SelectModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getSelect = () => {
    const textArray = window.document.getElementById('select-textarea').innerText.split(/[\n,]/g);
    const filterArray= textArray.filter(item => item !=="" && item!==null);
    this.props.onInsertSelect(filterArray);
    this.onCancel();
  };
  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('selectPopStatus');
  };

  render() {
    const { visible } = this.props;
    return (
      <EditorModal
        onInsert={this.getSelect}
        visible={visible}
        cancel={this.onCancel}
        title="插入下拉框"
      >
        <div className="pop-content-select">
          <div className="ac-auto-height" contentEditable="true" id="select-textarea"/>
        </div>
      </EditorModal>
    );
  }
}

export default SelectModal;
