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
    window.onChangeSelect = () => this.onChangeSelect();
    window.onChangeSelect = () => this.onChangeSelect();
    window.onKeyUpTextArea = id => this.onKeyUpTextArea(id);
    window.onClickRadio = id => this.onClickRadio(id);
    window.onClickCheckbox = id => this.onClickCheckbox(id);
  }


  componentDidMount() {
    const {
      htmlString, editorId, isActive = true, defaultData,
    } = this.props;
    document.getElementById(editorId).innerHTML = htmlString;

    // 修改默认值
    if (defaultData && Array.isArray(defaultData) && defaultData.length) {
      for (const item of defaultData) {
        // 插入组件的类型 (text,select,radio,checkbox,date)
        const {
          type, id, dataList, check, direction,
        } = item;

        console.log('--', item);
        const doc = document.getElementById(id);

        // 日期
        if (type === 'date') {
          doc.setAttribute('value', dataList[0]);
          break;
        }

        // 文本类型
        if (type === 'text') {
          doc.innerHTML = dataList[0];
          debugger
          break;
        }

        const newDoc = document.createElement('span');
        // 更改select
        if (type === 'select') {
          newDoc.innerHTML = initSelect({ textArray: dataList, id, check });
        }
        // 更改radio，
        if (type === 'radio') {
          newDoc.innerHTML = initRadio({
            data: dataList, id, check, direction,
          });
        }

        // 更改checkbox，
        if (type === 'checkbox') {
          newDoc.innerHTML = initCheckbox({
            data: dataList, id, check, direction,
          });
        }

        debugger;
        doc.parentNode.replaceChild(newDoc.firstElementChild, doc);
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



  // 下拉框选择
  onChangeSelect = () => {
    const target = event.target;
    const index = target.selectedIndex;
    const options = document.getElementsByName(target.id);
    for (let i = 0; i < options.length; i += 1) {
      options[i].removeAttribute('selected');
    }
    target[index].setAttribute('selected', true);
  };

  // 实时更新checkbox 值
  onClickCheckbox = () => {
    const target = event.target;
    const checked = target.getAttribute('checked');
    if (!checked) {
      target.setAttribute('checked', true);
    } else {
      target.removeAttribute('checked');
    }
  };

  // 实时更新 radio值
  onClickRadio = (id) => {
    const target = event.target;
    const radios = document.getElementsByName(id);
    for (let i = 0; i < radios.length; i += 1) {
      radios[i].removeAttribute('checked');
    }
    target.setAttribute('checked', true);
  };

  // 实时更新 TextArea值
  onKeyUpTextArea = (id) => {
    const doc = document.getElementById(id);
    doc.innerHTML = doc.value;
  };



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
