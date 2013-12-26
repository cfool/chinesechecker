<?php
    
    $pre = $_POST['pre']; 
    $cur = $_POST['cur']; 
    
    $state=0;
    $massage="ok";
    $url = $_SERVER['REQUEST_URI'];

    $result = array(
        "state" => $state,
        "message" => $massage,
        "comeurl" => $url
    );

    echo json_encode($result);

?>
