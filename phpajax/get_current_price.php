<?php
if($_GET['pos']){
    $url = "https://cloud.iexapis.com/stable/tops?token=pk_6e3949820f2045368e07dfbd20724842&symbols=".$_GET['pos'];
    echo file_get_contents($url);
}