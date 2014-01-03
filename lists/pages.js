function() {
  var row, ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    data = {
      title : "All Pages",
      path : "/!all",
      pages : []
    };
  provides("html", function() {
    while (row = getRow()) {
      data.pages.push({
        title : row.value.title,
        id : row.id,
      });
    }
    send(mustache.to_html(ddoc.templates.pages, data, ddoc.templates.partials));
  });
};
