import Joi from "joi";

export const validateProduct = (reqBody) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(80).required(),
    brand: Joi.string().max(10),
    type: Joi.alternatives()
      .try(Joi.string(), Joi.array().items(Joi.string()))
      .required(),
    color: Joi.string(),
    price: Joi.number().required(),
    monthly_price: Joi.number(),
    rating: Joi.number().min(0).max(5),
    limits: Joi.object({
      voice: Joi.object({
        units: Joi.string(),
        n: Joi.alternatives().try(Joi.number().integer(), Joi.string()),
        over_rate: Joi.number(),
      }),
      data: Joi.object({
        units: Joi.string(),
        n: Joi.alternatives().try(Joi.number().integer(), Joi.string()),
        over_rate: Joi.number(),
      }),
      sms: Joi.object({
        units: Joi.string(),
        n: Joi.alternatives().try(Joi.number().integer(), Joi.string()),
        over_rate: Joi.number(),
      }),
    }),
    cancel_penalty: Joi.number(),
    sales_tax: Joi.boolean(),
    additional_tarriffs: Joi.array().items({
      kind: Joi.string(),
      amount: Joi.alternatives().try(
        Joi.number(),
        Joi.object({
          percent_of_service: Joi.number(),
        })
      ),
    }),
    warranty_years: Joi.number(),
    term_years: Joi.number(),
    available: Joi.boolean(),
    for: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  });

  return schema.validate(reqBody);
};

export const handlingValidationErrors = (error, res, debug) => {
  debug(error);
  return res.send(error.details[0].message);
};
