function getUser() {
  let globals = GLOBALS || window.opener.GLOBALS || [];
  return GLOBALS[10];
}

function getURL() {
  return URI(window.location.toString().replace(/\/u\/[0-9]+\/?/, ""))
    .addSearch("authuser", getUser())
    .addSearch("ibxr", 0)
    .toString();
}

function copyURL() {
  GM_setClipboard(getURL(), "text");
  GM_notification({
    title: "URL Copied",
    text: "GMail URL copied to clipboard",
    timeout: 750,
  });
}

GM_registerMenuCommand("Get Direct Link to GMail", copyURL);
