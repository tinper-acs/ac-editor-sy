/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions,no-restricted-syntax */
import React, { Component } from 'react';
import DatePicker from 'tinper-bee/lib/Datepicker';
import './index.less';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';



import {
  uuid,
  initTable,
  initInput,
  initSelect,
  initRadio,
  initCheckbox,
  initDate,
  initFixedRadio,
  initFixedCheckbox,
  fixedDate,
  popList,
  textAlignList,
  iconCmdList,
} from './utils';

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
    const { htmlString, editorId, isActive = true, defaultData, } = this.props;
    document.getElementById(editorId).innerHTML = htmlString;

    // 修改默认值
    if (defaultData && defaultData.isArray()) {
      for (const item of defaultData) {
        // 插入组件的类型 (text,select,radio,checkbox,date)
        console.log('item', item);
        const { type, id, dataList, defaultValue, } = item;

        // 如果类型是select，删除下拉框的option，重新生成option
        if (type === 'select') {
          // 动态删除select中的所有options
          document.getElementById(id).options.length = 0;
          for (const optionValue of dataList) {
            const doc = document.getElementById(id)
              .options
              .add(new Option(optionValue, optionValue));
            if (optionValue === defaultValue) {
              doc.setAttribute('selected', true);
            }
          }
        }

        // 如果类型是radio，删除单选框，重新生成单选框
        if (type === 'radio') {
          // 清空子元素
          // let doc = document.getElementById(id);
          // const param={ num, id, check, direction, title = 'YYYYYYYYYY',}
          // let newDoc = initRadio(param)
          // this.addTypeId(id, 'radio');
          // doc.parentNode.replaceChild(newDoc, doc);
        }
      }
    }

    // 是否让组件 disabled
    if (!isActive) {
      // 修改 textarea
      const textAreaList = document.getElementsByTagName('textarea');
      for (const item of textAreaList) {
        item.setAttribute('disabled', true);
      }
      // 修改 input
      const inputList = document.getElementsByTagName('input');
      for (const item of inputList) {
        item.setAttribute('disabled', true);
      }
      // 修改 select
      const selectList = document.getElementsByTagName('select');
      for (const item of selectList) {
        item.setAttribute('disabled', true);
      }
    }
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
    const { isActive = true } = this.props;

    // 判断input 是否可以点击
    if (isActive) {
      // 判断是否为日期 input
      const target = event.target;
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
