/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';

class RadioModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getInputSetting = () => {
    const num = parseInt(document.getElementById('num').value);
    const check = parseInt(document.getElementById('check').value);
    const direction = document.getElementById('direction').value;
    this.props.onInsertRadio({
      num,
      direction,
      check,
    });
    this.onCancel();
  };
  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('radioPopStatus');
  };

  render() {
    const { visible } = this.props;
    return (
      <EditorModal
        onInsert={this.getInputSetting}
        visible={visible}
        cancel={this.onCancel}
        title="插入单选框"
      >
        <div className="pop-content-radio">
          <div className="ac-input-item">
            <label className="ac-item-label">方向</label>
            <select className="ac-select" id="direction">
              <option value="horizontal">水平</option>
              <option value="vertical">纵向</option>
            </select>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">个数</label>
            <input type="number" className="ac-input" id="num" min="1" defaultValue="1"/>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">默认</label>
            <input type="number" className="ac-input" id="check" min="1" defaultValue="1"/>
          </div>
        </div>
      </EditorModal>
    );
  }
}

export default RadioModal;
