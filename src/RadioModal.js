/* eslint-disable react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,object-curly-newline,no-param-reassign */
import React, { Component } from 'react';

import { Modal, Label, InputNumber, Button, Select } from 'tinper-bee';
import Form from 'bee-form';

import 'bee-select/build/Select.css';
import './index.less';

const { FormItem } = Form;

const { Option } = Select;

class RadioModal extends Component {
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
    this.props.onHideModal('radioStatus');
  };

  onSubmit = () => {
    const { onInsert, onHideModal, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onHideModal('radioStatus');
        const dataArray = [];
        let defaultValue = '';
        const { totalNum, check, direction } = values;
        for (let num = 1; num <= totalNum; num += 1) {
          dataArray.push(`${num}XXXXX`);
          // 添加默认值
          if (check === num) {
            defaultValue = `${num}XXXXX`;
          }
        }
        const data = dataArray.join('|||');
        onInsert({
          data,
          defaultValue,
          direction,
          type: 'radio',
        });
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
          <Modal.Title>单选框组</Modal.Title>
        </Modal.Header>

        <Modal.Body className="form-body-padding">
          <FormItem>
            <Label>方向</Label>
            <Select
              {...getFieldProps('direction', {
                initialValue: 'horizontal',
              })}
            >
              <Option value="horizontal" key="horizontal">水平</Option>
              <Option value="vertical" key="vertical">纵向</Option>

            </Select>
          </FormItem>


          <FormItem style={{ height: 35 }}>
            <div>
              <div className="sany-input-number-label">
                <Label>个数</Label>
              </div>
              <div className="sany-input-number">
                <InputNumber
                  iconStyle="one"
                  min={1}
                  {...getFieldProps('totalNum', {
                    initialValue: 1,
                  })}
                />
              </div>
            </div>
          </FormItem>

          {/* inputNumber 不够友好 */}
          <FormItem style={{
            height: 35,
            marginTop: 15,
          }}>
            <div>
              <div className="sany-input-number-label">
                <Label>默认</Label>
              </div>
              <div className="sany-input-number">
                <InputNumber
                  iconStyle="one"
                  min={1}
                  {...getFieldProps('check', {
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

export default Form.createForm()(RadioModal);
