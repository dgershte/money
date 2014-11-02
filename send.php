<?
include('config.php');
$guid=$CONFIG['blockid'];
$firstpassword=$CONFIG['blockpass'];
$amount = $_GET['value'];
$toaddr = $_GET['toaddr'];
$recipients = urlencode('{
                      "'.$toaddr.'": '.$amount.'
                                                           }');

$json_url = "http://blockchain.info/merchant/$guid/payment?password=$firstpassword&recipients=$recipients";

$json_data = file_get_contents($json_url);

$json_feed = json_decode($json_data);

$message = $json_feed->message;
$txid = $json_feed->tx_hash;

?>
