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


const formatRule = 'YYYY-MM-DD';

const termData = [
  {
    'content': '产品清单详见附件一',
    'termName': '产品清单详见附件一'
  },
  {
    'content': '<div>价格联动：</div><div><span style="font-size: 1.4rem;">本合同产品价格与产品所对应的材料的价格进行联动，具体联动条件如下：</span></div><div><span style="font-size: 1.4rem;">（1）参照材料基价、来源<textarea rows="1" cols="30" id="d3d81678-1800-4c31-b2e2-4f3cab99e646" onkeyup="onKeyUpTextArea(\'d3d81678-1800-4c31-b2e2-4f3cab99e646\')" style="resize: horizontal; vertical-align: middle; width: 158px; margin-left: 0px; margin-right: 0px;"></textarea>；</span></div><div>（2）达到联动的条件<textarea rows="1" cols="30" id="15ab26c9-6648-44d1-aaf8-0e8f0edf15c3" onkeyup="onKeyUpTextArea(\'15ab26c9-6648-44d1-aaf8-0e8f0edf15c3\')" style="resize: horizontal; vertical-align: middle; width: 159px; margin-left: 0px; margin-right: 0px;"></textarea>；</div><div>（3）价格联动公式<textarea rows="1" cols="30" id="1b0f6149-7de2-458c-9438-ba524682a1cd" onkeyup="onKeyUpTextArea(\'1b0f6149-7de2-458c-9438-ba524682a1cd\')" style="resize: horizontal; vertical-align: middle; width: 142px; margin-left: 0px; margin-right: 0px;"></textarea>；</div>',
    'termName': '联动条款'
  },
  {
    'content': '<div>模具费用：</div><div><span style="font-size: 1.4rem;">（1）卖方全部承担模具费用；</span></div><div>（2）模具费用100%分摊至产品，按<textarea rows="1" cols="30" id="6dbb0686-ea2f-4d5d-bb60-b4749b8032a9" onkeyup="onKeyUpTextArea(\'6dbb0686-ea2f-4d5d-bb60-b4749b8032a9\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea>件分摊完，按分摊数量完成交货后，产品单价需减去模具分摊费用，模具所有权归买方所有；</div><div>（3）模具费用由买方承担<textarea rows="1" cols="30" id="77245e06-f61e-41cf-a00b-5ee5116e92cd" onkeyup="onKeyUpTextArea(\'77245e06-f61e-41cf-a00b-5ee5116e92cd\')" style="resize: horizontal;vertical-align: middle;width: 80px;"></textarea>%+<textarea rows="1" cols="30" id="4904b154-4164-4722-8233-7533b6b4bf04" onkeyup="onKeyUpTextArea(\'4904b154-4164-4722-8233-7533b6b4bf04\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea>%产品分摊，按<textarea rows="1" cols="30" id="1e17516d-2ac3-4957-8de1-4dd628c7e90a" onkeyup="onKeyUpTextArea(\'1e17516d-2ac3-4957-8de1-4dd628c7e90a\')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea>件分摊完，按分摊数量完成交货后，产品单价需减去模具分摊费用，模具所有权归买方所有；</div><div>（4）买方全部承担模具费用，模具所有权归买方所有。</div>',
    'termName': '模具费用'
  },
  {
    'content': '本合同经双方签字并盖章后生效，有效期限&nbsp;<input type="text" id="5444c8fb-1845-4f13-a40b-5dd8c5528e93" value="2019-03-07" actype="date" style="width: 90px">&nbsp;至 <input type="text" id="b95c85ba-2489-4624-8c76-498101fc9b8c" value="2019-03-07" actype="date" style="width: 90px">&nbsp;日止。',
    'termName': '合同有效期'
  },
  {
    'content': '<div>1、结算周期</div><div>（1）、货到买方验收合格且卖方按合同开具17%增值税发票在买方入账后，买方于第<textarea rows="1" cols="30" id="3a0e6f0f-22d7-41d9-8a56-3c6b0b602abf" style="resize: horizontal; vertical-align: middle; width: 80px;"></textarea>个日历月支付100%货款。</div><div><input name="188a61e2-a67f-410a-8a46-a8ebe57dff74" type="radio" checked="" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;<input name="188a61e2-a67f-410a-8a46-a8ebe57dff74" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;<input name="188a61e2-a67f-410a-8a46-a8ebe57dff74" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp; &nbsp;&nbsp;</div><div>（2）、预付<span style="font-size: 1.4rem;"><input name="c6d0270a-763d-433b-8156-e71f561c52a0" type="radio" value="2" actype="radio">&nbsp; &nbsp;10&nbsp; &nbsp;&nbsp;</span><span style="font-size: 1.4rem;"><input name="c6d0270a-763d-433b-8156-e71f561c52a0" type="radio" value="2" actype="radio" checked="true">&nbsp; &nbsp;100&nbsp; &nbsp;&nbsp;</span><span style="font-size: 1.4rem;">%，货到买方验收合格且卖方按合同开具17%增值税发票给买方后入账，买方入账后于第<textarea rows="1" cols="30" id="101ac89d-d6df-4a4d-9ba6-7db3c47c11a2" style="resize: horizontal; vertical-align: middle; width: 80px;"></textarea>个日历月支付余款。</span></div><div><span style="font-size: 1.4rem;">2、票据周期：</span></div><div><div><input name="c12337a0-0c30-4df0-b8bc-027c52869b76" type="radio" value="4" actype="radio">&nbsp; &nbsp;<span style="font-size: 1.4rem;">3个月</span><span style="font-size: 1.4rem;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 1.4rem;"><input name="c12337a0-0c30-4df0-b8bc-027c52869b76" type="radio" value="4" actype="radio" checked="true">&nbsp;&nbsp;</span><span style="font-size: 1.4rem;">6个月</span><span style="font-size: 1.4rem;">&nbsp; &nbsp; &nbsp;</span><span style="font-size: 1.4rem;"><input name="c12337a0-0c30-4df0-b8bc-027c52869b76" type="radio" value="4" actype="radio">&nbsp; &nbsp;12</span><span style="font-size: 1.4rem;">个月</span><span style="font-size: 1.4rem;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 1.4rem;"><input name="c12337a0-0c30-4df0-b8bc-027c52869b76" type="radio" value="4" actype="radio">&nbsp; &nbsp;&nbsp;</span>即期<span style="font-size: 1.4rem;">&nbsp;</span></div><div><span style="font-size: 1.4rem;">3、付款方式：</span></div></div><div><span style="font-size: 1.4rem;"><div><div><span><input name="39902882-e6b5-46bf-8a6e-55adf72ac641" onclick="onClickRadio(\'39902882-e6b5-46bf-8a6e-55adf72ac641\')" style="vertical-align: middle;" type="radio" value="4" actype="radio">&nbsp; &nbsp;&nbsp;</span><span style="font-size: 1.4rem;">商业承兑（含电子商业承兑）；</span></div><div><span><input name="39902882-e6b5-46bf-8a6e-55adf72ac641" onclick="onClickRadio(\'39902882-e6b5-46bf-8a6e-55adf72ac641\')" style="vertical-align: middle;" type="radio" value="4" actype="radio">&nbsp; &nbsp;&nbsp;</span><span style="font-size: 1.4rem;">银行承兑（含电子银行承兑）；</span></div><div><span><input name="39902882-e6b5-46bf-8a6e-55adf72ac641" onclick="onClickRadio(\'39902882-e6b5-46bf-8a6e-55adf72ac641\')" style="vertical-align: middle;" type="radio" value="4" actype="radio" checked="true">&nbsp; &nbsp;&nbsp;</span><span style="font-size: 1.4rem;">信用证；</span></div><div><span><input name="39902882-e6b5-46bf-8a6e-55adf72ac641" onclick="onClickRadio(\'39902882-e6b5-46bf-8a6e-55adf72ac641\')" style="vertical-align: middle;" type="radio" value="4" actype="radio">&nbsp; &nbsp;&nbsp;</span><span style="font-size: 1.4rem;">电汇</span></div></div></span></div>',
    'termName': '结算方式及期限'
  }
];

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
    console.log('index', index, item);
  };

  render() {
    const { termData } = this.state;
    return (
      <div className="ac-editor-term">
        {termData && termData.map((item, index) => {
          const { content, termName, id } = item;
          return (
            <div className="sany-term">
              <h3>
                <span>{`${sectionToChinese(index + 1)}、${termName}`}</span>
                <span className="iconfont icon-shanchu"/>
                <span
                  className="iconfont icon-brush"
                  onClick={() => {
                    this.onClickEdit(index, item);
                  }}
                />
              </h3>
              <AcEditorShow
                editorId={uuid()}
                htmlString={content}
              />
            </div>
          );
        })}

      </div>
    );
  }
}

export default AcEditorTerm;
