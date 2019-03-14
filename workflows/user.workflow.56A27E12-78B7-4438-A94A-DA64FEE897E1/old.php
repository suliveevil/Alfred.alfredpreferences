<?php

// Begin with the query.
$query = $argv[1];
//var_dump($query);die;


$res [] = [
    'value' => strval(@urlencode($query)),
    'name' => 'urlencode()',
];

$res [] = [
    'value' => strval(@urldecode($query)),
    'name' => 'urldecode()',
];

$res [] = [
    'value' => strval(@base64_encode($query)),
    'name' => 'base64_encode()',
];
$res [] = [
    'value' => strval(@base64_decode($query)),
    'name' => 'base64_decode()',
];

$res [] = [
    'value' => strval(@md5($query)),
    'name' => 'md5()',
];
 
$items = [];

foreach ($res as $item) {
    $items [] = [
        'title' => $item['value'],
        'subtitle' => $item['name'].(strstr($item['name'],'encode')?'编码':(strstr($item['name'],'decode')?'解码':'')),
        'arg' => $item['value'],
    ];
}


echo json_encode(['items'=>$items]);