window.util = {
    callNative: e => {
        function getTime(format) {
            let o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        }
        let date = getTime.call(new Date(), 'yyyy-MM-dd hh:mm:ss');
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = `iqiyi://mobile/player?aid='${aid}'&tvid='${tvid}'&ftype=27&to=3&url='${encodeURIComponent(window.location.href)}`;
        let viewHistory = window.localStorage.getItem('viewHistory');
        if (!viewHistory) {
            window.localStorage.setItem('viewHistory', window.JSON.stringify([{
                aid,
                data: e.currentTarget.dataset.video,
                date
            }]));
        } else {
            viewHistory = window.JSON.parse(viewHistory);
            viewHistory.push({
                aid,
                data: e.currentTarget.dataset.video,
                date
            });
            function uniqueArray(arr) {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = i + 1; j < arr.length; j++) {
                        if (arr[i].aid === arr[j].aid) {
                            arr.splice(j, 1);
                        }
                    }
                }
                return arr;
            }

            viewHistory = uniqueArray(viewHistory);
            window.localStorage.setItem('viewHistory', window.JSON.stringify(viewHistory));
        }
    }
};