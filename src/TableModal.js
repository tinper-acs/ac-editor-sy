/* eslint-disable react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,object-curly-newline,no-param-reassign */
import React, { Component } from 'react';

import { Modal, Label, InputNumber, Button } from 'tinper-bee';
import Form from 'bee-form';

import './index.less';

const { FormItem } = Form;


class TableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    this.setState({ status });
  }


  onClose = () => {
    this.props.onHideModal('tableStatus');
  };


  onSubmit = () => {
    const { onInsert, onHideModal, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onHideModal('tableStatus');
        // 获取行数据和列数据
        const { rowNum, colNum } = values;
        onInsert(rowNum, colNum);
      }
    });
  };

  render() {
    const { form, sanyTheme } = this.props;
    const { getFieldProps } = form;
    const { status } = this.state;

    return (
      <Modal
        show={status}
        onHide={this.onClose}
        className={'sany-modal ' + sanyTheme}
        width="360px"
      >
        <Modal.Header closeButton>
          <Modal.Title>表格</Modal.Title>
        </Modal.Header>

        <Modal.Body className="form-body-padding">
          <FormItem style={{ height: 35 }}>
            <div>
              <div className="sany-input-number-label">
                <Label>行数</Label>
              </div>
              <div className="sany-input-number">
                <InputNumber
                  iconStyle="one"
                  min={1}
                  {...getFieldProps('rowNum', {
                    initialValue: 1,
                  })}
                />
              </div>
            </div>
          </FormItem>

          {/* inputNumber 不够友好 */}
          <FormItem style={{ height: 35,marginTop: 15, }}>
            <div>
              <div className="sany-input-number-label">
                <Label>列数</Label>
              </div>
              <div className="sany-input-number">
                <InputNumber
                  iconStyle="one"
                  min={1}
                  {...getFieldProps('colNum', {
                    initialValue: 1,
                  })}
                />
              </div>
            </div>
          </FormItem>
        </Modal.Body>

        <Modal.Footer className="text-center">
          <Button colors="primary" onClick={this.onSubmit}>确认</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Form.createForm()(TableModal);
