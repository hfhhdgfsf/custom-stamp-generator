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
                    // ????
                    input01: '?',
                    fontFamily01: '??',
                    fontSize01: 60,
                    fontWeight01: 'bold',
                    fontTop01: 0,
                    fontLeft01: 0,
                    // ????
                    input02: '?',
                    fontFamily02: '??',
                    fontSize02: 60,
                    fontWeight02: 'bold',
                    fontTop02: 0,
                    fontLeft02: 0,
                    // ????
                    input03: '?',
                    fontFamily03: '??',
                    fontSize03: 60,
                    fontWeight03: 'bold',
                    fontTop03: 0,
                    fontLeft03: 0,
                    // ????
                    input04: '?',
                    fontFamily04: '??',
                    fontSize04: 60,
                    fontWeight04: 'bold',
                    fontTop04: 0,
                    fontLeft04: 0,
                    // ???
                    border05: 6,
                    // ????
                    color06: 'rgb(255,0,0)',
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
                    sealSize07: 160,
                    sealScale07: 1,
                    // ????
                    noisy08: 90,
                    checked08: false,
                    
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
                    this.sealScale07 = this.sealSize07 / 160
                    this.setChange()
                },
                // ??????
                createSealEx2() {
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<div class="relative">
                            <canvas id='canvas' class='cSeal' width='${this.sealSize07}' height='${this.sealSize07}'></canvas>
                            <div class="absolute flex flex-wrap" style="user-select: none;pointer-events: none;width: 100%;height: 100%;top: 0;z-index: 999;color: rgba(127,127,127,.4);font-size: ${16*this.sealScale07}px;">
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
                        this.createSealCN('canvas', this.input01, this.input02, this.input03, this.input04);
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
                    if(this.checked08){
                        // ????????,?????????????
                        // ??canvas?????????
                        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var data = imageData.data;
                        for (var i = 0; i < data.length; i += parseInt(Math.random()*(4 + this.noisy08/10*this.sealScale07))) {
                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var a = data[i + 3];
                            // ??????R,G,B?
                            var rgb = this.extractRGBValues(this.color06)
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
                    var canvas = document.getElementById(id);
                        var context = canvas.getContext('2d');
                        
                        // ??????
                        // ???
                        var width = canvas.width / 2;
                        var height = canvas.height / 2;
                        context.lineWidth = this.border05+this.sealScale07;
                        context.strokeStyle = this.color06;
                        context.beginPath();
                        context.rect(10*this.sealScale07,10*this.sealScale07,140*this.sealScale07,140*this.sealScale07);  // ????(x, y, ??, ??)
                        context.stroke();
                        context.save();
                        // ??????
                        context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale07 + 'px ' + this.fontFamily01
                        context.fillStyle = this.color06;
                        context.fillText(input01,20*this.sealScale07 + this.fontLeft01,70*this.sealScale07 + this.fontTop01);
                        // ??????
                        context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale07 + 'px ' + this.fontFamily02
                        context.fillText(input02,20*this.sealScale07 + this.fontLeft02,134*this.sealScale07 + this.fontTop02);
                        // ??????
                        context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale07 + 'px ' + this.fontFamily03
                        context.fillText(input03,84*this.sealScale07 + this.fontLeft03,70*this.sealScale07 + this.fontTop03);
                        // ??????
                        context.font = this.fontWeight04 + ' ' + this.fontSize04*this.sealScale07 + 'px ' + this.fontFamily04
                        context.fillText(input04,84*this.sealScale07 + this.fontLeft04,134*this.sealScale07 + this.fontTop04);
                        
                        // ???????,?????????????,?????????canvas????
                        context.restore();
                        this.drawNoisy(context,canvas)
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