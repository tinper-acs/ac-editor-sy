/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';

import DatePicker from "tinper-bee/lib/Datepicker";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import moment from "moment";

const formatRule = "YYYY-MM-DD";

const dateInputPlaceholder = "选择日期";
import Temp from '../../src/index';

class Demo1 extends Component {
  render() {
    return (
      <div className="demoPadding" >
        <Temp>
          <div></div>
        </Temp>
      </div>
    );
  }
}

export default Demo1;
