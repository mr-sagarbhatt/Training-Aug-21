const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const serviceSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      alias: "serviceName",
      maxlength: [
        50,
        `Service name must be less than or equal to 50 characters.`,
      ],
      unique: [true, `Service name is already exists.`],
      required: [true, `Service name is required.`],
    },
    slug: {
      type: String,
      maxlength: [
        50,
        `Service slug must be less than or equal to 50 characters.`,
      ],
      unique: [true, `Service slug is already exists.`],
      required: [true, `Service slug is required.`],
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
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

serviceSchema.plugin(AutoIncrement, {
  id: "service_seq",
});

const ServiceModel = model("service", serviceSchema);

module.exports = ServiceModel;
