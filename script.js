
/////Definierende Variablen
var m = 0;
var n = 0;
var max = 0;
var cell = [];
var cell1 = [];
var array = [];
var row = 0;
var maxanzahl = 0;
var Ende = false;

///////////////////Step1/////////////////////////////////
alert("Geben Sie bitte Ihr Name ein");
function Step1() {
    var Admin = document.getElementById('Name').value;
    var local = document.getElementById('Wo').value;
    var comment = document.getElementById("kommentar").value;
    if (Admin !== '') {
        if (Admin.length > 10) {
            alert("The name may have no more than 10 characters");
        } else {
            window.location.href = '/step2';
        }
    } else {
        alert("Geben Sie bitte Ihr Name ein");
    }
    setCookies("Local", local, 7);
    setCookies("Name", Admin, 7);
    setCookies("Kommentar", comment, 7);
}

///////////////Step2////////////////////////
var termin = 0;
var termine = [];
var full2 = [];

function Step2() {
    var Name = localStorage.getItem("Name");

//alert("Hallo " + Name);
//alert(termin);

    window.location.href = '/step3';

}

function mydatum() {
    for (z = 0; z <= termin; z++) {
        document.getElementById("showdatum").innerHTML = termine[z];
    }
}

function ADD() {
    console.log("SUCCESSFUL");
    var date = new Date(document.getElementById("date").value);
    var heute = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var y = date.getFullYear();
    var startZeit = document.getElementById("time").value;
    var stopZeit = document.getElementById("time2").value;
    if (date >= heute && stopZeit > startZeit && stopZeit !== "" && startZeit !== "") {
        let termin = dd + "-" + mm + "-" + y + "\t" + startZeit + "-" + stopZeit;
        let para = document.createElement("P");
        let terminNode = document.createTextNode(termin);
        para.appendChild(terminNode);
        document.getElementById("showdatum").appendChild(para);
        // console.log(termin);
        //window.localStorage.setItem("count",termin);
        /*full2[anzTermine] = dd + "-" + mm + "-" + y + '\br' + startZeit + "-" + stopZeit;
        var c = document.getElementById("showdatum").childNodes[anzTermine];

        //alert(termine);
        window.localStorage.setItem("fulltermin", termine);*/
    } else {
        alert("Bitte geben Sie güntige Datum ein");
    }
}

function Remove() {
    var j = termin;
    //alert(j);
    var select = document.getElementById('showdatum');
    select.removeChild(select.lastChild);
    j = j - 1;
    termin = j;
    //alert(termin);
}

function Step3_b() {

    if (document.getElementById('wa').checked || document.getElementById('ed').checked) {
        var Teilnehmer = "Simon";
        var Admin = localStorage.getItem("Name");
        Check = prompt('Geben Sie Name/Emailadresse ein', '');
        if (Check === Teilnehmer || Check === Admin) {
            alert("Willkommen " + Check + " !Sie können neue Wahl erstellen oder bearbeiten");
            window.location.href = "/step3";
        } else {

            alert('leider können kein Zutrittrecht');
            alert(Admin + Check);
            window.location.href = "/";
        }
    } else {
        alert("wählen Sie eine von der beiden Funktionen")
        window.location.href = "/step3_b";
    }
}

function Fertig() {
    var jn = document.getElementById("janein").checked;
    var ae = document.getElementById("einwahl").checked;
    var vi = document.getElementById("teil").checked;

    var hide = document.getElementById("hide").checked;
    alert("Link wird erstellt!");
    var Name = window.localStorage.getItem("Name");
    var fulltermin = window.localStorage.getItem("fulltermin");

    var dateline = document.getElementById("dateline").value;
    var timeline = document.getElementById("timeline").value;
    var kontakt = document.getElementById("Kontakt").value;
    var anzahl = document.getElementById("Anzahl").value;

    var date = new Date(dateline);
    var dd = date.getDate();
    var dm = date.getMonth() + 1;
    var dy = date.getFullYear();

    var deadline = dy + "-" + dm + "-" + dd + " " + timeline;
    //var deadline = dateline +" "+ timeline;
    //alert(deadline);
    //generieren aktuelle Datum

    var datum = new Date();
    var year = (datum.getFullYear());
    var day = (datum.getDate());
    var month = (datum.getMonth() + 1);
    var hour = (datum.getHours());
    var minute = (datum.getMinutes());
    var nowtime = day + "-" + month + "-" + year + " " + hour + ":" + minute;
    setCookies("Currenttime", nowtime);
    var str = "_" + Name + "_" + year + "_" + month + "_" + day + "_" + hour + "_" + minute + "_";
    var strtermin = "_" + fulltermin + "_";
    var strdeadline = "_" + deadline + "_";
    var strkontakt = "_" + kontakt + "_";
    //Hash funktion für String nach URL
    String.prototype.hashCode = function () {
        var hash = 0;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            char = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };
    //Local speichern, alle nötige Variable
    setCookies("deadline", deadline, 7);
    setCookies("Kontakt", kontakt, 7);

    setCookies("Anzahl", anzahl, 7);
    setCookies("janein", jn, 7);
    setCookies("einwahl", ae, 7);
    setCookies("teil", vi, 7);
    setCookies("hide", hide, 7);
    document.getElementById("hash_").value = str.hashCode() + "_" + strtermin.hashCode() + "_" + strdeadline.hashCode() + "_" + strkontakt.hashCode();
    var txt = "step3_b.ejs?h_=" + document.getElementById("hash_").value;
    setCookies("Link", txt, 30);

    //setCookie();
}

function make2Darray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

var Cookievalue = [];
var Tablearray = [];

function Save() {

    var table = document.getElementById("myTable");
    var cmax = getCookies("count");
    var nextrow = getCookies("nextaddrow");
    //alert(nextrow);
    if (nextrow != 0) {
        if (document.getElementById("einwahl").checked === true) {
            //alert("checked");
            checkradio();
        }
        //make2Darray(cmax,rowmax);
        var t = table.rows.length - 1;
        //alert(t);
        for (var i = 1; i < table.rows.length; i++) {		//alert( "i : "+ i );
            Cookievalue[i] = [];
            for (var j = 0; j <= cmax; j++) {	//alert(cmax);
                //alert(i+":"+j);
                var cellx = table.rows[i].cells[j];
                Cookievalue[i][j] = cellx.innerHTML;


            }
            Tablearray = Cookievalue[i];
            //alert("wenn i ="+i +":"+ Tablearray);
            setCookies("Cookietable_" + t, Tablearray, 7);
        }
        var colend = table.rows[t].cells.length - 1;
        //alert("///////////"+ t+":"+colend);

        setCookies("newrow", table.rows.length, 7);
        setCookies("count", cmax, 7);

        //alert(getCookies("Cookietable_"+t));
        //alert("table array : " + Tablearray);
    }

    //var Url1= document.getElementById("url2").value;
    //setCookies("Link", Url1 ,30);
    table.rows[t].cells[colend].innerHTML = "";
    table.rows[t].cells[colend].style.backgroundColor = "white";
    alert("Danke für Benutzung DoodleClone");


    //SendEmail();
}

/////Step 3////////////////	
/////////////////////////////////Auswahl der Wahlseinstellung//////////////////////////
window.onload = newrows;

function myFunction1() {
    var jn = document.getElementById("janein");
    var x = document.getElementById("teil");
    var y = document.getElementById("einwahl");
    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    var text3 = document.getElementById("text3");

    if (jn.checked === true) {
        x.style.display = "block";
        y.style.display = "none";
        text2.style.display = "block";
        text3.style.display = "none";
    } else {
        x.style.display = "block";
        y.style.display = "block";
        text2.style.display = "block";
        text3.style.display = "block";
    }
}

function myFunction2() {

    var jn = document.getElementById("janein");
    var ae = document.getElementById("einwahl");
    var vi = document.getElementById("teil");
    var text1 = document.getElementById("text1");
    var anzahl = document.getElementById("Anzahl");

    var text5 = document.getElementById("text5");
    if (vi.checked === true) {
        anzahl.style.display = "block";
        text5.style.display = "block";
        if (ae.checked === true) {
            jn.style.display = "none";
            text1.style.display = "none";
        } else {
            jn.style.display = "block";
            text1.style.display = "block";
        }
    } else {
        anzahl.style.display = "none";
        text5.style.display = "none";
    }
}

function myFunction3() {
    var jn = document.getElementById("janein");
    var ae = document.getElementById("einwahl");
    var vi = document.getElementById("teil");

    var text1 = document.getElementById("text1");
    if (ae.checked === true) {
        jn.style.display = "none";
        text1.style.display = "none";
    } else {
        if (vi.checked === true) {
            jn.style.display = "none";
            text1.style.display = "none";
        } else {
            jn.style.display = "block";
            text1.style.display = "block";
        }
    }
}

var test = false;

function myFunction4() {
    var hide = document.getElementById("hide");
    if (hide.checked === true) {
        test = true;
        var Admin = localStorage.getItem("Name");
        localStorage.setItem("Hidecheck", test);
        alert("alle Teilnehmennamen werden unsichtbar angezeigt!");
        //alert(test);
    } else {
        test = false;
        //alert(test);
    }
}

///////////////////////////Add teilnehmer und Tabelle erstellen/////////////////////////////	

function newrows() {
    Countdown();
    checkBoolean("janein", "einwahl", "teil", "hide", "Vote");
    var deadl = getCookies("deadline");
    var email = getCookies("Kontakt");

    max = getCookies("count");
    //alert("max colum:" + max);
    currentrow = getCookies("newrow");

    cell = window.localStorage.getItem("fulltermin");
    array = cell.split(',');
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    for (m = max; m >= 0; m--) {
        cell1 = row.insertCell(0);
        cell1.innerHTML = array[m];
        cell1.style.textAlign = "center";
        cell1.style.width = '100px';
    }

    for (i = 1; i < currentrow; i++) {
        //alert("row:" + i);
        var cell2 = getCookies("Cookietable_" + i);
        var array2 = cell2.split(',');
        //alert(array2);
        //make2Darray(max,maxrow);

        var row2 = table.insertRow(i);

        for (var j = 0; j <= max; j++) {	//alert(cmax);
            //alert(j);
            var cell3 = row2.insertCell(j);
            cell3.innerHTML = array2[j];
            cell3.style.textAlign = "center";
            cell3.style.width = '100px';
        }
    }

    for (i = 1; i < table.rows.length; i++) {
        //alert(i);
        for (j = 0; j <= max; j++) {
            //alert(i+":"+j);
            if (table.rows[i].cells[j].innerHTML === "prio1") {
                table.rows[i].cells[j].style.backgroundColor = "green";
            }
            if (table.rows[i].cells[j].innerHTML === "prio2") {
                table.rows[i].cells[j].style.backgroundColor = "yellow";
            }
            if (table.rows[i].cells[j].innerHTML === "") {
                table.rows[i].cells[j].style.backgroundColor = "white";
            }
        }
    }

    //alert(document.getElementById("hide").checked);
    if (document.getElementById("hide").checked) {

        var rowend = table.rows.length - 1;
        //alert(rowend);
        if (rowend > 0) {
            for (var i = 0; i <= rowend; i++) {
                table.rows[i].cells[0].style.display = "none";
            }
        }
    }
    var voted = getCookies("Vote");
    var ergebnis = voted.toLowerCase() === 'true' ? true : false;
    if (ergebnis) {
        vote();
    }
}

function insertrows2() {
    row = row + 1;

    var table2 = document.getElementById("myTable");

    if (document.getElementById("Anzahl").value !== "") {
        var maxanzahl = getCookies("Anzahl");
        document.getElementById("Anzahl").value = maxanzahl;
    }
    var currow = table2.rows.length - 1;
    //alert("Max Anzahl:" + maxanzahl);
    //alert("aktuelle Rows:" + currow);
    var teilnehmer = prompt("Geben Sie Ihr Name ein", "Trung Hieu Tran");
    window.localStorage.setItem("Teilnehmer", teilnehmer);

    var row2 = table2.insertRow();
    max = getCookies("count");
    cell1.style.textAlign = "center";
    cell1.style.width = '100px';
    cell1 = row2.insertCell(0);
    cell1.innerHTML = teilnehmer;
    if (document.getElementById("hide").checked) {
        cell1.style.display = "none";
        table2.rows[0].cells[0].style.display = "none";
    }
    cell1.setAttribute('contentEditable', 'true');
    //alert("anzahl"+maxanzahl);
    //alert("aktuel row"+row);
    if (document.getElementById("teil").checked === true) {
        if (row <= maxanzahl && currow < maxanzahl) {


            for (n = 1; n <= max; n++) {
                if (document.getElementById("einwahl").checked === true) {

                    cell1 = row2.insertCell(n);
                    cell1.innerHTML = '<input type="radio" id=' + row + ' name=' + row + '\>';
                    cell1.style.textAlign = "center";
                    cell1.style.width = '100px';
                    //alert(row);
                    //if(document.getElementById("einwahl").checked==true){
                    //alert(document.getElementById(row).value);
                    //}
                } else {
                    cell1 = row2.insertCell(n);
                    cell1.innerHTML = "";
                    cell1.style.textAlign = "center";
                    cell1.style.width = '100px';
                    cell1.style.backgroundColor = "white";
                    cell1.className = "block";
                    cell1.onclick = xfunc;
                }

            }

            cell1 = row2.insertCell();
            cell1.innerHTML = '<a id="myTable" onclick="removerows(this)">Delete me</a>';
            cell1.style.textAlign = "center";
            cell1.style.width = '100px';
            cell1.style.backgroundColor = "red";
        } else {
            alert("maximal Teilnehmer ist erreich! Prüfen/Ändern Sie Ihre Wahl oder wenden Sie sich an den Admin");
            //alert("aktuell"+row);
            alert("Teilnehmer anzahl:  " + maxanzahl);
            del = row + currow;
            //alert("gelöscht row ist:"+del);
            document.getElementById("myTable").deleteRow(del);
            row = row - 1;
            //alert("aktuell"+row);
        }
    } else {
        for (n = 1; n <= max; n++) {
            if (document.getElementById("einwahl").checked === true) {
                cell1 = row2.insertCell(n);
                cell1.innerHTML = '<input type="radio" id=' + row + ' name=' + row + '\>';
                cell1.style.textAlign = "center";
                cell1.style.width = '100px';
                //alert(row);
                //if(document.getElementById("einwahl").checked==true){
                //alert(document.getElementById(row).value);
                //}
            } else {
                cell1 = row2.insertCell(n);
                cell1.innerHTML = "";
                cell1.style.textAlign = "center";
                cell1.style.width = '100px';
                cell1.style.backgroundColor = "white";
                cell1.className = "block";
                cell1.onclick = xfunc;
            }
        }

        cell1 = row2.insertCell();
        cell1.innerHTML = '<a id="myTable" onclick="removerows(this)">Delete me</a>';
        cell1.style.textAlign = "center";
        cell1.style.textAlign = "center";
        cell1.style.width = '100px';
        cell1.style.backgroundColor = "red";
    }
    setCookies("nextaddrow", row, 7);
    document.getElementById("Addrow").style.display = "none";
}

function removerows(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);
    document.getElementById("Addrow").style.display = "block";
}

function xfunc() {
    var colors = ["white", "green", "yellow"];//array of colors
    var reverseRef = {"white": 0, "green": 1, "yellow": 2};

    var cells = document.getElementsByClassName("block");//block is a class name you should give your blocks

    for (var i = 0; i < cells.length; i++) {//attach an event to all blocks
        cells[i].onclick = function () {//when you click them
            //console.log(reverseRef[this.style.backgroundColor],this.style.backgroundColor);
            this.style.backgroundColor = colors[(reverseRef[this.style.backgroundColor] + 1) % 3];
            if (this.style.backgroundColor === "yellow") {
                //alert("yellow");
                this.innerHTML = "prio2";
            }
            this.style.width = '200px';
            if (this.style.backgroundColor === "green") {
                //alert("green");
                this.innerHTML = "prio1";
            }
            this.style.width = '200px';
            if (this.style.backgroundColor === "white") {//alert("nichts");
                this.innerHTML = "";
            }
            this.style.width = '200px';
        }
    }

}

function checkradio() {
    //alert("click");
    table = document.getElementById("myTable");
    var nextrow = getCookies("nextaddrow");
    //alert(nextrow);
    var currentrow = table.rows.length - 1;
    var max = getCookies("count");
    //alert(max);
    //alert("rmax:"+ table.rows.length);
    //alert("cmax:"+ max);
    //for(var i=nextrow;i<=table.rows.length;i++)
    //{

    for (var j = 1; j <= max; j++) {//attach an event to all blocks
        //alert(currentrow+":"+j);
        //alert(document.getElementById(nextrow).innerHTML);

        //alert(document.getElementById(nextrow).checked);
        //alert(table.rows[i].cells[j].innerHTML );
        if (document.getElementById(nextrow).checked) {
            //alert(document.getElementById(nextrow).checked);
            table.rows[currentrow].cells[j].style.backgroundColor = "green";
            table.rows[currentrow].cells[j].innerHTML = "prio1";
        } else {
            //alert(document.getElementById(nextrow).checked);
            table.rows[currentrow].cells[j].style.backgroundColor = "white";
            table.rows[currentrow].cells[j].innerHTML = "";
        }
    }

    //}
}

var Ende = false;

function vote() {

    //alert("click");
    var cmax = getCookies("count");
    var table = document.getElementById("myTable");
    var tablevote = document.getElementById("myVote");

    var row = tablevote.insertRow();
    cell1 = row.insertCell(0);
    cell1.innerHTML = "Ergebnis";
    for (var cell = 1; cell <= cmax; cell++) {
        var x = 0;
        var sumVal = 0;

        for (var i = 1; i < table.rows.length; i++) {
            //alert(i+":"+cell);
            var text = table.rows[i].cells[cell].innerHTML

            if (text === "prio1") {
                x = 2;
            }
            if (text === "prio2") {
                x = 1;
            }
            if (text === "") {
                x = 0;
            }
            sumVal = sumVal + x;

        }

        var cell1 = row.insertCell(cell);

        cell1.innerHTML = sumVal
        cell1.style.textAlign = "center";
        cell1.style.width = '100px';

        //alert("Sum => "+sumVal);

    }


    getMax(this);
    document.getElementById("Addrow").style.display = "none";
    document.getElementById("Save").style.display = "none";
    document.getElementById("vote").style.display = "none";
    document.getElementById("txt1").style.display = "none";
    document.getElementById("txt2").style.display = "none";
    document.getElementById("txt3").style.display = "none";
    document.getElementById("Startseite").style.display = "block";
    var Ende = true;
    //var now = new Date().getTime();

    setCookies("Vote", Ende, 30);


}

function disable_enable(_this) {
    if (_this === 'login') {
        document.test.login.disabled = true;
        document.test.logout.disabled = false;
        setCookies("login", document.test.login.disabled, 1);
        var Admin = getCookies("Name");
        alert(Admin);
        var neuName = prompt("Geben Sie Ihr Name ein", "");
        //alert(neuName);
        if (Admin === neuName) {

            alert("Hallo " + neuName);
            alert("Viel Spaß noch");
            document.getElementById("vote").style.display = "block";
            document.getElementById("Addrow").style.display = "block";
            //document.getElementById("hide").checked =false;
            var table = document.getElementById("myTable");
            var rowend = table.rows.length - 1;
            //alert(rowend);
            if (rowend > 0) {
                for (var i = 0; i <= rowend; i++) {

                    table.rows[i].cells[0].style.display = "block";
                    //alert(table.rows[i].cells[0].innerHTML);
                }
            }

        } else {
            alert("Hallo, " + neuName + "! Sie sind nicht Admin für diese Poll,Viel Spaß!");
            document.test.login.disabled = false;
            document.test.logout.disabled = true;
            alert("Tschüß !");
            document.getElementById("vote").style.display = "none";
        }
    } else {
        document.test.login.disabled = false;
        document.test.logout.disabled = true;
        alert("Tschüß !");
        document.getElementById("vote").style.display = "none";


    }
}

function getMax(r) {
    var r = 0;
    var table = document.getElementById("myVote");
    cmax = window.localStorage.getItem("cmax");
    var maxVal, maxIndex = 1;
    maxVal = table.rows[r].cells[1].innerHTML;
    for (var i = 1; i < cmax; i++) {


        //alert(i);
        if (maxVal <= table.rows[r].cells[i].innerHTML) {
            maxVal = table.rows[r].cells[i].innerHTML;
            maxIndex = i;
        }

    }
    //alert( "max"+maxVal);
    //alert( "Index Column "+maxIndex);
    table.rows[0].cells[maxIndex].style.backgroundColor = "green";
    document.getElementById("sumV").innerHTML = "Maximum Vote ist für : " + maxVal;
    document.getElementById("sumV").style.backgroundColor = "green";
    //alert("Max = "+maxVal);       
}

function setCookies(key, val, days) {
    //alert("cookie is called");
    //alert("key cookies:" + key);
    //alert("value cookies"+val);
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var exp = "expires=" + d.toUTCString();

    document.cookie = key + "=" + val + ";" + exp + ";path=/";
    //alert(document.cookie);

}

function getCookies(key) {
    var keys = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(keys) === 0) {
            return c.substring(keys.length, c.length);
        }
    }
    return "";
}

function checkBoolean(text1, text2, text3, text4, text5) {
    jn = getCookies("janein");
    einwahl = getCookies("einwahl");
    teil = getCookies("teil");
    hide = getCookies("hide");


    var janein = jn.toLowerCase() === 'true' ? true : false;   //returns true
    document.getElementById("janein").checked = janein;
    var onechoice = einwahl.toLowerCase() === 'true' ? true : false;   //returns true
    document.getElementById("einwahl").checked = onechoice;
    var member = teil.toLowerCase() === 'true' ? true : false;   //returns true
    document.getElementById("teil").checked = member;
    var unsichtbar = hide.toLowerCase() === 'true' ? true : false;   //returns true
    document.getElementById("hide").checked = unsichtbar;


    document.getElementById("Anzahl").value = getCookies("Anzahl");
    var local = getCookies("Local");
    var comment = getCookies("Kommentar");
    var Url1 = document.getElementById("url2");
    //alert(window.location.href);
    Url1.value = "Hallo," + "\nLocal: " + local + " \nNote: " + comment + "\nLink: " + window.location.href;
    Url1.select();
    document.execCommand("copy");


    var kontakt = getCookies("Kontakt");

    if (kontakt !== "") {
        var Url = document.getElementById("url1");
        Url.value = kontakt + ";";
    }
}

function Countdown() {
    var deadline = getCookies("deadline");
//alert(deadline);
    if (deadline) {
        document.getElementById("demo").style.display = "block";
        // Set the date we're counting down to
        var countDownDate = new Date(deadline).getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML = "Noch  " + days + "d " + hours + "h "
                + minutes + "m " + seconds + "s " + "  bis zum Deadline";
            // If the count down is over, write some text

            if (distance < 0) {

                clearInterval(x);
                document.getElementById("demo").innerHTML = "Deadline ist erreicht";
                var Vote = getCookies("Vote");
                if (Ende === false) {
                    vote();
                }
            }
        }, 1000);
    } else {

        document.getElementById("demo").style.display = "none";
    }
}

function Reset() {
//alert("check");
//removeCookies();
    alert("All Cookies werden gelöscht");
    window.location.href = 'startseite.ejs';
}

function removeCookies() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
        var key = multiple[i].split("=");
        document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
}