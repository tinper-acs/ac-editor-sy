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



import {
  uuid, initTable, initInput, initSelect, initRadio, initCheckbox, initDate, fixedDate,
} from './utils';

import  "./assets/font/iconfont.css";

import './index.less';


import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';

const formatRule = 'YYYY-MM-DD';


class EditorSany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      currentDateId: '',
      currentDateLeft: '0px',
      currentDateTop: '0px',
      barObj: {
        title: false,
        fontSize: false,
        fontName: false,
        brush: false,
        highlight: false,
        textAlign: false,
        tableStatus: false,
        radioStatus: false,
        checkboxStatus: false,  //是否展示插入 checkbox 弹框
        inputStatus: false, //是否展示插入 input 弹框
        selectStatus: false, //是否展示插入 select 弹框
        fixedStatus: false,  // 是否展示插入 fixed 弹框
        previewStatus: false,  //是否展示插入 preview 弹框

      },
      previewHtml: '',
      idList: [],

    };
  }

  // 定义最后光标对象
  lastEditRange = null;

  // 插入内容
  insertContent = (content) => {
    // this.handleCacheHtml();
    if (!content || !this.lastEditRange) { //如果插入的内容为空则返回
      return;
    }
    const sel = window.getSelection();
    // 判断是否有最后光标对象存在
    if (this.lastEditRange) {
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
  insertCommand=(cmd,value)=>{
    console.log("-----");
    debugger
    document.execCommand(cmd, false, null);
  }

  // 编辑框按键弹起和点击事件
  onKeyUpEditBody = (event) => {
    // 缓存光标
    this.lastEditRange = window.getSelection()
      .getRangeAt(0);
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
  };

  //编辑点击事件
  onChangeEditBody = (event) => {
    const target = event.target;
    this.showCloseBar();
  };

  // 预览按钮
  onPreviewShow = () => {
    const textHtml = document.getElementById('editor-sany-content').innerHTML;
    this.setState({ previewHtml: textHtml });
    this.showCloseBar('previewStatus');
  };

  // 插入标题
  onInsertTitle = (event) => {
    const target = event.target;
    this.insertContent(target.outerHTML);
    event.stopPropagation();
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

  render() {
    const {
      showDate, popObj, currentDateLeft, currentDateTop, idList, previewHtml, barObj,
    } = this.state;

    const {
      title, fontSize, fontName, brush, highlight, textAlign, tableStatus, radioStatus, checkboxStatus, inputStatus, selectStatus, fixedStatus, previewStatus,
    } = barObj;


    return (
      <div className="editor-sany">

        <div className="w-e-toolbar">
          {/*保存*/}
          <div className="w-e-menu">
            <span className="iconfont icon-save"/>
          </div>

          {/*对比*/}
          <div className="w-e-menu">
            <span className="iconfont icon-duibi"/>
          </div>

          {/*预览*/}
          <div className="w-e-menu">
            <span className="iconfont icon-eye" onClick={this.onPreviewShow}/>
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
          <div className="w-e-menu">
            <span className="iconfont icon-calendar" onClick={this.onDate}/>
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
            onClick={() => {
              this.showCloseBar('title');
            }}
          >
            <span className="iconfont icon-zitibiaoti"/>
            {/*<div className="">*/}
            <div className={title ? 'w-e-droplist' : 'w-e-droplist-h'}>
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
          <div className="w-e-menu">
            <span className="iconfont icon-bold" onClick={()=>{this.insertCommand('bold')}}/>
          </div>

          {/*字体加粗*/}
          <div
            className="w-e-menu"
            onClick={() => {
              this.showCloseBar('fontSize');
            }}
          >
            <span className="iconfont icon-font-size"/>
            <div
              className={fontSize ? 'w-e-droplist' : 'w-e-droplist-h'}
              style={{ width: '160px' }}
            >
              <p className="w-e-dp-title">字号</p>
              <ul className="w-e-list">
                <li className="w-e-item"><span style={{ fontSize: 'x-small' }}>x-small</span></li>
                <li className="w-e-item"><span style={{ fontSize: 'small' }}>small</span></li>
                <li className="w-e-item"><span>normal</span></li>
                <li className="w-e-item"><span style={{ fontSize: 'large' }}>large</span></li>
                <li className="w-e-item"><span style={{ fontSize: 'x-large' }}>x-large</span></li>
                <li className="w-e-item"><span style={{ fontSize: 'xx-large' }}>xx-large</span></li>
              </ul>
            </div>
          </div>

          {/*字体名称*/}
          <div className="w-e-menu">
            <span className="iconfont icon-ai247"/>
            <div className={fontName ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">字体</p>
              <ul className="w-e-list">
                <li className="w-e-item"><span style={{ fontFamily: '宋体' }}>宋体</span></li>
                <li className="w-e-item"><span style={{ fontFamily: '微软雅黑' }}>微软雅黑</span></li>
                <li className="w-e-item"><span style={{ fontFamily: 'Arial' }}>Arial</span></li>
                <li className="w-e-item"><span style={{ fontFamily: 'Tahoma' }}>Tahoma</span></li>
                <li className="w-e-item"><span style={{ fontFamily: 'Verdana' }}>Verdana</span></li>
              </ul>
            </div>
          </div>

          {/*斜体*/}
          <div className="w-e-menu">
            <span className="iconfont icon-italic"/>
          </div>

          {/*下划线*/}
          <div className="w-e-menu">
            <span className="iconfont icon-underline"/>
          </div>

          {/*删除线*/}
          <div className="w-e-menu">
            <span className="iconfont icon-strikethrough"/>
          </div>

          {/*文字颜色*/}
          <div
            className="w-e-menu"
            onClick={() => {
              this.showCloseBar('highlight');
            }}
          >
            <span className="iconfont icon-highlight"/>
            <div className={highlight ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">文字颜色</p>
              <ul className="w-e-block">
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#000000' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: 'red' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#1c487f' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#4d80bf' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#c24f4a' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#8baa4a' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#7b5ba1' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#46acc8' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-highlight" style={{ color: '#f9963b' }}/>
                </li>
              </ul>
            </div>
          </div>

          {/*背景色*/}
          <div
            className="w-e-menu"
            onClick={() => {
              this.showCloseBar('brush');
            }}
          >
            <span className="iconfont icon-brush"/>
            <div className={brush ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">背景色</p>
              <ul className="w-e-block">
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#000000' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: 'red' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#1c487f' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#4d80bf' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#c24f4a' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#8baa4a' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#7b5ba1' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#46acc8' }}/>
                </li>
                <li className="w-e-list-level">
                  <span className="iconfont icon-brush" style={{ color: '#f9963b' }}/>
                </li>
              </ul>
            </div>
          </div>

          {/*行高*/}
          <div className="w-e-menu">
            <span className="iconfont icon-line-height"/>
          </div>

          {/*缩进*/}
          <div className="w-e-menu">
            <span className="iconfont icon-indent"/>
          </div>

          {/*清空缩进*/}
          <div className="w-e-menu">
            <span className="iconfont icon-outdent"/>
          </div>

          {/*超链接*/}
          <div className="w-e-menu">
            <span className="iconfont icon-link"/>
          </div>

          {/*文字对齐*/}
          <div
            className="w-e-menu"
            onClick={() => {
              this.showCloseBar('textAlign');
            }}
          >
            <span className="iconfont icon-align-left"/>
            <div className={textAlign ? 'w-e-droplist' : 'w-e-droplist-h'}>
              <p className="w-e-dp-title">对齐方式</p>
              <ul className="w-e-list">
                <li className="w-e-item">
                  <span className="iconfont icon-align-left"/>
                  <span>&nbsp;&nbsp;靠左&nbsp;&nbsp;</span>
                </li>
                <li className="w-e-item">
                  <span className="iconfont icon-align-center"/>
                  <span>&nbsp;&nbsp;居中&nbsp;&nbsp;</span>
                </li>
                <li className="w-e-item">
                  <span className="iconfont icon-align-right"/>
                  <span>&nbsp;&nbsp;靠右&nbsp;&nbsp;</span>
                </li>
              </ul>
            </div>
          </div>

          {/*插入图片*/}
          <div className="w-e-menu">
            <span className="iconfont icon-image"/>
          </div>

          {/*格式刷*/}
          <div className="w-e-menu">
            <span className="iconfont icon-geshishua"/>
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
          <p data="xxxxx">xxxxxxxxxx</p>
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

export default EditorSany;
