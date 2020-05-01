$( document ).ready(function() {
    $( ".update_projects_link" ).bind( "click", function() {
        $.ajax({
            type: "GET",
            url: 'phpajax/get_orders.php',
            success: function (data) {
                var obj = JSON.parse(data);
                var order_list_html;
                obj.forEach(function(item, index, array) {
                    if(item['profit']==0)
                        order_list_html += '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="opacity: 0.5 !important">';
                    else
                        order_list_html += '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="opacity: 1 !important">';
                    order_list_html += '<div class="toast-header">';
                    if(item['type']=="Buy")
                        order_list_html += '<svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#c3e6cb"></rect></svg>';
                    else
                        order_list_html += '<svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#ffeeba"></rect></svg>';
                    order_list_html += '<strong class="mr-auto">['+item['type']+']'+item['name']+'</strong>';
                    order_list_html += '<small>'+item['date']+'</small>';
                    order_list_html += '</div>';
                    order_list_html += '<div class="toast-body">';
                    if(item['profit']>0)
                        order_list_html += '<button type="button" class="btn btn-success">'+parseInt(item['profit'])+'$ ('+item['sum']+'$)</button>';
                    else
                        order_list_html += '<button type="button" class="btn btn-danger">'+parseInt(item['profit'])+'$ ('+item['sum']+'$)</button>';
                    order_list_html += '</div>';
                    order_list_html += '</div>';
                });
                $('#orders_list').html(order_list_html);

            },
        });

    });
});