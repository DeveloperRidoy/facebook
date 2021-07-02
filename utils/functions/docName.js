const docName = (Model) => {
    return Model.collection.name.slice(0, Model.collection.name);
}

module.exports = docName;