$( document ).ready(function() {

    $.ajax({
        type: "GET",
        url: 'phpajax/get_positions.php',
        success: function (data) {
            var obj = JSON.parse(data);
            var list_li_html = "";




            obj.forEach(function(item, index, array) {
                if(item.i.indexOf('BLOCKED') + 1 || item.i.indexOf('_FWD') + 1) {

                }
                else{
                    var vhod = parseFloat(item.bal_price_a);
                    var mkt = parseFloat(item.mkt_price);
                    var amount = parseFloat(item.q);
                    var money = mkt*amount-vhod*amount;

                    list_li_html += '<li class="list-group-item">';
                    list_li_html += '<button type="button" class="btn btn-outline-danger p_n" >'+item.i+'</button>';
                    list_li_html += '<button type="button" class="btn btn-outline-info p_n">Amount:'+amount+'st</button>';
                    list_li_html += '<button type="button" class="btn btn-outline-info p_n">Start price:'+vhod+'$</button>';
                    list_li_html += '<button type="button" class="btn btn-outline-info p_n">Current price:'+mkt+'$</button>';
                    list_li_html += '<button type="button" class="btn btn-outline-success p_n">Result:'+parseInt(money)+'$</button>';
                    list_li_html += '</li>';
                }

            });
            $('#positions_list').html('<ul class="list-group"><li class="list-group-item">'+list_li_html+'</li></ul>');

        },
    });

    $( ".update_positions_link" ).bind( "click", function() {
        $.ajax({
            type: "GET",
            url: 'phpajax/get_positions.php',
            success: function (data) {
                var obj = JSON.parse(data);
                var list_li_html = "";




                obj.forEach(function(item, index, array) {
                    if(item.i.indexOf('BLOCKED') + 1 || item.i.indexOf('_FWD') + 1) {

                    }
                    else{
                        var vhod = parseFloat(item.bal_price_a);
                        var mkt = parseFloat(item.mkt_price);
                        var amount = parseFloat(item.q);
                        var money = mkt*amount-vhod*amount;

                        list_li_html += '<li class="list-group-item">';
                            list_li_html += '<button type="button" class="btn btn-outline-danger p_n" >'+item.i+'</button>';
                            list_li_html += '<button type="button" class="btn btn-outline-info p_n">Amount:'+amount+'st</button>';
                            list_li_html += '<button type="button" class="btn btn-outline-info p_n">Start price:'+vhod+'$</button>';
                            list_li_html += '<button type="button" class="btn btn-outline-info p_n">Current price:'+mkt+'$</button>';
                            list_li_html += '<button type="button" class="btn btn-outline-success p_n">Result:'+parseInt(money)+'$</button>';
                        list_li_html += '</li>';
                    }

                });
                $('#positions_list').html('<ul class="list-group"><li class="list-group-item">'+list_li_html+'</li></ul>');

            },
        });
    });
});