<?php
require('../lib/PublicApiClient.php');
use Nt\PublicApiClient;

$apiKey = "409d666bdc6e415de0f309902e7628b2";
$apiSecretKey = "7d831d32c93bcb35b30b378d8dbf4f5256cdb43f";
$version = Nt\PublicApiClient::V2;

$publicApiClient = new PublicApiClient($apiKey, $apiSecretKey, $version);
$result = $publicApiClient->sendRequest('getPositionJson', []);
$result = json_decode ($result);

echo json_encode($result->result->ps->pos);

?>
