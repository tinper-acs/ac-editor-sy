/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';
import AcEditorSany from '../../src/index';
import '../../src/index.less';

class Demo1 extends Component {
  render() {
    return (
      <div className="demoPadding" >
        <AcEditorSany />
      </div>
    );
  }
}

export default Demo1;
