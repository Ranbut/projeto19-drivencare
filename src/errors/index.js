function unprocessableEntityError(message) {
    return {
      name: "UnprocessableEntityError",
      message: "The format given was invalid" + message,
    };
  }
  
  function duplicatedAppointmentError() {
    return {
      name: "DuplicatedAppointmentError",
      message: "There's already an appointment schedule for this time and date",
    };
  }

  function duplicatedDateTimeAvaliable() {
    return {
      name: "DuplicatedAppointmentError",
      message: "This time and date was used already",
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
  
  function patientNotFound() {
    return {
      name: "PatientNotFound",
      message: "Patient not found",
    };
  }

  function dateTimeAvaliableNotFound() {
    return {
      name: "DateTimeAvaliableNotFound",
      message: "There's no date or time avaliable",
    };
  }

  function appointmentNotFound() {
    return {
      name: "AppointmentNotFound",
      message: "There's no appointment to confirm at this time",
    };
  }

  function medicNotFound() {
    return {
      name: "MedicNotFound",
      message: "Medic not found",
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
    duplicatedDateTimeAvaliable,
    medicNotFound,
    patientNotFound,
    dateTimeAvaliableNotFound,
    appointmentNotFound,
    invalidId,
    notFoundError
  };