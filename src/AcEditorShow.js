/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions,no-restricted-syntax,react/prop-types,react/forbid-prop-types,react/no-unused-prop-types,react/sort-comp,react/destructuring-assignment,prefer-destructuring,no-param-reassign,prefer-const,react/jsx-tag-spacing,object-curly-newline */
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'tinper-bee/lib/Datepicker';
import zhCN from 'rc-calendar/lib/locale/zh_CN';

import { initSelect, initRadio, initCheckbox, arrayObjClear, getStringLenght } from './utils';

import './AcEditorShow.less';

const formatRule = 'YYYY年MM月DD日';


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
  }


  componentWillReceiveProps(nextProps) {
    // todo 待优化
    this.initContent(nextProps);
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

    this.setState({ idList: defaultData });
    document.getElementById(editorId).innerHTML = htmlString;

    // 添加水印
    if (waterMarkerText) {
      this.addWaterMarker(waterMarkerText, editorId);
    }

    // 修改默认值
    if (defaultData && Array.isArray(defaultData) && defaultData.length > 0) {
      // 插入组件的类型 (text,select,radio,checkbox,date)
      for (const item of defaultData) {

        const { type, field, data, defaultValue, } = item;
        // const doc = document.getElementById(field);

        let doc;
        try {
          doc = document.querySelector('#' + editorId + ' #' + field.toString());
        } catch (err) {
          doc = document.getElementById(field);
        }
        // id是否存在
        if (!doc) {
          continue;
        }
        // 用于包裹 select radio checkbox
        const newDoc = document.createElement('span');
        let status = false; // 是否创建新元素

        switch (type) {  // 判断组件类型
          case 'date': // 日期直接修改值
          case 'text':  // 文本类型
            // if(defaultValue)
            doc.setAttribute('value', defaultValue);
            const width = defaultValue ? `${getStringLenght(defaultValue) * 7 + 60}px` : '60px';
            doc.style.width = width;
            break;
          case 'textarea': // 多行文本
            doc.innerHTML = defaultValue.replace(/↵/g, '&#13;&#10;'); // 替换回车
            const docWidth=doc.offsetWidth;
            const height= defaultValue?`${parseInt(getStringLenght(defaultValue) * 7/docWidth+1)*30}px`:'60px';
            console.log(getStringLenght(defaultValue) * 7);
            doc.style.height=height;
            break;
          case 'select':
            newDoc.innerHTML = initSelect({
              ...item,
              data: data.split('|||'),
            });
            status = true;
            break;
          case 'radio':
            newDoc.innerHTML = initRadio({
              ...item,
              data: data.split('|||'),
            });
            status = true;
            break;
          case 'checkbox':
            newDoc.innerHTML = initCheckbox({
              ...item,
              data: data.split('|||'),
            });
            status = true;
            break;
          default:
        }

        if (status && newDoc.firstElementChild && doc.parentNode) { // 有子节点才替换
          doc.parentNode.replaceChild(newDoc.firstElementChild, doc);
        }

      }
    }

    // 是否让组件 disabled
    if (!isActive) {
      const activeDoc = document.getElementById(editorId);
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

      // 修改 textarea
      const textareaList = activeDoc.getElementsByTagName('textarea');
      for (const item of textareaList) {
        item.setAttribute('disabled', true);
      }
    }

    window.onChangeSelect = function (event) { // select 选中事件
      const target = event.target;
      const index = target.selectedIndex;

      const options = document.getElementsByName(target.id);
      for (let i = 0; i < options.length; i += 1) {
        options[i].removeAttribute('selected');
      }
      target[index].setAttribute('selected', true);
    };

    window.onClickRadio = function (event) {   // radio 点击事件
      const target = event.target;
      const id = target.getAttribute('name');
      const radios = document.getElementsByName(id);
      for (let i = 0; i < radios.length; i += 1) {
        radios[i].removeAttribute('checked');
      }
      target.setAttribute('checked', true);
    };

    window.onClickCheckbox = function (event) { // checkbox 点击事件
      const target = event.target;
      const checked = target.getAttribute('checked');
      if (!checked) {
        target.setAttribute('checked', true);
      } else {
        target.removeAttribute('checked');
      }
    };

    window.onKeyUpInput = function (event) { // input 根据输入框的值自动改变宽度
      const target = event.target;
      const { value } = target;
      const width = value ? (getStringLenght(value) * 7 + 60) + 'px' : '60px';
      target.style.width = width;
    };

  };


  //保存方法回调
  getHtml2String = () => {
    const { idList } = this.state;
    const list = idList.filter(item => document.getElementById(item.field));  // 查看id是否真的有效
    const clearList = arrayObjClear(list, 'field');  // 对象去重
    const updList = this.updateIdList(clearList);  // 替换默认值和更新修改后的值
    const doc = document.getElementById(this.props.editorId).innerHTML; // 获取dom
    return {
      doc,
      idList: updList,
    };
  };


  // 重新修改组件默认值
  updateIdList = array => array.map((item) => {
    const { field, type } = item;
    const doc = document.getElementById(field);

    if (type === 'date' || type === 'text') {  // 文本类型 日期||普通文本
      const textValue = doc.value;
      item.data = textValue;
      item.defaultValue = textValue;
      doc.setAttribute('value', textValue); // 修改输入框里的内容
    }

    if (type === 'textarea') { // 多行文本输入
      const { value } = doc;
      doc.innerHTML = value;
      item.data = value;
      item.defaultValue = value;
    }


    if (type === 'radio') {  // 单选框
      let data = [];
      let defaultValue = '';
      const radios = document.getElementsByName(field);
      // 对单选框 重新赋值
      for (let i = 0; i < radios.length; i += 1) {
        const checked = radios[i].getAttribute('checked');
        const textValue = radios[i].parentNode.innerText;
        data.push(textValue);
        radios[i].setAttribute('value', textValue);
        if (checked) { //修改默认选中值
          defaultValue = textValue;
        }
      }
      item.data = data.join('|||');
      item.defaultValue = defaultValue;
    }

    if (type === 'checkbox') {  // 单选框
      let data = [];
      let defaultValue = [];
      const checkboxs = document.getElementsByName(field);
      // 对单选框 重新赋值
      for (let i = 0; i < checkboxs.length; i += 1) {
        const checked = checkboxs[i].getAttribute('checked');
        const textValue = checkboxs[i].parentNode.innerText;
        data.push(textValue);
        checkboxs[i].setAttribute('value', textValue);
        if (checked) { //修改默认选中值
          defaultValue.push(textValue);
        }
      }
      item.data = data.join('|||');
      item.defaultValue = defaultValue.join('|||');
    }

    if (type === 'select') { // 下拉框
      const selectedIndex = doc.selectedIndex; // 选中索引
      item.defaultValue = doc.options[selectedIndex].value; // 选中值
    }
    return item;
  });


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
    const { showDate, currentDateLeft, currentDateTop, } = this.state;
    const { editorId } = this.props;

    return (
      <div className="editor-sany-show">
        <div>
          <div id={editorId} onClick={this.onClickEditBody}/>
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
