# Canvas

# 一 概述
canvas是html5的一个新标签，相当于一个画布，可以用来绘制丰富的图形，最终渲染在浏览器上。

但canvas标签本身不具备绘制图形的能力，配合javascript提供的CanvasAPI，才能绘制图形，文本和图像，以及实现动画和交互

支持2d绘图，也支持3d绘图（webgl）



canvas绘制的图形是一个位图

* 放缩会导致图像失真，所以需要注意放缩比例的控制
* 可以操作每一个点位的像素，进而实现高度自定义的图形绘制和动画效果
* 相当于img引入的图片，可以右键另存



canvas绘制的内容不属于dom元素，通常比dom元素绘制的方式有更高的渲染能力 

但也存在一些问题，比如无法在浏览器查看器中查找，也无法支持鼠标监听（但可以通过其他方式实现类似的效果）



canvas应用领域：

* 可视化图表
* h5游戏制作
* banner广告




# 二 画布与画笔

## 1 创建画布和画笔

提供一个`<canvas>`标签(html)

有一个canvas对象(js-画布)

有一个context对象(js-画笔)

* CanvasRenderingContext2D

```html
 <canvas id="c1"></canvas>

<script>
    const convas1 = document.querySelector('#c1');
    const context1 = canvas1.getContext('2d');
</script>
```



> 有2种提供canvas标签的方式

方式一：直接定义canvas标签

方式二：利用js创建canvas标签 （推荐，vscode有更友好的提示）

* 使用js方式创建canvas时，canvas对象 和 context对象都是具体的类型(HTMLCavansElement , CanvasRenderingContext2D)，vscode编码开发时， 提示更加友好。

<img src="images/01.png" alt="1684995219436" style="zoom:50%;" />





> canvas标签的版本检查

绝大多数的浏览器都支持canvas。但少数老版本的浏览器支持不佳（IE9-）

* 使用文本/图片替换canvas : 浏览器不支持canvas，会显示标签中的文本或图片内容。
* 脚本检测  : 浏览器不支持canvas，则canvas对象没有getContext函数

```html
<canvas id="c1">
    您的浏览器版本过低，不支持canvas，请升级浏览器或更换浏览器
</canvas>
```

```javascript
 if(!canvas2.getContext){
     console.log('您的浏览器版本过低，不支持canvas，请升级浏览器或更换浏览器');
 }else{
     // codeing...
 }
```



## 2 画布区域特点

canvas是一个行内元素 。

canvas可以使用width 和 height 设置区域宽高 （默认宽高：300*150）

canvas也可以使用style样式设置宽高。 但与width 和height设置效果有所不同。



**坐标系**

每一个画布中都有一个坐标系统，画布的左上角为默认的(0,0)原点



**画布区域**

使用width 和 height属性控制的区域。

这个区域有多大， 其包含的坐标系就有多大。 

`<canvas id="c1" width="400" height="400"></canvas>`

表示我们可以看到一个400*400的坐标系



**放置区域**

使用style样式控制的区域大小

画布区域中绘制的图形，最终会在放置区域中展示。

默认，放置区域与画布区域相同。

放置区域如果比画布区域大 or 小。  画布中的图形就会按比例放大或缩小。 （图像可能失真）



```html
<style>
    canvas{
        border:1px solid #ccc;
        margin-left:100px;
    }
    #c2{
        width:200px;
        height:200px;
    }
    #c3{
        width:600px;
        height: 600px;
    }
</style>
<canvas id="c1" width="400" height="400"></canvas>
<canvas id="c2" width="400" height="400"></canvas>
<canvas id="c3" width="400" height="400"></canvas>

<script>
    {
        const canvas= document.querySelector('#c1');
        const ctx = canvas.getContext('2d');
        ctx.fillRect(100,100,100,100);
    }

    {
        const canvas= document.querySelector('#c2');
        const ctx = canvas.getContext('2d');
        ctx.fillRect(100,100,100,100);
    }

    {
        const canvas= document.querySelector('#c3');
        const ctx = canvas.getContext('2d');
        ctx.fillRect(100,100,100,100);
    }
</script>
```

<img src="images/02.png" alt="1684997544061" style="zoom:50%;" />



# 三 绘制图形

## 1 绘制矩形

可以绘制两种矩形， 有三种方式。

* 填充的矩形(实心矩形)
* 描边的矩形(空心矩形)



> ctx.fillRect(x , y , width ,height)

绘制填充矩形

```javascript
const ctx = canvas.getContext('2d');
ctx.fillRect(100,100,200,100);
```

<img src="images/03.png" alt="1684999450682" style="zoom:50%;" />



> ctx.strokeRect(x , y , width , height)

绘制描边矩形

```javascript
const ctx = canvas.getContext('2d');
ctx.strokeRect(100,100,200,100);
```

<img src="images/04.png" alt="1684999462723" style="zoom:50%;" />



> ctx.rect(x , y , width , height)

绘制矩形路径， 默认没有效果。 

需要配合 ctx.stroke()  , ctx.fill() 来描边或填充才会有效果。

```javascript
const ctx = canvas.getContext('2d');
ctx.rect(100,100,200,100);
ctx.stroke();
ctx.fill();
```



> 使用ctx.fillStyle属性设置填充的颜色 （red , #f00 , rgba(255,0,0,1）
>
> 使用ctx.strokeStyle属性设置描边颜色
>
> 使用ctx.lineWidth属性设置描边粗细

* 注意：一定要在绘制图形之前设置。

```javascript
const ctx = canvas.getContext('2d');
ctx.rect(100,100,200,100);
ctx.fillStyle = 'rgba(255,0,0,0.8)'
ctx.strokeStyle = '#00f';
ctx.lineWidth = 10 ;
ctx.stroke();
ctx.fill();
//代码至此，已经绘画完毕了
//ctx.fillStyle = 'red' ; //无效果
```

<img src="images/05.png" alt="1684999490858" style="zoom:50%;" />



## 2 beginPath方法

stroke() 或 fill() 默认会对之前所有绘制的路径进行一个处理。

```javascript
 (()=>{
     const canvas = document.createElement('canvas');
     canvas.width = 400 ;
     canvas.height = 400 ;
     document.body.append(canvas);

     const ctx = canvas.getContext('2d');

     ctx.rect(20,20,100,100);
     ctx.stroke();

     ctx.fillStyle = '#f00';
     ctx.strokeStyle = '#0f0';
     ctx.rect(20,200,100,100);
     ctx.fill();
 })();
```

<img src="images/08.png" alt="1685002339809" style="zoom:50%;" />



当我们需要只对刚刚绘制的图形途径进行处理时

就可以使用ctx.beginPath()方法，为不同部分的途径设置开关(设置分组)。

此时就只对紧邻这组路径进行绘制。

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = '#00f';
    ctx.lineWidth = 10 ;
    ctx.rect(20,20,100,100);
    ctx.stroke();

    ctx.fillStyle = '#f00';
    ctx.strokeStyle = '#0f0';
    ctx.beginPath();
    ctx.rect(20,200,100,100);
    ctx.fill();
    ctx.stroke();
})();

```

<img src="images/06.png" alt="1685001902271" style="zoom:50%;" />



> 一组路径可以有多个图形（线，弧，曲线，矩形等）。



> 使用fillRect() , strokeRect()不会受影响。

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.strokeRect(20,20,100,100);

    ctx.fillStyle = '#f00';
    ctx.fillRect(20,200,100,100);
})();
```

<img src="images/07.png" alt="1685001937272" style="zoom:50%;" />



## 3 绘制圆角矩形

使用ctx.roundRect(x , y , width , height , r)方法绘制圆角矩形

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);


    const ctx = canvas.getContext('2d');
    ctx.roundRect(100,100,200,200,50);
    ctx.stroke();
})();
```

<img src="images/09.png" alt="1685004581662" style="zoom:50%;" />



> r 有多种写法，可以实现四个圆角单独设置

r : 10 | [10]

r : [10,20] 				`[top-left-and-bottom-right, top-right-and-bottom-left]`

r : [10 ,20 ,30]		  `[top-left, top-right-and-bottom-left, bottom-right]`

r : [10 , 20 ,30 ,40]

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);


    const ctx = canvas.getContext('2d');
    ctx.roundRect(10,10,100,100,[10]);
    ctx.stroke();

    ctx.roundRect(10,200,100,100,[10,30]);
    ctx.stroke();

    ctx.roundRect(200,10,100,100,[10,30,20]);
    ctx.stroke();

    ctx.roundRect(200,200,100,100,[10,20,30,40]);
    ctx.stroke();
})();
```

<img src="images/10.png" alt="1685004593217" style="zoom:50%;" />



## 4 绘制直线&折线

两天之间的连线：直线

多个直线连接 : 折线

使用ctx.moveTo(x,y) 将画笔放置到指定的坐标位置 (起始点)

使用ctx.lineTo(x,y) 从上一个点绘制直线路径到指定的点。

* 上一个点可以是moveTo指定的点。
* 上一个点也可以是上一次lineTo指定的点。也就是可以多个lineTo连续使用，形成折线。

```javascript
 (()=>{
     const canvas = document.createElement('canvas');
     canvas.width = 400 ;
     canvas.height = 400 ;
     document.body.append(canvas);

     const ctx = canvas.getContext('2d');

     ctx.beginPath();
     ctx.moveTo(50,50);
     ctx.lineTo(250,50);
     ctx.stroke();

     ctx.beginPath();
     ctx.strokeStyle = '#00f';
     ctx.lineWidth = 10 ;
     ctx.moveTo(50,200);
     ctx.lineTo(250,200);
     ctx.stroke();

 })();
```

<img src="images/11.png" alt="1685066450244" style="zoom:50%;" />

```java
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.moveTo(50,50);
    ctx.lineTo(200,50);
    ctx.lineTo(50,200);
    ctx.stroke();
})();
```

<img src="images/12.png" alt="1685066461055" style="zoom:50%;" />



## 5 线条API

**ctx.lineWidth 属性， 设置线条粗细。**



**ctx.lineCap 属性 ， 设置线条端点的样式 （连接点， 线帽）**

* butt 平的 （默认，没有任何额外的效果）
* round 圆的 （端点处增加了半圆，视觉效果直线变长了）
* square 平的 （端点处增加了矩形，视觉效果上直线变长了）

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50,10);
    ctx.lineTo(50,90);
    ctx.moveTo(250,10);
    ctx.lineTo(250,90);
    ctx.stroke();

    ctx.lineWidth = 10 ;
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.lineCap ="butt"
    ctx.moveTo(50,30);
    ctx.lineTo(250,30);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap ="round"
    ctx.moveTo(50,50);
    ctx.lineTo(250,50);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap ="square"
    ctx.moveTo(50,70);
    ctx.lineTo(250,70);
    ctx.stroke();

})();

```

<img src="images/13.png" alt="1685068655601" style="zoom:50%;" />



**ctx.lineJoin属性， 设置折线连接处的样式**

* miter 尖的 （默认）
* round 圆的
* bevel 平的

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');


    ctx.lineWidth = 10 ;
    ctx.lineJoin = "miter"
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(150,150);
    ctx.lineTo(250,50);
    ctx.stroke();

    ctx.lineWidth = 10 ;
    ctx.lineJoin = "round"
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.moveTo(50,100);
    ctx.lineTo(150,200);
    ctx.lineTo(250,100);
    ctx.stroke();

    ctx.lineWidth = 10 ;
    ctx.lineJoin = "bevel"
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.moveTo(50,150);
    ctx.lineTo(150,250);
    ctx.lineTo(250,150);
    ctx.stroke();

})();
```

<img src="images/14.png" alt="1685068692898" style="zoom:50%;" />





**ctx.miterLimit 属性， 限制折线形成的尖角长短。** 

* 当线条比较粗， 折线夹角比较小的时候，lineJoin的miter设置形成的尖会比较长
* 可以利用该属性来控制尖角的长短

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(20,100);
    ctx.lineTo(250,100);
    ctx.stroke();

    ctx.lineWidth = 30 ;
    ctx.lineJoin = "miter"
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.miterLimit = 0;
    ctx.moveTo(50,50);
    ctx.lineTo(80,100);
    ctx.lineTo(110,50);
    ctx.stroke();

    ctx.beginPath();
    ctx.miterLimit = 1;
    ctx.moveTo(150,50);
    ctx.lineTo(180,100);
    ctx.lineTo(210,50);
    ctx.stroke();

})();
```

<img src="images/15.png" alt="1685070325781" style="zoom:50%;" />



**ctx.setLineDash( array ) 方法 ，设置虚线**

array中可以放置多个数值。 分别表示线段的长度 和 线段间留白的长度。 

* array = [10]  线段长度 和 留白的长度都是 10

* array = [20,10] 线段的长度(20) 和 留白的长度(10)分别设置  

* array = [10,20,30]   按照数组的数列，无限的延续下去

  线段10  留白20 线段30 留白10 线段20 留白30 线段10 留白20  ....

  [10,20,30,10,20,30,10,20,30,10,20,30,.....]

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');


    ctx.lineWidth = 10 ;
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.setLineDash([20]);
    ctx.moveTo(50,50);
    ctx.lineTo(250,50);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([20,10]);
    ctx.moveTo(50,100);
    ctx.lineTo(250,100);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([40,20,10]);
    ctx.moveTo(50,150);
    ctx.lineTo(250,150);
    ctx.stroke();

})();
```

<img src="images/16.png" alt="1685073265356" style="zoom:50%;" />





**ctx.lineDashOffset 属性 设置虚线起始位置的偏移**

* 正数值， 向左偏移
* 负数值，向右偏移

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(50,10);
    ctx.lineTo(50,190);
    ctx.stroke();

    ctx.lineWidth = 10 ;
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.setLineDash([40]);
    ctx.moveTo(50,50);
    ctx.lineTo(250,50);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([40]);
    ctx.lineDashOffset = -20 ;
    ctx.moveTo(50,100);
    ctx.lineTo(250,100);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([40]);
    ctx.lineDashOffset = 20 ;
    ctx.moveTo(50,150);
    ctx.lineTo(250,150);
    ctx.stroke();


})();
```

<img src="images/17.png" alt="1685073356644" style="zoom:50%;" />



## 6 清除画布

大多数情况下，当canvas配合js动画，实现动画效果时

默认每一次都是在之前的基础上进行绘制

所以应该清除上一次的绘画效果，重新绘制。



使用ctx.clearRect( x , y , width ,height )方法，清除画布中的指定矩形区域

* 如果width 和 height 等于画布宽高，就相当于清除整个画布，否则清除画布的一部分。



> 清除画布的本质就是将指定的矩形区域，设置透明度为0，之前的路径依然存在。
>
> 绘制新路径时需要配合beginPath()，否则stroke() 或 fill() 时之前的清除效果重现。

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 10 ;
    ctx.moveTo(0,100);
    ctx.lineTo(400,100);
    ctx.stroke();

    ctx.clearRect(0,0,400,400);

    ctx.beginPath();
    ctx.moveTo(100,0);
    ctx.lineTo(100,400);
    ctx.stroke();

})();      
```

* 绘制横线
* 清除画布
* 绘制竖线
* 如果没有beginPath()，绘制竖线的时候，之前的横线也会出现。 
* 如果有beginPath(),只会绘制竖线，之前的横线不会重新绘制。实现永久擦除效果。

<img src="images/18.png" alt="1685081951801" style="zoom:50%;" />





## 7 虚线小动画

<iframe src="images/01.html" height="250" /> 
## 8 closePath方法

多个连续线条合围的区域，是可以使用fill()进行填充的。 

如果需要首尾节点自动闭合，可以使用ctx.closePath()方法

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 10 ;
    ctx.fillStyle = '#fac';
    ctx.moveTo(100,100);
    ctx.lineTo(100,200);
    ctx.lineTo(200,200);
    //ctx.lineTo(100,100); 手动闭合
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

})();
```

<img src="images/19.png" alt="1685083992942" style="zoom:50%;" />





## 9 绘制圆弧

**arc( x , y , r , startAngle , endAngle , [dir])**

* x y 圆点坐标

* r 半径

* startAngle 起始绘制的角度。 默认圆点x轴右侧半径位置为绘制的起始点(0度点,3点钟方向)。

  角度方向是顺时针的。 

* endAngle 结束点的角度

* dir 绘制方向。 false顺时针(默认) ， true逆时针方向。 

> 设计圆弧时，用的是角度。 传递参数时，传递的是弧度。
>
> 1(角度) = Math.PI / 180 (弧度) 
>
> 360(角度) = Math.PI * 2

```javascript
 (()=>{
     const canvas = document.createElement('canvas');
     canvas.width = 400 ;
     canvas.height = 400 ;
     document.body.append(canvas);

     const ctx = canvas.getContext('2d');

     ctx.beginPath();
     ctx.arc(100,100,50,0,Math.PI * 2) ;
     ctx.stroke();

     ctx.beginPath();
     ctx.arc(300,100,50,0,Math.PI,true);
     ctx.stroke();

     ctx.beginPath();
     ctx.arc(100,300,50,Math.PI/2,Math.PI,true);
     ctx.stroke();
 })();
```

<img src="images/20.png" alt="1685085937052" style="zoom:50%;" />



**arcTo( x1 , y1 , x2 , y2 , r)**

是由3个控制点实现圆弧的绘制

* moveTo 或上一次图形结束的点， 为第一个点。

* x1 , y1 第二个点
* x2 , y2 第三个点
* 按照1 ， 2  ， 3顺序 进行连线 。 两条线会形成一个夹角。 
* 根据r绘制圆弧，保证与两个线条相切。

```javascript
 (()=>{
     const canvas = document.createElement('canvas');
     canvas.width = 400 ;
     canvas.height = 400 ;
     document.body.append(canvas);

     const ctx = canvas.getContext('2d');

     ctx.beginPath();
     ctx.moveTo(100,100);
     ctx.lineTo(100,300);
     ctx.lineTo(300,300);
     ctx.stroke();

     ctx.beginPath();
     ctx.arc(200,200,100,0,Math.PI * 2);
     ctx.stroke();

     ctx.beginPath();
     ctx.lineWidth = 4 ;
     ctx.strokeStyle = '#00f';
     ctx.moveTo(100,200);
     ctx.arcTo(100,300,200,300,100);
     ctx.stroke();

 })();
```

<img src="images/21.png" alt="1685087269681" style="zoom:50%;" />





## 10 绘制椭圆

使用ctx.ellipse( x , y , rx , ry , rotate , startAngle , endAngle , dir )方法绘制椭圆

* x y 圆点坐标
* rx , ry  x轴半径 和  y轴半径
* rotate x轴旋转角度(顺时针方向)
* startAngle 起始点角度 默认0度 ， 三点钟方向
* endAngle 终点角度
* dir 绘制方向。 false 顺时针， true 逆时针

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 4 ;
    ctx.strokeStyle = '#00f';

    ctx.beginPath();
    ctx.ellipse(100,100,100,50,0,0,Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(300,100,100,50,0,0,Math.PI/2,true);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(100,300,100,50,Math.PI/2,0,Math.PI*2);
    ctx.stroke();

})();
```

<img src="images/22.png" alt="1685087968136" style="zoom:50%;" />





## 11 绘制曲线

canvas提供了一种绘制曲线的方式：贝塞尔曲线。 

二次贝塞尔曲线 和 三次贝塞尔曲线。

* 有一个起点和终点
* 在两点中间，有多个控制点。
  * 有一个控制点，称为二次贝塞尔曲线
  * 有两个控制点，称为三次贝塞尔曲线

* 从起点，经过控制点，到终点 依次连线

* 提供一个参数t  在[0-1]范围内变化

* 每一个t都存在一下情况：
  * 在任意线段中，从起点到终点，存在一个中间点，使得前部分线段/整条线段 = t
  * 对每条线段的这些点，再一次连接，形成了一批新的线段(比之前一批少一条)。
  * 在新的一批线段中，依然存在符合比例t的那个点
  * 重复之前连线，找点的操作。
  * 直到找到最后一个点。就是此贝塞尔曲线，在当前比例t时，曲线的点。 
* 当t在0-1范围变化时，每次都会有一个这样的点，这些线点连接后就形成了贝塞尔曲线。



<img src="images/23.png" alt="1685089893213" style="zoom:50%;" />



![2](images/24.gif) ![3](images/25.gif)



**使用ctx.quadraticCurveTo( cx1 , cy1 , ex , ey)方法绘制二次贝塞尔曲线**

* cx1 , cy1 控制点坐标
* ex , ey 终点坐标
* 起点的坐标是moveTo设置，或者是上一次绘图的结尾。

```javascript
(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400 ;
    canvas.height = 400 ;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f00'
    ctx.beginPath();
    ctx.arc(50,200,4,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100,100,4,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(250,200,4,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(50,200);
    ctx.quadraticCurveTo(100,100,250,200);
    ctx.stroke();

})();
```

> 移动控制点，可以改变曲线的形状

<img src="images/26.png" alt="1685090942767" style="zoom:50%;" />



**使用bezierCurveTo(cx1,cy1 , cx2 , cy2 , ex , ey)方法绘制三次贝塞尔曲线**

```javascript
 (()=>{
     const canvas = document.createElement('canvas');
     canvas.width = 400 ;
     canvas.height = 400 ;
     document.body.append(canvas);

     const ctx = canvas.getContext('2d');

     ctx.fillStyle = '#f00'
     ctx.beginPath();
     ctx.arc(50,200,4,0,Math.PI*2);
     ctx.fill();
     ctx.beginPath();
     ctx.arc(100,100,4,0,Math.PI*2);
     ctx.fill();
     ctx.beginPath();
     ctx.arc(200,300,4,0,Math.PI*2);
     ctx.fill();
     ctx.beginPath();
     ctx.arc(250,200,4,0,Math.PI*2);
     ctx.fill();

     ctx.beginPath();
     ctx.moveTo(50,200);
     ctx.bezierCurveTo(100,100,200,300,250,200);
     ctx.stroke();

 })();
```

<img src="images/27.png" alt="1685090974292" style="zoom:50%;" />



## 12 绘制文本

使用 ctx.fillText( textStr , x , y [, maxWidth] ) 方法， 绘制填充文本

使用 ctx.strokeText() 方法， 绘制描边文本（镂空）

* textStr 文本内容
* x , y 文本位置(坐标)
* maxWidth (可选) 设置文本最大宽度。 如果文本宽度 > 最大宽度 就会放缩， 压缩在maxWidth范围内

使用 ctx.font 属性 ，设置文本样式 （粗体 ， 斜体， 大小， 字体）

> 必须设置字体 ， 否则其他样式无效。

```javascript
 (() => {
     const canvas = document.createElement("canvas");
     canvas.width = 400;
     canvas.height = 400;
     document.body.append(canvas);

     const ctx = canvas.getContext("2d");

     ctx.font = ' bold italic 40px sans-serif' ;
     ctx.fillText("DMC" , 200 , 200 ) ;
 })();


(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    ctx.font = ' bold italic 80px sans-serif' ;
    ctx.strokeText("DMC" , 200 , 200 ,500) ;
})();
```



<img src="images/28.png" alt="1685330893994" style="zoom:50%;" />



使用 ctx.textAlign属性， 设置基于锚点水平位置  （left， center， right）

使用 ctx.textBaseline属性 ， 设置基于锚点的垂直位置 （bottom ，middle ， top）

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    ctx.textAlign = 'center' ;
    ctx.font = '80px sans-serif' ;
    ctx.textBaseline = "middle" ;
    ctx.strokeText("DMC" , 200 , 200 ,500) ;

    const obj = ctx.measureText('DMC');
    console.log(obj);

    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.arc(200,200,4,0 , Math.PI*2);
    ctx.fill();
})();
```

<img src="images/29.png" alt="1685330959934" style="zoom:50%;" />



# 四 使用图像

在canvas中引入其他的图片。

## 1 基本使用

需要有一个图片源

* Image对象  对应img标签。 
  * 可以是图片的路径
  * 图片的base64表示
* video对象
* canvas



使用 ctx.drawImage() 方法 ，引入图片。

* `ctx.drawImage(imgSource , x , y)`

  x , y 在canvas画布中放置的起始坐标位置。

  会按照图像原大小展示。

  ```javascript
  ctx.drawImage(img,0,0);
  ```

  

<img src="images/30.png" alt="1685430824898" style="zoom:50%;" />

* `ctx.drawImage(imgSource , x , y , width , height)`

  width 和 height 图像展示的大小 （缩放处理）

  ```javascript
  ctx.drawImage(img,0,90,400,220);
  ```

  

<img src="images/31.png" alt="1685430845953" style="zoom:50%;" />



* `ctx.drawImage(imgSource,x1 , y1 , w1 , h1 , x2 , y2 , w2 , h2)`

  x1 y1 w1 h1 区域是图像的截图区域。 此时基于图像的坐标系

  x2 y2 w2 h2 区域是画布展示区域

  ```javascript
  ctx.drawImage(img ,44,0,200,img.height , 100,(400-img.height)/2,200,img.height);
  ```

  <img src="images/32.png" alt="1685430915240" style="zoom:50%;" />

> 使用图片源时，要确保图片加载完成， 建议在img.onload事件中使用图片源

```javascript
const img = new Image();
img.src = '../imgs/01.png' ;
img.onload = function(){
    ctx.drawImage(img,0,0);
}
```



## 2 图像与动画

<iframe src="images/02.html" height="250" />
## 3 视频图像

在视频播放中， 抓取当前帧作为图像，引入canvas。

```html
<video src="../imgs/01.mp4" controls width="400" height="400" muted ></video>

<script>
    (() => {
        const canvas = document.createElement("canvas");
        canvas.width = 400;
        canvas.height = 400;
        document.body.append(canvas);

        const ctx = canvas.getContext('2d');

        const video = document.querySelector('video');
        video.addEventListener('play',function(){
            draw();
        })



        ctx.arc(200,200,150,0,Math.PI*2);
        //ctx.filter = "blur(5px)";
        //ctx.filter = 'invert(0.8)';
        //ctx.clip();
        function draw(){
            ctx.clearRect(0,0,400,400);
            ctx.drawImage(video,0,0,400,400);
            requestAnimationFrame(draw);
        }

    })();
```

<img src="images/33.png" alt="1685437746459" style="zoom:50%;" />



## 4 引入Canvas图像

canvas本身也是一个图像， 也可以作为图像源，引入另一个canvas画布。

<img src="images/34.png" alt="1685501783198" style="zoom:50%;" />



canvas画布可以下载

* 右键另存
* 编程式下载

```javascript
 (() => {
     const btn = document.querySelector('button') ;
     btn.onclick = function(){
         const url = canvas1.toDataURL();
         const a = document.createElement('a');
         a.href = url ;
         a.download = 'canvas画布' ;
         a.click();
     }
 })();
```

> toDataURL()默认生成 png格式， 可以通过传参指定图片格式
>
> `toDataURL('image/jpeg')`



> 如果canvas中的图像来自于其他路径的图像源（img ， video），可能存在同源问题 ， 画布被污染。
>
> 设置同源策略 `img.crossOrigin = 'anonymous';`
>
> 服务器启动



## 5 图像像素处理

ImageData对象。 包含了某一个区域内的像素值

* imageData.width 

* imageData.height

* imageData.data  array  包含区域内所有的像素值 (rgba值)

  array 是一个一维数组， 每4个位置表示一个像素值

  (x,y)像素的值为

  ```text
  (imageData.width * 4) * y + x * 4 + 0/1/2/3
  ```

  <img src="images/35.png" alt="1685513596358" style="zoom:50%;" />

使用 ctx.getImageData(x , y , width , height) 获得画布中指定区域的ImageData对象 （像素值）

* 获得ImageData对象后，就可以通过其获得每一个像素的值，也可以设置每一个像素的值
* 设置之后不会默认生效，还需要重新设置画布的ImageData

使用 ctx.putImageData(imageData,x,y) 重新设置画布指定区域的像素值（灰度设置，反色设置等）

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = '../imgs/01.png';
    img.onload = function(){
        ctx.drawImage(img,0,0);


        const imageData = ctx.getImageData(0,0,400,400);
        for(let i = 0;i<imageData.data.length;i+=4){
            const r = imageData.data[i];
            const g = imageData.data[i+1];
            const b = imageData.data[i+2];
            const a = imageData.data[i+3];

            const avg = (r+g+b)/3 ;

            imageData.data[i] = avg ;
            imageData.data[i+1] = avg ;
            imageData.data[i+2] = avg ;

        }
        ctx.putImageData(imageData,0,0);

    }

})();
```

<img src="images/36.png" alt="1685513684366" style="zoom:100%;" />





> 使用外部图像没有问题，但要通过ImageData对其进一步处理时，会存在跨域问题
>
> 使用服务器模式启动即可。 
>
> 如果还是无效，可以设置img.cross-origin="anonymous"





## 6 图像填充

可以将引入图像作为填充背景 ， 也可以是描边背景。

图像源可以有多种 ： img , canvas , video , . . .

使用 ctx.createPattern(imgSource , repetition) 方法，创建一个图案对象。（CanvasPattern）

* imgSource 图像源
* repetition 重复机制  repeat, repeat-x , repeat-y ,no-repeat

设置 ctx.fillStyle = pattern  或  ctx.strokeStyle = pattern

```javascript
let bgCanvas ;
(() => {
    bgCanvas = document.createElement("canvas");
    bgCanvas.width = 30;
    bgCanvas.height = 30;
    document.body.append(bgCanvas);

    const ctx = bgCanvas.getContext('2d');

    //绘制一个菱形
    ctx.moveTo(0,15) ;
    ctx.lineTo(15,0);
    ctx.lineTo(30,15);
    ctx.lineTo(15,30);
    ctx.closePath();
    ctx.fill();

})();

(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext('2d');

    const img = new Image() ;
    img.src = '../imgs/03.png';
    img.onload = function(){

        const pattern = ctx.createPattern(img,'repeat')
        const pattern2 = ctx.createPattern(bgCanvas,'');

        ctx.lineWidth = 30 ;
        ctx.strokeStyle = pattern2 ;
        ctx.fillStyle = pattern ;
        ctx.rect(15,15,330,330);
        ctx.stroke();
        ctx.fill();

    } 

})();
```

<img src="images/37.png" alt="1685520321897" style="zoom:50%;" />



> 图案平铺的样式，都是基于画布坐标系的原点开始计算的。
>
> 所以在横向平铺，纵向平铺和不平铺的情况下，有可能画布中央的图形无法显示效果。



# 五 图像裁剪   

使用 ctx.clip() 方法 设置裁剪路径， 接下来绘制的图形只会在裁剪路径中展示。（对之前绘制的图形没有影响）

> clip方法只表示裁剪，按照什么路径裁剪呢？ 按照clip()上面绘制的路径

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = '../imgs/04.png';
    img.onload = function(){
		//设置裁剪路径
        ctx.beginPath();
        ctx.arc(200,200,100,0,Math.PI*2);
        ctx.clip();

        //裁剪的图形
        ctx.drawImage(img,200-img.width/2 , 200-img.height/2);
    }

})();
```

<img src="images/38.png" alt="1685588341702" style="zoom:50%;" />



> clip方法还可以传递一个参数 (rule)
>
> * nonzero : 默认值 非零环绕路径
> * evenodd：奇偶环绕路径

在绘制裁剪路径的时候，有些路径区域可能会被重复包含。

**非零环绕：**  顺时针绘制经过路径区域，数量+1 ， 逆时针绘制经过路径，数量-1.

​					 路径区域最终经过的数量为0，就不裁剪(不可见）

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");
    ctx.strokeRect(100,100,200,200);

    ctx.beginPath();
    ctx.arc(200,200,100,0,Math.PI*2,false); //顺时针
    ctx.arc(200,200,80,0,Math.PI*2,true); //逆时针
    ctx.clip('nonzero');

    ctx.fillRect(100,100,200,200);

})();
```

<img src="images/39.png" alt="1685588644661" style="zoom:50%;" />

**奇偶环绕：**不分顺时针和逆时针，只要绘制路径经过区域，数量+1， 最终奇数裁剪(可见)，偶数不裁剪(不可见)。

<img src="images/40.png" alt="1685588781520" style="zoom:50%;" />





# 六 图像合成

将前后图形合成一个图形

使用 ctx.globalCompositeOperation 属性 设置合成机制。

需要在前后两个图形中间设置。

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");
	//前(原)图形
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.fillRect(50,50,200,200);

    ctx.globalCompositeOperation = '???'
	
    //后(新)图形
    ctx.beginPath();
    ctx.fillStyle = '#0f0';
    ctx.fillRect(150,150,200,200);
})();
```



## 1 路径(形状)合成

source-over : （默认）前后图形都展示， 重叠部分展示后面的图形。

source-in : 只展示后面的图形，展示与前面图形重叠的部分。

source-out：只展示后面的图形， 展示与前面图形不重叠的部分

source-atop: 展示前面的图形 和  后面的图形只展示与前面图形重叠的部分。

destination-系列(over,in,out,atop)   上述合成特点， 前后图形交换。 

* 以destination-over 为例， 前面的图形，覆盖在后面的图形上。

copy 后面图形的覆盖前面的图形 （前面的图形没了）

xor 展示前后两个图形非重叠的部分

<img src="images/41.png" alt="1685592301532" style="zoom:50%;" />



<img src="images/42.png" alt="1685592421491" style="zoom:50%;" />



<img src="images/43.png" alt="1685592502213" style="zoom:50%;" />



## 2 颜色合成

关注的是颜色的混合， 图形的形状没有变化。

lighter 重叠部分的颜色相加

multiply 整体偏暗

screen 整体偏亮

darken 同一个像素的颜色， 取暗色，整体偏暗

lighten 同一个像素的颜色， 去亮色，整体偏亮



<img src="images/44.png" alt="1685592591747" style="zoom:50%;" />



## 3 刮刮乐效果





# 七 颜色渐变

## 1 线性渐变

使用 ctx.createLinearGradient( x0 , y0 , x1 , y1) 方法创建一个线性渐变的对象 CanvasGradient

* x0,y0  和 x1,y1 是两个点， 会按照两点的连线方向渐变 (横向，纵向，斜向)

* 注意：渐变中的两个点是基于坐标系的，需要考虑渐变区域与图形区域关系

使用gradient.addColorStop(% , color) 方法设置渐变过程中每一部分的颜色。

设置 ctx.fillStyle = gradient , ctx.strokeStyle = gradient ;

```javascript
const gradient = ctx.createLinearGradient(0,0,400,400);
gradient.addColorStop(0,'#f00');
gradient.addColorStop(0.5,'#0f0');
gradient.addColorStop(1,'#00f') ;
ctx.fillStyle = gradient;
```



> 如果渐变区域与图形区域相同，则显示完整渐变效果
>
> 如果渐变区域比图形区域大，则图形显示对应区域的渐变效果
>
> 如果渐变区域比图形区域小， 图形范围的两侧就是渐变两侧的颜色。

<img src="images/45.png" alt="1685610796218" style="zoom:50%;" />

## 2 径向渐变

使用 ctx.createRadialGradient(x1 , y1 , r1 , x2 ,y2 , r2) 方法，创建径向渐变对象

* x1,y1, r1 表示渐变开始的圆
* x2,y2,r2 表示渐变结束的圆  

* 注意：一般都是一个大圆，一个小圆才会有效果

  ​			小圆一定要在大圆内，否则会出现意想不到的效果。

* 注意：小圆以里， 大圆以外的范围就是渐变的两端的颜色

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");


    const gradient = ctx.createRadialGradient(200,200,100,200,200,50);
    gradient.addColorStop(0,'#f00');
    gradient.addColorStop(1,'#ff0');
    ctx.fillStyle = gradient ;

    ctx.arc(200,200,200,0,Math.PI*2) ;
    ctx.stroke();
    ctx.fill();
})();
```



<img src="images/46.png" alt="1685612171636" style="zoom:50%;" />





## 3 锥形渐变

使用 ctx.createConicGradient(angle,x , y ) 方法 创建一个锥形渐变对象

* x y 圆心点
* angle起始角度， 默认0°角是三点钟方向。   angle = 90°  从六点钟方向开始旋转。

* 注意：angle传参时使用的是角度对应的弧度值。

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createConicGradient(Math.PI/2,200,200) ;
    gradient.addColorStop(0,'#f00');
    gradient.addColorStop(0.25,'#ff0');
    gradient.addColorStop(0.5,'#0f0');
    gradient.addColorStop(0.75,'#0ff');
    gradient.addColorStop(1,'#00f');
    ctx.fillStyle = gradient ;

    ctx.arc(200,200,100,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(200,200,60,0,Math.PI*2);
    ctx.fill();

})();
```

<img src="images/47.png" alt="1685613069138" style="zoom:50%;" />



# 八 图形阴影

ctx.shadowBlur 设置模糊程度， 数字越大，越模糊

ctx.shadowColor 设置阴影颜色

ctx.shadowOffsetX , ctx.shadowOffsetY 设置阴影的偏移量

```javascript
(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    ctx.shadowColor = '#ff0' ;
    ctx.shadowBlur = 100 ;

    ctx.fillStyle = '#f00';
    ctx.arc(200,200,100,0,Math.PI*2);
    ctx.fill();

})();
```

<img src="images/48.png" alt="1685690368804" style="zoom:50%;" />



# 九 滤镜

使用 ctx.filter 属性，设置一个或多个滤镜



ctx.filter = 'blur(10px)'  设置模糊，值越大，模糊效果越明显。 



ctx.filter = 'brightness(%)';  设置亮度， 1原样， < 1变暗， >1 变亮



ctx.filter = 'contrast(%)';    设置对比度，1 原样， < 1 颜色接近， >1 颜色鲜明



ctx.filter = 'saturate(%)'; 	设置饱和度，1原样， < 1 变灰， > 1 颜色鲜明



ctx.filter = 'grayscale(%)';    设置灰度，0 原样， 1 变灰



 ctx.filter = 'sepia(1)';    1 怀旧风格（深褐色） 0 原样



ctx.filter = 'invert(1)';   设置反色，0 原样  1 颜色取反 0.5 灰色



ctx.filter = 'drop-shadow(x y blur color)';   设置阴影    x , y , blur 都需要带px单位。



ctx.filter = 'hue-rotate(180deg)';  设置色调



ctx.filter = 'hue-rotate(180deg) contrast(0.5)'  使用多个滤镜



ctx.filter = 'url(svgFilterID)'  引用svg滤镜。



<img src="images/49.png" alt="1685698571416" style="zoom:50%;" />



# 十 图像变换

就是对图形进行一个移动，旋转，放缩，矩阵斜切。

## 1 图形移动

移动不是动画， 只是视觉位置上的变化

使用 ctx.translate( x , y ) 方法实现图形位置的移动

```javascript
 (()=>{
     const canvas = document.createElement("canvas");
     canvas.width = 400;
     canvas.height = 400;
     document.body.append(canvas);

     const ctx = canvas.getContext("2d");

     ctx.translate(100,100);

     ctx.rect(100,100,200,200);
     ctx.fill();

 })();
```

<img src="images/50.png" alt="1685932448311" style="zoom:50%;" />



> 这里实际移动的并不是指定的图形，而是坐标系。
>
> 对于之前已经绘制过的图形没有影响。

```javascript
(()=>{
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    //基于原坐标系绘制的图形
    const ctx = canvas.getContext("2d");

    ctx.fillRect(0,0,100,100) ;

    ctx.translate(100,100);

    //绘制坐标系
    ctx.beginPath();
    ctx.moveTo(-400,0);
    ctx.lineTo(400,0);
    ctx.moveTo(0,-400);
    ctx.lineTo(0,400);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,6,0,Math.PI*2) ;
    ctx.fill();

    for(let i=-400;i<=400;i+=10){
        ctx.beginPath();
        ctx.moveTo(i,-5);
        ctx.lineTo(i,5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-5,i);
        ctx.lineTo(5,i);
        ctx.stroke();
    }

    //新坐标系中绘制图形
    ctx.fillRect(100,100,100,100) ;
})();
```

<img src="images/51.png" alt="1685932503158" style="zoom:50%;" />



## 2 图形放缩

本质是对坐标系横纵坐标的放缩

使用ctx.scale(xRatio , yRatio) 方法设置横纵坐标的放缩比例

* `0< ratio <1` 缩小
* `1 < ratio` 放大
* 负数 坐标系方向发生反转。

```javascript
//坐标系很坐标放大2倍
ctx.translate(200,200);
ctx.scale(-2,1);

//纵坐标系反转，构建数学坐标系
ctx.translate(0,400);
ctx.scale(1,-1);
```

<img src="images/52.png" alt="1685934691265" style="zoom:50%;" />



## 3 图像旋转

使用ctx.rotate(angle) 方法设置顺时针旋转的角度。

> 逻辑上传递的是角度， 语法上要求传递是弧度。

```java
(()=>{
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = '#f00';
    ctx.setLineDash([10]);
    ctx.strokeRect(100,100,50,50);

    //变化坐标系
    ctx.translate(125,125);
    ctx.rotate(45 * Math.PI / 180) ;

    //坐标系中绘制图形
    ctx.fillRect(-25,-25,50,50);

})();
```

<img src="images/53.png" alt="1685936072509" style="zoom:50%;" />



> 移动与旋转的设置顺序不同，最终的效果也不相同。 



## 4 矩阵变换

canvas没有提供斜切方法，可以利用矩阵变换来实现。

矩阵变换又可以实现所有的图形变换（平移，放缩，旋转，斜切）



**矩阵变换机制**

所谓的变换就是将原坐标按照一定的变换公式(逻辑)，变换成一个新坐标。

`( x , y )   ---  矩阵 --- (x' , y')`

使用齐次坐标系来进行矩阵变换，可以简化平移计算。

```txt
|x|	  |a	c	e|		|x'|
|y|	* |b	d	f|	=	|y'|
|1|	  |0	0	1|		|1 |

x' = x*a + y*c + 1*e
y' = x*b + y*d * 1*f
1 =  x*0 + y*0 + 1*1
```



**使用 ctx.transform(a , b , c , d , e , f) 方法，传递转换矩阵，实现图形变换**



**矩阵移动**

就在原有x , y 的基础上， 移动指定的数值。

```text
1 0 e
0 1 f
```

横纵各移动100

`ctx.transform(1,0, 0,1, 100,100);`

<img src="images/54.png" alt="1685957171823" style="zoom:50%;" />



**矩阵放缩**

再原有x , y的基础上，乘上指定的倍率。  2 ， 0.5

```text
a 0 0
0 d 0
```

横向放大至2，纵向缩小至0.5

`ctx.transform(2,0, 0,0.5, 0,0);`

<img src="images/55.png" alt="1685957204889" style="zoom:50%;" />





**矩阵斜切**

延x 或 y 轴做一个拉扯，是的与x 或 y 轴形成一个夹角。

* 延x轴斜切，会产生与y轴的夹角。 最终x位置发生变化
* 延y轴斜切， 会产生与x轴的夹角。最终y位置发生变化

<img src="images/56.png" alt="1685957257113" style="zoom:50%;" />

```text
	1		tan(angle)	0
tan(angle) 		1		0
```

实现skewX(30°)

`ctx.transform(1,0, Math.tan(30 * Math.PI/180),1 ,0,0);`

<img src="images/57.png" alt="1685957311914" style="zoom:50%;" />



**矩阵旋转**

旋转也会发生一个角度的变化

旋转都是基于x轴正方向，顺时针旋转

这里面的旋转角度是基于原位置的旋转角度，而不是基于x轴的旋转角度，所以还要考虑原位置与x轴夹角。

```text
和角公式
sin(a+b) = sin(a) * cos(b) + cos(a) * sin(b)
cos(a+b) = cos(a) * cos(b) - sin(a) * sin(b)
```

<img src="images/58.png" alt="1685958541579" style="zoom:50%;" />

```text
cos(angle) -sin(angle) 0
sin(angle) cos(angle) 0
```

旋转45°

```javascript
ctx.transform(
    Math.cos(45*Math.PI/180),Math.sin(45*Math.PI/180),	//a b
    -Math.sin(45*Math.PI/180),Math.cos(45*Math.PI/180), //c d
    0,0);												//e f
```

<img src="images/59.png" alt="1685958568617" style="zoom:50%;" />



# 十一 状态存储与重置

使用 ctx.save()  和 ctx.restore() 两个方法实现绘制状态的存储和重置。

绘制状态：

* 描边样式，填充样式
* 线条样式
* 文本样式
* 裁剪
* 合成
* 图像变换



每次调用ctx.save()方法，都会将之前设置的状态存储起来(存入栈中)

可以调用多次save方法，将多个状态按照顺序存入栈中。



每次调用ctx.restore()方法，会重置状态。所谓的重置状态，就是将当前状态从栈中移除（删除），恢复到上一次的状态。



save 和 restore 不是必须的，可以手动按照逻辑，恢复上一次的状态。

```java
 (()=>{
     const canvas = document.createElement("canvas");
     canvas.width = 400;
     canvas.height = 400;
     document.body.append(canvas);

     const ctx = canvas.getContext("2d");

     //填充一个红色的矩形
     ctx.save()
         ctx.fillStyle = '#0f0';
     ctx.beginPath();
     ctx.fillRect(0,0,100,100);

     //填充一个蓝色的圆
     ctx.save();
     ctx.fillStyle = '#00f';
     ctx.beginPath();
     ctx.arc(200,200,100,0,Math.PI*2);
     ctx.fill();


     //填充一个红色的矩形
     //ctx.fillStyle = '#f00'; //逻辑上恢复状态
     ctx.restore();			   //通过restore方法恢复状态
     ctx.fillRect(300,300,100,100);
 })();
```

<img src="images/60.png" alt="1685960131460" style="zoom:50%;" />



# 十二 实战案例

## 1 动态时钟

表盘 ， 刻度（大刻度，小刻度） ，表针（时针，分针，秒针）

表针需要不停的变动

* 动画绘制
* 表针角度



## 2 粒子烟花

过程分2部分

* 烟花升空

  * 由多个小球组成一个烟花升空拖尾的效果

  * 每一个小球的半径依次减小

  * 每一个小球的透明度依次变化，上升过程中，透明度整体还会变化

    第一瞬间  10个小球的透明度 分别是1  0.99  0.98 ....

    第二瞬间 10个小球的透明度 分别是  0.5 0.49 0.48 ...

* 烟花爆炸

  * 烟花主体消失
  * 绘制一组小颗粒
  * 沿着圆弧扩散



有的烟花处于升空状态，有的烟花处于爆炸状态，两个效果可以同时进行。

所以需要每一次都重新绘制。



涉及对象：

* 烟花对象
* 小球对象，组成烟花主体
* 粒子对象，爆炸中的例子





从升空到爆炸

* 每隔一段时间，升空一个烟花
* 当屏幕中达到3个烟花时，最开始烟花就可以爆炸了



* 爆炸的时候，烟花主体消失（不再绘制）
* 绘制爆炸后产生的粒子（400,500），每次重新绘制的时候，改变其位置。



## 3 贪吃蛇

组成部分：

* 棋盘
* 蛇（蛇头  + 身体）
* 食物



提供2个画布，一个绘制棋牌（静态），一个绘制蛇 + 食物（动态）





绘制蛇

* 将蛇设计成一个对象
* 设计一个矩形对象，表示蛇的组成，表示食物



蛇(头)的移动

* 注意方向
* 每绘制一个新位置，要将原来位置的图形删除掉。





生成食物

* 随机绘制一个矩形

* 确保在一个空白的位置 （没有蛇的位置）

* 设计： 定义一个对象，每一个格子的坐标作为key，value表示格子的占用状态 0空闲， 1占用

  ​			 每次绘制矩形的时候，将其格子设置为1 ， 清除矩形的时候，将其格子设置为0

  ​			生成食物时，随机一个格子位置，判断其状态， 1就重新随机，0 绘制食物。





吃食物，身体变化，身体移动

* 当蛇头坐标与食物坐标相撞时，表示吃到食物
* 吃到食物后，蛇的身体会边长，视觉效果上看就是后面身体的部分都没有变化，只有原来蛇头的位置加了一块身体，所以只需要在body的头部增加一个矩形，并绘制即可。
* 没有吃到事务，当蛇移动时，视觉效果上，最后一个位置的身体部分消失，在原来蛇头的位置增加了新的身体部分，其余部分没有变化。所以只需要将最后一个矩形移动到body的最前面并绘制即可。





## 4 画图板

线条绘制：

* 多个点的连线
* 鼠标按下是起始点
* 鼠标移动，产生过程点
* 鼠标抬起，绘制结束。



矩形绘制

* 起始点， 宽高
* 鼠标按下，获得起始点
* 鼠标移动，产生过程点。
* 通过两点，可以计算宽高
* 矩形在绘制过程中，没有抬起鼠标，则还处于选择阶段，矩形没有确定。有一个拖拽的视觉效果
* 实际上是一个不断绘制的过程，此时存在一个问题：
  * 由于矩形会与其他图形产生覆盖， 如果删除之前绘制的矩形，也会将之前图形覆盖的部分也删除
  * 为了提高性能，考虑使用2个画布。 
  * 在第一个画布中，绘制当前的这一个图形， 提起鼠标后，图形确定，再将其绘制到第二个画布上。



圆形绘制

* 圆心点，半径
* 鼠标按下，获得起始点
* 鼠标移动，产生过程点
* 起始点 和 过程点，计算半径 和 圆心点
* 可能是正圆，也可能是椭圆。

* 原的拖拽绘制与矩形相同。



填充：

* 不是对某一个图形进行填充，而是对一块合围区域填充。 
* 合围区域可能是有多个图形部分合围而成
* 难点：如何确定这个合围区域 。 可以通过像素操作来实现
  * 以触发填充操作的那个点为基准
  * 获得那个点的rgba值
  * 然后向四周分散，一次找到四周所有的点， 与这个rgba比较，
  * 完全相等，就实现颜色的变化，继续向四周扩散
  * 不相等，说明已经到了一个边界，就不在继续发散了



橡皮擦：

* 与刮刮乐实现过程相似
* 本质还是画线条
* 只不过与原图形的合成关系发生了变化。 





综上分析：

* 目前需要2个画布。 一个体现绘制过程， 一个用来展示绘制结果

* 需要图形对象 ，包括多种类型（线条，矩形，圆形，橡皮擦）









填充代码1：递归（范围有限）

```javascript
//改变当前点的颜色
function change(x,y){
    //获得要改变这个点的原始颜色 (如何根据坐标点，获得其imageData中的显色位置)
    const i = point2Index(imageData,x,y);
    //判断这个原始颜色和基准颜色是否相同， 相同就改，不相同就结束了
    if(baseImageData.data[0] == imageData.data[i] 
       && baseImageData.data[1] == imageData.data[i+1]
       && baseImageData.data[2] == imageData.data[i+2]
       && baseImageData.data[3] == imageData.data[i+3]){
        //相等， 这个位置颜色可以改变
        imageData.data[i] = 255 ;
        imageData.data[i+1] = 0 ;
        imageData.data[i+2] = 0 ;
        imageData.data[i+3] = 255 ;

        //继续发散，再检查其四周
        change(x-1,y);
        change(x+1,y);
        change(x,y+1);
        change(x,y-1);
    }else{
        //不相等，到达边界
        return ;
    }
}
change(this.x,this.y);
```



结束语





































