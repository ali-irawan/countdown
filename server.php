<?php
	// harus diganti dengan data dari database
	$data[1] = (object)[ 
                     "name" => "Item 1", "end" => mktime(19,0,0,1,12,2015) 
		  ];
	$data[2] = (object)[ 
		     "name" => "Item 2", "end" => mktime(19,35,16,1,13,2015) 
                  ];		
	
	$now = time();
	

	if(isset($_GET["id"])){
		$item = $data[$_GET['id']];
		$item->expired = $item->end - $now;
		$item->id = $_GET['id'];
		echo json_encode($item);		
		return;
	}


	foreach($data as $item){
		$item->expired = $item->end - $now;
	}
	echo json_encode($data);
?>
