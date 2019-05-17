/* eslint-disable react/prop-types,react/destructuring-assignment,react/jsx-filename-extension,object-curly-newline,no-param-reassign */
import React, { Component } from 'react';

import { Modal, Button } from 'tinper-bee';

import './index.less';
import AcEditorShow from '../AcEditorShow';

class PreviewModal extends Component {
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
    this.props.onHideModal('previewStatus');
  };


  render() {
    const { status } = this.state;
    const { htmlString } = this.props;
    console.log("htmlString",htmlString)


    return (
      <Modal
        show={status}
        onHide={this.onClose}
        className="sany-modal"
        // size="sm"
        width="1000px"
      >
        <Modal.Header closeButton>
          <Modal.Title>预览</Modal.Title>
        </Modal.Header>

        <Modal.Body className="form-body-padding">
          {/*<AcEditorShow*/}
            {/*isShow={status}*/}
            {/*htmlString={htmlString} // 用 AcEditorShow 生成的html字符串*/}
            {/*editorId="pop-content-preview" // 组件 id*/}
            {/*isActive // 组件是否可以操作*/}
            {/*defaultData={[]} // 替换组件默认值*/}
            {/*// waterMarkerText="用友网络" // 添加水印*/}
          {/*/>*/}

        </Modal.Body>
      </Modal>
    );
  }
}

export default PreviewModal;
