<?php
require('../lib/PublicApiClient.php');
require('../config/config.php');
use Nt\PublicApiClient;
$version = Nt\PublicApiClient::V2;

$publicApiClient = new PublicApiClient($apiKey, $apiSecretKey, $version);
$result = $publicApiClient->sendRequest('getPositionJson', []);
$result = json_decode ($result);
$return = array();


foreach($pairs as $pair){
    $tickers = explode(":",$pair);

    $par_array = array();
    foreach($result->result->ps->pos as $pos){
        //print_r($pos);
        $curr_ticker = str_replace(".US","",$pos->i);
        if($curr_ticker == $tickers[0]){
            //echo $curr_ticker. " == ".$tickers[0];
            $par_array[] = $pos;
            $i=0;
            foreach($result->result->ps->pos as $poss){
                $curr_tickerr = str_replace(".US","",$poss->i);
                if($curr_tickerr == $tickers[1]){
                    //unset($result->result->ps->pos[$i])
                    $par_array[] = $poss;
                }
            $i++;
            }
        }

    }
    if(sizeof($par_array)>0)
        $return[] = $par_array;
}


echo json_encode($return);

?>
