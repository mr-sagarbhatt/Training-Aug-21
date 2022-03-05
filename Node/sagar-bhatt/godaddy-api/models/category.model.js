const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");
const mongoosePaginate = require("mongoose-paginate-v2");

const AutoIncrement = AutoIncrementFactory(connection);

const categorySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      alias: "categoryName",
      maxlength: [
        50,
        `Category name must be less than or equal to 50 characters.`,
      ],
      unique: [true, `Category name is already exists.`],
      required: [true, `Category name is required.`],
    },
    slug: {
      type: String,
      maxlength: [
        50,
        `Category slug must be less than or equal to 50 characters.`,
      ],
      unique: [true, `Category slug is already exists.`],
      required: [true, `Category slug is required.`],
    },
    desc: {
      type: String,
      maxlength: [
        1024,
        `Description must be less than or equal to 1024 characters.`,
      ],
      alias: "description",
    },
    extra: {
      type: [String],
    },
    serviceId: {
      type: Number,
      ref: "service",
      required: [true, `Service id is required.`],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

categorySchema.plugin(AutoIncrement, {
  id: "category_seq",
});

categorySchema.plugin(mongoosePaginate);

const CategoryModel = model("category", categorySchema);

module.exports = CategoryModel;
