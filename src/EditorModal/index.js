/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment */
import React, { Component } from 'react';
import './index.less';
import cancelIcon from '../assets/icon/cancel.png';

class EditorModal extends Component {
  constructor(props) {
    super(props);
  }

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
            <img src={cancelIcon} alt="" className="cancelIcon" onClick={this.onClickClose}/>
          </div>
          <div className="pop-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default EditorModal;
