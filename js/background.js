var encodeToBig5, encodeToGbk, encoden;
encoden = function (e) {
  return escape(e).replace("+", "%u002B")
}, encodeToGbk = function (e) {
  return JU.gbkEncodeURI(e)
}, encodeToBig5 = function (e) {
  return JU.big5EncodeURI(e)
};
var KEY, TIMER, URL, alertResponse, copy2Clipboard, copyResponse, createQR, createUrl, dwz, getOauth, googl, queryKd, readClipboard, shortenUrl, shortenUrlAlert, shortenUrlCopy, sinat, tabClose, urlcn;
queryKd = function (e, t, n, r) {
  var o;
  return o = new XMLHttpRequest, o.open("GET", "http://www.kuaidi100.com/autonumber/auto?num=" + e, !0), o.setRequestHeader("Content-Type", "application/json"), o.onreadystatechange = function () {
    var s, a, c, l, u;
    if (4 === o.readyState && 0 !== o.status) {
      for (l = JSON.parse(o.responseText), u = [], s = 0, a = l.length; a > s; s++) c = l[s], u.push(show("http://www.kuaidi100.com/chaxun?com=" + c.comCode + "&nu=%s", e, t, n, r));
      return u
    }
  }, o.send(), 1
}, copy2Clipboard = function (e) {
  var t;
  return t = document.getElementById("url"), void 0 !== t ? (t.value = e, t.select(), document.execCommand("copy", !1, null)) : void 0
}, readClipboard = function () {
  var e;
  return e = document.getElementById("url"), void 0 !== e ? (e.select(), document.execCommand("paste"), e.value) : void 0
}, createUrl = function () {
  var e;
  return e = document.createElement("input"), e.type = "text", e.id = "url", document.body.appendChild(e)
}, createUrl(), createQR = function (e, t, n, r) {
  var o;
  return o = JU.lsGet("qr_size", 250), show("http://qr.liantu.com/api.php?w=" + o + "&text=%s", e, t, n, r)
}, qrcode.callback = function (e) {
  return /\w{3,}:\/\/*/.test(e) ? chrome.tabs.create({
    url: e
  }) : alert(e)
}, copyResponse = function (e) {
  return "error" === e.status ? alert("response error") : copy2Clipboard(e.message)
}, alertResponse = function (e) {
  return "error" === e.status ? alert("response error") : alert(e.message)
}, shortenUrlCopy = function (e, t, n, r) {
  return shortenUrl(e, !1, copyResponse)
}, shortenUrlAlert = function (e, t, n, r) {
  return shortenUrl(e, !1, alertResponse)
}, shortenUrl = function (e, t, n) {
  var r;
  switch (r = JU.lsGet("shorten", "googl")) {
    case "dwz":
      dwz(e, t, n);
      break;
    case "sinat":
      sinat(e, t, n);
      break;
    case "urlcn":
      urlcn(e, t, n);
      break;
    default:
      googl(e, t, n)
  }
  return ga("send", "event", "shorten", r)
}, urlcn = function (e, t, n) {
  var r, o;
  return o = new XMLHttpRequest, r = "http://open.t.qq.com/api/short_url/shorten?format=json&long_url=" + encodeURIComponent(e) + "&appid=801399639&openkey=898eab772e8dbd603f03c4db1963de93", o.open("GET", r, !1), o.onreadystatechange = function () {
    var e;
    return 4 === o.readyState && 0 !== o.status ? (e = JSON.parse(o.responseText), 102 === e.errcode ? alert(e.msg) : n({
      status: "success",
      message: "http://url.cn/" + e.data.short_url
    })) : void 0
  }, o.send()
}, sinat = function (e, t, n) {
  var r, o;
  return o = new XMLHttpRequest, r = "http://api.t.sina.com.cn/short_url/shorten.json?source=1144650722&url_long=" + encodeURIComponent(e), o.open("GET", r, !1), o.onreadystatechange = function () {
    var e;
    return 4 === o.readyState && 0 !== o.status ? (e = JSON.parse(o.responseText), 500 === e.error_code ? alert(e.error) : n({
      status: "success",
      message: e[0].url_short
    })) : void 0
  }, o.send()
}, dwz = function (e, t, n) {
  var r;
  return r = new XMLHttpRequest, r.open("POST", "http://dwz.cn/create.php", !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.onreadystatechange = function () {
    var e;
    return 4 === r.readyState && 0 !== r.status ? (e = JSON.parse(r.responseText), n({
      status: "success",
      message: e.tinyurl
    })) : void 0
  }, r.send("url=" + encodeURIComponent(e))
}, googl = function (e, t, n) {
  var r, o;
  return r = getOauth().hasToken() && !t, o = new XMLHttpRequest, o.open("POST", URL + "?key=" + KEY, !0), o.setRequestHeader("Content-Type", "application/json"), r && o.setRequestHeader("Authorization", oauth.getAuthorizationHeader(URL, "POST", {
    key: KEY
  })), o.onreadystatechange = function () {
    var e;
    return 4 === o.readyState && 0 !== o.status ? (e = JSON.parse(o.responseText), void 0 === e.id ? ("401" === e.error.code && oauth.clearTokens(), n({
      status: "error",
      message: e.error.message
    })) : n({
      status: "success",
      message: e.id,
      added_to_history: r
    })) : void 0
  }, o.send(JSON.stringify({
    longUrl: e
  }))
}, KEY = "AIzaSyAfKgyjoxWmR4RJyRhmk0X-J7q2WB9TbGA", TIMER = null, URL = "https://www.googleapis.com/urlshortener/v1/url", getOauth = function () {
  return window.OAUTH || (window.OAUTH = ChromeExOAuth.initBackgroundPage({
    request_url: "https://www.google.com/accounts/OAuthGetRequestToken",
    authorize_url: "https://www.google.com/accounts/OAuthAuthorizeToken",
    access_url: "https://www.google.com/accounts/OAuthGetAccessToken",
    consumer_key: "293074347131.apps.googleusercontent.com",
    consumer_secret: "2AtwN_96VFpevnorbSWK8czI",
    scope: "https://www.googleapis.com/auth/urlshortener",
    app_name: "Right search menu"
  })), window.OAUTH
}, tabClose = function (e, t, n, r) {
  return chrome.tabs.remove(t.id)
};
var createMenuItem, execute, getAllUrl, getCi18n, getContexts, getCustomUrl, getType, getValue, isCurrent, menuReset, openTab, openUrl, run, show, showPageAction, indexOf = [].indexOf ||
  function (e) {
    for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
    return -1
  };
run = !0, chrome.contextMenus.onClicked.addListener(function (e, t) {
  var n, r, o;
  return r = e.menuItemId[0], n = e.menuItemId.slice(1), r = getType(r), o = getValue(e, t, r), openTab(n, r, o, t)
}), chrome.runtime.onStartup.addListener(function () {
  return run ? menuReset() : void 0
}), chrome.runtime.onInstalled.addListener(function () {
  var e, t, n, r, o;
  if (e = JU.lsGet("all", []), 0 === e.length && JU.syncFetch("/init.json", function (e) {
    return JU.lsSet("all", JSON.parse(e)), ga("send", "event", "db", "ninit")
  }), t = getCi18n(), !JU.lsGet("run4", !1)) {
    r = t.getMessage("i18n"), JU.lsSet("en", !0), "cn" === r ? (JU.lsSet("zh_CN", !0), n = {
      txtSelect: ["baidu", "Baidu fanyi", "qr_txt"],
      picSelect: ["google_pic", "baidu_pic", "su_pic", "qr_decode"],
      linSelect: ["weibo_lin", "gmail_lin", "qr_lin"],
      menSelect: ["i_title"]
    }) : "tw" === r ? JU.lsSet("zh_TW", !0) : "ru" === r && JU.lsSet("ru", !0), n || (n = {
      txtSelect: ["bing", "translate", "Amazon_com"],
      picSelect: ["google_pic", "su_pic", "qr_decode"],
      linSelect: ["gmail_lin", "qr_lin"],
      menSelect: ["i_title"]
    });
    for (o in n) JU.lsSet(o, JU.lsGet(o, n[o]));
    chrome.tabs.create({
      url: "options.html",
      selected: !0
    }), JU.lsSet("run4", !0), ga("send", "event", "option", "init")
  }
  return menuReset()
}), getValue = function (e, t, n) {
  return {
    men: t.url,
    txt: e.selectionText,
    pic: e.srcUrl,
    lin: e.linkUrl
  }[n]
}, show = function (e, t, n, r, o, s, a) {
  var c;
  return null == r && (r = !1), null == o && (o = !1), null == s && (s = 1), null == a && (a = "txt"), /%l|%L/g.test(e) && (e = e.replace(/%l|%L/g, encodeURIComponent(n.title))), /%s|%S/g.test(e) && (e = e.replace(/%s|%S/g, encodeURIComponent(t))), /%g|%G/g.test(e) && (e = e.replace(/%g|%G/g, encodeToGbk(t))), /%t|%T/g.test(e) && (e = e.replace(/%t|%T/g, encodeToBig5(t))), /%p|%P/g.test(e) && (e = e.replace(/%p|%P/g, encodeURIComponent(readClipboard()))), /%u|%U/g.test(e) && n && (c = n.url.split("/")[2], e = e.replace(/%u|%U/g, c)), openUrl(e, n, r, o, s, a, t)
}, openUrl = function (e, t, n, r, o, s, a) {
  var c;
  return null == n && (n = !1), null == r && (r = !1), null == o && (o = 1), null == s && (s = "txt"), null == a && (a = ""), t && (c = t.index), o > 0 && c++, r ? (chrome.windows.create({
    url: e,
    incognito: !0
  }), !0) : (JU.lsGet("newPage", !0) ? chrome.tabs.getAllInWindow(null, function (t) {
    var r, o, l;
    for (r = 0, o = t.length; o > r; r++) if (l = t[r], isCurrent(l.url, e)) return chrome.tabs.update(l.id, {
      selected: !n
    }), void showPageAction(l, s, a);
    return chrome.tabs.create({
      url: e,
      selected: !n,
      index: c
    }, function (e) {
      return showPageAction(e, s, a)
    }), !0
  }) : chrome.tabs.create({
    url: e,
    selected: !n,
    index: c
  }, function (e) {
    return showPageAction(e, s, a)
  }), !0)
}, showPageAction = function (e, t, n) {
  return /http.+|ftp.+/.test(e.url) ? chrome.tabs.executeScript(e.id, {
    code: "document.head.setAttribute('data-c-m-t','" + t + "');" + ("document.head.setAttribute('data-c-m-v','" + n.replace("'", "\\'") + "');")
  }) : void 0
}, isCurrent = function (e, t) {
  return "options.html" === t && e.indexOf("phlfmkfpmphogkomddckmggcfpmfchpn") > 0 && 0 === e.indexOf("chrome-extension") && e.indexOf(t) > 0 ? !0 : t === e
}, getType = function (e) {
  var t, n, r, o;
  for (r = ["men", "txt", "pic", "lin"], t = 0, n = r.length; n > t; t++) if (o = r[t], e === o[0]) return o;
  return "menu"
}, execute = function (e, t, n, r, o) {
  var s, a;
  return a = {
    kd: queryKd,
    qr: createQR,
    qr_pic: createQR,
    qr_txt: createQR,
    qr_lin: createQR,
    qr_decode: qrcode.decode,
    tab_close: tabClose
  }, e in a && a[e](t, n, r, o), s = {
    su: shortenUrlCopy,
    su_lin: shortenUrlCopy,
    su_pic: shortenUrlCopy,
    su_alert: shortenUrlAlert,
    su_lin_alert: shortenUrlAlert,
    su_pic_alert: shortenUrlAlert
  }, e in s ? s[e](t, n, r, o) : void 0
}, getCustomUrl = function (e, t) {
  var n, r, o;
  for (r = 0, o = e.length; o > r; r++) if (n = e[r], n[0] === t) return [n[1]];
  return []
}, getAllUrl = function (e, t) {
  var n;
  return n = JU.findArray(e, "c", t), n ? [n.u] : []
}, openTab = function (e, t, n, r, o, s) {
  var a, c, l, u, i, d, p, g, m, h, f, U, w, v, y, x;
  for (null == o && (o = 1), null == s && (s = null), c = indexOf.call(JU.lsGet(t + "Back", []), e) >= 0, g = indexOf.call(JU.lsGet(t + "Incognito", []), e) >= 0, c = JU.lsGet("back", !1) ? !c : c, c = null !== s ? s : c, a = JU.lsGet("all", []), x = getAllUrl(a, e), l = JU.lsGet(t + "Custom", []), x = x.concat(getCustomUrl(l, e)), d = JU.lsGet(t[0] + "cGroup", []), p = 0, f = d.length; f > p; p++) if (u = d[p], u[0] === e) for (v = u[1], m = 0, U = v.length; U > m; m++) i = v[m], x = x.concat(getCustomUrl(l, i)), x = x.concat(getAllUrl(a, i));
  for (h = 0, w = x.length; w > h; h++) y = x[h], ga("send", "event", "menu", e), /:|.htm/.test(y) ? show(y, n, r, c, g, o, t) : execute(y, n, r, c, g, o);
  return !0
}, getCi18n = function () {
  var e;
  return indexOf.call(window, "ci18n") < 0 && (e = JU.lsGet("locale", navigator.language.replace("-", "_")), indexOf.call(LANGUAGE, e) < 0 && (e = "en"), window.ci18n = new JU.I18n2(TRANSLATIONS[e])), window.ci18n
}, menuReset = function () {
  var e;
  return run = !1, e = getCi18n(), chrome.contextMenus.removeAll(function () {
    var t, n, r, o, s, a, c, l, u, i, d, p;
    for (u = ["men", "txt", "pic", "lin"], n = 0, s = u.length; s > n; n++) for (d = u[n], i = JU.lsGet(d + "Select", []), "lin" === d && i.length > 0 && chrome.contextMenus.create({
      contexts: ["link"],
      type: "separator",
      id: "s_" + JU.getId()
    }), t = JU.lsGet("all", []), l = JU.lsGet("names", {}), o = 0, a = i.length; a > o; o++) r = i[o], p = JU.findArray(t, "c", r), p ? (c = e.getMessage(r), c || (c = p.n), p.c in l && (c = l[p.c]), createMenuItem(r, c, d)) : createMenuItem(r, r, d);
    return console.debug("menu reset")
  })
}, getContexts = function (e) {
  return {
    men: "page",
    txt: "selection",
    pic: "image",
    lin: "link"
  }[e]
}, createMenuItem = function (e, t, n) {
  var r, o, s, a, c, l, u;
  s = n[0] + e, u = JU.lsGet(n + "Incognito", []), o = JU.lsGet(n + "Back", []), l = indexOf.call(u, e) >= 0, l ? t = "☢ " + t : (r = indexOf.call(o, e) >= 0, r && (t = "₪ " + t));
  try {
    return chrome.contextMenus.create({
      title: t,
      contexts: [getContexts(n)],
      id: s
    })
  } catch (c) {
    return a = c, console.error(a)
  }
}, chrome.runtime.onMessageExternal.addListener(function (e, t, n) {
  return chrome.tabs.getSelected(null, function (t) {
    var n, r, o, s;
    return s = e.x, 1 === e.x ? 1 === e.y ? (n = "2" === JU.lsGet("rb1", "2"), s = "1" === JU.lsGet("rb2", "2") ? -1 : 1) : (n = "2" === JU.lsGet("rt1", "1"), s = "1" === JU.lsGet("rt2", "2") ? -1 : 1) : 1 === e.y ? (n = "2" === JU.lsGet("lb1", "1"), s = "1" === JU.lsGet("lb2", "1") ? -1 : 1) : (n = "2" === JU.lsGet("lt1", "1"), s = "1" === JU.lsGet("lt2", "2") ? -1 : 1), n = 1 === e.y, "url" === e.cmd && (show(e.values, "", t, n, !1, s), ga("send", "event", "drag", "url")), "txt" === e.cmd ? (r = JU.lsGet("txtSelect", ["baidu"])[0], o = e.values.trim(), JU.isUrl(o) ? (JU.isProtocol(o) || (o = "http://" + o), openUrl(o, t, n, !1, s), ga("send", "event", "drag", "url")) : (openTab(r, "txt", e.values, t, s, n), ga("send", "event", "drag", r))) : void 0
  })
}), run && menuReset();