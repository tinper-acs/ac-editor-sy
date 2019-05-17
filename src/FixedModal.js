/* eslint-disable react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,object-curly-newline */
import React, { Component } from 'react';

import { Modal, Checkbox, Table, Button } from 'tinper-bee';

import './index.less';

class FixedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      fixedDate: [...this.props.fixedDate],
    };
  }


  componentWillReceiveProps(nextProps) {
    const { status, fixedDate, idList } = nextProps;

    const newfixedDate = [...fixedDate.map((item) => { //去掉选中
      delete item.status;
      return item;
    })];
    const data = this.clearCheckData(idList, newfixedDate);
    this.setState({
      status,
      fixedDate: data,
    });

  }


  onClose = () => {
    this.props.onHideModal('fixedStatus');
  };


  onSubmit = () => {
    const { onInsert, onHideModal } = this.props;
    const { fixedDate } = this.state;
    // 获取选中的checkbox
    const list = fixedDate.filter(item => item.status);
    onInsert(list);
    onHideModal('fixedStatus');

  };

  // // 选中固定字段
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
      render: (text, record, index) => (
        <Checkbox
          checked={text}
          onClick={() => {
            this.onClickCheck(index, 'status');
          }}
        />
      ),
    },
    {
      title: '显示名称',
      dataIndex: 'fieldName',
      key: 'fieldName',
      width: '100px',
    },
    {
      title: '类型',
      dataIndex: 'filedType',
      key: 'filedType',
      width: '60px',
    },
  ];


  clearCheckData = (checkArray, sourceArray) => {
    const result = [];
    for (const sourceItem of sourceArray) {
      let status = true;
      for (const checkItem of checkArray) {
        if (checkItem.field === sourceItem.field) {
          status = false;
        }
      }
      if (status) {
        result.push(sourceItem);
      }
    }
    return result;
  };


  render() {
    const { status, fixedDate } = this.state;
    return (
      <Modal
        show={status}
        onHide={this.onClose}
        className="sany-modal"
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>固定字段</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table
            rowKey={(r, i) => i} // 生成行的key
            columns={this.columns}
            data={fixedDate}
          />
        </Modal.Body>

        <Modal.Footer className="text-center">
          <Button colors="primary" onClick={this.onSubmit}>确认</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FixedModal;
