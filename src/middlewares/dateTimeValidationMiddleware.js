import dayjs from "dayjs";
import errors from "../errors/index.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

export function dateTimeValidation(req, res, next) {
    const { time, date } = req.body;

    const dateFormat = "DD/MM/YYYY";

    const validTimeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);

    if (!validTimeRegex) {
      throw errors.unprocessableEntityError(": Invalid time format or input");
    }

    const validDate = dayjs(date, dateFormat).isValid() && dayjs(date, "DD/MM/YYYY").isAfter(dayjs(), "day");

  if (!validDate) {
    throw errors.unprocessableEntityError(": Invalid time format or input");
  }

    next();
  }
  
  export default dateTimeValidation;