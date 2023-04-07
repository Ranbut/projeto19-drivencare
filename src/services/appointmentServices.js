import dayjs from "dayjs";
import errors from "../errors/index.js";
import appointmentsRepositories from "../repositories/appointmentsRepositories.js";

async function create(medicId, userId, date, time) {

  const { rowCount: rowDateTime, rows: [dateTime]} = await appointmentsRepositories.findDateTimeAvaliable(date, time);
  if (!rowDateTime) throw errors.dateTimeAvaliableNotFound();

  const dateTimeId = dateTime.id

  const { rowCount: rowAppointment } = await appointmentsRepositories.findDuplicate(medicId, dateTimeId);
  if (rowAppointment) throw errors.duplicatedAppointmentError();
  
  await appointmentsRepositories.create(medicId, userId, dateTimeId);
}

async function confirmStatus({ status, medicId, appointId }) {

  if (isNaN(appointId)) throw errors.invalidId();
  
  const { rowCount } = await appointmentsRepositories.findById(medicId, appointId);
  if (!rowCount) throw errors.appointmentNotFound();

  await appointmentsRepositories.confirmStatus(status, medicId, appointId);
}

async function showAppointements(userId, type) {

  const date = dayjs().format('DD/MM/YYYY');

  if (type === "patient")
    return await appointmentsRepositories.showPatientsApointementsID(userId, date);

  if (type === "medic")
    return await appointmentsRepositories.showMedicApointementsID(userId, date);
}

async function showHistoric(userId, type) {
  if (type === "patient")
    return await appointmentsRepositories.showPatientsHistoricID(userId);

  if (type === "medic")
    return await appointmentsRepositories.showMedicHistoricID(userId);
}

export default {
  create,
  showAppointements,
  showHistoric,
  confirmStatus
};