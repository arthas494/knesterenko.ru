<?
$folder = $_GET['folder'];

$file_list = glob('./photo/'.$folder.'/*.[jJ][pP][gG]', GLOB_BRACE);

class Item{
	var $src;
	var $w;
	var $h;
}

$res = [];
$tmp;
foreach($file_list as $val){
	$tmp = new Item();
	$tmp->src = $val;
	$size = getimagesize($val);
	$tmp->w = $size[0];
	$tmp->h = $size[1];
	$res[] = $tmp;
}

echo json_encode($res);
?>