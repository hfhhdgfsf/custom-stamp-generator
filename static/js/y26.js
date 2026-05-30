        new Vue({
            el: '#app',
            data() {
                return {tabIndex: 0,
                    sealName: '?????2',
                    fontList: [
                        {name: '??'},
                        {name: '??'},
                        {name: '??'},
                        {name: '??'},                    ],
                    // ???
                    input01: 'QC',
                    fontFamily01: '??',
                    fontSize01: 36,
                    fontWeight01: 'bold',
                    fontTop01: 0,
                    fontLeft01: 0,
                    // ???
                    input02: '01',
                    fontFamily02: '??',
                    fontSize02: 34,
                    fontWeight02: 'bold',
                    fontTop02: 0,
                    fontLeft02: 0,
                    // ???
                    border03: 4,
                    // ????
                    color04: 'rgb(255, 0, 0)',
                    // ????
                    sealSize: [
                        {size: 100},
                        {size: 200},
                        {size: 300},
                        {size: 400},
                        {size: 500},
                        {size: 600},
                        {size: 700},
                    ],
                    sealSize05: 200,
                    sealScale05: 2,
                    // ????
                    noisy06: 90,
                    checked06: false,
                    
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
                    this.sealScale05 = this.sealSize05 / 100
                    this.setChange()
                },
                // ??????
                createSealEx2() {
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<div class="relative">
                            <canvas id='canvas' class='cSeal' width='${this.sealSize05}' height='${this.sealSize05}'></canvas>
                            <div class="absolute flex flex-wrap" style="user-select: none;pointer-events: none;width: 100%;height: 100%;top: 0;z-index: 999;color: rgba(127,127,127,.4);font-size: ${12*this.sealScale05}px;">
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
                    if(this.checked06){
                        // ????????,?????????????
                        // ??canvas?????????
                        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var data = imageData.data;
                        for (var i = 0; i < data.length; i += parseInt(Math.random()*(4 + this.noisy06/10*this.sealScale05))) {
                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var a = data[i + 3];
                            // ??????R,G,B?
                            var rgb = this.extractRGBValues(this.color04)
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
                    context.lineWidth = this.border03*this.sealScale05;
                    context.strokeStyle = this.color04;
                    context.beginPath();
                    context.arc(width, height, 46*this.sealScale05, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    
                    // ??
                    context.lineWidth = 2*this.sealScale05;
                    context.beginPath();
                    context.moveTo(4*this.sealScale05, 50*this.sealScale05);
                    context.lineTo(96*this.sealScale05, 50*this.sealScale05);
                    context.stroke();
                    
                            
                    // ???
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale05 + 'px ' + this.fontFamily01
                    context.fillStyle = this.color04;
                    context.fillText(this.input01, width - 20*this.sealScale05 + this.fontLeft01*this.sealScale05, height - 7*this.sealScale05 + this.fontTop01*this.sealScale05);
                    // ???
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale05 + 'px ' + this.fontFamily02
                    context.fillText(this.input02, width - 18*this.sealScale05 + this.fontLeft02*this.sealScale05, height + 31*this.sealScale05 + this.fontTop02*this.sealScale05);
                    
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