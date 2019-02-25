/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';

class TableModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getTableRowCol = () => {
    const tabRow = document.getElementById('tab-row').value;
    const tabCol = document.getElementById('tab-col').value;
    const rowNum = tabRow ? parseInt(tabRow) : 2;
    const colNum = tabCol ? parseInt(tabCol) : 5;
    this.props.onInsertTable(rowNum, colNum);
    this.onCancel();
  };
  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('tablePopStatus');
  };

  render() {
    const { visible } = this.props;
    return (
      <EditorModal
        onInsert={this.getTableRowCol}
        visible={visible}
        cancel={this.onCancel}
        title="插入表格"
      >
        <div className="pop-content-table">
          创建
          <input type="number" className="input-number" id="tab-row" defaultValue="2"/>
          行
          <input type="number" className="input-number" id="tab-col" defaultValue="5"/>
          列的表格
        </div>
      </EditorModal>
    );
  }
}

export default TableModal;
