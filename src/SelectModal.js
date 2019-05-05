/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './index.less';

class SelectModal extends Component {
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
    const textArray = window.document.getElementById('select_textarea').innerText.split(/[\n,]/g);
    const filterArray= textArray.filter(item => item !=="" && item!==null);
    this.props.onInsertSelect(filterArray);
    this.setState({ dropStatus: false });
  };



  render() {
    const { dropStatus } = this.state;
    return (
      <span className="w-e-menu"
           onMouseOver={() => {
             if (!dropStatus) {
               this.props.showCloseBar('selectStatus');
             }
           }}
           // onMouseLeave={() => {
           //   this.props.showCloseBar();
           // }}
      >
        <span className="iconfont icon-xialakuang"/>
        <div className={dropStatus ? 'w-e-droplist' : 'w-e-droplist-h'} style={{ width: '265px' }}>
          <p className="w-e-dp-title">插入下拉框</p>
          <div className="pop-content-select">
            <div className="ac-auto-height" contentEditable="true" id="select_textarea"/>
          </div>
          <div className="ac-pop-action" onClick={this.getInputSetting}>插入</div>
        </div>
      </span>
    );
  }
}

export default SelectModal;
