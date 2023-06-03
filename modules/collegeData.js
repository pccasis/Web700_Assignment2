const fs = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}


let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
      if (err) {
        reject('Unable to read students.json');
        return;
      }
      fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
        if (err) {
          reject('Unable to read courses.json');
          return;
        }
        const students = JSON.parse(studentDataFromFile);
        const courses = JSON.parse(courseDataFromFile);
        dataCollection = new Data(students, courses);
        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length == 0) {
      reject('No results returned');
    } else {
      resolve(dataCollection.students);
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection.courses.length == 0) {
      reject('No results returned');
    } else {
      resolve(dataCollection.courses);
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    const tas = dataCollection.students.filter(student => student.TA == true);
    if (tas.length == 0) {
      reject('No results returned');
    } else {
      resolve(tas);
    }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getCourses,
  getTAs
};
