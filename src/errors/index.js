function unprocessableEntityError(message) {
    return {
      name: "UnprocessableEntityError",
      message: "The format given was invalid",
    };
  }
  
  function duplicatedEmailError(email) {
    return {
      name: "DuplicatedEmailError",
      message: "Already have an user with given email",
      email,
    };
  }
  
  function duplicatedCpfError(cpf) {
    return {
      name: "DuplicatedCpfError",
      message: "Already have an user with given CPF",
      cpf,
    };
  }

  function invalidCredentialsError() {
    return {
      name: "InvalidCredentialsError",
      message: "Email or password are incorrect",
    };
  }
  
  function unauthorizedError() {
    return {
      name: "UnauthorizedError",
      message: "User unauthorized, sign in to use the service",
    };
  }
  
  function duplicatedAppointmentError() {
    return {
      name: "DuplicatedAppointmentError",
      message: "There's already an appointment schedule for this time and date",
    };
  }
  
  function medicNotFound() {
    return {
      name: "MedicNotFound",
      message: "Medic not found",
    };
  }
  
  function patientNotFound() {
    return {
      name: "PatientNotFound",
      message: "Patient not found",
    };
  }

  function appointmentNotFound() {
    return {
      name: "AppointmentNotFound",
      message: "There's no appointment to confirm at this time",
    };
  }
  
  function invalidId() {
    return {
      name: "InvalidId",
      message: "Invalid id",
    };
  }
  
  function notFoundError() {
    return {
      name: "NotFoundError",
      message: "No result for this search",
    };
  }
  

  export default {
    unprocessableEntityError,
    invalidCredentialsError,
    duplicatedEmailError,
    duplicatedCpfError,
    unauthorizedError,
    duplicatedAppointmentError,
    medicNotFound,
    patientNotFound,
    appointmentNotFound,
    invalidId,
    notFoundError
  };