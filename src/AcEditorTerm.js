/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-vars,import/extensions */
import React, { Component } from 'react';
import DatePicker from 'tinper-bee/lib/Datepicker';
import './index.less';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import moment from 'moment';

import AcEditorShow from './AcEditorShow.js';

import {
  uuid,
  sectionToChinese,
} from './utils';
import AcEditorSany from './AcEditorSany';

class AcEditorTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termData: this.props.termData,
    };
  }

  componentDidMount() {
    // const { htmlString } = this.props;
    // document.getElementById('editor-sany-show').innerHTML = htmlString;
  }

  onClickEdit = (index, item) => {
    const { termData } = this.state;
    termData[index].status = true;
    this.setState({ termData });
  };

  onMouseLeave = (index,id) => {
    const textHtml = document.getElementById(id).innerHTML;
    const { termData } = this.state;
    termData[index].status = false;
    termData[index].content = textHtml;
    this.setState({ termData });
  };


  onClickSave = (index, id) => {
    const textHtml = document.getElementById(id).innerHTML;
    const { termData } = this.state;
    termData[index].status = false;
    termData[index].content = textHtml;
    this.setState({ termData });
  };


  render() {
    const { termData } = this.state;
    return (
      <div className="ac-editor-term">
        {/*<h1>产品买卖合同</h1>*/}
        {termData && termData.map((item, index) => {
          const {
            content, termName, id, status,
          } = item;
          const showId = 'showId' + index;
          const editId = 'editId' + index;
          return (
            <div className="sany-term"
                 key={showId}
                 onMouseLeave={() => {
                   this.onMouseLeave(index,editId);
                 }}
            >
              <h3>
                <span>{`${sectionToChinese(index + 1)}、${termName}`}</span>
                <span className="sany-term-icon">
                  {/*修改状态*/}
                  {!status &&
                  <span
                    className="iconfont icon-brush"
                    onClick={() => {
                      this.onClickEdit(index, item);
                    }}
                  />
                  }
                  {/*保存*/}
                  {status &&
                  <span
                    className="iconfont icon-save"
                    onClick={() => {
                      this.onClickSave(index, editId);
                    }}
                  />
                  }
                  <span className="iconfont icon-shanchu"/>
                </span>
              </h3>
              {!status
              && (
                <AcEditorShow
                  editorId={showId}
                  htmlString={content}
                />
              )}
              {status
              && (
                <AcEditorSany
                  editorId={editId}
                  saveFunc={this.saveFunc}
                  contrastFunc={this.contrastFunc}
                  htmlString={content}
                />
              )}
            </div>
          );
        })}

      </div>
    );
  }
}

export default AcEditorTerm;
