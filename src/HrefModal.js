/* eslint-disable react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,object-curly-newline,prefer-template */
import React, { Component } from 'react';

import { Modal, FormControl, Label, Button } from 'tinper-bee';
import Form from 'bee-form';

import './index.less';

const { FormItem } = Form;

class HrefModal extends Component {
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
    this.props.onHideModal('hrefStatus');
  };


  onSubmit = () => {
    const { onInsert, onHideModal, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onInsert(values);
        onHideModal('hrefStatus');
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
          <Modal.Title>超链接</Modal.Title>
        </Modal.Header>

        <Modal.Body className="form-body-padding">
          <FormItem>
            <Label>URL</Label>
            <FormControl
              placeholder="请输入URL"
              {...getFieldProps('url', {
                initialValue: '',
              })}
            />
          </FormItem>

          <FormItem>
            <Label>文本</Label>
            <FormControl
              placeholder="请输入文本"
              {...getFieldProps('text', {
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

export default Form.createForm()(HrefModal);
