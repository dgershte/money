<? 
include('config.php');
$secret = $CONFIG['secret'];
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

//Commented out for testing
if ($_GET['test'] == true) {
//    return;
}
//echo $value_in_btc;
/*
<script src="https://cdn.firebase.com/js/client/1.1.3/firebase.js"></script>
<script>
var btc_earned = 
var userid = "<? echo $_GET['name']?>";
var pass = "<? echo $_GET['secret']?>";
var fb = new Firebase("https://moneymoney.firebaseio.com/urls/"+userid);
    fb.update({coins:btc_earned});
</script>
 */
echo '*ok*';
?>
