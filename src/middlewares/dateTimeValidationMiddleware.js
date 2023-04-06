import dayjs from "dayjs";
import errors from "../errors/index.js";

export function dateTimeValidation(req, res, next) {
    const { time, day } = req.body;

    const validTimeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);

    if (!validTimeRegex) {
      throw errors.unprocessableEntityError("Invalid time format or input");
    }

    const validDate = dayjs(day, "DD/MM/YYYY").isValid() && dayjs(day, "DD/MM/YYYY").isAfter(dayjs(), "day");

  if (!validDate) {
    throw errors.unprocessableEntityError("Invalid date format or input");
  }

    next();
  }
  
  export default dateTimeValidation;