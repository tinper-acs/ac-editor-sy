/* eslint-disable no-use-before-define */
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
  s[0] = 'abcdefghigklmnopqrst'.substr(Math.floor(Math.random() * 0x10), 1);
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
  return `<table border="1" width="100%" cellPadding="0" cellSpacing="0" class="rich-table">${trTh}${trTdList}</table>`;
}

/**
 * 获取 输入框的 html 字符串
 * @param param
 * @returns {string}
 */
export function initInput(param) {
  // 输入框类型为文本
  const { field, defaultValue } = param;
  const title = defaultValue || '';
  const width = title ? (getStringLenght(title) * 7 + 60) + 'px' : '60px';
  return `<input id="${field}" type="text" value="${title}" onkeyup="onKeyUpInput(event)" acType="text" style="width: ${width}"/>`;
}


/**
 * 获取 输入框的 html 字符串
 * @param param
 * @returns {string}
 */
export function initTextarea(param) {
  // 输入框类型为文本
  const { field, defaultValue } = param;
  const title = defaultValue || '';
  return `<textarea  id="${field}" acType="textarea" style="width: 100%;height: 60px">${title}</textarea>`;
}


/**
 * 插入下拉框
 */
export function initSelect(param) {
  const { data, field, defaultValue } = param;
  const option = data.map((item, index) => {
    const selected = defaultValue === item ? 'selected' : '';
    return `<option name="${field}" value="${item}" ${selected} >${item}</option>`;
  });
  return `<select id="${field}" class="select ac-select" onchange="onChangeSelect(event)">${option}</select>`;
}

/**
 * 插入单选框
 * @param param
 * @returns {string}
 */
export function initRadio(param) {
  const {
    data, field, defaultValue, direction,
  } = param;
  let radioString = '';
  for (let i = 0; i < data.length; i += 1) {
    // 默认选中
    const checked = defaultValue === data[i] ? 'checked="true"' : '';
    if (direction && direction !== 'horizontal') {
      radioString += `<div><span><input name="${field}" onclick="onClickRadio(event)" style="vertical-align: middle;" type="radio" ${checked} value=${data[i]} acType="radio" /><span style="margin: 0 10px">${data[i]}</span></span></div>`;
    } else {
      radioString += `<span><input name="${field}" onclick="onClickRadio(event)" type="radio" ${checked} style="vertical-align: middle;" value=${data[i]} acType="radio" /><span style="margin: 0 10px">${data[i]}</span></span>`;
    }
  }
  return `<span id="${field}" class="ac-radio-group">${radioString}</span>`;
}

/**
 * 插入多选框
 * @param param
 * @returns {string}
 */
export function initCheckbox(param) {
  const {
    data, field, defaultValue, direction,
  } = param;
  let checkboxString = '';

  for (let i = 0; i < data.length; i += 1) {

    const checked = defaultValue.split('|||').includes(data[i]) ? 'checked="true"' : '';
    if (direction && direction !== 'horizontal') {
      checkboxString += `<div><input name="${field}" onclick="onClickCheckbox(event)" type="checkbox" acType="checkbox" ${checked} value=${data[i]} /><span style="margin: 0 10px">${data[i]}</span></div>`;
    } else {
      checkboxString += `<span><input name="${field}" onclick="onClickCheckbox(event)" type="checkbox" acType="checkbox" ${checked} value=${data[i]}  /><span style="margin: 0 10px">${data[i]}</span></span>`;
    }
  }
  return `<span id="${field}" class="ac-checkbox-group">${checkboxString}</span>`;
}

export function initDate(param) {
  const { defaultValue = '', field } = param;
  return `<input type="text" id="${field}" value="${defaultValue}" acType="date" style="width: 120px" readOnly="true"/>`;
}


export function sectionToChinese(section) {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千'];
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}


/**
 * 数组对象去重
 * @param arr 对象数组,key对象唯一标识
 */
export function arrayObjClear(arr, key) {
  const result = [];
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    if (!obj[arr[i][key]]) {
      result.push(arr[i]);
      obj[arr[i][key]] = true;
    }
  }
  return result;
}

/**
 * 获取字符串的长度，
 * @param string 将中文字符串用两个 'aa' 替换然后计算宽度
 */
export function getStringLenght(str) {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length;
}

