/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';
import { AcEditorSany, AcEditorShow, AcEditorSeal, AcEditorPDF } from '../../src/index';
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

  saveFunc = (param) => {
    console.log('textHtml', param);
  };

  contrastFunc = () => {
    alert('等待开发');
  };


  printPDF=()=>{

  }


  render() {

    let htmlString = `
<div class="xxxx"></div>
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
<div class="row">名字：<input type="text" value="请留下您的名字阿士大夫" style="z-index: -1"></div>
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
    // for (let i = 0; i < 15; i += 1) {
    //   htmlString += `<p>我们打开需要转换成html的txt文件。</p>`;
    // }


    const { sealList } = this.state;

    // const htmlString = '<div><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" checked="" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="9ac373ed-b694-4886-9aa1-9d487001fede" type="radio" value="3" actype="radio">&nbsp;&nbsp;&nbsp;&nbsp;xxxxxxxxxxxx&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div><span><input type="text" id="503bc2b2-6457-498e-88fc-d01a243126f8" actype="date"><br></span></div><div><span><div><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" checked="" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span><span><input name="45dd9354-8af0-48e4-8590-4f681a942b06" type="checkbox" value="3" actype="checkbox">&nbsp;&nbsp;&nbsp;&nbsp;YYYYYYYYYY&nbsp;&nbsp;&nbsp;&nbsp;</span></div><br></span></div>';

    return (
      <div className="demoPadding">

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
          saveFunc={this.saveFunc}
          contrastFunc={this.contrastFunc}
          htmlString={htmlString}
        />
      </div>
    );
  }
}

export default Demo1;
