<?php
require ('../lib/main_functions.php');
if(isset($_GET['ticker'])){
    $result = array();
    $url = 'https://www.tipranks.com/api/stocks/getData/?name='.strtolower($_GET['ticker']).'&benchmark=1&period=3&break='.time();
    $data = json_decode(get_web_page($url));
    $result['rating'] = $data->tipranksStockScore->score;
    $result['analyst'] = $data->portfolioHoldingData->analystConsensus->consensus;
    $result['hedgeFund'] = $data->portfolioHoldingData->hedgeFundSentimentData->score;
    $result['insider'] = $data->insidrConfidenceSignal->stockScore - $data->insidrConfidenceSignal->sectorScore;
    $result['blogger'] = $data->portfolioHoldingData->bloggerSentimentData->rating;
    $result['news'] = $data->portfolioHoldingData->newsSentiment;
    echo json_encode($result);
}
?>