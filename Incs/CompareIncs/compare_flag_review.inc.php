<?php
require('../sessionStart.inc.php');
require('../connect.inc.php');
require('../core.inc.php');
if((isset($_POST['review_id']) && !empty($_POST['review_id'])) && (isset($_POST['category']) && !empty($_POST['category']))
&& (isset($_POST['pageUrl']) && !empty($_POST['pageUrl']))){
	$review_id = $_POST['review_id'];
	$category = $_POST['category'];
	$pageUrl = $_POST['pageUrl'];
	$query = "SELECT * FROM `likes_reviews` WHERE 
	`category`='".$category."' AND 
	`user`='".$_SESSION['user_username']."' AND
	`pageUrl`='".$pageUrl."' AND
	`review_id`='".$review_id."'";
	$query_run = mysql_query($query);
	$mysql_num_rows = mysql_num_rows($query_run);
	if($mysql_num_rows>=1){
		$query_2 = "UPDATE `likes_reviews` SET `flag`='1' WHERE 
			`category`='".$category."' AND 
			`user`='".$_SESSION['user_username']."' AND
			`pageUrl`='".$pageUrl."' AND
			`review_id`='".$review_id."'";
		mysql_query($query_2);
	} else {
		$query = "INSERT INTO `likes_reviews`
		(`category`, `user`, `like`, `dislike`, `flag`, `pageUrl`, `review_id`,`time`) VALUES (
		'".$category."',
		'".$_SESSION['user_username']."',
		'0',
		'0',
		'1',
		'".$pageUrl."',
		'".$review_id."',
		'".time()."'
		)";
		mysql_query($query);
	}
	$query = "UPDATE `reviews` SET `flags`=`flags`+1 WHERE `id`='".$review_id."' AND `category`='".$category."' AND `pageURL`='".$pageUrl."'";
	mysql_query($query);
}
?>