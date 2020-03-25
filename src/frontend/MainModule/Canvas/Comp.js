import React, {Component} from 'react';

export default class View extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let canvas = document.getElementById('canvas');
        canvas.width = 900;
        canvas.height = 500;
        let context = canvas.getContext('2d');

        // // 1-绘制描边的线
        // context.beginPath();
        // context.moveTo(50, 50);
        // context.lineTo(100, 100);
        // context.lineTo(100, 50);
        // context.closePath();
        // context.lineWidth = 5;
        // context.strokeStyle = '#AA394C';
        // context.stroke(); // 描边
        //
        // // 2-绘制填充的线
        // context.beginPath();
        // context.moveTo(120, 50);
        // context.lineTo(170, 100);
        // context.lineTo(170, 50);
        // context.closePath();
        // context.lineWidth = 4;
        // context.fillStyle = '#2EC091';
        // context.fill(); // 填充
        //
        // // 3-绘制矩形
        // context.beginPath();
        // context.moveTo(190, 50);
        // context.lineTo(260, 50);
        // context.lineTo(260, 100);
        // context.lineTo(190, 100);
        // // context.lineTo(190, 50); // 如果用closePath()可以省去
        // context.closePath();
        // context.lineWidth = 5;
        // context.fillStyle = '#F5BD47';
        // context.strokeStyle = '#000';
        // context.stroke();
        // context.fill();
        //
        // // 3-用rect绘制矩形
        // context.beginPath();
        // context.rect(280, 50, 50, 50)
        // context.closePath();
        // context.lineWidth = 5;
        // context.fillStyle = 'green';
        // context.strokeStyle = '#000';
        // context.stroke();
        // context.fill();
        //
        // // 4-线条的样式-lineCap = butt(默认值) | round | square 只作用于线段的两段.要想改变折现的拐角要用lineJoin
        // context.beginPath();
        // context.moveTo(350, 50);
        // context.lineTo(400, 50);
        // context.strokeStyle = 'red';
        // context.lineCap = 'round';
        // context.stroke();
        //
        // context.beginPath();
        // context.moveTo(420, 50);
        // context.lineTo(470, 50);
        // context.strokeStyle = 'blue';
        // context.lineCap = 'square';
        // context.stroke();
        //
        // // 5-线条的连接-lineJoin = miter | bevel | round
        // // miter：默认值，在连接处边缘延长相接。miterLimit 是角长和线宽所允许的最大比例(默认是 10)。
        // // bevel：连接处是一个对角线斜角。
        // // round：连接处是一个圆。
        // context.beginPath();
        // context.moveTo(490, 50);
        // context.lineTo(490, 100);
        // context.lineTo(550, 50);
        // context.closePath();
        // context.strokeStyle = '#EA8266';
        // context.lineCap = 'round';
        // context.lineJoin = 'round';
        // context.stroke();

        // context.beginPath();
        // context.fillStyle = "#00AAAA";
        // // context.translate(60, 50);
        // context.rotate(40);
        // context.fillRect(570, 50, 50,60);
        context.translate(100, 100);
        let i = 0;
        // setInterval(() => {
        //     i++;
        //     console.log(i)
        //     // context.clearRect(0, 0, 800, 800)
        //     context.arc(30, 30, 2, Math.PI, -Math.PI / 2, false);
        //     context.strokeStyle = "#00AAAA";
        //     // context.fillRect(0, 0, 50,60);
        //     context.rotate(0.01 * Math.PI);
        //     context.stroke();
        // }, 30)


    }

    render() {
        return (
            <div>
                <canvas id={'canvas'}></canvas>
            </div>
        )
    }
}