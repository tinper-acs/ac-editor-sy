/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './index.less';

class RadioModal extends Component {
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
    const num = parseInt(document.getElementById('radio_num').value);
    const check = parseInt(document.getElementById('radio_check').value);
    const direction = document.getElementById('radio_direction').value;
    const data = new Array(num).fill('xxxxxxx');
    this.props.onInsertRadio({
      data,
      direction,
      check,
    });
    this.setState({ dropStatus: false });
  };

  // 打开弹框
  onShow = () => {
    this.props.showCloseBar('radioStatus');
  };

  render() {
    const { dropStatus } = this.state;
    return (
      <div
        className="w-e-menu"
        onMouseOver={() => {
          if (!dropStatus) {
            this.onShow();
          }
        }}
      >
        <span className="iconfont icon-RectangleCopy" />
        <div className={dropStatus ? 'w-e-droplist' : 'w-e-droplist-h'} style={{ width: '265px' }}>
          <p className="w-e-dp-title">插入单选框</p>
          <div className="ac-input-body">
            <div className="ac-input-item">
              <label className="ac-item-label">方向</label>
              <select className="ac-select" id="radio_direction">
                <option value="horizontal">水平</option>
                <option value="vertical">纵向</option>
              </select>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">个数</label>
              <input type="number" className="ac-input-number" id="radio_num" min="1" defaultValue="1" />
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">默认</label>
              <input type="number" className="ac-input-number" id="radio_check" min="1" defaultValue="1" />
            </div>
          </div>
          <div className="ac-pop-action" onClick={this.getInputSetting}>插入</div>
        </div>
      </div>
    );
  }
}

export default RadioModal;
