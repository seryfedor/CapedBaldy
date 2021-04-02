var express = require("express");
var router = express.Router();
var URLS = require("../services/URL.schema");
var mongoose = require("mongoose");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ヒーローの帰還", alert: req.query.msg });
});

router.post("/", (req, res) => {
  // res.send('Post method...')

  console.log(req.body.message);

  var getUri = require("get-uri");
  //getUri('https://api.telegram.org/bot' + process.env.TELEGRAM_TOKEN + '/sendMessage?chat_id=' + process.env.TELEGRAM_CHAT_ID + '&text=' + req.body.message)

  var url = require("url");
  var link =
    "https://api.telegram.org/bot" +
    process.env.TELEGRAM_TOKEN +
    "/sendMessage?chat_id=" +
    process.env.TELEGRAM_CHAT_ID +
    "&text=" +
    req.body.message;
  var parts = url.parse(link, true);
  parts.query.page++;
  delete parts.search;
  getUri(url.format(parts));
  console.log(url.format(parts));

  res.redirect(301, "/?msg=ok");
});

router.get("/r", async function (req, res, next) {
  const arrayUrls = await URLS.find({});
  res.render("redirect", {
    title: "ヒーローの帰還",
    arrayUrls,
    pass: process.env.R_PASS,
  });
});

router.get("/r/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  const del = await URLS.findByIdAndDelete({ _id: id });
  res.redirect("/r");
});

router.post("/r/update/:id", async function (req, res, next) {
  const { id } = req.params;
  const { newredirect } = req.body;
  const up = await URLS.findByIdAndUpdate(
    { _id: id },
    { urlRedirect: newredirect }
  );
  res.redirect("/r");
});

router.post("/r", async function (req, res, next) {
  const { site, redirect } = req.body;
  const nw = new URLS({ site, urlRedirect: redirect });
  nw.save(function (err) {
    if (err) return handleError(err);
  });
  res.redirect("/r");
});
router.get("/r/:url", (req, res) => {
  const { url } = req.params;
  res.redirect(`https://${url}`);
});

module.exports = router;
