<? 
include('config.php');
$secret = $CONFIG['secret'];
$id = $_GET['name'];
if($_GET['secret']!=$secret){
    //don't accept
//    echo "false"
}

$invoice_id = $_GET['invoice_id']; //invoice_id is passed back to the callback URL
$transaction_hash = $_GET['transaction_hash'];
$input_transaction_hash = $_GET['input_transaction_hash'];
$input_address = $_GET['input_address'];
$value_in_satoshi = $_GET['value'];
$value_in_btc = $value_in_satoshi / 100000000;

if ($_GET['test'] == true) {
//    return;
}
$url = "https://moneymoney.firebaseio.com/urls/".$id.".json";
$data = '{"coins": "'.$value_in_satoshi.'"}';
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'PATCH');
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
curl_exec($ch);
echo '*ok*';
?>
