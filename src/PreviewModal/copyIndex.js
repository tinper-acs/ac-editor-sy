/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces */
import React, { Component } from 'react';
import EditorModal from '../EditorModal';
import './index.less';
import AcEditorShow from '../AcEditorShow';

class PreviewModal extends Component {
  constructor(props) {
    super(props);
  }

  // 获取插入的表格的行数和列数
  getShowInfo = () => {
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
        <AcEditorShow
          isShow={visible}
          htmlString={htmlString} // 用 AcEditorShow 生成的html字符串
          editorId="pop-content-preview" // 组件 id
          isActive // 组件是否可以操作
          defaultData={[]} // 替换组件默认值
          // waterMarkerText="用友网络" // 添加水印
        />
      </EditorModal>
    );
  }
}

export default PreviewModal;

