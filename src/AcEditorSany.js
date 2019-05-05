/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions */
import React, { Component } from 'react';
import DatePicker from 'tinper-bee/lib/Datepicker';
import TableModal from './TableModal.js';
import SelectModal from './SelectModal.js';
import CheckboxModal from './CheckboxModal.js';
import RadioModal from './RadioModal.js';
import PreviewModal from './PreviewModal';
import FixedModal from './FixedModal.js';
import HrefModal from './HrefModal.js';

import {
  arrayObjClear,
  uuid,
  initTable,
  initInput,
  initSelect,
  initRadio,
  initCheckbox,
  initDate,
  popList,
  textAlignList,
  iconCmdList,
} from './utils';

import './assets/font/iconfont.css';
import './index.less';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';

const formatRule = 'YYYY-MM-DD';


class AcEditorSany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      currentDateId: '',
      currentDateLeft: '0px',
      currentDateTop: '0px',
      barObj: {
        hTitle: false,
        fontSize: false,
        fontName: false,
        backColor: false,
        highlight: false,
        textAlign: false,
        lineHeight: false,
        tableStatus: false,
        radioStatus: false,
        checkboxStatus: false,  //是否展示插入 checkbox 弹框
        inputStatus: false, //是否展示插入 input 弹框
        selectStatus: false, //是否展示插入 select 弹框
        fixedStatus: false,  // 是否展示插入 fixed 弹框
        previewStatus: false,  //是否展示插入 preview 弹框
        hrefStatus: false,  //是否展示插入 链接 弹框

      },
      previewHtml: '',
      idList: [],  // 插入组件的类型 (text,select,radio,checkbox,date)

    };
    window.onChangeSelect = () => this.onChangeSelect();
    window.onKeyUpTextArea = id => this.onKeyUpTextArea(id);
    window.onClickRadio = id => this.onClickRadio(id);
    window.onClickCheckbox = id => this.onClickCheckbox(id);
  }

  // 定义最后光标对象
  lastEditRange = null;

  hrefTitle = '';

  timeCount = 0;  // 缓存定时器


  componentDidMount() {
    const { htmlString = '', editorId, defaultData=[] } = this.props;

    document.getElementById(editorId).innerHTML = htmlString;
    const { idList } = this.state;
    // 将id 变成 field
    for (const item of defaultData) {
      idList.push(item);
    }
    this.setState({ idList });
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }

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
    this.showCloseBar();
  };

  // 插入table
  onInsertTable = (rowNum, colNum) => {
    this.insertContent(initTable(rowNum, colNum));
  };


  // 插入Input
  onInsertInput = () => {
    const id = uuid();
    this.insertContent(initInput({ id }));
    this.addTypeId(id, 'text', 'horizontal', '', '');
  };

  // 插入select
  onInsertSelect = (param) => {
    const id = uuid();
    this.insertContent(initSelect({
      data: param,
      id,
    }));
    this.addTypeId(id, 'select', 'horizontal', param.join('|||'), param[0]);
  };

  // 插入radio
  onInsertRadio = (param) => {
    const id = uuid();
    param.id = id;
    this.insertContent(initRadio(param));
    const { data, check, direction } = param;
    this.addTypeId(id, 'radio', direction, data.join('|||'), data[check - 1]);
  };

  // 插入多选框
  onInsertCheckbox = (param) => {
    const id = uuid();
    param.id = id;
    this.insertContent(initCheckbox(param));
    const { data, check, direction } = param;
    this.addTypeId(id, 'checkbox', direction, data.join('|||'), data[check - 1]);
  };


  // 插入固定字段
  onInsertFixed = (param) => {
    let htmlString = '';
    for (const fixedData of param) {
      const {
        data = '', type, field: id, defaultValue = '',
      } = fixedData;

      // 将字符串转换成数组
      const dateArray = data ? data.split('|||') : [];

      const item = {
        data: dateArray,
        type,
        id,
        defaultValue,
      };

      if (type === 'text') {
        htmlString += initInput(item);
      }
      if (type === 'select') {
        htmlString += initSelect(item);
      }
      if (type === 'date') {
        htmlString += initDate(item);
      }
      if (type === 'radio') {
        htmlString += initRadio(item);
      }
      if (type === 'checkbox') {
        htmlString += initCheckbox(item);
      }
      // 默认选中
      this.addTypeId(id, type, 'horizontal', data, defaultValue);
    }
    this.insertContent(`<span>${htmlString}</span>`);
  };

  // 插入日期
  onDate = () => {
    const id = uuid();
    this.insertContent(initDate({ id }));
    this.addTypeId(id, 'date', 'horizontal', '', '');
  };

  // 插入命令
  insertCommand = (cmd, value = null) => {
    window.document.execCommand(cmd, false, value);
  };

  // 编辑框按键弹起和点击事件
  onKeyUpEditBody = (event) => {
    // 缓存光标
    this.lastEditRange = window.getSelection()
      .getRangeAt(0);
    this.hrefTitle = this.getChangeText();
    this.showCloseBar();
  };

  //编辑点击事件
  onClickEditBody = (event) => {
    const _this = this;
    // 缓存光标
    this.lastEditRange = window.getSelection()
      .getRangeAt(0);
    const target = event.target;
    // 强制关闭日期
    _this.setState({ showDate: false });
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
    this.showCloseBar();
    this.hrefTitle = this.getChangeText();
  };

  //编辑点击事件
  onChangeEditBody = (event) => {
    this.showCloseBar();
  };

  // 预览按钮
  onPreviewShow = () => {
    const { editorId } = this.props;
    const textHtml = document.getElementById(editorId).innerHTML;
    this.setState({ previewHtml: textHtml });
    this.showCloseBar('previewStatus');
  };

  // 插入标题
  onInsertTitle = (event) => {
    const target = event.target;
    this.insertContent(target.outerHTML);
    event.stopPropagation();
  };

  // 添加href
  onInsertURl = (data) => {
    const { url, text } = data;
    const htmlString = `<a href="${url}">${text}</a>`;
    this.insertContent(htmlString);
  };

  // 修改行高 letter-spacing: 3px;
  onUpdateHeightSpacing = (value, status) => {
    const selectionObj = window.getSelection();
    const element = selectionObj.focusNode.parentElement;  //获取选择的元素
    if (status === 'lineHeight') {
      element.style.lineHeight = value;
    } else {
      element.style.letterSpacing = value;
    }
  };

  //通过下拉获取 命令和值
  onPopSelect = (cmd, event) => {
    const target = event.target;
    const value = target.getAttribute('value');
    switch (cmd) {
      case 'lineHeight':
        this.onUpdateHeightSpacing(value, 'lineHeight');
        break;
      case 'letterSpacing':
        this.onUpdateHeightSpacing(value, 'letterSpacing');
        break;
      default:
        window.document.execCommand(cmd, false, value);
    }
    this.showCloseBar();
  };

  // 关闭或者打开弹框
  showCloseBar = (param) => {
    if (param) {
      this.changeBarStatus(param);
      const count = this.timeCount;
      window.clearInterval(count);
    } else {
      // 设置定时器
      const _this = this;
      this.timeCount = setTimeout(() => {
        _this.changeBarStatus();
      }, 500);
    }
  };

  // 修改bar 状态
  changeBarStatus = (param) => {
    const { barObj } = this.state;
    for (const item in barObj) {
      barObj[item] = false;
    }
    if (param) {
      barObj[param] = true;
    }
    // 打开链接
    if (param === 'hrefStatus') {
      const selectionObj = window.getSelection();
      const title = selectionObj.toString();
      if (title) {
        this.hrefTitle = title;
      }
    }
    this.setState({ barObj });
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

  getChangeText = () => {
    const selectionObj = window.getSelection();
    const selectedText = selectionObj.toString();
    return selectedText || '';
  };


  //保存方法回调
  getHtml2String = () => {
    const doc = document.getElementById(this.props.editorId).innerHTML;
    const { idList } = this.state;
    console.log('xxxx', idList);
    // 查看id是否真的有效
    const list = idList.filter(item => document.getElementById(item.field));

    // 对象去重
    const clearList = arrayObjClear(list, 'field');
    return {
      doc,
      idList: clearList,
    };
  };

  // 添加类型和id
  addTypeId = (id, type, direction, data, defaultValue) => {
    const { idList } = this.state;
    idList.push({
      field: id,
      type,
      direction,
      data,
      defaultValue,
    });
    this.setState({ idList });
  };


  render() {
    const {
      showDate, currentDateLeft, currentDateTop, previewHtml, barObj,
    } = this.state;

    const {
      hTitle, textAlign, tableStatus, radioStatus, checkboxStatus, selectStatus, fixedStatus, previewStatus, hrefStatus,
    } = barObj;

    const { editorId, height, fixedDate } = this.props;

    return (
      <div className="editor-sany">

        <div className="w-e-toolbar">

          {/*对比*/}
          <span className="w-e-menu tooltip">
            <span className="iconfont icon-duibi" />
            <span className="tooltip-text">对比</span>
          </span>

          {/*预览*/}
          <span className="w-e-menu tooltip">
            <span className="iconfont icon-eye" onClick={this.onPreviewShow} />
            <span className="tooltip-text">预览</span>
          </span>

          {/*单选*/}
          <RadioModal
            dropStatus={radioStatus}
            showCloseBar={this.showCloseBar}
            onInsertRadio={this.onInsertRadio}
          />
          {/*多选*/}
          <CheckboxModal
            dropStatus={checkboxStatus}
            showCloseBar={this.showCloseBar}
            onInsertCheckbox={this.onInsertCheckbox}
          />

          {/*文本 输入*/}
          <span className="w-e-menu tooltip">
            <span className="iconfont icon-danhangshurukuang" onClick={this.onInsertInput} />
            <span className="tooltip-text">输入框</span>
          </span>

          {/*日期*/}
          <span className="w-e-menu tooltip">
            <span className="iconfont icon-calendar" onClick={this.onDate} />
            <span className="tooltip-text">日期</span>
          </span>

          {/*下拉框*/}
          <SelectModal
            dropStatus={selectStatus}
            showCloseBar={this.showCloseBar}
            onInsertSelect={this.onInsertSelect}
          />

          {/*固定字段*/}
          <FixedModal
            dropStatus={fixedStatus}
            showCloseBar={this.showCloseBar}
            onInsertFixed={this.onInsertFixed}
            fixedDate={fixedDate}
          />

          {/*插入表格*/}
          <TableModal
            dropStatus={tableStatus}
            showCloseBar={this.showCloseBar}
            onInsertTable={this.onInsertTable}
          />

          {/*链接*/}
          <HrefModal
            dropStatus={hrefStatus}
            showCloseBar={this.showCloseBar}
            onInsertURl={this.onInsertURl}
          />

          {/*标题*/}
          <span
            className="w-e-menu"
            onMouseOver={() => {
              if (!hTitle) {
                this.showCloseBar('hTitle');
              }
            }}

            // onMouseLeave={() => {
            //   this.showCloseBar();
            // }}
          >
            <span className="iconfont icon-zitibiaoti" />
            <span className={hTitle ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">设置标题</p>
              <ul className="w-e-list" onClick={this.onInsertTitle}>
                <li className="w-e-item"><h1 className="clearWidth">H1</h1></li>
                <li className="w-e-item"><h2 className="clearWidth">H2</h2></li>
                <li className="w-e-item"><h3 className="clearWidth">H3</h3></li>
                <li className="w-e-item"><h4 className="clearWidth">H4</h4></li>
                <li className="w-e-item"><h5 className="clearWidth">H5</h5></li>
                <li className="w-e-item"><p className="clearWidth">正文</p></li>
              </ul>
            </span>
          </span>

          {/*加粗*/}
          {
            iconCmdList.map((item) => {
              const { cmd, icon, title } = item;
              return (
                <span className="w-e-menu tooltip" key={uuid()}>
                  <button onClick={() => {
                    this.insertCommand(cmd);
                  }}
                  >
                    <span className={`iconfont ${icon}`} />
                  </button>
                  <span className="tooltip-text">{title}</span>
                </span>
              );
            })
          }


          {/*文字对齐*/}
          <span
            className="w-e-menu"
            // 清空所有的弹框
            onMouseOver={() => {
              if (!textAlign) {
                this.showCloseBar('textAlign');
              }
            }}

            // onMouseLeave={() => {
            //   this.showCloseBar();
            // }}
          >
            <span className="iconfont icon-align-left" />
            <span className={textAlign ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">对齐方式</p>
              <ul className="w-e-list">
                {/*对齐方式*/}
                {textAlignList.map((item) => {
                  const { cmd, title, icon } = item;
                  return (
                    <li
                      className="w-e-item"
                      key={uuid()}
                      onClick={event => this.onPopSelect(cmd, event)}
                    >
                      <button>
                        <span value={cmd} className={`iconfont ${icon}`} />
                        <span className="text-align-icon">{title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </span>
          </span>


          {/*字体大小*/}
          {/*字体名称*/}
          {/*文字颜色*/}
          {
            popList.map((pop, popIndex) => {
              const {
                icon, pTitle, width, cmd, selectList, ulCss, liCss,
              } = pop;
              return (
                <span
                  key={uuid()}
                  className="w-e-menu"
                  // 关闭所有的弹框
                  onMouseOver={() => {
                    if (!barObj[cmd]) {
                      this.showCloseBar(cmd);
                      // 清空定时器
                      clearInterval(this.timeCount);
                    }
                  }}

                  // onMouseLeave={() => {
                  //   this.showCloseBar();
                  // }}
                >
                  <span className={`iconfont ${icon}`} />
                  <div
                    className={barObj[cmd] ? 'w-e-droplist' : 'w-e-droplist-h'}
                    style={{ width }}
                  >
                    <p className="w-e-dp-title">{pTitle}</p>
                    <ul className={ulCss} onClick={event => this.onPopSelect(cmd, event)}>
                      {
                        selectList.map((selectItem, selectIndex) => {
                          const {
                            value, liCssText, spanCssText, title,
                          } = selectItem;
                          return (
                            <li className={liCss} style={liCssText} value={value} key={uuid()}>
                              {liCss === 'w-e-item' && <button value={value}>{title}</button>}

                              {/*对背景色和字体颜色特殊处理*/}
                              {liCss === 'w-e-list-level'
                              && (
                                <button value={value}>
                                  <span
                                    className={`iconfont ${icon}`}
                                    style={spanCssText}
                                    value={value}
                                  />
                                </button>
                              )}
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                </span>
              );
            })
          }


          {/*插入图片*/}
          {/*<div className="w-e-menu">*/}
          {/*<span className="iconfont icon-image"/>*/}
          {/*</div>*/}

        </div>

        {/*文本编辑器容器*/}
        <div
          id={editorId}
          className="editor-sany-content"
          contentEditable="true"
          style={{ height }}
          onKeyUp={this.onKeyUpEditBody}
          onClick={this.onClickEditBody}
          onChange={this.onChangeEditBody}
        />

        {/*预览弹框*/}
        <PreviewModal
          visible={previewStatus}
          colsePop={this.showCloseBar}
          htmlString={previewHtml}
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
