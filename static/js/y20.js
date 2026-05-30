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
                    input01: 'YinGood Seal Online Making Platform',
                    fontFamily01: '??',
                    fontSize01: 20,
                    fontWeight01: 'normal',
                    fontGap01: 0,
                    fontRotate01: 0,
                    fontBorder01: 0,
                    // ????
                    input02_1: 'THE',
                    input02_2: 'COMMON SEAL',
                    input02_3: 'OF',
                    fontFamily02: '??',
                    fontSize02: 18,
                    fontWeight02: 'bold',
                    fontTop02: 0,
                    fontLeft02: 0,
                    // ??
                    input03: '?',
                    fontFamily03: '??',
                    fontSize03: 18,
                    fontWeight03: 'normal',
                    fontTop03: 0,
                    fontLeft03: 0,
                    // ???
                    border04: 4,
                    // ???
                    border05: 2,
                    // ???
                    border06: 2,
                    // ????
                    color07: 'rgb(51, 51, 102)',
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
                    sealSize08: 240,
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
                    this.sealScale08 = this.sealSize08 / 160
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
                createSealCN(id){
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');

                    // ??????
                    // ???
                    var width = canvas.width / 2;
                    var height = canvas.height / 2;
                    context.lineWidth = this.border04*this.sealScale08;
                    context.strokeStyle = this.color07;
                    context.beginPath();
                    context.arc(width, height, 78*this.sealScale08, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    // ???
                    context.lineWidth = this.border05*this.sealScale08;
                    context.beginPath();
                    context.arc(width, height, 73*this.sealScale08, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    // ???
                    context.lineWidth = this.border06*this.sealScale08;
                    context.beginPath();
                    context.arc(width, height, 46*this.sealScale08, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    
                    // ????1
                    context.lineWidth = 2*this.sealScale08;
                    context.beginPath();
                    context.moveTo(width-44*this.sealScale08, height-14*this.sealScale08);
                    context.lineTo(width+44*this.sealScale08, height-14*this.sealScale08);
                    
                    context.moveTo(width-44*this.sealScale08, height+14*this.sealScale08);
                    context.lineTo(width+44*this.sealScale08, height+14*this.sealScale08);
                    context.stroke();
                    // ????1
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale08 + 'px ' + this.fontFamily02
                        context.fillStyle = this.color07;
                    context.fillText(this.input02_1, width - 12*this.sealScale08 + this.fontLeft02, height - 20*this.sealScale08 + this.fontTop02);
                    // ????2
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale08 + 'px ' + this.fontFamily02
                    context.fillText(this.input02_2, width - 42*this.sealScale08 + this.fontLeft02, height + 9*this.sealScale08 + this.fontTop02,86*this.sealScale08);
                    // ????3
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale08 + 'px ' + this.fontFamily02
                    context.fillText(this.input02_3, width - 8*this.sealScale08 + this.fontLeft02, height + 38*this.sealScale08 + this.fontTop02);
                    
                    // ???
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale08 + 'px ' + this.fontFamily03
                    context.textBaseline = 'middle'; //???????????
                    context.textAlign = 'center'; //????????????
                    context.fillText(this.input03, width + this.fontLeft03, height + 59*this.sealScale08 + this.fontTop03);
                    // ??????   
                    context.translate(width, height); // ??????,
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale08 + 'px ' + this.fontFamily01
                    var count = this.input01.length; // ??
                    var angle = 4 * Math.PI / (3 * count - 10 - this.fontGap01);
                    var chars = this.input01.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i]; // ???????   
                        if (i == 0) {
                            context.rotate(-2 * Math.PI * (count - 1) / (3 * count - 10 - this.fontGap01) + 2 * Math.PI * (count - 1) / (3 * count - 10)); // centering
                            context.rotate((4.8 - 0.05*this.fontRotate01) * Math.PI / 6);
                        } else
                            context.rotate(angle);
                        context.save();
                        context.translate(64*this.sealScale08 + this.fontBorder01, 0); // ??????,????x???   
                        context.rotate(Math.PI / 2); // ??90?,?????x?   
                        context.fillText(c, 0, 5); // ????????   
                        context.restore();
                    }
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