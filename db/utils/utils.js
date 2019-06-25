exports.formatDate = list => {
  // YYYY-MM-DD HH:MM:SS
  //unix is milliseconds since midnight 1970
  //used in comments and articles at created_at

  let timeFormatObj = list.map(function(object) {
    let formattedDate = new Date(object.created_at);
    object.created_at = formattedDate;
    console.log(object);
    return object;
  });
  return timeFormatObj;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
