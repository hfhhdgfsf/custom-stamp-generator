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
                    // ??? ??
                    input01: '????? ?????? ???????????? ??? ?????? ??????????',
                    fontFamily01: '??',
                    fontSize01: 12,
                    fontWeight01: 'normal',
                    fontGap01: 0,
                    fontRotate01: 0,
                    fontBorder01: 0,
                    // ??? ??
                    input02: '?????????????',
                    fontFamily02: '??',
                    fontSize02: 20,
                    fontWeight02: 'normal',
                    fontGap02: 0,
                    fontRotate02: 0,
                    fontBorder02: 0,
                    // ?? ??
                    input03: '?????? ????? ????',
                    fontFamily03: '??',
                    fontSize03: 9,
                    fontWeight03: 'normal',
                    fontTop03: 0,
                    fontLeft03: 0,
                    // ?? ??
                    input04: '?????',
                    fontFamily04: '??',
                    fontSize04: 17,
                    fontWeight04: 'normal',
                    fontTop04: 0,
                    fontLeft04: 0,
                    // ????
                    input05: '?',
                    fontFamily05: '??',
                    fontSize05: 50,
                    fontWeight05: 'bold',
                    fontTop05: 0,
                    fontLeft05: 0,
                    // ???
                    input06: '36655566555YINZHANG666',
                    fontFamily06: '??',
                    fontSize06: 10,
                    fontWeight06: 'normal',
                    fontGap06: 0,
                    fontRotate06: 0,
                    fontBorder06: 0,
                    // ???
                    border07: 4,
                    // ????
                    color08: 'rgb(255,0,0)',
                    // ????
                    sealSize: [
                        {size: 80},
                        {size: 128},
                        {size: 160},
                        {size: 240},
                        {size: 256},
                        {size: 320},
                        {size: 480},
                        {size: 512},
                        {size: 640},
                    ],
                    sealSize09: 240,
                    sealScale09: 1.5,
                    // ????
                    noisy10: 90,
                    checked10: false,
                    
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
                    console.log(value)
                    that.createSealEx2()
                },
                // ???????,????????
                sizeChange() {
                    this.sealScale09 = this.sealSize09 / 160
                    this.setChange()
                },
                // ??????
                createSealEx2() {
                    this.CNorEN = false
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<div class="relative">
                            <canvas id='canvas' class='cSeal' width='${this.sealSize09}' height='${this.sealSize09}'></canvas>
                            <div class="absolute flex flex-wrap" style="user-select: none;pointer-events: none;width: 100%;height: 100%;top: 0;z-index: 999;color: rgba(127,127,127,.4);font-size: ${16*this.sealScale09}px;">
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
                    this.createSeal11('canvas');
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
                    if(this.checked10){
                        // ????????,?????????????
                        // ??canvas?????????
                        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var data = imageData.data;
                        for (var i = 0; i < data.length; i += parseInt(Math.random()*(4 + this.noisy10/10*this.sealScale09))) {
                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var a = data[i + 3];
                            // ??????R,G,B?
                            var rgb = this.extractRGBValues(this.color08)
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
                // ??????
                createSeal11(id) {
                    var canvas = document.getElementById(id);
                    var context = canvas.getContext('2d');
                    
                    // ??????
                    // ???
                    var width = canvas.width / 2;
                    var height = canvas.height / 2;
                    context.lineWidth = this.border07*this.sealScale09;
                    context.strokeStyle = this.color08;
                    context.beginPath();
                    context.arc(width, height, 78*this.sealScale09, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    
                    //????
                    this.create5star(context, width, height, 25, this.color08, 0);
                    context.textBaseline = 'middle';//???????????
                    context.textAlign = 'center'; //????????????
                    context.lineWidth = 1;
                    context.fillStyle = this.color08;
                    // ?? ?  
                    context.font = this.fontWeight03+ ' ' + this.fontSize03*this.sealScale09 + 'px ' + this.fontFamily03
                    context.fillText(this.input03, width + 2 + this.fontLeft03, height + 34*this.sealScale09 + this.fontTop03,68*this.sealScale09);
                    // ?? ? 
                    context.font = this.fontWeight04 + ' ' + this.fontSize04*this.sealScale09 + 'px ' + this.fontFamily04
                    context.fillText(this.input04, width + 2 + this.fontLeft04, height + 48*this.sealScale09 + this.fontTop04,68*this.sealScale09);
                    
                    // ????? ??
                    context.translate(width, height);// ??????,
                    context.save();
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale09 + 'px ' + this.fontFamily01
                    var count = this.input01.length;// ??   
                    var angle = 4 * Math.PI / (3 * count - 5 - this.fontGap01);// ????    0.75 <=> 5.1 ???????2.5:1
                    var chars = this.input01.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i];// ???????   
                        if (i == 0) {
                            context.rotate(-2 * Math.PI * (count - 1) / (3 * count - 5 - this.fontGap01) + 2 * Math.PI * (count - 1) / (3 * count - 5)); // centering
                            context.rotate((4.9 - 0.02*this.fontRotate01) * Math.PI / 6);
                        } else
                            context.rotate(angle);
                        context.save();
                        context.translate(70*this.sealScale09 + this.fontBorder01, 0);// ??????,????x???   
                        context.rotate(Math.PI / 2);// ??90?,?????x?   
                        context.fillText(c, 0, 5);// ????????   
                        context.restore();
                    }
                    context.restore();
                    
                    context.save();
                    // ????? ??  
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale09 + 'px ' + this.fontFamily02
                    var count = this.input02.length;// ??   
                    var angle = 4 * Math.PI / (3 * count - 3 - this.fontGap02);// ????    0.75 <=> 5.1 ???????2.5:1
                    var chars = this.input02.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i];// ???????   
                        if (i == 0) {
                            context.rotate(-2 * Math.PI * (count - 1) / (3 * count - 3 - this.fontGap02) + 2 * Math.PI * (count - 1) / (3 * count - 3)); // centering
                            context.rotate((-7 - 0.02*this.fontRotate02) * Math.PI / 6);
                        } else
                            context.rotate(angle);
                        context.save();
                        context.translate(52*this.sealScale09 + this.fontBorder02, 0);// ??????,????x???   
                        context.rotate(Math.PI / 2);// ??90?,?????x?   
                        context.fillText(c, 0, 5);// ????????   
                        context.restore();
                    }
                    context.restore();
                    
                    // ????????
                    // context.translate(width, height);
                    context.font = this.fontWeight06 + ' ' + this.fontSize06*this.sealScale09 + 'px ' + this.fontFamily06
                    var companys = this.input06
                    var counts = companys.length;// ??   
                    var angles = -4 * Math.PI / ((8-this.fontGap06*0.1) * (counts - 1));// ???? ----------11  0.4:0.05 [10.6:3.15]
                    var charss = companys.split("");
                    var cs;
                    for (var i = 0; i < counts; i++) {
                    	cs = charss[i];// ???????
                        if (i == 0){
                          context.rotate(2 * Math.PI / (8 - this.fontGap06 * 0.1) - 2 * Math.PI / 8); // centering
                          context.rotate((4.5+this.fontRotate06*0.02) * Math.PI / 6); // -------------------------3.1  0.4:0.05
                        }else{
                        //   console.log('angles',angles)
                          context.rotate(angles);
                        }  
                        context.save();
                        context.translate(64*this.sealScale09 + this.fontBorder06, 0);// ??????,????x???   
                        context.rotate(-90 * Math.PI / 180);// ??90?,?????x?  
                        context.fillText(cs, 0, 5);// ????????  
                        context.restore();
                    }
                    // ???????,?????????????,?????????canvas????
                    context.restore();
                    this.drawNoisy(context,canvas)
                    this.dataURL = canvas.toDataURL('image/png');
                },
                //?????  
                create5star(context, sx, sy, radius, color, rotato) {
                    context.save();
                    context.font = this.fontWeight05 + ' ' + this.fontSize05*this.sealScale09 + 'px ' + this.fontFamily05
                    context.fillStyle = this.color08;
                    context.fillText(this.input05, sx - 25*this.sealScale09 + this.fontLeft05,sy + 15*this.sealScale09 + this.fontTop05);
                    context.restore();
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