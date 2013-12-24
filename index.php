<?php

$dbhost='localhost:3306';
$dbuser='game';
$dbpw='game';

$connection=mysql_pconnect($dbhost,$dbuser,$dbpw);

if($connection){
    echo 'success connect to database';
}else{
    die('Could not connect: ' . mysql_error());
}

$insert='insert into game.user (name,password) values ("cfool","cfool")';
#$result=mysql_query($insert, $connection);
#echo $result;
?>
