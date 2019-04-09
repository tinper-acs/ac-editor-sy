/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions,no-restricted-syntax,react/prop-types */
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'tinper-bee/lib/Datepicker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';

import { initSelect, initRadio, initCheckbox } from './utils';

import './index.less';

const formatRule = 'YYYY-MM-DD';


const propTypes = {
  editorId: PropTypes.string,
  htmlString: PropTypes.string,
  isActive: PropTypes.bool,
  defaultData: PropTypes.array,
};

const defaultProps = {
  editorId: '',
  htmlString: '',
  isActive: true,
  defaultData: [],
};


class AcEditorShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      currentDateLeft: '0px',
      currentDateTop: '0px',
    };
    window.onChangeSelect = () => this.onChangeSelect();
    window.onClickRadio = id => this.onClickRadio(id);
    window.onClickCheckbox = id => this.onClickCheckbox(id);
    window.onKeyUpTextArea = id => this.onKeyUpTextArea(id);
  }


  componentWillReceiveProps(nextProps) {
    const { htmlString } = this.props;
    // 阅览弹框
    if (nextProps.isShow && (htmlString !== nextProps.htmlString)) {
      this.initContent(nextProps);
    }
  }

  componentDidMount() {
    this.initContent(this.props);
    // 在父组件上绑定子组件方法
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  // 初始化, 将html值插入dom元素中
  initContent = (param) => {
    const {
      htmlString, editorId, isActive = true, defaultData, waterMarkerText,
    } = param;

    document.getElementById(editorId).innerHTML = htmlString;

    // 添加水印
    if (waterMarkerText) {
      this.addWaterMarker(waterMarkerText, editorId);
    }

    // 修改默认值
    if (defaultData && Array.isArray(defaultData) && defaultData.length > 0) {
      for (const item of defaultData) {
        // 插入组件的类型 (text,select,radio,checkbox,date)
        const {
          type, field: id, data, defaultValue, direction,
        } = item;

        const doc = document.getElementById(id);
        // id是否存在
        if (!doc) {
          break;
        }
        // 日期直接修改值
        if (type === 'date' &&  defaultValue) {
          doc.setAttribute('value', defaultValue);
          break;
        }

        // 文本类型
        if (type === 'text'  && defaultValue) {
          doc.innerHTML = defaultValue;
          break;
        }

        const newDoc = document.createElement('span');
        // 更改select
        if (type === 'select' && data && defaultValue) {
          newDoc.innerHTML = initSelect({
            data: data.split('|||'),
            id,
            defaultValue,
          });
        }
        // 更改radio，
        if (type === 'radio' && data && defaultValue) {
          newDoc.innerHTML = initRadio({
            data: data.split('|||'),
            id,
            defaultValue,
            direction,
          });
        }

        // 更改checkbox，
        if (type === 'checkbox' && data && defaultValue) {
          newDoc.innerHTML = initCheckbox({
            data: data.split('|||'),
            id,
            defaultValue,
            direction,
          });
        }
        // 有子节点才替换
        if (defaultValue && newDoc.firstElementChild) {
          doc.parentNode.replaceChild(newDoc.firstElementChild, doc);
        }
      }
    }

    // 是否让组件 disabled
    if (!isActive) {
      const activeDoc = document.getElementById(editorId);
      // 修改 textarea
      const textAreaList = activeDoc.getElementsByTagName('textarea');
      for (const item of textAreaList) {
        item.setAttribute('disabled', true);
      }
      // 修改 input
      const inputList = activeDoc.getElementsByTagName('input');
      for (const item of inputList) {
        item.setAttribute('disabled', true);
      }
      // 修改 select
      const selectList = activeDoc.getElementsByTagName('select');
      for (const item of selectList) {
        item.setAttribute('disabled', true);
      }
    }
  };


  //保存方法回调
  getHtml2String = () => {
    const idList = this.getFormId();
    const doc = document.getElementById(this.props.editorId).innerHTML;
    return {
      idList,
      doc,
    };
  };


  // 获取id值

  getFormId = () => {
    const result = [];
    const { editorId } = this.props;
    const activeDoc = document.getElementById(editorId);
    const inputList = activeDoc.getElementsByTagName('input');
    // 获取 input 内容
    for (const item of inputList) {
      const type = item.getAttribute('type');
      let field = item.getAttribute('id');
      let value = item.getAttribute('value');
      const { checked } = item;
      if (type === 'radio' && checked) {
        field = item.getAttribute('name');
        value = item.parentNode.textContent.trim();
      }
      if (field) {
        result.push({
          field,
          value,
        });
      }
    }


    // 获取 textarea 内容
    const textareaList = activeDoc.getElementsByTagName('textarea');
    for (const item of textareaList) {
      const field = item.getAttribute('id');
      const value = item.value.trim();
      if (field) {
        result.push({
          field,
          value,
        });
      }
    }

    // 获取 select 内容
    const selectList = activeDoc.getElementsByTagName('select');
    for (const item of selectList) {
      const field = item.getAttribute('id');
      let value = '';
      const options = item.getElementsByTagName('option');
      for (const option of options) {
        // 获取选中的slect
        if (option.selected) {
          value = option.innerText.trim();
          break;
        }
      }
      if (field) {
        result.push({
          field,
          value,
        });
      }
    }
    return result;
  };


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
    this.setState({ showDate: false });
    const date = param.format(formatRule);
    document.getElementById(currentDateId).value = date;
    document.getElementById(currentDateId)
      .setAttribute('value', date);
  };

  //编辑点击事件
  onClickEditBody = (event) => {
    const _this = this;
    const { isActive = true } = this.props;
    // 判断input 是否可以点击
    const { showDate } = _this.state;
    if (isActive && !showDate) {
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
    } else {
      _this.setState({
        showDate: false,
      });
    }
  };


  addWaterMarker = (str, editorId) => {
    const can = document.createElement('canvas');
    const body = document.getElementById(editorId);
    body.appendChild(can);
    can.width = 300; //画布的宽
    can.height = 200;//画布的高度
    can.style.display = 'none';
    const cans = can.getContext('2d');
    cans.rotate(-20 * Math.PI / 180); //画布里面文字的旋转角度
    cans.font = '16px Microsoft JhengHei'; //画布里面文字的字体
    cans.fillStyle = 'rgba(17, 17, 17, 0.20)';//画布里面文字的颜色
    cans.textAlign = 'left'; //画布里面文字的水平位置
    cans.textBaseline = 'Middle'; //画布里面文字的垂直位置
    cans.fillText(str, can.width / 3, can.height / 2); //画布里面文字的间距比例
    body.style.backgroundImage = `url(${can.toDataURL('image/png')})`; //把画布插入到body中
  };


  render() {
    const {
      showDate, currentDateLeft, currentDateTop,
    } = this.state;
    const { editorId } = this.props;

    return (
      <div className="editor-sany">
        <div>
          <div
            id={editorId}
            onClick={this.onClickEditBody}
          />
        </div>
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

AcEditorShow.propTypes = propTypes;
AcEditorShow.defaultProps = defaultProps;
export default AcEditorShow;
