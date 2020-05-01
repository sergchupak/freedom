<?php
require('../lib/PublicApiClient.php');
require('../config/config.php');

use Nt\PublicApiClient;

$version = Nt\PublicApiClient::V2;

$publicApiClient = new PublicApiClient($apiKey, $apiSecretKey, $version);

$result = $publicApiClient->sendRequest('getOrdersHistory', ['from' => "2020-04-27T00:00:00", "till" => "2020-04-30T23:59:59"]);
$result = json_decode($result);
$orders_arr = array();
//прогоняем цыклом все ордера
foreach($result->result->orders->order as $order){
    $order_arr = array();
    $trade_stock_qty = 0;
    $trade_sum = 0;
    $trade_profit = 0;
    $type = '';
    $trade_num = 0;
    $status = "filled";
// суммируем данные по трейдам
    foreach ($order->trade as $trade) {
        $trade_stock_qty += $trade->q;
        $trade_sum += $trade->v;
        $trade_profit += $trade->profit;
        $trade_num++;
    }
    if ($trade_num == 0) {
        $status = "Not filled";
    }

    switch ($order->oper) {
        case 1:
            $type = "Buy";
            break;
        case 2:
            $type = "Buy on Margin";
            break;
        case 3:
            $type = "Sell";
            break;
        case 4:
            $type = "Sell Short";
            break;
    }


    $order_arr = array(
        'name' => $order->instr,
        'date' => $order->date,
        'type' => $type,
        'sum' => $trade_sum,
        'qty' => $trade_stock_qty,
        'profit' => $trade_profit,
        'trade_num' => $trade_num,
        'statu' => $status
    );
    $orders_arr[] = $order_arr;
}
echo json_encode($orders_arr);