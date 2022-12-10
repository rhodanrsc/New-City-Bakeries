// function shape() {
var roundCheck = document.getElementById('round_cake');
var sheetCheck = document.getElementById('sheet_cake');

roundCheck.addEventListener('click', roundSpecs);
sheetCheck.addEventListener('click', sheetSpecs);

function roundSpecs() {
    document.getElementById('specs').innerHTML = "";
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "./round.html", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var Element = ajax.responseText;
            document.getElementById('specs').innerHTML = Element;
        }
    };
    ajax.send();
} 

function sheetSpecs() {
    document.getElementById('specs').innerHTML = "";
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "./sheet.html", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var Element = ajax.responseText;
            document.getElementById('specs').innerHTML = Element;
        }
    };
    ajax.send();
}

function order() {
    var firstName = document.getElementById('cust_first_name').value;
    var lastName = document.getElementById('cust_last_name').value;
    var address = document.getElementById('cust_address').value;
    var postCode = document.getElementById('cust_post_code').value;
    var phone = document.getElementById('cust_phone').value;
    var email = document.getElementById('cust_email').value;

    var sheet = document.getElementById('sheet_cake');
    var round = document.getElementById('round_cake');

    var layers = document.getElementById('layers').value;

    var creamCheese = document.getElementById('cream_cheese');
    var frtAlmonds = document.getElementById('frt_almonds');
    var frtJam = document.getElementById('frt_jam');

    var layerCost = 1;

    if (layers == 2) {
        layerCost = 1.5;
    } else if (layers == 3) {
        layerCost = 2;
    } else {
        layerCost = 1;
    }  

    var total = 0;

    var invoice = "<br><h2>Reciept</h2>";
    invoice += "<div>";
    invoice += firstName + " " + lastName + "<br>";
    invoice += address + "<br>";
    invoice += postCode + "<br>";
    invoice += phone + "<br>"; 
    invoice += email + "<br>";
    invoice += "<h3>Your Order:</h3>";
    invoice += "<ul>";
    if (sheet.checked) {
        var width = document.getElementById('width_in').value;
        var length = document.getElementById('length_in').value;
        var areaSquare = length * width;
        var sheetCost = (18 + ((areaSquare - (900))) * 0.02) * layerCost;
        invoice += "<li>Sheet cake " + areaSquare + "cm with " + layers + " layers</li>" + "<p>$" + sheetCost.toFixed(2) + "</p>";
        total += sheetCost;
    } else if (round.checked) {
        var radius = document.getElementById('radius_in').value;
        var areaCircle = (radius * radius) * 3.14;
        var roundCost = (15 + ((areaCircle - ((225)) * 3.14)) * 0.02) * layerCost;
        invoice += "<li>Round cake " + areaCircle + "cm with " + layers + " layers</li>" + "<p>$" + roundCost.toFixed(2) + "</p>";
        total += roundCost;
    }
    if (creamCheese.checked) {
        invoice += "<li>Cream Cheese Icing</li><p>$5</p>";
        total += 5;
    }
    if (frtAlmonds.checked) {
        invoice += "<li>Fruit and Almonds Topping</li><p>$7</p>";
        total += 7;
    }
    if (frtJam.checked) {
        invoice += "<li>Fruit Jam Filling Between Layers</li><p>$4</p>";
        total += 4;
    }
    invoice += "<li>Total:</li><p>$" + total.toFixed(2) + "<p>";
    invoice += "</div>";

    if (address != "") {
        document.getElementById('invoice').innerHTML = invoice;
    } 
}