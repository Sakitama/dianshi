window.util = {
    callNative: e => {
        let aid = e.currentTarget.dataset.aid;
        let tvid = e.currentTarget.dataset.tvid;
        window.location.href = `iqiyi://mobile/player?aid='${aid}'&tvid='${tvid}'&ftype=27&to=3&url='${encodeURIComponent(window.location.href)}`;
        let viewHistory = window.localStorage.getItem('viewHistory');
        if (!viewHistory) {
            window.localStorage.setItem('viewHistory', window.JSON.stringify([{
                aid,
                data: e.currentTarget.dataset.video
            }]));
        } else {
            viewHistory = window.JSON.parse(viewHistory);
            viewHistory.push({
                aid,
                data: e.currentTarget.dataset.video
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