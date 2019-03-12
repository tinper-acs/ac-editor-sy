/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions */
import React, { Component } from 'react';

import './index.less';

class AcEditorSave extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }

  //保存方法回调
  getHtml2String = () => {
    return document.getElementById(this.props.saveId).innerHTML;
  };


  render() {
    const { title = '保存' } = this.props;
    return (
      <span>{title}</span>
    );
  }
}

export default AcEditorSave;
