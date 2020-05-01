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
                var result_price = start_price-current_price;
            },
        });

    });
});