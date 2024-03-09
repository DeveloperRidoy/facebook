const AppError = require("../../utils/server/AppError");
const catchAsync = require("../../utils/server/catchAsync");
const docName = require("../../utils/server/docName");
const { removeCookie } = require("../../utils/server/jwtCookieToken");
const { USER_AUTH_TOKEN } = require("../../utils/server/variables");

// add docs
export const addDocs = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    return res.json({
      status: "success",
      message: "post added",
      data: { [docName(Model)]: data },
    });
  });

// get all docs
export const getDocs = (Model, query, populate, select) =>
  catchAsync(async (req, res, next) => {
    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 100;
    const skip = limit * (page - 1);
    const data = await Model.find(query)
      .skip(skip)
      .limit(limit)
      .populate(populate)
      .select(select);
    return res.json({
      status: "success",
      page,
      limit,
      results: data.length,
      data: { [Model.collection.name]: data },
    });
  });

// get doc by id
export const getDocById = (Model, populate) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.query.id).populate(populate);
    return res.json({
      status: "success",
      data: { [docName(Model)]: data },
    });
  });

// update doc
export const updateDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedData = await Model.findOneAndUpdate(
      { _id: req.query.id },
      { $set: req.body },
      { new: true, validateModifiedOnly: true, context: "query" }
    );

    // check if data with id exists
    if (!updatedData) return next(new AppError(404, "document not found"));

    return res.json({
      status: "success",
      message: `${docName(Model)} updated`,
      data: { [docName(Model)]: updatedData },
    });
  });

// delete all docs
export const deleteDocs = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany();
    return res.json({
      status: "success",
      message: `all ${Model.collection.name} deleted`,
    });
  });

// delete doc by id
export const deleteDocById = (Model) =>
  catchAsync(async (req, res, next) => {
    const response = await Model.findByIdAndDelete(req.query.id);
    if (response === null) return next(new AppError(400, "user not found"));

    // remove cookies for user
    removeCookie(USER_AUTH_TOKEN, req, res);

    // return response
    return res.json({
      status: "success",
      message: `${docName(Model)} deleted`,
    });
  });
