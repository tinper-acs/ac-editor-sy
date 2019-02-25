/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';

class CheckboxModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getInputSetting = () => {
    const num = parseInt(document.getElementById('checkbox-num').value);
    const direction = document.getElementById('checkbox-direction').value;
    const check = parseInt(document.getElementById('checkbox-check').value);
    this.props.onInsertCheckbox({
      num,
      direction,
      check,
    });
    this.onCancel();
  };
  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('checkboxPopStatus');
  };

  render() {
    const { visible } = this.props;
    return (
      <EditorModal
        onInsert={this.getInputSetting}
        visible={visible}
        cancel={this.onCancel}
        title="插入多选框"
      >
        <div className="pop-content-checkbox">
          <div className="ac-input-item">
            <label className="ac-item-label">方向</label>
            <select className="ac-select" id="checkbox-direction">
              <option value="horizontal">水平</option>
              <option value="vertical">纵向</option>
            </select>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">个数</label>
            <input type="number" className="ac-input" id="checkbox-num" min="1" defaultValue="1"/>
          </div>
          <div className="ac-input-item">
            <label className="ac-item-label">默认</label>
            <input type="number" className="ac-input" id="checkbox-check" min="1" defaultValue="1"/>
          </div>
        </div>
      </EditorModal>
    );
  }
}

export default CheckboxModal;
