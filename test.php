<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle?to=1575243390&symbol=AAPL&from=1552651390&resolution=D",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
        "x-rapidapi-host: finnhub-realtime-stock-price.p.rapidapi.com",
        "x-rapidapi-key: 7fafaf7418msh7f660c59e718c10p1acc7cjsn8223940c2cbc"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
    print_r(json_decode($response));
}