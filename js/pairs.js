function get_ticker_info(ticker){
    $.ajax({
        url: 'phpajax/get_tip_rank.php?ticker='+ticker,
        method: 'GET',
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            $('span.total_'+ticker).text(obj['rating']);
            $('span.news_'+ticker).text(obj['news']);
            $('span.hedge_'+ticker).text(obj['hedgeFund']);
            $('span.bloggers_'+ticker).text(obj['blogger']);
            $('span.analysts_'+ticker).text(obj['analyst']);
            $('span.insiders_'+ticker).text(obj['insider']);
        },
        error: function (err) {

        }

    });
}

function build_table(responseText){
    var obj = jQuery.parseJSON(responseText);
    var list_li_html = "";
    list_li_html += '<table class="table">';
    list_li_html += '<thead class="thead-dark">';
    list_li_html += '<tr>';
    list_li_html += '<th scope="col">Pair Ticker</th>';
    list_li_html += '<th scope="col">Total</th>';
    list_li_html += '<th scope="col">News</th>';
    list_li_html += '<th scope="col">Hedge fund</th>';
    list_li_html += '<th scope="col">Bloggers</th>';
    list_li_html += '<th scope="col">Analyst</th>';
    list_li_html += '<th scope="col">Insiders</th>';
    list_li_html += '</tr>';
    list_li_html += '</thead>';
    list_li_html += '<tbody>';

    obj.forEach(function(item, index, array) {


        var re = /\s*:\s*/;
        var ticker_list = item.split(re);

        list_li_html += '<tr class="">';
        list_li_html += '<td>';
        list_li_html += '<b><a href="https://www.tipranks.com/stocks/'+ticker_list[0]+'/stock-analysis" target="_blank">'+ticker_list[0]+'</a></b>/';
        list_li_html += '<b><a href="https://www.tipranks.com/stocks/'+ticker_list[1]+'/stock-analysis" target="_blank">'+ticker_list[1]+'</b></a>';
        list_li_html += '</td>';
        list_li_html += '<td><span class="total total_'+ticker_list[0]+'">0</span>/<span class="total total_'+ticker_list[1]+'">0</span></td>';
        list_li_html += '<td><span class="news news_'+ticker_list[0]+'">0</span>/<span class="news news_'+ticker_list[1]+'">0</span></td>';
        list_li_html += '<td><span class="hedge hedge_'+ticker_list[0]+'">0</span>/<span class="hedge hedge_'+ticker_list[1]+'">0</span></td>';
        list_li_html += '<td><span class="bloggers bloggers_'+ticker_list[0]+'">0</span>/<span class="bloggers bloggers_'+ticker_list[1]+'">0</span></td>';
        list_li_html += '<td><span class="analysts analysts_'+ticker_list[0]+'">0</span>/<span class="analysts analysts_'+ticker_list[1]+'">0</span></td>';
        list_li_html += '<td><span class="insiders insiders_'+ticker_list[0]+'">0</span>/<span class="insiders insiders_'+ticker_list[1]+'">0</span></td>';
        list_li_html += '</tr>';
    });

    list_li_html += '</tbody>';
    list_li_html += '</table>';
    $('#pairs_list').html(list_li_html);
    obj.forEach(function(item, index, array) {
        var re = /\s*:\s*/;
        var ticker_list = item.split(re);
        get_ticker_info(ticker_list[0]);
        get_ticker_info(ticker_list[1]);
    });
}

$( document ).ready(function() {
    $.ajax({
        url: 'phpajax/get_pairs.php',
        method: 'GET',
        success: function (data) {
            build_table(data);
        },
        error: function (err) {

        }

    });


});