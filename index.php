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
        <div id="container">
        <div id="bitcoinsheader">
            <img style="float:left;height: 25px;padding-top: 5px" src="images/bitcoin.png"/>
            <div id="bitcoins"></div>
        </div>
        <section id="highscore">
            <div class="btn" id="hsback">back</div>
            <div id="hstitle">HIGHSCORES</div>
            <ul id="hslist">
            </ul>
            <div class="btn" id="playagain">Replay <span class="smaller">0.005 BTC</span></div>
        </section>
        <section id="cashout">
            <div class="btn" id="cashoutback">back</div>
            <input id="enterbitcoin" placeholder="Enter Bitcoin Address"></input>
            <div class="btn" id="cashoutbtn2">Cash Out</div>
        </section>
        <section id="play">
            <img id="gametitle" src="images/logo.png"/></img>
            <a class="btn" id="playbtn">Play <span class="smaller">0.005 BTC</span></a>
            <a class="btn" id="cashoutbtn">Cash Out</a>
            <a class="btn" id="viewhsbtn">View Highscores</a>
            </section>
        <section id="game">
            <div id="score" class="yellowfont">2394</div>
            <canvas id="bg" width="667px" height="375"></canvas>
            <canvas id="overlay" width="667px" height="375"></canvas>
        </section>
        </div>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script src="https://cdn.firebase.com/js/client/1.1.3/firebase.js"></script>
    <script src="js/logic.js"></script>
    <script src="js/game.js"></script>
    <script>
        var userid = "<?echo $_GET['id'];?>";
    </script>
    <script type="text/javascript" src="index.js"></script>
    <script type='application/javascript' src='js/fastclick.js'></script>
    </body>
</html>

