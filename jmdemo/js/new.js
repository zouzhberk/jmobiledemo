/**
 * Created by berk on 12/25/15.
 */
;
(function (window, undefined) {
  "use strict";
  var now = Date.now();
  var appId = 'A6992372780429';
  var appKey = '4D829BB8-2A00-58F8-F590-87F8F4FDFF11';
  var appCode = SHA1(appId + "UZ" + appKey + "UZ" + now) + "." + now;


  var baseurl = "https://d.apicloud.com/mcm/api";

  var headers = {
    "X-APICloud-AppId": appId,
    "X-APICloud-AppKey": appCode,
    "Content-Type": "application/json;"
  };
  //headers["authorization"] = "";

  var settings = {};
  settings["headers"] = headers;
  settings["responseType"] = "json";
  var filter =
    {
      "where": {
        //"id": "5490e5feedb9860731f55d07"
      },
      "skip": 0,
      "limit": 20
    }
    ;
  settings["url"] = baseurl + "/news?filter=" + JSON.stringify(filter);


  Rx.DOM.get(settings).flatMap(function (x) {
    return x.response
  }).map(function (x) {
    return x
  }).subscribe(
    function (data) {
      var tmpl = document.getElementById("news-template").innerHTML;
      var dottempl = doT.template(tmpl);
      $(dottempl(data)).appendTo($("#newslist"));
    },
    function (err) {
      alert(err);
    },
    function () {
      //Rx.Observable.just($("a[name='itemlink']")).flatMap(function (x) {
      //  return x;
      //}).subscribeOnNext(function (el) {
      //  Rx.DOM.click(el).subscribeOnNext(function (event) {
      //    console.log(event.target.attributes["data-id"].value);
      //    alert(event.target.attributes["data-id"].value);
      //  });
      //});

    }
  );

}(window));
