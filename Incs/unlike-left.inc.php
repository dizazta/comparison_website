<?php
require("sessionStart.inc.php");
require "core.inc.php";
require "connect.inc.php";

if(isset($_POST["category"]) && isset($_POST["url"])){
	$comparison_category = $_POST["category"];
	$comparison_url = $_POST["url"];
	if(loggedin()){
		$query = "UPDATE `likes` SET `left`='0', `right`='0' WHERE 
		`category`='".$comparison_category."' AND 
		`username`='".$_SESSION['user_username']."' AND
		`pageURL`='".$comparison_url."'";
		mysql_query($query);
		$query = "UPDATE `compare` SET 
		`choice1_likes`=`choice1_likes`-1, `choice1_likes_users`=`choice1_likes_users`-1
		WHERE `pageURL`='".$comparison_url."' AND `category`='".$comparison_category."'";
		mysql_query($query);
	} else {
		$query = "UPDATE `compare` SET 
		`choice1_likes`=`choice1_likes`-1, `choice1_likes_public`=`choice1_likes_public`-1
		WHERE `pageURL`='".$comparison_url."' AND `category`='".$comparison_category."'";
		mysql_query($query);
		$_SESSION[$comparison_category."_".$comparison_url.'_left']='0';
	}
}
?>