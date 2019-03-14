<?php

 function force_utf8_safe($str) {
    $res = mb_convert_encoding($str, "UTF-8", "UTF-8" ); // replace invalid characters with ?
    $res = preg_replace('/\p{Cc}+/u', '?', $res); // replace control characters with ?
    return $res;
}

function prepare_output($items) {
    $res = [];
    foreach ($items as $key => $value) {
        // Make UTF-8 safe results.
        $safe_value = force_utf8_safe($value);
        if ($value != $safe_value) {
            $key .= ' (Invalid characters replaced with ?)';
            $value = $safe_value;
        }
        $res[$key] = $value;
    }
    return $res;
}



if (!isset($query)) {
    $query = $argv[1];
}



$res ['urlencode'] = urlencode($query);
$res ['urldecode'] = urldecode($query);
$res ['base64_encode'] = base64_encode($query);
$res ['base64_decode'] = base64_decode($query);
$res ['md5'] = md5($query);
$res["HTML Encoded"] = htmlentities($query, ENT_QUOTES, 'UTF-8');
$res["unicode"] = preg_replace('/\["(.*)"\]/', '$1', json_encode([$query]));




$items = [];
$res = prepare_output($res);
foreach ($res as $name=>$value) {
    if(empty($value) || $value == $query) continue;
    $items [] = [
        'title' => $value,
        'subtitle' => (strstr($name,'encode')?'编码 ':(strstr($name,'decode')?'解码 ':'')).$name,
        'arg' => $value,
        'icon'=>['path'=>strstr($name,'Invalid characters replaced with ?')?'question.ico':'icon.png'],
    ];
}
echo json_encode(['items'=>$items]);
die;