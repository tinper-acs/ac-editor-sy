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
    const category = document.getElementById('input_category').value;
    const defVal = document.getElementById('input_defaultValue').value;
    const minWidth = document.getElementById('input_minWidth').value;
    const placeholder = document.getElementById('input_placeholder').value;
    this.props.onInsertInput({
      category,
      defVal,
      minWidth,
      placeholder,
    });
    this.setState({ dropStatus: false });
  };

  // 打开弹框
  onShow = () => {
    this.props.showCloseBar('inputStatus');
  };

  render() {
    const { dropStatus } = this.state;
    return (
      <div className="w-e-menu"
           onMouseOver={() => {
             if (!dropStatus) {
               this.onShow();
             }
           }}
          >
        <span className="iconfont icon-021caozuo_shuru"/>
        <div className={dropStatus ? 'w-e-droplist' : 'w-e-droplist-h'} style={{ width: '265px' }}>
          <p className="w-e-dp-title">插入输入框</p>
          <div className="ac-input-body">
            <div className="ac-input-item">
              <label className="ac-item-label">类型</label>
              <select className="ac-select" id="input_category">
                <option value="text">文本</option>
                <option value="number">数字</option>
              </select>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">默认值</label>
              <input type="text" className="ac-input-number" id="input_defaultValue"/>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">最小宽</label>
              <input type="number" className="ac-input-number" id="input_minWidth" min="150"
                     defaultValue="150"/>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">占位符</label>
              <input type="text" className="ac-input-number" id="input_placeholder"/>
            </div>
          </div>
          <div className="ac-pop-action" onClick={this.getInputSetting}>插入</div>
        </div>
      </div>
    );
  }
}

export default InputModal;
