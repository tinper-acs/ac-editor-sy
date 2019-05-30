/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions,react/jsx-indent-props,jsx-a11y/alt-text,object-curly-newline,padded-blocks,no-restricted-syntax,react/prop-types,object-curly-spacing,react/destructuring-assignment,no-param-reassign,no-shadow,prefer-const,no-underscore-dangle,prefer-destructuring,import/no-extraneous-dependencies,no-fallthrough,no-continue,import/order,react/jsx-indent,react/jsx-no-bind,react/jsx-one-expression-per-line,key-spacing,comma-spacing */
import React, { Component } from 'react';
import DatePicker from 'tinper-bee/lib/Datepicker';
import { Select } from 'tinper-bee';


import PreviewModal from './PreviewModal';

import HrefModal from './HrefModal.js';
import RadioModal from './RadioModal.js';
import CheckboxModal from './CheckboxModal.js';
import SelectModal from './SelectModal.js';
import TableModal from './TableModal.js';
import FixedModal from './FixedModal.js';


// icon 图片
import hrefIcon from './assets/icon/href.png';
import radioIcon from './assets/icon/radio.png';
import checkboxIcon from './assets/icon/checkbox.png';
import selectIcon from './assets/icon/select.png';
import tableIcon from './assets/icon/table.png';
import inputIcon from './assets/icon/input.png';
import textareaIcon from './assets/icon/textarea.png';
import dateIcon from './assets/icon/date.png';
import fixedIcon from './assets/icon/fixed.png';
import viewIcon from './assets/icon/view.png';
import backColorIcon from './assets/icon/back-color.png';
import justifyIcon from './assets/icon/justify.png';
import indentIcon from './assets/icon/indent.png';
import fontColorIcon from './assets/icon/font-color.png';
import lineHeightIcon from './assets/icon/line-height.png';
import letterSpacingIcon from './assets/icon/letter-spacing.png';
import fontNameIcon from './assets/icon/font-name.png';
import otherActionIcon from './assets/icon/other-action.png';
import titleIcon from './assets/icon/title.png';
import fontSizeIcon from './assets/icon/font-size.png';


import {
  arrayObjClear,
  uuid,
  initTable,
  initInput,
  initSelect,
  initRadio,
  initCheckbox,
  initDate,
  getStringLenght,
  initTextarea,
} from './utils';
import zhCN from 'rc-calendar/lib/locale/zh_CN';

import 'bee-datepicker/build/DatePicker.css';
import './index.less';
import './tooltip.less';

import moment from 'moment';

const formatRule = 'YYYY年MM月DD日';
const { Option } = Select;


class AcEditorSany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      currentDateId: '',
      currentDateLeft: '0px', // 日期靠 left 多少像素
      currentDateTop: '0px', // 日期靠 top 多少像素

      idList: [],  // 插入组件的类型 (text,select,radio,checkbox,date)
      hrefStatus: false,
      radioStatus: false,
      checkboxStatus: false,
      selectStatus: false,
      tableStatus: false,
      fixedStatus: false,

      previewHtml: '', // 预览html
      previewStatus: false, //预览状态
      previewIdList: [], // 预览默认值
    };
  }

  // 定义最后光标对象
  lastEditRange = null;


  componentDidMount() {

    this.props.onRef(this);   // 在父组件上绑定子组件方法
    const { htmlString = '', editorId, defaultData = [] } = this.props;
    document.getElementById(editorId).innerHTML = htmlString;

    this.initContent(defaultData); //对传入的值替换
    this.setState({ idList: defaultData });


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
      const width = value ? `${getStringLenght(value) * 7 + 60}px` : '60px';
      target.style.width = width;
    };
  }


  // 插入内容
  insertContent = (content, isCss) => {
    // this.handleCacheHtml();
    if (!content || !this.lastEditRange) { //如果插入的内容为空则返回
      return;
    }
    const sel = window.getSelection();
    // 判断是否有最后光标对象存在
    if (this.lastEditRange && !isCss) {
      // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
      sel.removeAllRanges();
      sel.addRange(this.lastEditRange);
    }
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);      //获取选择范围
      range.deleteContents();             //删除选中的内容
      const el = document.createElement('div'); //创建一个空的div外壳
      el.innerHTML = content;                 //设置div内容为我们想要插入的内容。
      const frag = document.createDocumentFragment();//创建一个空白的文档片段，便于之后插入dom树

      const node = el.firstChild;
      const lastNode = frag.appendChild(node);
      range.insertNode(frag);                 //设置选择范围的内容为插入的内容
      const contentRange = range.cloneRange();  //克隆选区
      contentRange.setStartAfter(lastNode);          //设置光标位置为插入内容的末尾
      contentRange.collapse(true);                   //移动光标位置到末尾
      sel.removeAllRanges();                //移出所有选区
      sel.addRange(contentRange);           //添加修改后的选区
    }
  };

  // 插入table
  onInsertTable = (rowNum, colNum) => {
    this.insertContent(initTable(rowNum, colNum));
  };

  // 插入Input
  onInsertInput = () => {
    const field = uuid();
    this.insertContent(initInput({ field }));
    this.addNewComponent({ field });  // 将Input缓存
  };


  // 插入 textarea
  onInsertTextarea = () => {
    const field = uuid();
    this.insertContent(initTextarea({ field }));
    this.addNewComponent({ // 将Textarea缓存
      field,
      type: 'textarea',
    });
  };

  // 插入select
  onInsertSelect = (param) => {
    const field = uuid();
    const { data } = param;
    const item = {
      ...param,
      field,
      data: data ? data.split('|||') : [], // 将 ||| 连接的字符串转换成数组
    };
    this.insertContent(initSelect(item));
    this.addNewComponent({ // 将下拉缓存
      ...param,
      field,
    });
  };

  // 插入radio
  onInsertRadio = (param) => {
    const field = uuid();
    const { data } = param;
    const item = {
      ...param,
      field,
      data: data ? data.split('|||') : [], // 将 ||| 连接的字符串转换成数组
    };
    this.insertContent(initRadio(item));
    this.addNewComponent({ // 将单选框缓存
      ...param,
      field,
    });
  };

  // 插入多选框
  onInsertCheckbox = (param) => {
    const field = uuid();
    const { data } = param;
    const item = {
      ...param,
      field,
      data: data ? data.split('|||') : [], // 将 ||| 连接的字符串转换成数组
    };
    this.insertContent(initCheckbox(item)); // 动态插入日期
    this.addNewComponent({ // 将多选框缓存
      ...param,
      field,
    });
  };


  // 插入固定字段
  onInsertFixed = (param) => {
    let htmlString = '';
    for (const fixedData of param) {
      const { data = '', type } = fixedData;
      const item = {
        ...fixedData,
        data: data ? data.split('|||') : [], // 将 ||| 连接的字符串转换成数组
      };
      this.addNewComponent(fixedData);  // 将添加组件的信息缓存

      switch (type) {  // 判断组件类型
        case 'text':
          htmlString += initInput(item);
          break;
        case 'textarea':
          htmlString += initTextarea(item);
          break;
        case 'select':
          htmlString += initSelect(item);
          break;
        case 'date':
          htmlString += initDate(item);
          break;
        case 'radio':
          htmlString += initRadio(item);
          break;
        case 'checkbox':
          htmlString += initCheckbox(item);
          break;
        default:
      }
    }
    this.insertContent(`<span>${htmlString}</span>`);
  };

  // 插入日期
  onDate = () => {
    const field = uuid();
    this.insertContent(initDate({ field }));
    this.addNewComponent({  // 将添加组件的信息缓存
      field,
      type: 'date',
    });
  };

  // 编辑框按键弹起和点击事件
  onKeyUpEditBody = (event) => {
    // 缓存光标
    this.lastEditRange = window.getSelection()
      .getRangeAt(0);
  };

  //编辑点击事件
  onClickEditBody = (event) => {
    const _this = this;
    try {
      _this.lastEditRange = window.getSelection()
        .getRangeAt(0); // 缓存光标
    } catch (e) {
      console.log('');
    }
    // 通过事件冒泡方法显示日期弹框
    const { target } = event;
    _this.setState({ showDate: false }); // 强制关闭日期
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


  // 预览按钮
  onPreviewShow = () => {
    const { doc, idList } = this.getHtml2String();
    this.setState({
      previewHtml: doc,
      previewStatus: true,
      previewIdList: idList,
    });
  };

  // 插入标题
  onInsertTitle = (value) => {
    this.insertContent(`<${value}>${value}</${value}>`);
  };

  // 添加href
  onInsertURl = (data) => {
    const { url, text } = data;
    const htmlString = `<a href="${url}">${text}</a>`;
    this.insertContent(htmlString);
  };

  // 下拉执行命令
  onChangeCmd = (value) => {
    window.document.execCommand(value, false, null);
  };

  // 下拉执行命令和值
  onChangeCmdValue = (cmd, value) => {
    window.document.execCommand(cmd, false, value);
  };

  // 下拉修改行高和字宽
  onChangeHeightSpacing = (status, value) => {
    this.onUpdateHeightSpacing(value, status);
  };

  // 修改行高
  onUpdateHeightSpacing = (value, status) => {
    const selectionObj = window.getSelection();
    const element = selectionObj.focusNode.parentElement;  //获取选择的元素
    if (status === 'lineHeight') {
      element.style.lineHeight = value;
    } else {
      element.style.letterSpacing = value;
    }
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
        const textValue = (radios[i].parentNode.innerText).trim();
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
        const textValue = (checkboxs[i].parentNode.innerText).trim();
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


  // 初始化默认传入的值
  initContent = (defaultData) => {

    if (defaultData && Array.isArray(defaultData) && defaultData.length > 0) {

      // 插入组件的类型 (text,select,radio,checkbox,date)
      for (const item of defaultData) {

        const { type, field, data, defaultValue } = item;
        const doc = document.getElementById(field);

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
            doc.setAttribute('value', defaultValue);
            const width = defaultValue ? `${getStringLenght(defaultValue) * 7 + 60}px` : '60px';
            doc.style.width = width;
            break;
          case 'textarea': // 多行文本
            doc.innerHTML = defaultValue;
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

  };


  // 添加新元素属性
  addNewComponent = (param) => {
    const { idList } = this.state;
    const { field, direction = 'horizontal', data = '', type = 'text', defaultValue = '' } = param;
    idList.push({
      field,
      direction,
      data,
      type,
      defaultValue,
    });
    this.setState({ idList });
  };

  // 展示弹框
  onShowModal = (status) => {
    if (status === 'fixedStatus') {
      const { idList } = this.state;
      const list = idList.filter(item => document.getElementById(item.field));  // 查看id是否真的有效
      const clearList = arrayObjClear(list, 'field');  // 对象去重
      const updList = this.updateIdList(clearList);  // 替换默认值和更新修改后的值
      this.setState({
        [status]: true,
        idList: updList,
      });
    } else {
      this.setState({ [status]: true });
    }
  };

  // 关闭弹框
  onHideModal = status => this.setState({ [status]: false });

  render() {

    const { showDate, currentDateLeft, currentDateTop, previewHtml, previewStatus, previewIdList = [] } = this.state;
    const { editorId, height,sanyTheme } = this.props;


    return (
      <div className="editor-sany">

        <div className="toolbar-sany">
          {/*预览*/}
          <span tooltip="预览" flow="down" className="icon-span">
            <img src={viewIcon} onClick={this.onPreviewShow}/>
            {/*预览弹框*/}
            <PreviewModal
              status={previewStatus}
              onHideModal={this.onHideModal}
              htmlString={previewHtml}
              defaultData={[...previewIdList]}
            />
          </span>

          {/*超链接*/}
          <span tooltip="链接" flow="down" className="icon-span">
            <img
              src={hrefIcon}
              onClick={this.onShowModal.bind(this, 'hrefStatus')}
            />
            <HrefModal
              onInsert={this.onInsertURl}
              status={this.state.hrefStatus}
              onHideModal={this.onHideModal}
              sanyTheme={sanyTheme}
            />
          </span>

          {/*单选框*/}
          <span tooltip="单选框" flow="down" className="icon-span">
            <img
              src={radioIcon}
              onClick={this.onShowModal.bind(this, 'radioStatus')}
            />
            <RadioModal
              onInsert={this.onInsertRadio}
              status={this.state.radioStatus}
              onHideModal={this.onHideModal}
              sanyTheme={sanyTheme}

            />
          </span>

          {/*多选框*/}
          <span tooltip="多选框" flow="down" className="icon-span">
            <img
              src={checkboxIcon}
              onClick={this.onShowModal.bind(this, 'checkboxStatus')}
            />
            <CheckboxModal
              onInsert={this.onInsertCheckbox}
              status={this.state.checkboxStatus}
              onHideModal={this.onHideModal}
              sanyTheme={sanyTheme}
            />
          </span>

          {/*下拉框*/}
          <span tooltip="下拉框" flow="down" className="icon-span">
            <img
              src={selectIcon}
              onClick={this.onShowModal.bind(this, 'selectStatus')}
            />
            <SelectModal
              onInsert={this.onInsertSelect}
              status={this.state.selectStatus}
              onHideModal={this.onHideModal}
              sanyTheme={sanyTheme}
            />
          </span>

          {/*表格*/}
          <span tooltip="表格" flow="down" className="icon-span">
            <img
              src={tableIcon}
              onClick={this.onShowModal.bind(this, 'tableStatus')}
            />
            <TableModal
              onInsert={this.onInsertTable}
              status={this.state.tableStatus}
              onHideModal={this.onHideModal}
              sanyTheme={sanyTheme}
            />
          </span>


          {/*文本 输入*/}
          <span tooltip="文本框" flow="down" className="icon-span">
            <img src={inputIcon} onClick={this.onInsertInput}/>
          </span>


          {/*文本 多行文本*/}
          <span tooltip="多行文本框" flow="down" className="icon-span">
            <img src={textareaIcon} onClick={this.onInsertTextarea}/>
          </span>


          {/*日期*/}
          <span tooltip="日期" flow="down" className="icon-span">
            <img src={dateIcon} onClick={this.onDate}/>
          </span>

          {/*固定字段*/}
          <span tooltip="固定字段" flow="down" className="icon-span">
            <img
              src={fixedIcon}
              onClick={this.onShowModal.bind(this, 'fixedStatus')}
            />
            <FixedModal
              onInsert={this.onInsertFixed}
              status={this.state.fixedStatus}
              onHideModal={this.onHideModal}
              fixedDate={this.props.fixedDate}
              idList={this.state.idList}
              sanyTheme={sanyTheme}
            />
          </span>
          <span tooltip="对齐方式" flow="down">
            <Select
              value={undefined}
              placeholder="标题"
              onChange={this.onInsertTitle}
              style={{ width: '60px' }}
              size="sm"
            >
                <Option value="H1">H1</Option>
                <Option value="H2">H2</Option>
                <Option value="H3">H3</Option>
                <Option value="H4">H4</Option>
                <Option value="H5">H5</Option>
            </Select>
            <img src={titleIcon} className="select-icon-img"/>
          </span>

          {/*对齐方式*/}
          <span tooltip="对齐方式" flow="down">
            <Select
              placeholder="对齐"
              value={undefined}
              defaultValue=""
              onChange={this.onChangeCmd}
              style={{ width: '60px' }}
              size="sm"
            >
                <Option value="justifyLeft">靠左</Option>
                <Option value="justifyCenter">居中</Option>
                <Option value="justifyRight">靠右</Option>
            </Select>
            <img src={justifyIcon} className="select-icon-img"/>
          </span>


          {/*缩进*/}
          <span tooltip="缩进" flow="down">
            <Select
              placeholder="缩进"
              value={undefined}
              defaultValue=""
              onChange={this.onChangeCmd}
              style={{ width: '60px' }}
              size="sm"
            >
                <Option value="indent">前进</Option>
                <Option value="outdent">后退</Option>
            </Select>
            <img src={indentIcon} className="select-icon-img"/>
          </span>


          {/*字体颜色*/}
          <span tooltip="字体颜色" flow="down">
            <Select
              placeholder="字体色"
              value={undefined}
              onChange={this.onChangeCmdValue.bind(this, 'foreColor')}
              style={{ width: '80px' }}
              size="sm"
            >
                <Option value="#000000"><span style={{ color: '#000000' }}>#000000</span></Option>
                <Option value="#1c487f"><span style={{ color: '#1c487f' }}>#1c487f</span></Option>
                <Option value="#4d80bf"><span style={{ color: '#4d80bf' }}>#4d80bf</span></Option>
                <Option value="#f9963b"><span style={{ color: '#f9963b' }}>#f9963b</span></Option>
                <Option value="#c24f4a"><span style={{ color: '#c24f4a' }}>#c24f4a</span></Option>
                <Option value="#8baa4a"><span style={{ color: '#8baa4a' }}>#8baa4a</span></Option>
                <Option value="#7b5ba1"><span style={{ color: '#7b5ba1' }}>#7b5ba1</span></Option>
                <Option value="#46acc8"><span style={{ color: '#46acc8' }}>#46acc8</span></Option>
                <Option value="#ff0000"><span style={{ color: '#ff0000' }}>#ff0000</span></Option>
            </Select>
            <img src={fontColorIcon} className="select-icon-img"/>
          </span>

          {/*背景色*/}
          <span tooltip="背景色" flow="down">
            <Select
              placeholder="背景色"
              value={undefined}
              onChange={this.onChangeCmdValue.bind(this, 'backColor')}
              style={{ width: '80px' }}
              size="sm"
            >
                <Option style={{ backgroundColor: '#000000' }} value="#000000">#000000</Option>
                <Option style={{ backgroundColor: '#4d80bf' }} value="#4d80bf">#4d80bf</Option>
                <Option style={{ backgroundColor: '#f9963b' }} value="#f9963b">#f9963b</Option>
                <Option style={{ backgroundColor: '#c24f4a' }} value="#c24f4a">#c24f4a</Option>
                <Option style={{ backgroundColor: '#8baa4a' }} value="#8baa4a">#8baa4a</Option>
                <Option style={{ backgroundColor: '#7b5ba1' }} value="#7b5ba1">#7b5ba1</Option>
                <Option style={{ backgroundColor: '#46acc8' }} value="#46acc8">#46acc8</Option>
                <Option style={{ backgroundColor: '#ff0000' }} value="#ff0000">#ff0000</Option>
            </Select>
            <img src={backColorIcon} className="select-icon-img"/>
          </span>

          {/*行高*/}
          <span tooltip="行高" flow="down">
            <Select
              placeholder="行高"
              value={undefined}
              onChange={this.onChangeHeightSpacing.bind(this, 'lineHeight')}
              style={{ width: '60px' }}
              size="sm"
            >
                <Option value={1.0}>1.0倍</Option>
                <Option value={1.2}>1.2倍</Option>
                <Option value={1.5}>1.5倍</Option>
                <Option value={1.8}>1.8倍</Option>
                <Option value={2.0}>2.0倍</Option>
                <Option value={2.5}>2.5倍</Option>
                <Option value={3.0}>3.0倍</Option>
                <Option value={4.0}>4.0倍</Option>
            </Select>
            <img src={lineHeightIcon} className="select-icon-img"/>
          </span>

          {/*字间距*/}
          <span tooltip="字间距" flow="down">
            <Select
              placeholder="字间距"
              value={undefined}
              onChange={this.onChangeHeightSpacing.bind(this, 'letterSpacing')}
              style={{ width: '65px' }}
              size="sm"
            >
                <Option value="0px">0px</Option>
                <Option value="1px">1px</Option>
                <Option value="2px">2px</Option>
                <Option value="3px">3px</Option>
                <Option value="4px">4px</Option>
                <Option value="5px">5px</Option>
                <Option value="6px">6px</Option>
            </Select>
            <img src={letterSpacingIcon} className="select-icon-img"/>
          </span>

          {/*字体大小*/}
          <span tooltip="字体大小" flow="down">
            <Select
              placeholder="字体大小"
              value={undefined}
              onChange={this.onChangeCmdValue.bind(this, 'fontSize')}
              style={{ width: '85px' }}
              size="sm"
            >
                <Option value="1">x-small</Option>
                <Option value="2">small</Option>
                <Option value="3">normal</Option>
                <Option value="4">large</Option>
                <Option value="5">x-large</Option>
                <Option value="6">xx-large</Option>
            </Select>
            <img src={fontSizeIcon} className="select-icon-img"/>
          </span>


          {/*字体名称*/}
          <span tooltip="字体名称" flow="down">
            <Select
              placeholder="字体名称"
              value={undefined}
              onChange={this.onChangeCmdValue.bind(this, 'fontName')}
              style={{ width: '85px' }}
              size="sm"
              // open={true}
            >
                <Option value="Microsoft Yahei"
                        style={{ fontFamily: 'Microsoft Yahei' }}>微软雅黑</Option>
                <Option value="SimHei " style={{ fontFamily: 'SimHei ' }}>黑体</Option>
                <Option value="KaiTi" style={{ fontFamily: 'KaiTi' }}><span>楷体</span></Option>
                <Option value="FangSong" style={{ fontFamily: 'FangSong' }}>仿宋</Option>
                <Option value="NSimSun" style={{ fontFamily: 'NSimSun' }}>新宋体</Option>
                <Option value="SimSun" style={{ fontFamily: 'SimSun' }}>宋体</Option>
                <Option value="STSong" style={{ fontFamily: 'STSong' }}>华文宋体</Option>
                <Option value="STZhongsong" style={{ fontFamily: 'STZhongsong' }}>华文中宋</Option>
                <Option value="STKaiti" style={{ fontFamily: 'STKaiti' }}>华文楷体</Option>
                <Option value="LiSu" style={{ fontFamily: 'LiSu' }}>隶书</Option>
            </Select>
            <img src={fontNameIcon} className="select-icon-img"/>
          </span>

          {/*基本操作*/}
          <span tooltip="其他操作" flow="down">
            <Select
              placeholder="其他操作"
              value={undefined}
              onChange={this.onChangeCmd}
              style={{ width: '85px' }}
              size="sm"
            >
                <Option value="bold" style={{ fontWeight: 'bold' }}>加粗</Option>
                <Option value="underline" style={{ textDecoration: 'underline' }}>下划线</Option>
                <Option value="italic" style={{ fontStyle: 'italic' }}>斜体</Option>
                <Option value="strikeThrough"
                        style={{ textDecoration: 'line-through' }}>删除线</Option>
                <Option value="removeFormat">格式刷</Option>
            </Select>
            <img src={otherActionIcon} className="select-icon-img"/>
          </span>
        </div>

        {/*文本编辑器容器*/}
        <div
          id={editorId}
          className="editor-sany-content"
          contentEditable="true"
          style={{ minHeight: height ? height : '200px' }}
          onKeyUp={this.onKeyUpEditBody}
          onClick={this.onClickEditBody}
          // onChange={this.onKeyUpEditBody}
        />

        {/*日期组件*/}
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

export default AcEditorSany;
