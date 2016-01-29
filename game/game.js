/*function game(){
    //浏览器宽高
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeight;
    //存放26位字母的数组letterArr
    this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    //每次出现5个
    this.letterLen=5;
    //速度
    this.speed=5;
    //固定字母的span标签
    this.spans=[];
    //当前数组
    this.currArr=[];
    //当前位置数组
    this.currPosArr=[];
    //生命
    this.die=10;
    //分数
    this.score=0;
    //当前分数
    this.currScore=0;
    //需要消失的字母
    this.num=10;
    this.scoreEle=document.getElementsByClassName("message")[0].getElementsByTagName("span")[0];
    this.dieEle=document.getElementsByClassName("message")[0].getElementsByTagName("span")[2]
    // 出现的字母数是10个
    this.step=10;
    //关卡
    this.aa=1;
    this.jiaodu=[30,60];
}
game.prototype={
    play:function(){
        //使用getLetter方法 将字母显示到body中  this代表game
        this.getLetter(this.letterLen);
        //从上往下落
        this.move();
        //消除字母
        this.key();
    },
    key:function(){
        this.scoreEle.innerHTML=this.score;
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            //键盘码转换成字母
            var code=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(that.spans[i].innerHTML==code){
                    //删除节点
                    document.body.removeChild(that.spans[i]);
                    //删除数组中的字母
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosArr.splice(i,1);
                    //再次获取字母
                    that.getLetter(1);
                    that.score++;
                    that.scoreEle.innerHTML=that.score;
                    if(that.score%that.step==0){
                        that.aa++;
                        alert("第"+that.aa+"关");
                        /!*下一关*!/
                        that.next();
                    }
                    break;
                }
            }
        }
    },
    next:function(){
        //全部清零  重新开始
      clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        if(this.speed<15){
            this.speed++;
        }
        if(this.letterLen<26){
            this.letterLen++;
        }
        this.num=0;
        /!*每次加它本身 10---20---40-----80*!/
        //this.step+=this.step;
        /!*每次加 10   10--20---30---40*!/
        this.step+=10;
        /!*分数置0  也可不清零  可清可不清*!/
        //this.score=0;
        /!*声明值设为10*!/
        this.die=10;
        this.currArr=[];
        this.currPosArr=[];
        this.play();
    },
    move:function(){
        //console.log(this.die);
        this.dieEle.innerHTML=this.die;
        var that=this;
        this.t=setInterval(function(){
            for(var i=0;i<that.spans.length;i++){
                var top=that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top=top+"px";
                //判断什么时候往下落
                if(top>that.clienth){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosArr.slice(i,1);
                    that.getLetter(1);
                    //console.log(that.die)
                    that.die--;
                    that.dieEle.innerHTML=that.die;
                    if(that.die==0){
                        var fail=document.getElementsByClassName("fail")[0];
                        var score=document.getElementById("score");
                        var again=document.getElementById("again");
                        var back=document.getElementsByClassName("back")[0];
                        score.innerHTML=that.score;
                        fail.style.display="block";
                        animate(fail,{opacity:1},1500);
                        clearInterval(that.t);
                        //alert("游戏结束! 您的得分为:"+that.score+"分!");
                        again.onclick=function(){
                            location.reload([]);//页面重载
                        }
                        back.onclick=function(){
                            location.reload([]);//页面重载
                        }
                    }
                }
            }
        },60)
    },
    restart:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.speed=1;
        this.letterLen=5;
        this.score=0;
        this.num=0;
        this.step=10;
        this.die=10;
        //console.log(this.die)
        this.currArr=[];
        this.currPosArr=[];
        this.play();
    },
    getLetter:function(num){
        //使用getRand方法 随机获取到指定的字母
      var arr=this.getRand(num);
      var posArr=[];
        for(var i=0;i<arr.length;i++){
            //动态创建span标签
            var span=document.createElement("span");
            span.innerHTML=arr[i];
            //0---this.clientw
            //100----this.clientw-200
            //x轴:防止浏览器左右两边---太靠边    y轴不需要考虑
            var x=(100+(this.clientw-200)*Math.random());
            var y=(100*Math.random());
            //创建span标签的宽高
            var width=30;
            var height=30;
            //检测矩阵碰撞
            while(this.check1(this.currPosArr,x,width)){
                x=(100+(this.clientw-200)*Math.random());
            }
            //posArr存放的是---位置
            posArr.push({minx:x,maxx:x+width});
            this.currPosArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;height:"+height+"px;border:1px solid #fff;position:absolute;left:"+x+"px;top:"+y+"px;color:rgba(255,255,255,0);font-size:30px;background: url(../images/"+arr[i]+".png) no-repeat center center;background-size:cover;transform:rotate("+this.jiaodu[Math.floor(Math.random()*this.jiaodu.length)]+"deg)";
            document.body.appendChild(span);
            this.spans.push(span);
        }
    },
    check1: function (arr,x,width) {
        //矩阵碰撞
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
        //随机获取5个数
        var arr=[];
        for(var i=0;i<num;i++){
            var rand=Math.floor(this.letterArr.length*Math.random());
            //调用check方法去重
            while(this.check(this.currArr,this.letterArr[rand])){
                rand=Math.floor(this.letterArr.length*Math.random());
            }
            //将letterArr[rand]中的字母添加到arr中
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand]);
        }
        return arr;
    },
    check:function(arr,val){
        //去重
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }
}*/
function game(){
    this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];//字母
    this.heartArr=["img/heart1.png","img/heart2.png","img/heart3.png","img/heart4.png","img/heart5.png","img/heart6.png","img/heart7.png","img/heart8.png","img/heart9.png",]//生命值图片(0~10)
    this.letterLength=4;
    this.speed=5;
    this.score=0;
    this.die=10;
    this.step=1;
    this.stepNum=10;
    this.randArr=[];
    this.span=[];
    this.width=document.documentElement.clientWidth;
    this.height=document.documentElement.clientHeight;
    this.jiaodu=[10,20,30,40,50];
    window.that=this;
}
game.prototype={
    play:function(){
        this.createEle(this.letterLength);
        this.move();
        this.key();
    },
    key:function(){
        var that=this;
        var nowScore=0;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var l=String.fromCharCode(ev.keyCode);
            for (var i = 0; i < that.span.length; i++) {
                if(l==that.span[i].innerHTML){
                    animate(that.span[i],{opacity:0},200,function(){
                        this.style.display="none";
                    })
                    that.span.splice(i,1);
                    that.randArr.splice(i,1);
                    that.createEle(1);
                    var score=document.getElementsByClassName('message')[0].getElementsByTagName('span')[0];
                    score.innerHTML=++that.score;
                    nowScore++;
                    if(nowScore%that.stepNum==0){
                        nowScore=0;
                        that.again();
                    }
                    break;
                }
            };
        }
    },
    again:function(){
        var step=document.getElementsByClassName('message')[0].getElementsByTagName('span')[2];
        step.innerHTML=++that.step;
        clearInterval(that.t);
        for (var i = 0; i < that.span.length; i++) {
            that.span[i].style.display="none";
        };
        that.span.splice(0,that.span.length);
        that.randArr.splice(0,that.randArr.length);
        that.letterLength++;
        that.speed++;
        that.stepNum+=5;
        if(that.letterLength>10){
            that.letterLength=10;
        }
        if(that.speed>10){
            that.speed=10;
        }
        var success=document.getElementsByClassName('next')[0];
        var nowstep=document.getElementById("step");
        var difficult=document.getElementById("difficult");
        nowstep.innerHTML=that.step;
        difficult.innerHTML=that.speed;
        success.style.display="block";
        animate(success,{opacity:1},2000);
        that.createEle(that.letterLength);
        clearInterval(that.t);
        var go=document.getElementById('go');
        var close=document.getElementsByClassName("close")[0];
        go.onclick=function(){
            success.style.display="none";
            success.style.opacity=0;
            that.move();
        }
        close.onclick=function(){
            success.style.display="none";
            success.style.opacity=0;
            that.move();
        }

        //that.t=setInterval(that.move2,60);
    },
    move:function(){
        var that=this;
        that.t=setInterval(that.move2,60);
    },
    move2:function(){
        for (var i = 0; i < that.span.length; i++) {
            var tops=that.span[i].offsetTop+that.speed;
            that.span[i].style.top=tops+"px";
            if(tops>that.height){
                that.span[i].style.display="none";
                that.span.splice(i,1);
                that.randArr.splice(i,1);
                that.createEle(1);
                var die=document.getElementsByClassName('message')[0].getElementsByTagName('span')[2];
                die.innerHTML=--that.die;
                if(that.die==0){
                    var fail=document.getElementsByClassName("fail")[0];
                    var score=document.getElementById("score");
                    var again=document.getElementById("again");
                    var back=document.getElementsByClassName("back")[0];
                    score.innerHTML=that.score;
                    fail.style.display="block";
                    animate(fail,{opacity:1},1500);
                    clearInterval(that.t);
                    //alert("游戏结束! 您的得分为:"+that.score+"分!");
                    again.onclick=function(){
                        location.reload([]);
                    }
                    back.onclick=function(){
                        location.reload([]);
                    }
                }
                break;
            }
        };
    },
    createEle:function(num){
        var arr=this.rand(num);
        for (var i = 0; i < arr.length; i++) {
            var span=document.createElement("span");
            span.style.cssText="position:absolute;height:80px;width:80px;font-size:30px;font-family:Arial;color:rgba(255,255,255,0);top:"+(-300*Math.random()-85)+"px;left:"+(50+Math.random()*(this.width-200))+"px;background: url(../images/"+arr[i]+".png) no-repeat center center;background-size:80px 80px;transform:rotate("+this.jiaodu[Math.floor(Math.random()*this.jiaodu.length)]+"deg)";
            span.innerHTML=arr[i];
            document.body.appendChild(span);
            this.span.push(span);
        };
    },
    rand:function(num){
        var arr=[];
        for (var i = 0; i < num; i++) {
            var randNum=Math.floor(this.letterArr.length*Math.random());
            while(this.randCheck(this.letterArr[randNum],this.randArr)){
                randNum=Math.floor(this.letterArr.length*Math.random());
            }
            arr.push(this.letterArr[randNum]);
            this.randArr.push(this.letterArr[randNum]);
        };
        return arr;
    },
    randCheck:function(val,arr){
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]==val){
                return true;
            }
        };
        return false;
    }
}

