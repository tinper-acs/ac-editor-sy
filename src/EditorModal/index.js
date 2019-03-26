/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment */
import React, { Component } from 'react';
import './index.less';

class EditorModal extends Component {
  constructor(props) {
    super(props);
  }

  // 提交
  onClickOk = () => {
    this.props.onInsert();
  };

  // 关闭
  onClickClose = () => {
    this.props.cancel();
  };

  render() {
    const { visible, title, width = '350px' } = this.props;
    return (

      <div className={visible ? 'pop-show' : 'pop-hidden'}>
        <div className="pop-body" style={{ width }}>
          <div className="pop-title">
            <span className="pop-title-content">{title}</span>
          </div>
          <div className="pop-content">
            {this.props.children}
          </div>
          <div className="pop-buttonBox">
            <button className="pop-button" type="default" onClick={this.onClickClose}>取消</button>
            <button className="pop-button" type="primary" onClick={this.onClickOk}>确定</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorModal;
