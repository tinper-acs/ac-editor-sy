/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './index.less';

class InputModal extends Component {
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
    const url = document.getElementById('input_url').value;
    const text = document.getElementById('input_text').value;
    this.props.onInsertURl({ url, text });
    this.setState({ dropStatus: false });
  };


  render() {
    const { dropStatus } = this.state;
    return (
      <span
        className="w-e-menu"
        onMouseOver={() => {
          if (!dropStatus) {
            this.props.showCloseBar('hrefStatus');
          }
        }}
        onMouseLeave={() => {
          this.props.showCloseBar();
        }}
      >
        <span className="iconfont icon-link" />
        <div className={dropStatus ? 'w-e-droplist' : 'w-e-droplist-h'} style={{ width: '265px' }}>
          <p className="w-e-dp-title">插入链接</p>
          <div className="ac-input-body">

            <div className="ac-input-item">
              <label className="ac-item-label">文本</label>
              <input type="text" className="ac-input-number" id="input_text" />
            </div>

            <div className="ac-input-item">
              <label className="ac-item-label">URL</label>
              <input type="text" className="ac-input-number" id="input_url" />
            </div>
          </div>
          <div className="ac-pop-action" onClick={this.getInputSetting}>
            插入
          </div>
        </div>
      </span>
    );
  }
}

export default InputModal;
