/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import { Table, Checkbox } from 'tinper-bee';
import multiSelect from 'tinper-bee/lib/multiSelect.js';


import './index.less';

const MultiSelectTable = multiSelect(Table, Checkbox);

class FixedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedDate: this.props.fixedDate,
    };
  }


  // 获取选中的字段
  getTableSetting = () => {
    const { fixedDate } = this.state;
    this.props.onInsertFixed(fixedDate);
    this.setState({ fixedDate: this.props.fixedDate });
    this.onCancel();
  };

  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('fixedPopStatus');
  };


  onClickCheck = (index, param) => {
    const { fixedDate } = this.state;
    fixedDate[index][param] = !fixedDate[index][param];
    this.setState({ fixedDate });
  };


  columns = [
    {
      title: '选择',
      dataIndex: 'status',
      key: 'status',
      width: '50px',
      render: (text, record, index) => {
        return (
          <Checkbox
            checked={text}
            onClick={() => {
              this.onClickCheck(index, 'status');
            }}
          />
        );
      }
    },
    {
      title: '显示名称',
      dataIndex: 'title',
      key: 'title',
      width: '100px',
    },
    {
      title: '类型',
      dataIndex: 'type_cn',
      key: 'type_cn',
      width: '60px',
    },
    {
      title: '是否编辑',
      dataIndex: 'isEdit',
      key: 'isEdit',
      width: '30px',
      render: (text, record, index) => {
        return (
          <Checkbox
            checked={text}
            onClick={() => {
              this.onClickCheck(index, 'isEdit');
            }}
          />
        );
      }
    },
  ];


  render() {
    const { visible } = this.props;
    const { fixedDate } = this.state;
    return (
      <EditorModal
        onInsert={this.getTableSetting}
        visible={visible}
        cancel={this.onCancel}
        title="插入固定字段"
      >
        <Table
          columns={this.columns}
          data={fixedDate}
        />
      </EditorModal>
    );
  }
}

export default FixedModal;
