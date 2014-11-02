<?
$url = "http://blockchain.info/latestblock";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
//curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$json = curl_exec($ch);
$json_out = json_decode($json);
echo $json_out->hash;
echo "\r\n";
$hash = $json_out->hash;
$strlen = strlen( $hash );
echo $hash;
for( $i = 0; $i <= $strlen; $i++ ) {
    $char = substr( $hash, $i, 1 );
    $num += ord($char);
}
echo $num;
$url = "https://moneymoney.firebaseio.com/games.json";
$data = '{"'.$num.'": {"seed":"'.$num.'","pot":0,"over":false},"currblock":"'.$num.'"}';
curl_close($ch);
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'PATCH');
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
curl_exec($ch);
?>
