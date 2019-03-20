const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongooes = require("mongoose");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/"));

// connect to MongoDB
mongooes.connect("mongodb://localhost:27017/DoodleClone", {useNewUrlParser: true});

// create Schema of item
const konferenzSchema = new mongooes.Schema({
    leiter: String,
    ort: String,
    kommentar: String,
    zeit: {
        datum: String,
        von: String,
        bis: String
    },
    eigenschaften: [],
    option: {
        datum: String,
        bis: String,
        email: String,
        tel: String
    }
});

const konferenzModel = mongooes.model('conference', konferenzSchema);
let neueKonferenz = new konferenzModel();

app.get('/', function (req, res) {
    res.render('./startseite.ejs');
});

app.get('/step1', function (req, res) {
    res.render('./step1.ejs');
});

app.post('/step1', function (req, res) {
    const admin = req.body.Name;
    const local = req.body.Wo;
    const comment = req.body.kommentar;

    if (admin !== '') {
        if (admin.length > 10) {
            console.log("The name may have no more than 10 characters");
        } else {
            neueKonferenz.leiter = admin;
            neueKonferenz.ort = local;
            neueKonferenz.kommentar = comment;
            res.redirect('/step2');
        }
    } else {
        console.log("Geben Sie bitte Ihr Name ein");
    }
});

app.get('/step2', function (req, res) {
    res.render('./step2.ejs');
});

app.post('/step2', function (req, res) {
    const datum = req.body.date;
    const von = req.body.time;
    const bis = req.body.time2;

    console.log(typeof req.body.date);
    neueKonferenz.zeit = {datum: datum, von: von, bis: bis};

    res.redirect('/step3');
});

app.get('/step3', function (req, res) {
    res.render('./step3.ejs');
});

app.post('/step3', function(req, res) {
    const jn = req.body.Waehl1;
    const ae = req.body.Waehl2;
    const vi = req.body.Waehl3;
    const uz = req.body.Waehl4;
    neueKonferenz.eigenschaften = [jn, ae, vi, uz];

    const deadLine = req.body.deadline;
    const timeLine = req.body.timeline;
    const kontakt = req.body.kontakt;
    const tel = req.body.tel;
    neueKonferenz.option = {datum: deadLine, bis: timeLine, email: kontakt, tel: tel};

    neueKonferenz.save();
    res.redirect('/step3_b');
});

app.get('/step3_b', function (req, res) {
    res.render('./step3_b.ejs');
});

app.listen(3000, function () {
    console.log("server is running on port 3000...");
});
