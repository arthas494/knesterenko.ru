<?php
//if(!isset($_POST["text"]))exit;
$mess=$_POST["text"]."\n\n\n".$_POST["email"];
$from=$_POST["name"];
$headers = //'From: knesterenko.ru' . "\r\n" .
    //'Reply-To: knesterenko.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
$res = mail('knesterenko92@gmail.com', $from, $mess, $headers);
$res = mail('arthas494@gmail.com', $from, $mess, $headers);
echo $res;
?>