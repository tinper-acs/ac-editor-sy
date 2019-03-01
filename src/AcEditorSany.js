/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions */
import React, { Component } from 'react';
import DatePicker from 'tinper-bee/lib/Datepicker';
import TableModal from './TableModal.js';
import InputModal from './InputModal.js';
import SelectModal from './SelectModal.js';
import CheckboxModal from './CheckboxModal.js';
import RadioModal from './RadioModal.js';
import PreviewModal from './PreviewModal';
import FixedModal from './FixedModal.js';
import HrefModal from './HrefModal.js';

import {
  uuid,
  initTable,
  initInput,
  initSelect,
  initRadio,
  initCheckbox,
  initDate,
  fixedDate,
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
      idList: [],

    };
  }

  // 定义最后光标对象
  lastEditRange = null;
  hrefTitle = '';

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
  onInsertInput = (param) => {
    const id = uuid();
    param.id = id;
    this.insertContent(initInput(param));
    const { idList } = this.state;
    idList.push({
      id,
      type: 'input',
    });
    this.setState({ idList });
  };

  // 插入select
  onInsertSelect = (param) => {
    const id = uuid();
    this.insertContent(initSelect({
      textArray: param,
      id,
    }));
  };

  // 插入radio
  onInsertRadio = (param) => {
    const id = uuid();
    param.id = id;
    const { idList } = this.state;
    idList.push({
      id,
      type: 'radio',
    });
    this.setState({ idList });
    this.insertContent(initRadio(param));
  };

  // 插入多选框
  onInsertCheckbox = (param) => {
    const id = uuid();
    param.id = id;
    this.insertContent(initCheckbox(param));
  };


  // 插入固定字段
  onInsertFixed = (param) => {
    let htmlString = '';
    for (const item of param) {
      const {
        data, type, status, id, title,
      } = item;
      if (status) {
        if (type === 'text') {
          const temp = {
            category: type,
            defVal: data[0],
            minWidth: 80,
            placeholder: data,
            id,
          };
          htmlString += `<span>${title}</span>${initInput(temp)}`;
        }
        if (type === 'select') {
          const temp = {
            textArray: data,
            id,
          };
          htmlString += `<span>${title}</span>${initSelect(temp)}`;
        }
        if (type === 'date') {
          htmlString += `<span>${title}</span>${initDate(id)}`;
        }
      }
    }
    this.insertContent(`<div>${htmlString}</div>`);
  };

  // 插入日期
  onDate = () => {
    const id = uuid();
    this.insertContent(initDate(id));
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

    // 点击单选框
    if (target.nodeName === 'INPUT' && target.getAttribute('acType') === 'radio') {
      const name = target.getAttribute('name');
      const radios = document.getElementsByName(name);
      for (let i = 0; i < radios.length; i += 1) {
        radios[i].removeAttribute('checked');
      }
      target.setAttribute('checked', true);
    }

    // 点击多选框
    if (target.nodeName === 'INPUT' && target.getAttribute('acType') === 'checkbox') {
      const checked = target.getAttribute('checked');
      if (!checked) {
        target.setAttribute('checked', true);
      } else {
        target.removeAttribute('checked');
      }
    }
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
    const textHtml = document.getElementById('editor-sany-content').innerHTML;
    this.setState({ previewHtml: textHtml });
    console.log(textHtml)
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
    const date = param.format(formatRule);
    document.getElementById(currentDateId).value = date;
    document.getElementById(currentDateId)
      .setAttribute('value', date);
    this.setState({ showDate: false });
  };

  getChangeText = () => {
    const selectionObj = window.getSelection();
    const selectedText = selectionObj.toString();
    return selectedText ? selectedText : '';
  };


  render() {
    const {
      showDate, currentDateLeft, currentDateTop, idList, previewHtml, barObj,
    } = this.state;

    const {
      hTitle, textAlign, tableStatus, radioStatus, checkboxStatus, inputStatus, selectStatus, fixedStatus, previewStatus, hrefStatus,
    } = barObj;

    return (
      <div className="editor-sany">

        <div className="w-e-toolbar">
          {/*保存*/}
          <div className="w-e-menu tooltip">
            <span className="iconfont icon-save"/>
            <span className="tooltip-text">保存</span>
          </div>

          {/*对比*/}
          <div className="w-e-menu tooltip">
            <span className="iconfont icon-duibi"/>
            <span className="tooltip-text">对比</span>
          </div>

          {/*预览*/}
          <div className="w-e-menu tooltip">
            <span className="iconfont icon-eye" onClick={this.onPreviewShow}/>
            <span className="tooltip-text">预览</span>
          </div>

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
          <InputModal
            dropStatus={inputStatus}
            showCloseBar={this.showCloseBar}
            onInsertInput={this.onInsertInput}
          />

          {/*日期*/}
          <div className="w-e-menu tooltip">
            <span className="iconfont icon-calendar" onClick={this.onDate}/>
            <span className="tooltip-text">日期</span>
          </div>

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

          {/*标题*/}
          <div
            className="w-e-menu"
            onMouseOut={this.showCloseBar}
            onMouseOver={() => {
              this.showCloseBar('hTitle');
            }}
          >
            <span className="iconfont icon-zitibiaoti"/>
            {/*<div className="">*/}
            <div className={hTitle ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">设置标题</p>
              <ul className="w-e-list" onClick={this.onInsertTitle}>
                <li className="w-e-item"><h1 className="clearWidth">H1</h1></li>
                <li className="w-e-item"><h2 className="clearWidth">H2</h2></li>
                <li className="w-e-item"><h3 className="clearWidth">H3</h3></li>
                <li className="w-e-item"><h4 className="clearWidth">H4</h4></li>
                <li className="w-e-item"><h5 className="clearWidth">H5</h5></li>
                <li className="w-e-item"><p className="clearWidth">正文</p></li>
              </ul>
            </div>
          </div>

          {/*加粗*/}
          {
            iconCmdList.map((item) => {
              const { cmd, icon, title } = item;
              return (
                <div className="w-e-menu tooltip">
                  <button onClick={() => {
                    this.insertCommand(cmd);
                  }}
                  >
                    <span className={`iconfont ${icon}`}/>
                  </button>
                  <span className="tooltip-text">{title}</span>
                </div>
              );
            })
          }


          {/*文字对齐*/}
          <div
            className="w-e-menu"
            onMouseOut={this.showCloseBar}
            onMouseOver={() => {
              this.showCloseBar('textAlign');
            }}
          >
            <span className="iconfont icon-align-left"/>
            <div className={textAlign ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">对齐方式</p>
              <ul className="w-e-list">
                {textAlignList.map((item) => {
                  const { cmd, title, icon } = item;
                  return (
                    <li className="w-e-item" onClick={event => this.onPopSelect(cmd, event)}>
                      <button>
                        <span value={cmd} className={`iconfont ${icon}`}/>
                        <span style={{
                          fontSize: '14px',
                          marginLeft: '8px',
                        }}
                        >
                          {title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>


          {/*字体大小*/}
          {/*字体名称*/}
          {/*文字颜色*/}
          {
            popList.map((pop, popIndex) => {
              const {
                icon, pTitle, width, cmd, selectList, ulCss, liCss,
              } = pop;
              return (
                <div
                  className="w-e-menu"
                  onMouseOut={this.showCloseBar}
                  onMouseOver={() => {
                    this.showCloseBar(cmd);
                  }}
                >
                  <span className={`iconfont ${icon}`}/>
                  <div
                    className={barObj[cmd] ? 'w-e-droplist' : 'w-e-droplist-h'}
                    // className="w-e-droplist"
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
                            <li className={liCss} style={liCssText} value={value}>
                              {liCss === 'w-e-item'
                              && <button value={value}>{title}</button>
                              }
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
                </div>
              );
            })
          }


          {/*链接*/}
          <HrefModal
            dropStatus={hrefStatus}
            showCloseBar={this.showCloseBar}
            onInsertURl={this.onInsertURl}
          />


          {/*插入图片*/}
          <div className="w-e-menu">
            <span className="iconfont icon-image"/>
          </div>

        </div>

        <div
          id="editor-sany-content"
          name="edit"
          contentEditable="true"
          onKeyUp={this.onKeyUpEditBody}
          onClick={this.onClickEditBody}
          onChange={this.onChangeEditBody}
        >
          <p>asfasdfasfd afdsfasdf</p>
          {/* <h2>xxxxxxxxx</h2> */}
          {/* <span>开始日期</span><input type="text" className="date" defaultValue="2019-01-12"/> */}
          {/* <span>结束日期</span><input type="text" className="date" defaultValue="2019-01-15"/> */}
          {/*<label><input name="aa" type="radio" value="1" id="xx"/>苹果</label>*/}
          {/*<label><input name="aa" type="radio" value="2" id="yyy"/>苹果a</label>*/}
        </div>

        <PreviewModal
          visible={previewStatus}
          colsePop={this.showCloseBar}
          htmlString={previewHtml}
          idList={idList}
        />
        <div id="ac-date-body">
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
