function() {
  var row, ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    data = {
      title : "All Pages",
      path : "/!recent",
      pages : []
    };
  provides("html", function() {
    while (row = getRow()) {
      data.pages.push({
        title : row.value.title,
        id : row.id,
        note : row.value.note,
        by : row.value.edit_by.name,
        at : row.key
      });
    }
    send(mustache.to_html(ddoc.templates.pages, data, ddoc.templates.partials));
  });
};
