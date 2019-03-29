/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './index.less';

class CheckboxModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropStatus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dropStatus } = nextProps;
    this.setState({ dropStatus });
  }

  // 获取单选框设置
  getInputSetting = () => {
    const totalNum = parseInt(document.getElementById('checkBox_num').value);
    const check = parseInt(document.getElementById('checkBox_check').value);
    const direction = document.getElementById('checkBox_direction').value;
    const data = [];
    for (let num = 1; num <= totalNum; num += 1) {
      data.push(`${num}YYYYYYYY`);
    }
    this.props.onInsertCheckbox({
      data,
      direction,
      check,
    });
    this.setState({ dropStatus: false });
  };

  render() {
    const { dropStatus } = this.state;
    return (
      <span className="w-e-menu"
           onMouseOver={() => {
             if (!dropStatus) {
               this.props.showCloseBar('checkboxStatus');
             }
           }}
           onMouseLeave={() => {
             this.props.showCloseBar();
           }}
      >
        <span className="iconfont icon-checkbox-checked"/>
        <div className={dropStatus ? 'w-e-droplist' : 'w-e-droplist-h'} style={{ width: '265px' }}>
          <p className="w-e-dp-title">插入多选框</p>
          <div className="ac-input-body">
            <div className="ac-input-item">
              <label className="ac-item-label">方向</label>
              <select className="ac-select" id="checkBox_direction">
                <option value="horizontal">水平</option>
                <option value="vertical">纵向</option>
              </select>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">个数</label>
              <input type="number" className="ac-input-number" id="checkBox_num" min="1" defaultValue="1"/>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">默认</label>
              <input type="number" className="ac-input-number" id="checkBox_check" min="1" defaultValue="1"/>
            </div>
          </div>
          <div className="ac-pop-action" onClick={this.getInputSetting}>插入</div>
        </div>
      </span>
    );
  }
}

export default CheckboxModal;
