        new Vue({
            el: '#app',
            data() {
                return {tabIndex: 0,
                    sealName: '???',
                    dataURL: '', // ????
                    color: 'rgb(255, 0, 0)', // ????
                    predefineColors: [
                      '#f00',
                      'rgba(0, 0, 255, 1)',
                      '#ffd700',
                      '#90ee90',
                      '#00ced1',
                      '#1e90ff',
                      '#c71585',
                      'rgba(255, 69, 0, 0.68)',
                      'rgb(255, 120, 0)',
                      'hsv(51, 100, 98)',
                      'hsva(120, 40, 94, 0.5)',
                      'hsl(181, 100%, 37%)',
                      'hsla(209, 100%, 56%, 0.73)',
                      '#c7158577'
                    ],
                    userVipOverplus: '', // ????
                    noisy: 95, // ??
                    noisyRadio: false, // ???????
                    useKtnum: 1, // ????
                    
                    activeName: 'first',
                    options01: [
                        {value: '/common/images/renzhengSeal01.png',label: 'CMA????'},
                        {value: '/common/images/renzhengSeal02.png',label: 'CAL????'},
                        {value: '/common/images/renzhengSeal03.png',label: 'QS????'},
                        {value: '/common/images/renzhengSeal04.png',label: 'HF????'}
                    ],
                    selectSeal: 'CMA????',
                    selectSealUrl: '/common/images/renzhengSeal01.png',
                    // ????
                    sealSize: [
                        {size: 80},
                        {size: 100},
                        {size: 160},
                        {size: 240},
                        {size: 320},
                        {size: 400},
                    ],
                    sealSize04: 240,
                    sealScale04: 1.5,
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
                    this.sealScale04 = this.sealSize04 / 160
                    this.setChange()
                },
                colorPicker(e){
                    // console.log('??????',e)
                    // ????????????,color=null,?????
                    // ??canvas????????????,??????????????
                    if(e == null){
                        this.color = "rgb(255, 0, 0)"
                        this.createSealEx2()
                        return
                    }
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    
                    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    var data = imageData.data;
                    // console.log('????',data)
                    for (var i = 0; i < data.length; i += 4) {
                        var r = data[i];
                        var g = data[i + 1];
                        var b = data[i + 2];
                        var a = data[i + 3];
                        // ??????R,G,B?
                        var rgb = this.extractRGBValues(this.color)
                        // ????canvas??????,?????
                        // ??????????????
                        if(data[i + 3] != 0){ // ???????????
                            data[i] = rgb[0];
                            data[i + 1] = rgb[1];
                            data[i + 2] = rgb[2];
                            data[i + 3] = 255; // ???????
                        }
                    }
                    // ???????????????
                    context.putImageData(imageData, 0, 0);
                    this.dataURL = canvas.toDataURL('image/png');
                },
                changeSeal(e) {
                    // console.log('???????',e)
                    const eve = e.match(/\d+/g); // ????????????????,????
                    // ??????????????,?????????
                    if(eve[0] == '01' || eve[0] == '02'){
                        this.color = 'rgb(255, 0, 0)'
                    }else if(eve[0] == '03'){
                        this.color = 'rgb(51,51,153)'
                    }else{
                        this.color = 'rgb(0,102,204)'
                    }
                    this.selectSealUrl = e
                    this.createSealEx2()
                },
                // ??????
                createSealEx2() {
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<div class="relative">
                            <canvas id='canvas' class='cSeal' width='${this.sealSize04}' height='${this.sealSize04}'></canvas>
                            <div class="absolute flex flex-wrap" style="user-select: none;pointer-events: none;width: 100%;height: 100%;top: 0;z-index: 999;color: rgba(127,127,127,.4);font-size: ${16*this.sealScale04}px;">
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
                    this.createSealCN('canvas', this.selectSealUrl);
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
                    if(this.noisyRadio){
                        // ????????,?????????????
                        // ??canvas?????????
                        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var data = imageData.data;
                        for (var i = 0; i < data.length; i += parseInt(Math.random()*(4 + this.noisy/10*this.sealScale04))) {
                            var r = data[i];
                            var g = data[i + 1];
                            var b = data[i + 2];
                            var a = data[i + 3];
                            // ??????R,G,B?
                            var rgb = this.extractRGBValues(this.color)
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
                createSealCN(id,url){
                    var canvas = document.getElementById(id);
                    var context = canvas.getContext('2d');
                    let that = this
                    const img = new Image();
                    img.onload = function() {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        that.drawNoisy(context,canvas);
                        that.dataURL = canvas.toDataURL('image/png');
                    };
                    img.src = url;
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