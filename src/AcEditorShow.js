/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions */
import React, { Component } from 'react';
import DatePicker from 'tinper-bee/lib/Datepicker';
import './index.less';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';

const formatRule = 'YYYY-MM-DD';

class AcEditorShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      currentDateLeft: '0px',
      currentDateTop: '0px',
    };
  }

  componentDidMount() {
    const { htmlString, editorId } = this.props;
    document.getElementById(editorId).innerHTML = htmlString;
  }


  // 选择日期，将日期的值赋值给 选中的input
  onChangeDate = (param) => {
    const { currentDateId } = this.state;
    const date = param.format(formatRule);
    document.getElementById(currentDateId).value = date;
    document.getElementById(currentDateId)
      .setAttribute('value', date);
    this.setState({ showDate: false });
  };

  //编辑点击事件
  onClickEditBody = (event) => {
    const _this = this;
    const target = event.target;
    // 判断是否为日期 input
    if (target.nodeName === 'INPUT' && target.getAttribute('acType') === 'date') {
      const currentDateId = target.getAttribute('id');
      const currentDateLeft = `${event.clientX}px`;
      const currentDateTop = `${event.clientY}px`;
      _this.setState({
        currentDateId,
        currentDateLeft,
        currentDateTop,
        showDate: true,
      });
    }
  };


  render() {
    const {
      showDate, currentDateLeft, currentDateTop,
    } = this.state;
    const { editorId } = this.props;

    return (
      <div className="editor-sany">
        <div
          id={editorId}
          onClick={this.onClickEditBody}
        />
        <div className="ac-date-body">
          <DatePicker
            open={showDate}
            format={formatRule}
            onChange={this.onChangeDate}
            locale={zhCN}
            defaultValue={moment()}
            placeholder="选择日期"
            style={{
              marginLeft: currentDateLeft,
              marginTop: currentDateTop,
            }}
          />
        </div>
      </div>
    );
  }
}

export default AcEditorShow;
