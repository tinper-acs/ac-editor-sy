/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './index.less';

class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropStatus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dropStatus } = nextProps;
    this.setState({ dropStatus });
  }

  // 获取插入的表格的行数和列数
  getTableRowCol = () => {
    const tabRow = document.getElementById('tab-row').value;
    const tabCol = document.getElementById('tab-col').value;
    const rowNum = tabRow ? parseInt(tabRow) : 2;
    const colNum = tabCol ? parseInt(tabCol) : 5;
    this.props.onInsertTable(rowNum, colNum);
    this.setState({ dropStatus: false });
  };

  render() {
    const { dropStatus } = this.state;
    return (
      <span
        className="w-e-menu"
        onMouseOver={() => {
          if (!dropStatus) {
            this.props.showCloseBar('tableStatus');
          }
        }}
        // onMouseLeave={() => {
        //   this.props.showCloseBar();
        // }}
      >
        <span className="iconfont icon-table"/>
        <div className={dropStatus ? 'w-e-droplist' : 'w-e-droplist-h'} style={{ width: '265px' }}>
          <p className="w-e-dp-title">插入表格</p>
          <div className="ac-input-body">
            <div className="ac-input-item">
              <label className="ac-item-label">行数</label>
              <input type="number" className="ac-input-number" id="tab-row" min="1"
                     defaultValue="1"/>
            </div>
            <div className="ac-input-item">
              <label className="ac-item-label">列数</label>
              <input type="number" className="ac-input-number" id="tab-col" min="1"
                     defaultValue="1"/>
            </div>
          </div>
          <div className="ac-pop-action" onClick={this.getTableRowCol}>插入</div>
        </div>
      </span>
    );
  }
}

export default TableModal;
