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
                    input01: '?????????????',
                    fontFamily01: '??',
                    fontSize01: 20,
                    fontWeight01: 'bold',
                    fontGap01: 0,
                    fontBorder01: 0,
                    // ??
                    input02: 'TESTTESTTESTTESTTESTTESTTEST',
                    fontFamily02: '??',
                    fontSize02: 10,
                    fontWeight02: 'bold',
                    fontBorder02: 0,
                    // ??
                    input03: '?????',
                    fontFamily03: '??',
                    fontSize03: 16,
                    fontWeight03: 'bold',
                    fontTop03: 0,
                    fontLeft03: 0,
                    // ????
                    input04: '?',
                    fontFamily04: '??',
                    fontSize04: 50,
                    fontWeight04: 'bold',
                    fontTop04: 0,
                    fontLeft04: 0,
                    // ???
                    input05: '',
                    fontFamily05: '??',
                    fontSize05: 10,
                    fontWeight05: 'bold',
                    fontGap05: 0,
                    fontRotate05: 0,
                    fontBorder05: 0,
                    // ???
                    border06: 2,
                    // ???
                    border07: 1,
                    checked07: false,
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

                    CNorEN: false, // ????????????
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
                    if (that.CNorEN) {
                        that.createSealEx()
                    } else {
                        that.createSealEx2()
                    }
                },
                // ???????,????????
                sizeChange() {
                    this.sealScale09 = this.sealSize09 / 160
                    this.setChange()
                },
                // ??????
                createSealEx() {
                    this.CNorEN = true
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<canvas id='canvas' class='eSeal' width='${this.sealSize09}' height='${this.sealSize09}'></canvas>
                        <div class="absolute flex flex-wrap justify-between" style="user-select: none;pointer-events: none;width: 160px;height: auto;top: 40%;z-index: 10;">
                            <p class="text-xl" style="width: 80px;height: 60px;line-height: 60px;text-align: center;transform: rotate(45deg);color: rgba(127,127,127,.4);">
                                ???
                            </p>
                            <p class="text-xl whitespace-nowrap" style="width: 80px;height: 60px;line-height: 60px;text-align: center;transform: rotate(45deg);color: rgba(127,127,127,.4);">
                                ???????
                            </p>
                        </div>`;
                    this.createSeal('canvas', this.input01, this.input02,this.input03);
                },
                // ??????
                createSealEx2() {
                    this.CNorEN = false
                    var sealdiv = document.getElementById("sealdiv"); // ??
                    sealdiv.innerHTML = `<canvas id='canvas' class='cSeal' width='${this.sealSize09}' height='${this.sealSize09}'></canvas>
                        <div class="absolute flex flex-wrap justify-between" style="user-select: none;pointer-events: none;width: 160px;height: auto;top: 40%;z-index: 10;">
                            <p class="text-xl" style="width: 80px;height: 60px;line-height: 60px;text-align: center;transform: rotate(45deg);color: rgba(127,127,127,.4);">
                                ???
                            </p>
                            <p class="text-xl whitespace-nowrap" style="width: 80px;height: 60px;line-height: 60px;text-align: center;transform: rotate(45deg);color: rgba(127,127,127,.4);">
                                ???????
                            </p>
                        </div>`;
                    this.createSeal11('canvas', this.input01,this.input03);
                },
                // ???????
                isnoisyRadio() {
                    var cSeal = document.querySelector('.cSeal') // ??
                    var eSeal = document.querySelector('.eSeal') // ??
                    if (!this.checked10) { // ?????,?????????????,??????
                        if (cSeal) {
                            this.createSealEx2()
                        } else {
                            this.createSealEx()
                        }
                    } else { // ?????,?????????????,??????
                        if (cSeal) {
                            this.createSealEx2()
                        } else {
                            this.createSealEx()
                        }
                    }
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
                createSeal11(id, company, name) {
                    var canvas = document.getElementById(id);
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
                    context.save();
                    // ???
                    if(this.checked07){
                        context.lineWidth = this.border07*this.sealScale09;
                        context.strokeStyle = this.color08;
                        context.beginPath();
                        context.arc(width, height, 75*this.sealScale09, 0, Math.PI * 2);
                        context.stroke();
                        context.save();
                    }
                    
                    //????
                    this.create5star(context, width, height, 25, this.color08, 0);
                    // ??????  
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale09 + 'px ' + this.fontFamily03
                    context.textBaseline = 'middle';//???????????
                    context.textAlign = 'center'; //????????????
                    context.lineWidth = 1;
                    context.fillStyle = this.color08;
                    context.fillText(name, width + this.fontLeft03, height + 53*this.sealScale09 + this.fontTop03);
                    // ??????   
                    context.translate(width, height);// ??????,
                    context.save();
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale09 + 'px ' + this.fontFamily01
                    var count = company.length;// ??   
                    var fontGap01 = this.fontGap01>0?this.fontGap01/100:0 // ??????? <0 ???0.25:1???,>0?????0.01 [0.26:1 ... 0.35:1]
                    var angle = 4 * Math.PI / (3 * (count - (1 - this.fontGap01 * (0.25 + fontGap01))));// ????    0.75 <=> 5.1 ???????2.5:1
                    var chars = company.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i];// ???????   
                        if (i == 0)
                            context.rotate((5 + this.fontGap01 / 10) * Math.PI / 6);
                        else
                            context.rotate(angle);
                        context.save();
                        context.translate(64*this.sealScale09 + this.fontBorder01, 0);// ??????,????x???   
                        context.rotate(Math.PI / 2);// ??90?,?????x?   
                        context.fillText(c, 0, 5);// ????????   
                        context.restore();
                    }
                    context.restore();
                    context.rotate(13 * Math.PI / 6);
                    // ????????
                    // context.translate(width, height);
                    context.font = this.fontWeight05 + ' ' + this.fontSize05*this.sealScale09 + 'px ' + this.fontFamily05
                    var companys = this.input05
                    var counts = companys.length;// ??   
                    var angles = -4 * Math.PI / ((8.6-this.fontGap05*0.4) * (counts - 1));// ???? ----------11  0.4:0.05 [10.6:3.15]
                    var charss = companys.split("");
                    var cs;
                    for (var i = 0; i < counts; i++) {
                    	cs = charss[i];// ???????
                        if (i == 0){
                          context.rotate(-2 * Math.PI / 8.6);
                          context.rotate(-angles * (counts - 1) / 2);
                          context.rotate((3.4+this.fontRotate05*0.05) * Math.PI / 6); // -------------------------3.1  0.4:0.05
                        }else{
                        //   console.log('angles',angles)
                          context.rotate(angles);
                        }  
                        context.save();
                        context.translate(64*this.sealScale09 + this.fontBorder05, 0);// ??????,????x???   
                        context.rotate(-90 * Math.PI / 180);// ??90?,?????x?  
                        context.fillText(cs, 0, 5);// ????????  
                        context.restore();
                    }
                    // ???????,?????????????,?????????canvas????
                    context.restore();
                    this.drawNoisy(context,canvas)
                    this.dataURL = canvas.toDataURL('image/png');
                },
                // ??????
                createSeal(id, company, ecompany, name) {
                    var canvas = document.getElementById(id);
                    var context = canvas.getContext('2d');
                    context.translate(0, 0); // ?????? 
                    // ??????   
                    var width = canvas.width / 2;
                    var height = canvas.height / 2;
                    // ???
                    context.lineWidth = this.border06*this.sealScale09;
                    context.strokeStyle = this.color08;
                    context.beginPath();
                    context.arc(width, height, 78*this.sealScale09, 0, Math.PI * 2);
                    context.stroke();
                    context.save();
                    // ???
                    if(this.checked07){
                        context.lineWidth = this.border07*this.sealScale09;
                        context.strokeStyle = this.color08;
                        context.beginPath();
                        context.arc(width, height, 63*this.sealScale09, 0, Math.PI * 2);
                        context.stroke();
                        context.save();
                    }
                    
                    //????
                    this.create5star(context, width, height, 20, this.color08, 0);
                    // ??????
                    context.font = this.fontWeight03 + ' ' + this.fontSize03*this.sealScale09 + 'px ' + this.fontFamily03
                    context.textBaseline = 'middle';//???????????
                    context.textAlign = 'center'; //????????????
                    context.lineWidth = 1;
                    context.fillStyle = this.color08;
                    context.fillText(name, width + this.fontLeft03, height + 50*this.sealScale09 + this.fontTop03);
                    // ????????   
                    context.translate(width, height);// ??????,
                    context.save(); 
                    context.font = this.fontWeight01 + ' ' + this.fontSize01*this.sealScale09 + 'px ' + this.fontFamily01
                    var count = company.length;// ??   
                    var angle = 4 * Math.PI / (3 * (count - 1));// ????    0.75 <=> 5.1 ???????2.5:1
                    var chars = company.split("");
                    var c;
                    for (var i = 0; i < count; i++) {
                        c = chars[i];// ???????   
                        if (i == 0)
                            context.rotate(5 * Math.PI / 6);
                        else
                            context.rotate(angle);
                        context.save();
                        // ??????,????x???,?????????????,??????   
                        context.translate(52*this.sealScale09 + this.fontBorder01, 0);
                        context.rotate(Math.PI / 2);// ??90?,?????x?   
                        context.fillText(c, 0, 5);// ????????   
                        context.restore();
                    }
                    //????????
                    context.translate(width - 80*this.sealScale09, height - 80*this.sealScale09);// ??????,
                    context.font = this.fontWeight02 + ' ' + this.fontSize02*this.sealScale09 + 'px ' + this.fontFamily02;
                    var ecount = ecompany.length;// ??   
                    var eangle = (5 * Math.PI) / (3.34 * (ecount));// ????   
                    var echars = ecompany.split("");
                    var ec;
                    for (var j = 0; j < ecount; j++) {
                        ec = echars[j];// ???????   
                        if (j == 0)
                            context.rotate(6.5 * Math.PI / 7 - 1);
                        else
                            context.rotate(eangle);
                        context.save();
                        // ??????,????x???,?????????????,??????   
                        context.translate(74*this.sealScale09 + this.fontBorder02, 0);
                        context.rotate(Math.PI / 2);// ??90?,?????x?   
                        context.fillText(ec, 0, 4.8);// ????????   
                        context.restore();
                    }
                    // ????????
                    // context.translate(width, height);
                    context.font = this.fontWeight05 + ' ' + this.fontSize05*this.sealScale09 + 'px ' + this.fontFamily05
                    var companys = this.input05
                    var counts = companys.length;// ??   
                    var angles = -4 * Math.PI / ((10-this.fontGap05*0.3) * (counts - 1));// ???? ----------11  0.4:0.05 [10.6:3.15]
                    var charss = companys.split("");
                    var cs;
                    for (var i = 0; i < counts; i++) {
                    	cs = charss[i];// ???????
                        if (i == 0){
                            context.rotate(-2 * Math.PI / 10);
                            context.rotate(-angles * (counts - 1) / 2);
                            context.rotate((2.9 + this.fontRotate05*0.05) * Math.PI / 6); // -------------------------3.1  0.4:0.05
                        }else{
                            // console.log('angles',angles)
                            context.rotate(angles);
                        }  
                        context.save();
                        context.translate(64*this.sealScale09 + this.fontBorder05, 0);// ??????,????x???   
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