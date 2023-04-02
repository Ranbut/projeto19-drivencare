import joi from "joi";

const add = joi.object({
  medicId: joi.number().required(),
  day: joi.string().required(),
  time: joi.string().required()
});

export default {
    add,
};