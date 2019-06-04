/* eslint-disable react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,object-curly-newline,no-param-reassign,prefer-template */
import React, { Component } from 'react';

import { Modal, FormControl, Button } from 'tinper-bee';

import Form from 'bee-form';
import './index.less';


const { FormItem } = Form;

class SelectModal extends Component {
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
    this.props.onHideModal('selectStatus');
  };


  onSubmit = () => {
    const { onInsert, onHideModal, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onHideModal('selectStatus');
        const { texareaValue } = values;
        // 分割成数组
        const textArray = texareaValue ? texareaValue.toString()
          .split(/[\n,]/g) : [];
        const filterArray = textArray.filter(item => item !== '' && item !== null);

        onInsert({
          data: filterArray.join('|||'),
          defaultValue: (filterArray && filterArray.length > 0) ? filterArray[0] : '',
          type: 'select'
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
          <Modal.Title>下拉框</Modal.Title>
        </Modal.Header>

        <Modal.Body className="form-body-padding">
          <FormItem>
            <FormControl
              componentClass="textarea"
              placeholder="请输入下拉框值，多值按回车分隔"
              {...getFieldProps('texareaValue', {
                initialValue: '',
              })}
            />
          </FormItem>
        </Modal.Body>

        <Modal.Footer className="text-center">
          <Button colors="primary" onClick={this.onSubmit}>确认</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Form.createForm()(SelectModal);
