const docName = (Model) => {
    return Model.collection.name.slice(0, Model.collection.name.length - 1);
}

module.exports = docName;        