        new Vue({
            el: '#app',
            data() {
                return {tabIndex: 0,
                    sealName: '???',
                    fontList: [
                        {name: '??'},
                        {name: '??'},
                        {name: '??'},
                        {name: '??'},                    ],
                    // ??
                    input01: '??????????????????',
                    fontFamily01: '??',
                    fontSize01: 12,
                    fontWeight01: 0,
                    fontGap01: 0,
                    fontRotate01: 0,
                    // ????
                    input02: '????556666688888(00)??',
                    fontFamily02: '??',
                    fontSize02: 10,
                    fontWeight02: 'normal',
                    // ??
                    input03: '2029.07.30',
                    fontFamily03: '??',
                    fontSize03: 12,
                    fontWeight03: 'bold',
                    fontGap03: 0,
                    fontRotate03: 0,
                    // ??
                    input04: '?????????????',
                    fontFamily04: '??',
                    fontSize04: 13,
                    fontWeight04: 'bold',
                    fontGap04: 0,
                    fontRotate04: 0,
                    // ???
                    border05: 4,
                    // ???
                    border06: 2,
                    // ????
                    color07: 'rgb(255,0,0)',
                    // ????
                    sealSize: [
                        {size: 100},
                        {size: 150},
                        {size: 200},
                        {size: 300},
                        {size: 400},
                        {size: 500},
                        {size: 600},
                        {size: 700},
                    ],
                    sealSize08: 200,
                    sealScale08: 1,
                    // ????
                    noisy09: 90,
                    checked09: false,
                    
                    userVipOverplus: '', // ????
                    useKtnum: 1, // ????

                    dataURL: '',
                };
            },
            methods: {
				onTab(index){
					console.log(index)
					this.tabIndex = index 
					},
                yuebuzhu(status) {
                    if (status == 'noLogin') {
                        this.$notify.warning({
                            title: '????',
                            message: '??????'
                        });
                        return
                    }
                    this.$notify.warning({
                        title: '????',
                        message: '???????'
                    });
                },
                // ?????,??canvas??
                setChange(value) {
                    let that = this
                    that.createSealEx2()
                },
                // ???????,????????
                sizeChange() {
                    this.sealScale08 = this.sealSize08 / 200
                    this.setChange()
                },
                // ??????
                createSealEx2() {
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<div class="relative">
                            <canvas id='canvas' class='cSeal' width='${this.sealSize08}' height='${this.sealSize08}'></canvas>
                            <div class="absolute flex flex-wrap" style="user-select: none;pointer-events: none;width: 100%;height: 100%;top: 0;z-index: 999;color: rgba(127,127,127,.4);font-size: ${16*this.sealScale08}px;">
                                <p class="whitespace-nowrap flex justify-center items-center" style="width: 50%;height: 50%;transform: rotate(45deg);">
                                    ???????
                                </p>
                                <p class="whitespace-nowrap flex justify-center items-center" style="width: 50%;height: 50%;transform: rotate(45deg);">
                                    ???????
                                </p>
                                <p class="whitespace-nowrap flex justify-center items-center" style="width: 50%;height: 50%;transform: rotate(45deg);">
                                    ???????
                                </p>
                                <p class="whitespace-nowrap flex justify-center items-center" style="width: 50%;height: 50%;transform: rotate(45deg);">
                                    ???????
                                </p>
                            </div>
                        </div>`;
                    this.createSealCN('canvas', this.input01,this.input02,this.input03,this.input04);
                },
                // ???????
                isnoisyRadio() {
                    this.createSealEx2()
                },
                // ??????R,G,B?
                extractRGBValues(rgbString) {
                    const values = rgbString.match(/\d+/g); // ??????????????
                    return values;
                },
                // ????
                drawNoisy(ctx,canvas) {
                    // ????????
                    if(this.checked09){
                        // ????????,?????????????
                        // ??canvas?????????
                        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var data = imageData.data;
                        for (var i = 0; i < data.length; i += parseInt(Math.random()*(4 + this.noisy09/10*this.sealScale08))) {
                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var a = data[i + 3];
                            // ??????R,G,B?
                            var rgb = this.extractRGBValues(this.color07)
                            // ????canvas??????,?????
                            // ??????????????
                            if(r==rgb[0] && g==rgb[1] && b==rgb[2]){
                                data[i] = rgb[0];
                                data[i + 1] = rgb[1];
                                data[i + 2] = rgb[2];
                                data[i + 3] = parseInt(Math.random()*255); // ???????
                            }
                        }
                        // ???????????????
                        ctx.putImageData(imageData, 0, 0);
                    }
                },
                // ????
                createSealCN(id,input01,input02,input03,input04){
                    var canvas = document.getElementById("canvas");
                    var context = canvas.getContext("2d");
                    context.strokeStyle=this.color07;//??????
                    context.textBaseline = 'middle';//???????????
                    context.textAlign = 'center'; //????????????
                    
                    context.lineWidth = this.border05*this.sealScale08;//??1??
                    //3???: ??? ??? ?? ????
                    this.BezierEllipse4(context, 100*this.sealScale08, 100*this.sealScale08, 95*this.sealScale08, 68*this.sealScale08); // ???
                    context.lineWidth = this.border06*this.sealScale08;
                    this.BezierEllipse4(context, 100*this.sealScale08, 100*this.sealScale08, 70*this.sealScale08, 43*this.sealScale08); // ???
                    context.save(); //??????
                      
                    // ????
                    context.save();
                    context.translate(100*this.sealScale08,47*this.sealScale08)
                    context.fillStyle = this.color07;//??????
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale08 + 'px ' + this.fontFamily03;//?????? ??
                    // context.fillText(input03,0,36);
                    var counts = input03.length; // ??   
                    var angles = -3 * Math.PI / ((17-this.fontGap03*0.5) * (counts - 1)); // ?????? 
                    var charss = input03.split("");
                    var cs;
                    for (var i = 0; i < counts; i++) {
                        cs = charss[i]; // ???????
                        if (i == 0) {
                            context.rotate(3 * Math.PI / (2 * (17 - this.fontGap03 * 0.5)) - 3 * Math.PI / 34); // centering
                            context.rotate((0.5 - this.fontRotate03*0.02) * Math.PI / 6); // ????
                        } else {
                            context.rotate(angles);
                        }
                        context.save();
                        context.translate(0, 82*this.sealScale08); // ??????,????x???   
                        context.rotate(Math.PI / 180); // ??90?,?????x?  
                        context.fillText(cs, 0, 5); // ????????  
                        context.restore();
                    }
                    context.restore();
                    
                    // ????
                    context.save();
                    context.translate(100*this.sealScale08,47*this.sealScale08)
                    context.fillStyle = this.color07;//??????
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale08 + 'px ' + this.fontFamily03;//?????? ??
                    // context.fillText(input04,this.fontLeft03,50+this.fontTop03);  
                    var counts = input04.length; // ??   
                    var angles = -3 * Math.PI / ((8-this.fontGap03*0.2) * (counts - 1)); // ?????? 
                    var charss = input04.split("");
                    var cs;
                    for (var i = 0; i < counts; i++) {
                        cs = charss[i]; // ???????
                        if (i == 0) {
                            context.rotate(3 * Math.PI / (2 * (8 - this.fontGap03 * 0.2)) - 3 * Math.PI / 16); // centering
                            context.rotate((1.1 - this.fontRotate03*0.01) * Math.PI / 6); // ????
                        } else {
                            context.rotate(angles);
                        }
                        context.save();
                        context.translate(0, 103*this.sealScale08); // ??????,????x???   
                        context.rotate(Math.PI / 180); // ??90?,?????x?  
                        context.fillText(cs, 0, 5); // ????????  
                        context.restore();
                    }
                    context.restore();
                    
                    //?????
                    context.fillStyle = this.color07;//??????
                    var circle={
                        x:canvas.width/2,
                        y:canvas.height/2,
                        radius:58
                    };
                    var startAngle = 196 + this.fontRotate01;//??????????
                    var endAngle = -17 - this.fontGap01;//????????
                    var radius=circle.radius*this.sealScale08 //????
                    var angleDecrement=(startAngle-endAngle)/(input01.length-1)//????????
                    context.font = this.fontSize01*this.sealScale08 + 'px ' + this.fontFamily01;
                    context.lineWidth = 0.3+this.fontWeight01*0.1;//??????
                    var ratioX = 81 / circle.radius; //??????
                    var ratioY = 57 / circle.radius; //??????
                    //????(????) ??
                    context.scale(ratioX, ratioY);
                    var index=0;
                    for(var index=0;index<input01.length;index++){
                        //???????????
                        context.save();
                        context.beginPath();
                        context.translate(circle.x+Math.cos((Math.PI/180)*startAngle)*radius-28*this.sealScale08,circle.y-Math.sin((Math.PI/180)*startAngle)*radius+2*this.sealScale08)//??? +-??
                        context.rotate((Math.PI/2)-(Math.PI/180)*startAngle);  //Math.PI/2???90?  Math.PI/180*X??????
                        context.fillText(input01.charAt(index),0,0);
                        context.strokeText(input01.charAt(index),0,0);
                        startAngle-=angleDecrement;
                        context.restore();
                    }
                    // ?????
                    context.font = this.fontWeight02 + ' ' + (13*this.sealScale08 + this.fontSize02) + 'px ' + this.fontFamily02;
                    context.fillText(input02.substring(0,3),canvas.width/2-28*this.sealScale08,canvas.height/2-24*this.sealScale08,46*this.sealScale08);    
                    context.font = this.fontWeight02 + ' ' + (5*this.sealScale08 + this.fontSize02) + 'px ' + this.fontFamily02;
                    context.fillText(input02.substring(3,input02.length-2),canvas.width/2-28*this.sealScale08,canvas.height/2-2*this.sealScale08,96*this.sealScale08);    
                    context.font = this.fontWeight02 + ' ' + (3*this.sealScale08 + this.fontSize02) + 'px ' + this.fontFamily02;
                    context.fillText(input02.substring(input02.length-2,input02.length),canvas.width/2-28*this.sealScale08,canvas.height/2+18*this.sealScale08,20*this.sealScale08);    
                    
                    context.save();
                    // ???????,?????????????,?????????canvas????
                    context.restore();
                    this.drawNoisy(context,canvas)
                    this.dataURL = canvas.toDataURL('image/png');
                },
                BezierEllipse4(ctx, x, y, a, b){
                    var k = .5522848,
                    ox = a * k, // ????????
                    oy = b * k; // ????????</p> <p> 
                    ctx.beginPath();
                    //???????????????????????
                    ctx.moveTo(x - a, y);
                    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
                    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
                    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
                    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
                    ctx.closePath();
                    ctx.stroke();
                },
                // ????
                downSeal() {
                    if (this.dataURL) {
                        var a = document.createElement('a');
                        a.href = this.dataURL;
                        a.download = '??.png';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } else {
                        this.$message.error('??????!');
                    }
                },
            },
            mounted() {
                let that = this
                that.createSealEx2()
            }
        })