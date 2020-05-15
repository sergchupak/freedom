// загружаем открытые позиции
function get_pos_html(obj){
    var list_li_html = "";
    list_li_html += '<table class="table">';
    list_li_html += '<thead class="thead-dark">';
    list_li_html += '<tr>';
    list_li_html += '<th scope="col">Ticker</th>';
    list_li_html += '<th scope="col">Amount</th>';
    list_li_html += '<th scope="col">Start price</th>';
    list_li_html += '<th scope="col">Current price</th>';
    list_li_html += '<th scope="col">Result</th>';
    list_li_html += '</tr>';
    list_li_html += '</thead>';
    list_li_html += '<tbody>';
    var total_result = 0;
        obj.forEach(function(item, index, array) {
            var vhod = parseFloat(item.bal_price_a);
            var mkt = parseFloat(item.mkt_price);
            var amount = parseFloat(item.q);
            var money = mkt*amount-vhod*amount;
            var normal_ticker = item.i.replace('.US','');
            total_result = total_result+parseInt(money);
                    if(amount>0)
                        list_li_html += '<tr class="table-success '+normal_ticker+'">';
                    else
                        list_li_html += '<tr class="table-warning '+normal_ticker+'">';
                            list_li_html += '<th scope="row">'+item.i+'</th>';
                            list_li_html += '<td><span class="amount_'+normal_ticker+'">'+amount+'</span> ('+parseInt(mkt*amount)+')$</td>';
                            list_li_html += '<td><span class="vhod_'+normal_ticker+'">'+vhod+'</span>$</td>';
                            list_li_html += '<td><span class="mkt_'+normal_ticker+'">'+mkt+'</td>';
                            list_li_html += '<td><span class="result_span result_'+normal_ticker+'">'+parseInt(money)+'</span>$</td>';
                        list_li_html += '</tr>';




        });

    list_li_html += '</tbody>';
    list_li_html += '</table>';
    list_li_html += '<div class="total_result">'+total_result+'$</div>';
    return list_li_html;

}
$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url: 'phpajax/get_positions.php',
        success: function (data) {
            var obj = JSON.parse(data);
            $('#positions_list').html(' ');
            obj.forEach(function(item, index, array) {
                $('#positions_list').append(get_pos_html(item));
            });



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
                obj.forEach(function(item, index, array) {
                    $('#positions_list').append(get_pos_html(item));
                });

            },
        });

    });



});