<script src="js/jquery.js"></script>
<script src="https://cdn.firebase.com/js/client/1.1.3/firebase.js"></script>
<script src="js/logic.js"></script>
<script>
var loc = "<?
include('config.php');
$secret = $CONFIG['secret'];
$name = $_GET['name'];

$my_address = '1FPS1KvnTeTzMsekAFBCNy2TsgEfckgK3x';

$my_callback_url = 'http://cuckoohash.com/receivebtc?secret='.$secret.'&name='.$name;

$root_url = 'https://blockchain.info/api/receive';

$parameters = 'method=create&address=' . $my_address .'&callback='. urlencode($my_callback_url);

$response = file_get_contents($root_url . '?' . $parameters);

$object = json_decode($response);

echo $object->input_address; ?>"
    createUser("<? echo $_GET['name']?>",loc);
</script>
