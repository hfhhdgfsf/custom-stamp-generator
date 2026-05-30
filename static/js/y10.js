        new Vue({
            el: '#app',
            data() {
                return {tabIndex: 0,
                    
                    sealName: '????',
                    fontList: [
                        {name: '??'},
                        {name: '??'},
                        {name: '??'},
                        {name: '??'},                    ],
                    // ??
                    input01: '?????????',
                    fontFamily01: '??',
                    fontSize01: 16,
                    fontWeight01: 0,
                    fontTop01: 0,
                    fontLeft01: 0,
                    fontGap01: 0,
                    // ????
                    input02: '2012.01.01',
                    fontFamily02: '??',
                    fontSize02: 18,
                    fontWeight02: 'bold',
                    fontTop02: 0,
                    fontLeft02: 0,
                    fontGap02: 0,
                    // ??
                    input03: '????',
                    fontFamily03: '??',
                    fontSize03: 20,
                    fontWeight03: 'bold',
                    fontTop03: 0,
                    fontLeft03: 0,
                    fontGap03: 0,
                    // ???
                    border04: 2,
                    // ???
                    border05: 1,
                    checked05: false,
                    // ??
                    checked06: true,
                    rectWidth06: 0,
                    rectHeight06: 0,
                    rectWide06: 1,
                    rectTop06: 0,
                    rectLeft06: 0,
                    // ????
                    color07: 'rgb(255,0,0)',
                    // ????
                    sealSize: [
                        {size: 80},
                        {size: 128},
                        {size: 165},
                        {size: 248},
                        {size: 330},
                        {size: 396},
                        {size: 495},
                        {size: 660},
                    ],
                    sealSize08: 248,
                    sealScale08: 1.5,
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
                    this.sealScale08 = this.sealSize08 / 165
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
                    this.createSealCN('canvas', this.input01,this.input02,this.input03);
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
                createSealCN(id,input01,input02,input03){
                    var canvas = document.getElementById("canvas");
                    var context = canvas.getContext("2d");
                    context.strokeStyle=this.color07;//??????
                    context.textBaseline = 'middle';//???????????
                    context.textAlign = 'center'; //????????????
                    context.lineWidth = this.border04*this.sealScale08;//??1??
                    //3???: ??? ??? ?? ????
                    this.BezierEllipse4(context, 82.5*this.sealScale08, 79*this.sealScale08, 79*this.sealScale08, 55*this.sealScale08); //??1
                    if(this.checked05){
                        context.lineWidth = this.border05*this.sealScale08;
                        this.BezierEllipse4(context, 82.5*this.sealScale08, 79*this.sealScale08, 76*this.sealScale08, 52*this.sealScale08); //??2
                    }
                    // ??
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale08 + 'px ' + this.fontFamily03;
                    context.lineWidth = 1;
                    context.fillStyle = this.color07;
                    context.fillText(input03,canvas.width/2+3*this.sealScale08 + this.fontLeft03,canvas.height/2+28*this.sealScale08 + this.fontTop03,80*this.sealScale08+this.fontGap03);    
                    context.save(); 
                    // ????
                    context.restore()
                    canvas.style.letterSpacing = this.fontGap02-10*0.1 + 'px';
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale08 + 'px ' + this.fontFamily02;
                    context.fillStyle = this.color07;
                    context.fillText(input02,canvas.width/2+3*this.sealScale08 + this.fontLeft02,canvas.height/2+3*this.sealScale08 + this.fontTop02);    
                    context.save(); 
                    // ??
                    if(this.checked06){
                        context.beginPath();
                        context.rect(canvas.width/2-(42-this.rectLeft06)*this.sealScale08,canvas.height/2-(6-this.rectTop06)*this.sealScale08, (90+this.rectWidth06)*this.sealScale08, (20+this.rectHeight06)*this.sealScale08);  // ????(x, y, ??, ??)
                        context.lineWidth = 1+this.rectWide06*this.sealScale08;          // ??????
                        context.stroke();               // ????
                    }
                    //????
                    var ccircle={
                        x:canvas.width/2,
                        y:canvas.height/2,
                        radius:59
                    };
                    var cstartAngle=165+this.fontGap01;//??????????
                    var cendAngle =15-this.fontGap01;//????????
                    var cradius=ccircle.radius*this.sealScale08 //????
                    var cangleDecrement=(cstartAngle-cendAngle)/(input01.length-1)//????????
                    context.font = this.fontSize01*this.sealScale08 + 'px ' + this.fontFamily01
                    context.lineWidth = (1+this.fontWeight01*0.2)*this.sealScale08;
                    var cratioX = 64.5 / ccircle.radius; //??????
                    var cratioY = 53 / ccircle.radius; //??????
                    //????(????)
                    context.scale(cratioX, cratioY);
                    var cindex=0;
                    for(var cindex=0;cindex<input01.length;cindex++){
                        context.save()
                        context.beginPath()
                        //???
                        context.translate(ccircle.x+Math.cos((Math.PI/180)*cstartAngle)*cradius-6.5*this.sealScale08 + this.fontLeft01,ccircle.y-Math.sin((Math.PI/180)*cstartAngle)*cradius+18*this.sealScale08 + this.fontTop01)
                        context.rotate((Math.PI/2)-(Math.PI/180)*cstartAngle)   //Math.PI/2???90?  Math.PI/180*X??????
                        context.fillText(input01.charAt(cindex),0,0)
                        context.strokeText(input01.charAt(cindex),0,0)
                        cstartAngle-=cangleDecrement
                        context.restore()
                    }
                    // ???????,?????????????,?????????canvas????
                    context.restore();
                    this.drawNoisy(context,canvas)
                    this.dataURL = canvas.toDataURL('image/png');
                },
                BezierEllipse4(ctx, x, y, a, b) {
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