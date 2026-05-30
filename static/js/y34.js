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
                    // ?????
                    input: '????',
                    fontFamily: '??',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontTop: 0,
                    fontLeft: 0,
                    // ???
                    input01: 'XXXXXXXXXXXX',
                    fontFamily01: '??',
                    fontSize01: 26,
                    fontWeight01: 'normal',
                    fontGap01: 0,
                    fontRotate01: 0,
                    fontBorder01: 0,
                    // ????
                    input02: '2024-01-01',
                    fontFamily02: '??',
                    fontSize02: 22,
                    fontWeight02: 'bold',
                    fontTop02: 0,
                    fontGap02: 0,
                    fontLeft02: 0,
                    // ????
                    input03: '????',
                    fontFamily03: '??',
                    fontSize03: 26,
                    fontWeight03: 'bold',
                    fontTop03: 0,
                    fontLeft03: 0,
                    // ???
                    border04: 4,
                    // ????
                    color05: 'rgb(255, 0, 0)',
                    // ????
                    sealSize: [
                        {size: 100},
                        {size: 160},
                        {size: 240},
                        {size: 320},
                        {size: 400},
                        {size: 480},
                        {size: 560},
                        {size: 640},
                    ],
                    sealSize06: 240,
                    sealScale06: 1.5,
                    // ????
                    noisy07: 90,
                    checked07: false,
                    
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
                    this.sealScale06 = this.sealSize06 / 160
                    this.setChange()
                },
                // ??????
                createSealEx2() {
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<div class="relative">
                            <canvas id='canvas' class='cSeal' width='${this.sealSize06}' height='${this.sealSize06}'></canvas>
                            <div class="absolute flex flex-wrap" style="user-select: none;pointer-events: none;width: 100%;height: 100%;top: 0;z-index: 999;color: rgba(127,127,127,.4);font-size: ${16*this.sealScale06}px;">
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
                        this.createSealCN('canvas');
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
                    if(this.checked07){
                        // ????????,?????????????
                        // ??canvas?????????
                        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var data = imageData.data;
                        for (var i = 0; i < data.length; i += parseInt(Math.random()*(4 + this.noisy07/10*this.sealScale06))) {
                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var a = data[i + 3];
                            // ??????R,G,B?
                            var rgb = this.extractRGBValues(this.color05)
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
                createSealCN(id){
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');

                    // ??????
                    var width = canvas.width / 2;
                    var height = canvas.height / 2;
                    
                    // ???
                    context.lineWidth = this.border04*this.sealScale06;
                    context.strokeStyle = this.color05;
                    context.beginPath();
                    context.arc(width, height, 78*this.sealScale06, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    
                    // ??
                    context.lineWidth = 2*this.sealScale06;
                    context.beginPath();
                    context.moveTo(5*this.sealScale06, 60*this.sealScale06);
                    context.lineTo(156*this.sealScale06, 60*this.sealScale06);
                    context.moveTo(5*this.sealScale06, 100*this.sealScale06);
                    context.lineTo(156*this.sealScale06, 100*this.sealScale06);
                    // ??
                    context.moveTo(30*this.sealScale06, 60*this.sealScale06);
                    context.lineTo(30*this.sealScale06, 100*this.sealScale06);
                    context.moveTo(130*this.sealScale06, 60*this.sealScale06);
                    context.lineTo(130*this.sealScale06, 100*this.sealScale06);
                    context.stroke();
                    
                    
                    // ??????  
                    context.fillStyle = this.color05;
                    context.save();
                    context.translate(width, height);// ??????,
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale06 + 'px ' + this.fontFamily01
                    var count = this.input01.length;// ??   
                    var angle = 4 * Math.PI / (3 * count + 30 - this.fontGap01);
                    var chars = this.input01.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i];// ???????   
                        if (i == 0)
                            context.rotate((6.8 - 0.05*this.fontRotate01) * Math.PI / 6);
                        else
                            context.rotate(angle);
                        context.save();
                        context.translate(61*this.sealScale06 + this.fontBorder01, 0);// ??????,????x???   
                        context.rotate(Math.PI / 2);// ??90?,?????x?   
                        context.fillText(c, 0, 5);// ????????   
                        context.restore();
                    }
                    context.restore();
                    // ????
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale06 + 'px ' + this.fontFamily02
                    context.fillText(this.input02, width - 44*this.sealScale06 + this.fontLeft02*this.sealScale06, height + 8 *this.sealScale06 + this.fontTop02*this.sealScale06,88*this.sealScale06+this.fontGap02);
                    // ???
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale06 + 'px ' + this.fontFamily03
                    context.fillText(this.input03, width - 53*this.sealScale06 + this.fontLeft03*this.sealScale06, height + 47*this.sealScale06 + this.fontTop03*this.sealScale06);
                    // ?????
                    context.font = this.fontWeight + ' ' + this.fontSize*this.sealScale06 + 'px ' + this.fontFamily
                    context.fillText(this.input, width - 40*this.sealScale06 + this.fontLeft*this.sealScale06, height - 26*this.sealScale06 + this.fontTop*this.sealScale06);
                    
                    context.font = 'bold ' + 18*this.sealScale06 + 'px ??' 
                    context.fillText('?',8*this.sealScale06,78*this.sealScale06)
                    context.fillText('?',8*this.sealScale06,96*this.sealScale06)
                    context.fillText('?',134*this.sealScale06,78*this.sealScale06)
                    context.fillText('?',134*this.sealScale06,96*this.sealScale06)
                    
                    // ???????,?????????????,?????????canvas????
                    context.restore();
                    this.drawNoisy(context, canvas);
                    this.dataURL = canvas.toDataURL('image/png');
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