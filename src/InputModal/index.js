/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';

class InputModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getInputSetting = () => {
    const category = document.getElementById('input-category').value;
    const defVal = document.getElementById('input-defaultValue').value;
    const minWidth = document.getElementById('input-minWidth').value;
    const placeholder = document.getElementById('input-placeholder').value;
    this.props.onInsertInput({
      category,
      defVal,
      minWidth,
      placeholder,
    });
    this.onCancel();
  };
  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('inputPopStatus');
  };

  render() {
    const { visible } = this.props;
    return (
      <EditorModal
        onInsert={this.getInputSetting}
        visible={visible}
        cancel={this.onCancel}
        title="插入输入框"
      >
        <div className="pop-content-input">
          <div className="ac-input-item">
            <label className="ac-item-label">类型</label>
            <input type="text" className="ac-input" id="input-category"/>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">默认值</label>
            <input type="text" className="ac-input" id="input-defaultValue"/>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">最小宽</label>
            <input type="number" className="ac-input" id="input-minWidth" min="150" defaultValue="150"/>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">占位符</label>
            <input type="text" className="ac-input" id="input-placeholder"/>
          </div>
        </div>
      </EditorModal>
    );
  }
}

export default InputModal;
