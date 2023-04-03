import errors from "../errors/index.js";
import appointmentsRepositories from "../repositories/appointmentsRepositories.js";

async function create({ medicId, userId, day, time }) {
  const { rowCount } = await appointmentsRepositories.findDuplicate(medicId, day, time);
  if (rowCount) throw errors.duplicatedAppointmentError();
  
  await appointmentsRepositories.create(medicId, userId, day, time);
}

async function confirmStatus({ status, medicId, appointId }) {
  if (isNaN(appointId)) throw errors.invalidId();
  const { rowCount } = await appointmentsRepositories.findById(medicId, appointId);
  if (!rowCount) throw errors.appointmentNotFound();

  await appointmentsRepositories.confirmStatus(status, medicId, appointId);
}

export default {
  create,
  confirmStatus
};