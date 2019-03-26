/* eslint-disable no-multiple-empty-lines,spaced-comment,no-multi-spaces,no-unused-lets,import/extensions */
import React, { Component } from 'react';
import { uuid } from './utils';
import seal from './assets/images/seal.png';
import './index.less';


class AcEditorSeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sealList: [
        {
          boxId: 'boxId1',
          scaleId: 'scaleId1',
          deleteId: 'deleteId1',
        }
      ]
    };
  }

  componentDidMount() {
    const { htmlString } = this.props;
    document.getElementById('editor-sany-seal').innerHTML = htmlString;
  }


  onSeal = () => {
    const { sealList } = this.state;
    sealList.push({
      boxId: uuid(),
      scaleId: uuid()
    });

  };

  onMouseDownScale = (boxId, faId, scaleId, e) => {
    e.stopPropagation();
    e.preventDefault();
    const box = document.getElementById(boxId);
    const fa = document.getElementById(faId);
    const pos = {
      w: box.offsetWidth,
      h: box.offsetHeight,
      x: e.clientX,
      y: e.clientY,
    };
    fa.onmousemove = function (ev) {
      ev.preventDefault();
      // 设置图片的最小缩放为30*30
      let w = Math.max(30, ev.clientX - pos.x + pos.w);
      let h = Math.max(30, ev.clientY - pos.y + pos.h);
      // console.log(w,h)

      // 设置图片的最大宽高
      w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w;
      h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h;
      box.style.width = `${w}px`;
      box.style.height = `${h}px`;
      // console.log(box.offsetWidth,box.offsetHeight)
    };
    fa.onmouseleave = function () {
      fa.onmousemove = null;
      fa.onmouseup = null;
    };
    fa.onmouseup = function () {
      fa.onmousemove = null;
      fa.onmouseup = null;
    };
  };


  onMouseDownBox = (boxId, faId, ev) => {
    // 浏览器有一些图片的默认事件,这里要阻止
    const box = document.getElementById(boxId);
    const fa = document.getElementById(faId);
    let oEvent = ev;
    // 浏览器有一些图片的默认事件,这里要阻止
    oEvent.preventDefault();
    const disX = oEvent.clientX - box.offsetLeft;
    const disY = oEvent.clientY - box.offsetTop;
    fa.onmousemove = function (faEvent) {
      oEvent = faEvent;
      oEvent.preventDefault();
      let x = oEvent.clientX - disX;
      let y = oEvent.clientY - disY;

      // 图形移动的边界判断
      x = x <= 0 ? 0 : x;
      x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
      y = y <= 0 ? 0 : y;
      y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
    };
    // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
    fa.onmouseleave = function () {
      fa.onmousemove = null;
      fa.onmouseup = null;
    };
    // 鼠标弹起后停止移动
    fa.onmouseup = function () {
      fa.onmousemove = null;
      fa.onmouseup = null;
    };
  };


  onMouseDownDelete = () => {
    console.log('------');
  };


  render() {
    const { sealList } = this.state;
    return (
      <div className="editor-seal">
        <button onClick={this.onSeal}>盖章</button>
        <div>

          <div id="sealFather" className="seal-fa">
            {
              sealList.map((item) => {
                const { boxId, scaleId, deleteId } = item;
                return (
                  <div
                    id={boxId}
                    className="seal-box"
                    onMouseDown={(event) => {
                      this.onMouseDownBox(boxId, 'sealFather', event);
                    }}
                  >
                    <div
                      className="delete-icon"
                      id={deleteId}
                      onMouseDown={(event) => {
                        this.onMouseDownDelete(boxId, 'sealFather', scaleId, event);
                      }}
                    >
                      <span className="iconfont kujialeqiyezhan_mohutuozhuaichicun"></span>
                    </div>
                    <img src={seal} className="seal-img"/>
                    <div
                      className="scale-icon"
                      id={scaleId}
                      onMouseDown={(event) => {
                        this.onMouseDownScale(boxId, 'sealFather', scaleId, event);
                      }}
                    >
                      <span className="iconfont icon-shanchu"></span>
                    </div>
                  </div>
                );

              })
            }
            <div id="editor-sany-seal"/>
          </div>
        </div>
      </div>
    );
  }
}

export default AcEditorSeal;
