function(doc) {
  if (doc.title && doc.body) {
    emit(doc._id, doc);
  }
};
