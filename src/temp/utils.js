import React from 'react';

/**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}

/**
 *
 * @param rowNum 表格行数
 * @param colNum 表格列数
 */
export function initTable(rowNum, colNum) {
  // 表头
  let thList = '';
  for (let num = 0; num < colNum; num += 1) {
    thList += ' <th>&nbsp;</th>';
  }
  const trTh = `<tr>${thList}</tr>`;
  // 多少行
  let trTdList = '';
  for (let trNum = 0; trNum < rowNum; trNum += 1) {
    let tdList = '';
    for (let num = 0; num < colNum; num += 1) {
      tdList += ' <td></td>';
    }
    trTdList += `<tr>${tdList}</tr>`;
  }
  return `<table border="0" width="100%" cellPadding="0" cellSpacing="0" class="rich-table">${trTh}${trTdList}</table>`;
}

/**
 * 获取 输入框的 html 字符串
 * @param param
 * @returns {string}
 */
export function initInput(param) {
  const {
    category, defVal, minWidth, placeholder, id,
  } = param;
  // 输入框类型为文本
  let inputText = `<input type="${category}" className="ac-input" id="${id}" style="width: ${minWidth}px;" defaultValue="${defVal}" placeholder="${placeholder}"/>`;
  if (category === 'text') {
    inputText = `<!--<textarea rows="1" cols="30" id="${id}" onchange="onChangeTextArea('sssss')" style="resize: horizontal;width: ${minWidth}px;">${defVal}</textarea>-->`;
    inputText = `<textarea rows="1" cols="30" id="${id}" onkeyup="onKeyUpTextArea('${id}')" style="resize: horizontal;width: ${minWidth}px;">${defVal}</textarea>`;
  }
  return inputText;
}

/**
 * 插入下拉框
 */
export function initSelect(param) {
  const { textArray, id } = param;
  const option = textArray.map((item, index) => `<option name="${id}" value="${index}">${item}</option>`);
  return `<select id="${id}" class="select ac-select" onchange="const target=event.target;const index=target.selectedIndex;const options=document.getElementsByName(target.id);for(let i=0;i<options.length;i++){options[i].removeAttribute('selected')};target[index].setAttribute('selected', true);"}">${option}</select>`;
}

/**
 * 插入单选框
 * @param param
 * @returns {string}
 */
export function initRadio(param) {
  const { num, id, check, direction } = param;
  let radioString = '';
  for (let i = 0; i < num; i += 1) {
    // 默认选中
    let checked = (i + 1) === check ? 'checked' : '';
    if (direction === 'horizontal') {
      radioString += `<span><input name="${id}" type="radio" ${checked} value=${num} acType="radio" />&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
    } else {
      radioString += `<div><span><input name="${id}" type="radio" ${checked} value=${num} acType="radio" />&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx</span></div>`;
    }
  }
  return `<div>${radioString}</div>`;
}

/**
 * 插入多选框
 * @param param
 * @returns {string}
 */
export function initCheckbox(param) {
  const { num, id, check,direction } = param;
  let checkboxString = '';
  for (let i = 0; i < num; i += 1) {
    let checked = (i + 1) === check ? 'checked' : '';
    if (direction === 'horizontal') {
      checkboxString += `<span><input name="${id}" type="checkbox"  ${checked} value=${num} acType="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
    } else {
      checkboxString += `<div><span><input name="${id}" type="checkbox" ${checked} value=${num} acType="checkbox" />&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY</span></div>`;
    }
  }
  return `<div>${checkboxString}</div>`;
}

export function initDate(id){
  return `<input type="text" id="${id}" acType="date"/>`;
}
