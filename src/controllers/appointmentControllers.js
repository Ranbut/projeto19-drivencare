import appointmentServices from "../services/appointmentServices.js";

async function create(req, res, next) {
  const { medicId, day, time } = req.body;
  const { id : userId } = res.locals.user;
  try {
    await appointmentServices.create({ medicId, userId, day, time });

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function confirmStatus(req, res, next) {
  const { appointId , status } = req.params;
  const { id : medicId } = res.locals.user;

  try {
    await appointmentServices.confirmStatus({ status, medicId, appointId });

    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

async function showAppointements(req, res, next){
  const { id : userId } = res.locals.user;
  const type = res.locals.type;
  try {
    const { rows: appointments } = await appointmentServices.showAppointements(userId, type);

    return res.send(appointments);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function showHistoric(req, res, next){
  const { id : userId } = res.locals.user;
  const type = res.locals.type;
  try {
    const { rows: appointments } = await appointmentServices.showHistoric(userId, type);

    return res.send(appointments);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export default {
  create,
  confirmStatus,
  showAppointements,
  showHistoric
};