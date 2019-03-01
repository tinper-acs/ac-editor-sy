/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';
import { AcEditorSany, AcEditorShow } from '../../src/index';
import '../../src/index.less';

class Demo1 extends Component {
  render() {
    const htmlString = '<div><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" checked="" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div><span><input type="text" id="503bc2b2-6457-498e-88fc-d01a243126f8" actype="date"><br></span></div><div><span><div><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" checked="" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span></div><br></span></div>';

    return (
      <div className="demoPadding">
        <AcEditorShow
          htmlString={htmlString}
        />
        <AcEditorSany/>
      </div>
    );
  }
}

export default Demo1;
