import Student from "../models/Student.js";

const generateEnrollment = async () => {
  const year = new Date().getFullYear();
  let enrollmentNumber;

  // Retry if a generated number already exists.
  do {
    const randomPart = Math.floor(100000 + Math.random() * 900000);
    enrollmentNumber = `SMS${year}${randomPart}`;
  } while (await Student.exists({ enrollmentNumber }));

  return enrollmentNumber;
};

export default generateEnrollment;
