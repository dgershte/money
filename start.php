<html>
    <head>
        <title>Money20/20</title>
    
        <link rel="stylesheet" href="index.css" type="text/css" charset="utf-8"/>
    </head>
    <body>
        <div id="container"> 
        <section id="screen1">
            <div class="container">
            <input placeholder="enter user name" id="namebox" style="margin-top: 70px;"></input>
            <div onclick="createUser()" id="createuserbtn" class="btn">Create New User</div>
            </div>
            <img src="images/dog.png" style="position: absolute;bottom: 9px;width: 100px;left: 269px;"/>
        </section>
        </div>
        <script src="js/jquery.js"></script>
        <script src="https://cdn.firebase.com/js/client/1.1.3/firebase.js"></script>
        <script src="js/logic.js"></script>
        <script>
            function createUser(){

        var randomString="<?
        function generateRandomString($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
            }
            return $randomString;
        }
        echo generateRandomString(15);
        ?>";
                var name = $("#namebox").val();
                var root = new Firebase('https://moneymoney.firebaseio.com/urls/'+randomString);
                root.set({name:name});
                window.location="play.php?id="+randomString;
            }
        </script>
    </body>
</html>
