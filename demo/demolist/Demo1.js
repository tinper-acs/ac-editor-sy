/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';
import { AcEditorSany, AcEditorShow, AcEditorSeal, AcEditorPDF,AcEditorTerm } from '../../src/index';
import '../../src/index.less';

class Demo1 extends Component {


  constructor(props) {
    super(props);
    this.state = {
      sealList: [
        {
          boxId: 'boxId',
          scaleId: 'scaleId',
        },
        {
          boxId: 'boxId1',
          scaleId: 'scaleId1',
        }
      ]
    };
  }

  saveFunc = () => {
    const textHtml = this.child.getHtml2String();
    console.log('textHtml', textHtml);
  };

  contrastFunc = () => {
    alert('等待开发');
  };

  getInfoHtml=()=>{
    const textHtml = document.getElementById('editorId').innerHTML;
  }


  printPDF=()=>{

  }


  render() {

    let htmlString = `
<div>
<h1>萨摩耶犬</h1>
<ul>
<li>
<h3>发展历史</h3>
 萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
</li>
<li>
<h3>外形特征</h3>
直立的耳朵很厚，呈三角形，尖端略圆。两耳分的较开。眼睛颜色深为佳，两眼凹陷，间距大，杏仁形，下眼睑向耳基部倾斜。鼻子颜色有黑色、棕色、肝褐色，鼻的颜色有时随年龄和气候改变。嘴唇多数是黑色，嘴角上翘。牙齿强壮，剪状咬合。背部直，中等长度，肌肉丰满。脚大而长，比较平，似野兔的足，趾稍分开；趾尖呈拱形肉垫厚而硬，趾之间有保护的毛，脚圆形或似猫足。尾巴比较长，自然下垂时可达
跗关节部，尾部被毛长而厚，当犬处于戒备状态时，尾上翘高于背部或位于背部一侧，休息时下垂。
</li>
<li>
<h3>问卷</h3>
<div class="form">
<div class="row">名字：<input type="text" value="字阿士大夫"></div>
<div class="row">选择：<select>
  <option value ="volvo">Volvo</option>
  <option value ="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select></div>
<div class="row">性别：<input type="radio" name="radio">先生 <input type="radio" name="radio" checked>女士</div>
<div class="row">你家有宠物吗: <input type="checkbox">有</div>
<div class="row">留言：<textarea class="vt" cols="60" rows="10">撒打算发生的发生</textarea></div>

</div>
</li>
</ul>
</div>
`;

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




    const { sealList } = this.state;

    // const htmlString = '<div><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" checked="" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div><span><input type="text" id="503bc2b2-6457-498e-88fc-d01a243126f8" actype="date"><br></span></div><div><span><div><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" checked="" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span></div><br></span></div>';

    return (
      <div className="demoPadding">

        <button onClick={this.saveFunc}>ssss</button>

        {/*<AcEditorPDF*/}
          {/*htmlString={htmlString}*/}
          {/*printPDF={this.printPDF}*/}
          {/*title={<button type="button">导出PDF</button>}*/}
        {/*/>*/}

        {/*<AcEditorSeal*/}
          {/*htmlString={htmlString}*/}
          {/*sealList={sealList}*/}
        {/*/>*/}

        {/*<AcEditorShow*/}
            {/*htmlString={htmlString}*/}
        {/*/>*/}

        <AcEditorSany
          editorId="editorId"
          // saveFunc={this.saveFunc}
          onRef={(ref) => {
            this.child = ref;
          }}
          htmlString={htmlString}
        />


        <AcEditorTerm
          termData={termData}
        />

      </div>
    );
  }
}

export default Demo1;
