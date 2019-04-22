var vue = new Vue(
{
    el: "#zf-timeline",
    data:
    {
        Timelines:
        {
            '小张':
            {
                timeline:
                [
                    {
                        type: "love",
                        time: "2015-12-12",
                        partners: ["小张", "小丽"],
                        desc: "在一起了"
                    },
                    {
                        type: "normal",
                        time: "2016-4-9",
                        partners: ["小张"],
                        desc: "考上了浙江大学研究生，很开心！"
                    },
                    {
                        type: "normal",
                        time: "2016-5-1",
                        partners: ["小张", "小丽"],
                        desc: "第一次一起去旅行，武汉的景点也太多了"
                    }
                ],
                timeDistances:
                [0, 0, 0, 0]
            }
        },
        currentPerson: '小张',
        PersonData:
        {
            imags:
            {
                "小张": "./imgs/img1.jpg",
                "小丽": "./imgs/img2.jpg"
            }
        },
        PageData:
        {
            modal:{
                show: false,
                inputAddresses: "",
                inputDesc: ""
            }
        }
    },
    methods:
    {
        GenerateTimeDistance: function()
        {
            let distances = []
            var timeline =  this.Timelines[this.currentPerson].timeline
            for(var i = 1; i < timeline.length; i++)
            {
                distances.push( (new Date(timeline[i].time) - new Date(timeline[i - 1].time)) / (5 * 24*3600*1000) )
            }
            distances.push(0);
            this.Timelines[this.currentPerson].timeDistances = distances
        },
        PostActivity: function(event)
        {
            let partners = this.PageData.modal.inputAddresses.split(' ')
            if(this.PageData.modal.inputAddresses =="")
            {
                partners = []
            }
            if(!partners.includes(this.currentPerson))
            {
                partners.push(this.currentPerson)
            }
            this.Timelines[this.currentPerson].timeline.push({
                type: "normal", 
                time: "2019-4-21", 
                partners: partners,
                desc: this.PageData.modal.inputDesc})
            $('#post-modal').modal('hide')
        }
    }
})
vue.GenerateTimeDistance()

function getTable(){
    Vue.Timelines['小张'].timeline = [];
    var gender_s = ["男","女","女","男","男","女"];
    var date_s = ["2017年12月24日", "2018年2月14日", "2018年4月3日", "2018年6月26日", "2019年1月1日", "2019年4月21日"];
    gxc.getTableObjects('democdh2', 'packet', 0, 100).then(trx => {
        // output(`call contract success`, trx)
        var event_s = new Array();
        for (var i=4;i<10;i++){
            // event_s[i-4] = trx[i].words[0];
            Vue.Timelines['小张'].timeline.push({
                type: "love",
                time: date_s[i-4],
                partners: ["小张", "小丽"],
                desc: trx[i].words[i]
            })
        }
        alert(events)
        // var jsonObject = { genders: gender_s, dates: date_s, events: event_s };
        
    }).catch(error => {
        output(error)
    })
}

function sendData(){
    alert(document.getElementById("text1").value);
    pubk = 'GXC6V3yCJ5adMfBd6fmdLBGRwdGaaGBM8WcoRY1x5GFLV4fZDXpzo';
    gxc.callContract.apply(gxc, ['democdh2', 'send', {pubkey:pubk, words:'test words'}, 0, true]).then(trx => {
        alert(`call contract success`, trx)
    }).catch(error => {
        alert(error)
    })
}