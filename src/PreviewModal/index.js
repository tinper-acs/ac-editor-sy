/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';

class PreviewModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getShowInfo = () => {
    const { idList = [] } = this.props;
    console.log('idList', idList);
    for (const item of idList) {
      const { id, type } = item;
       document.getElementById(id);
       console.log(document.getElementById(id).value);
    }
    this.onCancel();
  };
  // 关闭弹框
  onCancel = () => {
    this.props.colsePop('previewPopStatus');
  };

  render() {
    const { visible, htmlString } = this.props;
    return (
      <EditorModal
        onInsert={this.getShowInfo}
        visible={visible}
        cancel={this.onCancel}
        title="预览"
        width="1000px"
      >
        <div className="pop-content-preview">
          <div dangerouslySetInnerHTML={{ __html: htmlString }}/>
        </div>
      </EditorModal>
    );
  }
}

export default PreviewModal;

