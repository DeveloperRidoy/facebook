const docName = require("../../../../utils/server/functions/docName");
const catchAsync = require("../../../../utils/server/functions/catchAsync");


// get all docs 
exports.getDocs = (Model) => catchAsync(async (req, res, next) => {
    const data = await Model.find();
    return res.json({
      status: "success",
      results: data.length,
      data: {[Model.collection.name]: data}
    });
})

// update doc 
exports.updateDoc = (Model) => catchAsync(async (req, res, next) => {
    const updatedData = await Model.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, {new: true, validateModifiedOnly: true, context: 'query'});
    return res.json({
        status: 'success',
        message: `${docName(Model)} updated`,
        [docName(Model)]: updatedData
    })
})

// delete all docs 
exports.deleteDocs = (Model) => catchAsync(async (req, res, next) => {
    await Model.deleteMany();
    return res.json({
        status: 'success',
        message: `all ${Model.collection.name} deleted`
    })
})