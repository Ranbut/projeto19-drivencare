import joi from "joi";

const create = joi.object({
  medicId: joi.number().required(),
  date: joi.string().required(),
  time: joi.string().required()
});

export default {
    create,
};