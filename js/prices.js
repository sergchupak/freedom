$( document ).ready(function() {
    $( "#positions_list" ).on( "click",'button.ticker', function() {
        var freedom_ticker = $( this ).text();
        var normal_ticker = $( this ).text().replace('.US','');
        $.ajax({
            type: "GET",
            url: 'phpajax/get_current_price.php?pos='+normal_ticker,
            success: function (data) {
                var ans = JSON.parse(data);
                //alert(ans[0].lastSalePrice);
                var current_price = parseFloat(ans[0].lastSalePrice)
                $( "#positions_list li.list-group-item button span.mkt_"+normal_ticker).text(ans[0].lastSalePrice);
                var start_price = parseFloat($( "#positions_list li.list-group-item button span.vhod_"+normal_ticker).text());
                var amount =  parseInt($( "#positions_list li.list-group-item button span.amount_"+normal_ticker).text());
                if(amount>0)
                    var result_price = parseInt(Math.abs(amount)*current_price-Math.abs(amount)*start_price);
                else
                    var result_price = parseInt(Math.abs(amount)*start_price-Math.abs(amount)*current_price);
                $( "#positions_list li.list-group-item button span.result_"+normal_ticker).text(result_price);
            },
        });

    });
});

function click_emulation() {
    $("ul.list-group button.ticker:eq(0)").click();
    $("ul.list-group button.ticker:eq(1)").click();
}

//setTimeout(click_emulation, 1000);
let timerId = setInterval(() => click_emulation(), 2500);