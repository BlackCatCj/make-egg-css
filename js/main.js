// 在html中写出代码展示
!function () {
  var duration = 30;
  var flag = false;
  $(".actions").on("click", "button", function (e) {
    let $button = $(e.currentTarget); // button
    let speed = $button.attr("data-speed"); //这样就知道点击的是那个按钮
    $button.addClass("active").siblings(".active").removeClass("active"); //如果有active(设置了按钮选中的阴影)样式则删掉样式
    switch (speed) {
      case "slow":
        duration = 100;
        break;
      case "normal":
        duration = 30;
        break;
      case "fast":
        duration = 0.5;
        break;
      case "finish":
        flag = true;
        break;
    }
  });

  //prefix空字符串 code 传入的代码  fn 回调
  function writeCode(prefix, code, fn) {
    let container = document.querySelector("#code");
    let styleTag = document.querySelector("#styleTag");
    let n = 0;
    let id;
    // setTimeout比setInterval要好些,因为它是类似与延时递归的调用,还能继续调用外部参数
    // setInterval以运行就不能再读取外部的参数
    id = setTimeout(function run() {
      n += 1;
      container.innerHTML = code.substring(0, n);
      // 每次都显示最后一行代码，这样就不会因为代码过长超出限定范围了
      styleTag.innerHTML = code.substring(0, n);
      container.scrollTop = container.scrollHeight;

      // 中断操作  直接停止显示代码,直接展示结果
      if (flag === true) {
        styleTag.innerHTML = code;
        window.clearsetTimeout();
      }

      // 如果代码没有执行完,则继续再运行run()函数
      if (n < code.length) {
        // 此时就会再读取外部的duration变量的值,然后速度就变了
        id = setTimeout(run, duration);
      } else {
        fn && fn.call();
      }
    }, duration);
  }
  // 这段代码就是要动态展示的过程
  let code = `
    /* 现在开始制作egg */
    .container{
    background: radial-gradient(ellipse at center, #061a33 0%, #000000 100%);
    }
    .container .egg {
        /*重点是这个position，如果这里不写，eggLeft和eggRight会定位错误！*/
        position: relative;
        /* 兼容 */
        display: -ms-flexbox;
        -ms-flex-pack: center;
        -ms-flex-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        background-color: #ffffff;
        width: 300px;
        height: 300px;
        /* 将egg层提高以覆盖住下面的层级 */
        z-index: 4;
        border-radius: 50%;
        box-shadow: inset #ffffff 4px 2px 6px 10px,
          inset rgba(0, 0, 0, 0.2) 0 0 20px 8px;
        animation: rock 1.8s linear alternate infinite;
      }
      /*两个突出的蛋白部分*/
      .container .egg .eggLeft,
      .container .egg .eggRight {
        position: absolute;
        width:180px;
        height: 180px;
        bottom: 180px;
        border-radius: 50%;
        background-color: #ffffff;
      }
      .container .egg .eggLeft {
        top: -2px;
        left: 4px;
        box-shadow: inset #ffffff -2px -12px 4px 6px,
          inset rgba(0, 0, 0, 0.1) 2px 0px 12px 4px;
      }
      .container .egg .eggRight {
        bottom: 2px;
        right: 2px;
        box-shadow: inset #ffffff 12px 12px 4px 6px,
          inset rgba(0, 0, 0, 0.1) -6px 0px 12px 4px;
      }
      /*蛋黄部分*/
      .container .egg .yolk {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: #ffdb10;
        /* 蛋黄中的阴影位置 */
        box-shadow: inset 25px 1px 0 #ffcc24;
        /* 如果z-index: -1 蛋黄将被before和after覆盖住
        如果z-index: 0 蛋黄将在befor上，after下
        所以要设置为1，将蛋黄放在两个吐出蛋白之上
        */
        z-index: 1;
      }
      /*蛋黄的眼睛  左眼*/
      .container .egg .yolk .eyes {
        /* 通过相对定位，元素可以放在正常位置（就是它应该排在那里），这里就是放在以其父元素（yolk）为基准的左侧35px，距离顶部58px的位置
        */
        position: relative;
        width: 15px;
        height: 15px;
        background: #000;
        border-radius: 100%;
        left: 35px;
        top: 58px;
        animation: eye-blink 2s infinite;
      }
      /*蛋黄的眼睛  右眼*/
      .container .egg .yolk .eyes::after {
        content: "";
        /* 通过绝对定位，元素可以放置到页面上的任何自己设置的位置，这里就是放在距离左眼左侧60px的位置
        重点是距离左眼，因为左眼是其父元素，absolute是以父元素为基准移动的
        */
        position: absolute;
        width: 15px;
        height: 15px;
        background: #000;
        border-radius: 100%;
        left: 60px;
      }
      .container .egg .yolk .smile {
        position: relative;
        /*将div的左右两侧弯曲形成圆弧作为微笑的嘴角*/
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        width: 10px;
        height: 6px;
        /* 背景透明色 透明色本身就是默认的，写不写一样 */
        /* 因为smile（div）的背景色为透明色，即和蛋黄一样了，看不见，添加的边框为黑色，就显得只有边框一样 */
        background: transparent;
        border: 3px solid #000;
        left: 65px;
        top: 60px;
      }
      
      /* 蛋黄的腮红 左侧 */
      .container .egg .yolk .cheeks {
        position: relative;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ff7e7e;
        left: 22px;
        top: 42px;
      }
      /* 蛋黄的腮红 右侧 */
      .container .egg .yolk .cheeks::after {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ff7e7e;
        left: 88px;
      }
      /*蛋黄额头上的光亮*/
      .container .egg .yolk .shine {
        position: relative;
        width: 8px;
        height: 20px;
        border-radius: 200px;
        background: #fff;
        left: 110px;
        top: -20px;
        transform: rotate(-35deg);
      }
      /*蛋黄额头上的光亮上的小圆圈*/
      .container .egg .yolk .shine::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 100%;
        top: -12px;
        right: 2px;
      }
    /*眨眼睛 响应式*/
      @-webkit-keyframes eye-blink {
        0% {
            /* Y轴缩放，原始大小为1 */
          transform: scaleY(1);
        }
        /* 之所以不直接从0%到20%，而是在中间放上18%，是为了让眨眼的过程更快速，否则会很慢的眨眼 */
        15% {
          transform: scaleY(1);
        }
        20% {
            /* Y轴缩放，将Y轴缩小为0，模拟眨眼效果 */
          transform: scaleY(0);
        }
        25% {
          transform: scaleY(1);
        }
        30% {
          transform: scaleY(1);
        }
        40% {
          transform: scaleY(0);
        }
        45% {
          transform: scaleY(1);
        }
        100% {
          transform: scaleY(1);
        }
      }
    /*眨眼睛动画*/
      @keyframes eye-blink {
        0% {
            /* Y轴缩放，原始大小为1 */
          transform: scaleY(1);
        }
        /* 之所以不直接从0%到20%，而是在中间放上18%，是为了让眨眼的过程更快速，否则会很慢的眨眼 */
        15% {
          transform: scaleY(1);
        }
        20% {
            /* Y轴缩放，将Y轴缩小为0，模拟眨眼效果 */
          transform: scaleY(0);
        }
        25% {
          transform: scaleY(1);
        }
        30% {
          transform: scaleY(1);
        }
        40% {
          transform: scaleY(0);
        }
        45% {
          transform: scaleY(1);
        }
        100% {
          transform: scaleY(1);
        }
      }
     /*响应式*/
      @-webkit-keyframes rock {
        0% {
          /* 旋转 缩放 */
          transform: rotate(0) scale(0.99);
        }
        10% {
          transform: rotate(0) scale(1.01);
        }
        20% {
          transform: rotate(2deg) scale(0.997);
        }
        /* 25% {
          transform: rotate(2deg) scale(0.998);
        } */
        30% {
          transform: rotate(2deg) scale(1.02);
        }
        /* 35% {
          transform: rotate(2deg) scale(0.999);
        } */
        40% {
          transform: rotate(-2deg) scale(0.998);
        }
        50% {
          transform: rotate(-2deg) scale(1);
        }
        60% {
          transform: rotate(-3deg) scale(0.999);
        }
        70% {
          transform: rotate(1deg) scale(1);
        }
        80% {
          transform: rotate(1.5deg) scale(1.01);
        }
        90% {
          transform: rotate(1deg) scale(0.995);
        }
        100% {
          transform: rotate(0deg) scale(1);
        }
      }
      
      /* egg的轻微转动与缩放 */
      @keyframes rock {
        0% {
          /* 旋转 缩放 */
          transform: rotate(0) scale(0.99);
        }
        10% {
          transform: rotate(0) scale(1.01);
        }
        20% {
          transform: rotate(2deg) scale(0.997);
        }
        /* 25% {
          transform: rotate(2deg) scale(0.998);
        } */
        30% {
          transform: rotate(2deg) scale(1.02);
        }
        /* 35% {
          transform: rotate(2deg) scale(0.999);
        } */
        40% {
          transform: rotate(-2deg) scale(0.998);
        }
        50% {
          transform: rotate(-2deg) scale(1);
        }
        60% {
          transform: rotate(-3deg) scale(0.999);
        }
        70% {
          transform: rotate(1deg) scale(1);
        }
        80% {
          transform: rotate(1.5deg) scale(1.01);
        }
        90% {
          transform: rotate(1deg) scale(0.995);
        }
        100% {
          transform: rotate(0deg) scale(1);
        }
      }
    /* 这个egg就做好了 */
   `;
  writeCode("", code);
}.call();
