<html>
    <head>
        <title>Money 2020</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="">
        <meta id="Viewport" name="viewport" content="width=375, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="index.css" type="text/css" charset="utf-8"/>
    </head>
    <body>
        <script src="js/jquery.js"></script>
        <script src="https://cdn.firebase.com/js/client/1.1.3/firebase.js"></script>
        <script src="js/logic.js"></script>
        <div id="container">
        <section id="waitonbitcoin">
            <div class="container">
                <h3>Waiting on bitcoins...</h3>
                <h3>Send to this address:</h3>
        <? include('config.php');?>
        <?
        $secret = $CONFIG['secret'];
        $name = $_GET['id'];

        $my_address = '1FPS1KvnTeTzMsekAFBCNy2TsgEfckgK3x';

        $my_callback_url = 'http://cuckoohash.com/received.php?secret='.$secret.'&name='.$name;

        $root_url = 'https://blockchain.info/api/receive';

        $parameters = 'method=create&address=' . $my_address .'&callback='. urlencode($my_callback_url);

        $response = file_get_contents($root_url . '?' . $parameters);

        $object = json_decode($response);


        // testing stuff below to auto allow bitcoin
        $ch = curl_init();
        $url='http://cuckoohash.com/received.php?secret='.$secret.'&test=false&value=100000&name='.$name;
        // set URL and other appropriate options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        //curl_exec($ch);
        ?>
            </div>
            <img style="padding:20px" src="https://api.qrserver.com/v1/create-qr-code/?data=<? echo $object->input_address ?>&amp;size=100x100" alt="" title="" />
            <div id="bitcoinaddr" style="font-size:20px">
            <? echo $object->input_address ?>
            </div>
        </section>
        </div>

        <script>


        var fb = new Firebase("https://moneymoney.firebaseio.com/urls/<? echo $_GET['id']?>/coins");
        fb.on('value',function(data){
            if(data.val()!=null){
                window.location="index.php?id=<?echo $_GET['id']?>";
            }
        });
        </script>
    </body>
</html>
