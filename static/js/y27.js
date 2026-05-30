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
                    // ???
                    input01: 'XXXXXXXXXXXX',
                    fontFamily01: '??',
                    fontSize01: 22,
                    fontWeight01: 'bold',
                    fontGap01: 0,
                    fontRotate01: 0,
                    fontBorder01: 0,
                    // ??1
                    input02: 'QC',
                    fontFamily02: '??',
                    fontSize02: 28,
                    fontWeight02: 'bold',
                    fontTop02: 0,
                    fontLeft02: 0,
                    // ??2
                    input03: '2024-01-01',
                    fontFamily03: '??',
                    fontSize03: 22,
                    fontWeight03: 'bold',
                    fontTop03: 0,
                    fontLeft03: 0,
                    // ??3
                    input04: 'PASS',
                    fontFamily04: '??',
                    fontSize04: 28,
                    fontWeight04: 'bold',
                    fontTop04: 0,
                    fontLeft04: 0,
                    // ????
                    input05: '??????',
                    fontFamily05: '??',
                    fontSize05: 20,
                    fontWeight05: 'bold',
                    fontGap05: 0,
                    fontRotate05: 0,
                    fontBorder05: 0,
                    // ???
                    border06: 4,
                    // ???
                    border07: 1,
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
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');

                    // ??????
                    // ???
                    var width = canvas.width / 2;
                    var height = canvas.height / 2;
                    context.lineWidth = this.border06*this.sealScale09;
                    context.strokeStyle = this.color08;
                    context.beginPath();
                    context.arc(width, height, 78*this.sealScale09, 0, Math.PI * 2);
                    context.stroke();
                    // ???
                    context.lineWidth = this.border07*this.sealScale09;
                    context.beginPath();
                    context.arc(80*this.sealScale09,80*this.sealScale09, 52*this.sealScale09, 0.3, 0.9 * Math.PI, false);
                    context.stroke();
                    
                    context.beginPath();
                    context.arc(80*this.sealScale09,78*this.sealScale09, 52*this.sealScale09, -0.3, 1.1* Math.PI, true);
                    context.stroke();
                    context.save();
                    // ????1
                    context.lineWidth = 2*this.sealScale09;
                    context.beginPath();
                    context.moveTo(width-78*this.sealScale09, height-18*this.sealScale09);
                    context.lineTo(width+78*this.sealScale09, height-18*this.sealScale09);
                    
                    context.moveTo(width-78*this.sealScale09, height+16*this.sealScale09);
                    context.lineTo(width+78*this.sealScale09, height+16*this.sealScale09);
                    context.stroke();
                    // ????1
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale09 + 'px ' + this.fontFamily02
                        context.fillStyle = this.color08;
                    context.fillText(this.input02, width - 14*this.sealScale09 + this.fontLeft02, height - 25*this.sealScale09 + this.fontTop02);
                    // ????2
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale09 + 'px ' + this.fontFamily03
                    context.fillText(this.input03, width - 39*this.sealScale09 + this.fontLeft03, height + 6*this.sealScale09 + this.fontTop03,80*this.sealScale09);
                    // ????3
                    context.font = this.fontWeight04 + ' ' + this.fontSize04*this.sealScale09 + 'px ' + this.fontFamily04
                    context.fillText(this.input04, width - 26*this.sealScale09 + this.fontLeft04, height + 40*this.sealScale09 + this.fontTop04,72*this.sealScale09);
                    // ?????
                    context.font = 'bolder ' + 20*this.sealScale09 + 'px ??';
                    context.fillText('?',7*this.sealScale09,86*this.sealScale09);
                    context.fillText('?',132*this.sealScale09,86*this.sealScale09);
                    
                    
                    
                    context.textBaseline = 'middle';//???????????
                    context.textAlign = 'center'; //????????????
                    // ????????
                    context.save();
                    context.translate(width, height); // ??????,
                    context.font = this.fontWeight05 + ' ' + this.fontSize05*this.sealScale09 + 'px ' + this.fontFamily05
                    var companys = this.input05
                    var counts = companys.length;// ??   
                    var angles = -4 * Math.PI / ((7.4-this.fontGap05*0.4) * (counts - 1));// ???? ----------11  0.4:0.05 [10.6:3.15]
                    var charss = companys.split("");
                    var cs;
                    for (var i = 0; i < counts; i++) {
                    	cs = charss[i];// ???????
                        if (i == 0){
                            context.rotate((4.6+this.fontRotate05*0.05) * Math.PI / 6); // -------------------------3.1  0.4:0.05
                        }else{
                            context.rotate(angles);
                        }  
                        context.save();
                        context.translate(60*this.sealScale09 + this.fontBorder05, 0);// ??????,????x???   
                        context.rotate(-90 * Math.PI / 180);// ??90?,?????x?  
                        context.fillText(cs, 0, 5);// ????????  
                        context.restore();
                    }
                    context.restore();
                    // ??????   
                    context.translate(width, height); // ??????,
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale09 + 'px ' + this.fontFamily01
                    var count = this.input01.length; // ??
                    var angle = 4 * Math.PI / (3 * count + 28 - this.fontGap01);
                    var chars = this.input01.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i]; // ???????   
                        if (i == 0)
                            context.rotate((6.95 - 0.05*this.fontRotate01) * Math.PI / 6);
                        else
                            context.rotate(angle);
                        context.save();
                        context.translate(69*this.sealScale09 + this.fontBorder01, 0); // ??????,????x???   
                        context.rotate(Math.PI / 2); // ??90?,?????x?   
                        context.fillText(c, 0, 5); // ????????   
                        context.restore();
                    }
                    // ???????,?????????????,?????????canvas????
                    context.restore();
                    this.drawNoisy(context, canvas);
                    this.dataURL = canvas.toDataURL('image/png');
                },
                //?????  
                create5star(context, sx, sy, radius, color, rotato) {
                    context.save();
                    context.font = this.fontWeight04 + ' ' + this.fontSize04*this.sealScale09 + 'px ' + this.fontFamily04
                    context.fillStyle = this.color08;
                    context.fillText(this.input04, sx - 25*this.sealScale09 + this.fontLeft04,sy + 15*this.sealScale09 + this.fontTop04);
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