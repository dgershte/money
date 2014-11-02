<?
include('config.php');
$guid=$CONFIG['blockid'];
$firstpassword=$CONFIG['blockpass'];
$toaddr = $_GET['addr'];
$id = $_GET['id'];
$url = "https://moneymoney.firebaseio.com/urls/".$id.".json";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'GET');
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
$result = curl_exec($ch);
$r= json_decode($result);
$amount = $r->coins;
//$result->coins;

$json_url = "http://blockchain.info/merchant/$guid/payment?password=$firstpassword&to=$toaddr&amount=$amount";

$json_data = file_get_contents($json_url);

$json_feed = json_decode($json_data);

$message = $json_feed->message;

$txid = $json_feed->tx_hash;
//
echo $txid;
$url = "https://moneymoney.firebaseio.com/urls/".$id.".json";
$data = '{"coins": 0}';
curl_close($ch);
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'PATCH');
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
curl_exec($ch);

?>
