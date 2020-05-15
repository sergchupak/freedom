function update_total_prices() {
    var pos_count = parseInt($('#positions_list .table').length);
    for (let i = 0; i < pos_count; i++) {

        var sum1 = parseInt($('#positions_list .table:eq(' + i + ') .result_span:eq(0)').text());
        var sum2 = parseInt($('#positions_list .table:eq(' + i + ') .result_span:eq(1)').text());
        var total = sum1 + sum2;
        //console.log(total);
        $('#positions_list .total_result:eq(' + i + ')').text(total + '$');
    }
}
function start_socket(sid){
    var WebSocketsURL = "https://ws.tradernet.ru";

    var SID = sid;
    var WebSocketsURL = "https://ws.tradernet.ru";
    WebSocketsURL += '/?SID=' + SID;
    var ws = io(WebSocketsURL, {
        extraHeaders: {
            'Сookie': 'SID=' + SID
        },
        xhrFields: {withCredentials:true}
    });


    var ws = io(WebSocketsURL, {
        xhrFields: {withCredentials:true}
    });
    var tickersToWatchChanges = ["AIV.US", "AVB.US", "SLG.US", "SPG.US", "CVX.US", "XOM.US","CXO.US", "NOV.US"];
    ws.on('q',
        /**
         * @param {{q: QuoteInfoAnswer[]}} data
         */
        function updateWatcher(data) {
            data.q.forEach(console.info.bind(console));

            data.q.forEach(function(item, index, array) {
                var normal_ticker = item.c.replace('.US','');
                if(item.hasOwnProperty('ltp')) {
                    var mkt = parseFloat(item.ltp);
                    var vhod = parseFloat($('#positions_list span.vhod_' + normal_ticker).text());
                    var amount = parseInt($('#positions_list span.amount_' + normal_ticker).text());
                    var money = parseInt(mkt * amount - vhod * amount);
                    $('#positions_list span.mkt_' + normal_ticker).text(item.ltp);
                    $('#positions_list span.result_' + normal_ticker).text(money);
                }

            });
        }
    );

    ws.emit("sup_updateSecurities2", tickersToWatchChanges);

}


$( document ).ready(function() {

    let timerId = setInterval(() => update_total_prices(), 2000);
    var login = 's.ergchupak@gmail.com';
    var pass = 'iOMYzsK280j0';
    var sid = getCookie('sid');
    if(sid!=""){
        start_socket(sid);
    }
    else {
        $.ajax({
            url: 'https://tradernet.ru/api/check-login-password',
            method: 'POST',
            data: {
                login: login,
                password: pass,
                rememberMe: 1
            },
            success: function (responseText) {
                var obj = jQuery.parseJSON(responseText);
                setCookie('sid', obj.SID, 1);
                start_socket(obj.SID);
            },
            error: function (err) {
                resultsDiv.text('Error: ' + err.statusText);
            }
        });
    }



});




