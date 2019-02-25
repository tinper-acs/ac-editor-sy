/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'tinper-bee/lib/Datepicker';
import TableModal from './TableModal';
import InputModal from './InputModal';
import SelectModal from './SelectModal';
import CheckboxModal from './CheckboxModal';
import RadioModal from './RadioModal';
import PreviewModal from './PreviewModal';
import FixedModal from './FixedModal';


import {
  uuid, initTable, initInput, initSelect, initRadio, initCheckbox, initDate,
} from './utils';

import './style.less';
import EditorModal from './EditorModal';

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
      popStatus: false,
      tablePopStatus: false, //是否展示插入 table 弹框
      inputPopStatus: false, //是否展示插入 input 弹框
      selectPopStatus: false, //是否展示插入 select 弹框
      radioPopStatus: false,  //是否展示插入 radio 弹框
      checkboxPopStatus: false,  //是否展示插入 checkbox 弹框
      previewPopStatus: false,  //是否展示插入 preview 弹框
      fixedPopStatus: false,  //是否展示插入 fixed 弹框
      previewHtml: '',
      idList: [],
    };
  }

  // 定义最后光标对象
  lastEditRange = null;

  // componentDidMount() {
  //
  //   // this.refs.aaa.style.border = '5px solid yellow'
  //   //
  //   // this.refs.bbb.style.border = '5px solide red'
  //
  // }

  // componentWillMount() {
  //   let script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   const srcList = ['/dist/dom.js'];
  //   for (const item of srcList) {
  //     script.src = item;
  //     document.body.appendChild(script);
  //   }
  // }


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

  onInsertPreview = () => {
    const textHtml = document.getElementById('editor-sany-content').innerHTML;
  };

  // 插入固定字段
  onInsertFixed = (param) => {
    let htmlString="";
    for(const item of param){
      const {data,type,status,id,title}=item;
      if(status){
        if(type==='text'){
          const temp={category:type, defVal:data[0],minWidth:80, placeholder:data, id};
          htmlString+=`<span>${title}</span>`+initInput(temp);
        }
        if(type==='select'){
          const temp={textArray:data,id};
          htmlString+=`<span>${title}</span>`+initSelect(temp);
        }
        if(type==='date'){
          htmlString+=`<span>${title}</span>`+initDate(id);
        }
      }
    }
    this.insertContent(`<div>${htmlString}</div>`);
  };

  onDate = () => {
    const id = uuid();
    this.insertContent(initDate(id));
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
      const currentDateLeft = event.clientX + 'px';
      const currentDateTop = event.clientY + 'px';
      _this.setState({
        currentDateId,
        currentDateLeft,
        currentDateTop,
        showDate: true,
      });
    }
  };
  //编辑点击事件
  onChangeEditBody = (event) => {
    const target = event.target;
  };

  // 预览按钮
  onPreviewShow = () => {
    const textHtml = document.getElementById('editor-sany-content').innerHTML;
    this.setState({
      previewPopStatus: true,
      previewHtml: textHtml,
    });
  };


  //打开弹框
  onPopShow = (param) => {
    this.state[param] = true;
  };

  //关闭弹框
  onPopHidden = (param) => {
    this.state[param] = false;
  };

  handleChange(value) {
    this.setState({ selectedValue: value });
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

  render() {
    const {
      showDate, currentDateLeft, currentDateTop, idList, tablePopStatus, inputPopStatus, selectPopStatus, radioPopStatus, checkboxPopStatus, previewPopStatus, previewHtml, fixedPopStatus,
    } = this.state;

    const fixedDate = [
      {
        id: 'aaa',
        type: 'text',
        type_cn: '文本',
        title: '合同编号',
        data: ['xxxx'],
        defaultVal: 'xxxx',
        isEdit: false,
        status: false,
      },
      {
        id: 'bbb',
        type: 'select',
        type_cn: '下拉',
        title: '付款方式',
        data: ['xxxx', 'yyyy'],
        defaultVal: 'xxxx',
        isEdit: false,
        status: false,
      },
      {
        id: 'ccc',
        type: 'date',
        title: '合同签订日期',
        type_cn: '日期',
        data: ['2019-02-20'],
        defaultVal: '2019-02-20',
        isEdit: false,
        status: false,
      }
    ];

    return (
      <div className="editor-sany">
        <button onClick={this.onPreviewShow}>预览</button>
        <button onClick={this.onSave}>保存</button>
        <button>对比</button>
        <button onClick={this.onPopShow.bind(this, 'fixedPopStatus')}>固定字段</button>
        <button onClick={this.onDate}>日期</button>
        <button onClick={this.onPopShow.bind(this, 'tablePopStatus')}>表格</button>
        <button onClick={this.onPopShow.bind(this, 'inputPopStatus')}>输入框</button>
        <button onClick={this.onPopShow.bind(this, 'selectPopStatus')}>下拉框</button>
        <button onClick={this.onPopShow.bind(this, 'radioPopStatus')}>单选框</button>
        <button onClick={this.onPopShow.bind(this, 'checkboxPopStatus')}>多选框</button>
        <div
          id="editor-sany-content"
          name="edit"
          contentEditable="true"
          onKeyUp={this.onKeyUpEditBody}
          onClick={this.onClickEditBody}
          onChange={this.onChangeEditBody}
        >
          <p data="xxxxx">大发发的发发发；加快递费；阿双方将；发的快递放假啊；发</p>
          {/* <h2>xxxxxxxxx</h2> */}
          {/* <span>开始日期</span><input type="text" className="date" defaultValue="2019-01-12"/> */}
          {/* <span>结束日期</span><input type="text" className="date" defaultValue="2019-01-15"/> */}
          {/*<label><input name="aa" type="radio" value="1" id="xx"/>苹果</label>*/}
          {/*<label><input name="aa" type="radio" value="2" id="yyy"/>苹果a</label>*/}
        </div>
        <TableModal
          visible={tablePopStatus}
          colsePop={this.onPopHidden}
          onInsertTable={this.onInsertTable}
        />
        <InputModal
          visible={inputPopStatus}
          colsePop={this.onPopHidden}
          onInsertInput={this.onInsertInput}
        />
        <SelectModal
          visible={selectPopStatus}
          colsePop={this.onPopHidden}
          onInsertSelect={this.onInsertSelect}
        />
        <RadioModal
          visible={radioPopStatus}
          colsePop={this.onPopHidden}
          onInsertRadio={this.onInsertRadio}
        />
        <CheckboxModal
          visible={checkboxPopStatus}
          colsePop={this.onPopHidden}
          onInsertCheckbox={this.onInsertCheckbox}
        />
        <PreviewModal
          visible={previewPopStatus}
          colsePop={this.onPopHidden}
          onInsertPreview={this.onInsertPreview}
          htmlString={previewHtml}
          idList={idList}
        />
        <FixedModal
          visible={fixedPopStatus}
          colsePop={this.onPopHidden}
          onInsertFixed={this.onInsertFixed}
          fixedDate={fixedDate}
        />

        {/*<EditorModal*/}
        {/*onInsert={this.getSelect}*/}
        {/*visible={visible}*/}
        {/*cancel={this.onCancel}*/}
        {/*title="插入条款"*/}
        {/*>*/}
        {/*<div className="pop-content-select">*/}
        {/*<div className="ac-auto-height" contentEditable="true" id="select-textarea"/>*/}
        {/*</div>*/}
        {/*</EditorModal>*/}
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
