exports.formatDate = list => {
  let timeFormatObj = list.map(function(object) {
    const newObject = { ...object };
    let formattedDate = new Date(newObject.created_at);
    newObject.created_at = formattedDate;
    return newObject;
  });
  return timeFormatObj;
};

exports.makeRefObj = list => {
  if (list.length < 1) return {};
  let formattedObject = list.reduce(function(acc, object) {
    acc[object.title] = object.article_id;
    return acc;
  }, {});

  return formattedObject;
};

exports.formatComments = (comments, articleRef) => {
  let formattedArray = comments.map(function(object) {
    return {
      body: object.body,
      author: object.created_by,
      article_id: articleRef[object.belongs_to],
      votes: object.votes,
      created_at: new Date(object.created_at)
    };
  });

  return formattedArray;
};
