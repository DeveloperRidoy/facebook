const docName = require("../../../../utils/server/functions/docName");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");



// add docs 
exports.addDocs = (Model) => catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    return res.json({
        status: 'success',
        message: 'post added',
        data: {[docName(Model)]: data}
    })
})

// get all docs 
exports.getDocs = (Model) => catchAsync(async (req, res, next) => {
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 100;
    const skip = limit * (page - 1);
    const data = await Model.find().skip(skip).limit(limit);
    return res.json({
      status: "success",
      page, 
      limit,
      results: data.length,
      data: {[Model.collection.name]: data}
    });
})

// get doc by id 
exports.getDocById = (Model) => catchAsync(async (req, res, next) => {
    const user = await Model.findById(req.params.id);
    return res.json({
        status: 'success',
        data: {user}
    })
})

// update doc 
exports.updateDoc = (Model) => catchAsync(async (req, res, next) => {
    const updatedData = await Model.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, validateModifiedOnly: true, context: 'query' });
    
    // check if data with id exists 
    if(!updatedData) return next(new AppError(404, 'document not found'))

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

// delete doc by id
exports.deleteDocById = (Model) => catchAsync(async (req, res, next) => {
    const response = await Model.findByIdAndDelete(req.params.id);
    if (response === null) return next(new AppError(400, 'user not found'));
    return res.json({
        status: 'success',
        message: `${docName(Model)} deleted`
    })
})               
