<?php
require('../lib/PublicApiClient.php');
require('../config/config.php');
use Nt\PublicApiClient;
$version = Nt\PublicApiClient::V2;

$publicApiClient = new PublicApiClient($apiKey, $apiSecretKey, $version);
$result = $publicApiClient->sendRequest('getPositionJson', []);
$result = json_decode ($result);

echo json_encode($result->result->ps->pos);

?>
