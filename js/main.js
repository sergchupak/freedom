// загружаем открытые позиции
function get_pos_html(obj){
    var list_li_html = "";
    obj.forEach(function(item, index, array) {
        if(item.i.indexOf('BLOCKED') + 1 || item.i.indexOf('_FWD') + 1) {

        }
        else{
            var vhod = parseFloat(item.bal_price_a);
            var mkt = parseFloat(item.mkt_price);
            var amount = parseFloat(item.q);
            var money = mkt*amount-vhod*amount;
            var normal_ticker = item.i.replace('.US','');

            list_li_html += '<li class="list-group-item '+normal_ticker+'"">';
            list_li_html += '<button type="button" class="btn btn-outline-danger p_n ticker" >'+item.i+'</button>';
            list_li_html += '<button type="button" class="btn btn-outline-info p_n">Amount:<span class="amount_'+normal_ticker+'">'+amount+'</span></button>';
            list_li_html += '<button type="button" class="btn btn-outline-info p_n">Start price: <span class="vhod_'+normal_ticker+'">'+vhod+'</span>$</button>';
            list_li_html += '<button type="button" class="btn btn-outline-info p_n">Current price:<span class="mkt_'+normal_ticker+'">'+mkt+'</span>$</button>';
            list_li_html += '<button type="button" class="btn btn-outline-success p_n">Result:<span class="result_span result_'+normal_ticker+'">'+parseInt(money)+'</span>$</button>';
            list_li_html += '</li>';
        }

    });
    return list_li_html;

}
$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url: 'phpajax/get_positions.php',
        success: function (data) {
            var obj = JSON.parse(data);
            $('#positions_list').html(' ');
            $('#positions_list').append('<ul class="list-group"><li class="list-group-item">'+get_pos_html(obj)+'</li></ul>');

        },
    });
// обновляем позиции
    $( ".update_positions_link" ).bind( "click", function() {
        $.ajax({
            type: "GET",
            url: 'phpajax/get_positions.php',
            success: function (data) {
                var obj = JSON.parse(data);

                $('#positions_list').html(' ');
                $('#positions_list').append('<ul class="list-group">'+get_pos_html(obj)+'</ul>');

            },
        });

    });



});