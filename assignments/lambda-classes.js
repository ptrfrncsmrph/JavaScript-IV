// CODE here for your Lambda Classes
// ## `lambda-classes` - We need a roster of Lambda School personnel. Build it!

// * We have a school to build here! This project will get you used to thinking about classes in JavaScript and building them from a brand new data set.
// * Lambda personnel can be broken down into three different types of `people`.
//   * **Instructors** - extensions of Person
//   * **Students** - extensions of Person
//   * **Project Managers** - extensions of Instructors
// * **IMPORTANT** - You'll need to create 2 - 3 objects for each class and test them according to their unique Attributes. For example:

// #### Person

// * First we need a Person class. This will be our `base-class`
// * Person receives `name` `age` `location` `gender` all as props
// * Person receives `speak` as a method.
// * This method logs out a phrase `Hello my name is Fred, I am from Bedrock` where `name` and `location` are the object's own props

class Person {
  constructor(props) {
    this.name = props.name
    this.age = props.age
    this.location = props.location
    this.gender = props.gender
  }
  speak() {
    return `Hello my name is ${this.name}, I am from ${this.location}`
  }
}

// #### Instructor

// * Now that we have a Person as our base class, we'll build our Instructor class.
// * Instructor uses the same attributes that have been set up by Person
// * Instructor has the following unique props:
//   * `specialty` what the Instructor is good at i.e. 'redux'
//   * `favLanguage` i.e. 'JavaScript, Python, Elm etc.'
//   * `catchPhrase` i.e. `Don't forget the homies`
// * Instructor has the following methods:
//   * `demo` receives a `subject` string as an argument and logs out the phrase 'Today we are learning about {subject}' where subject is the param passed in.
//   * `grade` receives a `student` object and a `subject` string as arguments and logs out '{student.name} receives a perfect score on {subject}'

const randInRange = (min, max) => Math.round(Math.random() * (max - min) + min)
const clamp = (min, max) => num => (num < min ? min : num > max ? max : num)

class Instructor extends Person {
  constructor(props) {
    super(props)
    this.specialty = props.specialty
    this.favLanguage = props.favLanguage
    this.catchPhrase = props.catchPhrase
  }
  demo(subject) {
    return `Today we are learning about ${subject}`
  }
  grade(student, subject) {
    return `${student.name} receives a perfect score on ${subject}`
  }
  setGrade(student, factor) {
    const change = randInRange(-factor, factor)
    const oldGrade = student.grade
    student.grade = clamp(0, 100)(oldGrade + change)
    return `${student.name}'s grade has been changed from ${oldGrade} to ${
      student.grade
    }`
  }
}

// #### Student

// * Now we need some students!
// * Student uses the same attributes that have been set up by Person
// * Student has the following unique props:
//   * `previousBackground` i.e. what the Student used to do before Lambda School
//   * `className` i.e. CS132
//   * `favSubjects`. i.e. an array of the student's favorite subjects ['Html', 'CSS', 'JavaScript']
// * Student has the following methods:
//   * `listsSubjects` a method that logs out all of the student's favoriteSubjects one by one.
//   * `PRAssignment` a method that receives a subject as an argument and logs out that the `student.name has submitted a PR for {subject}`
//   * `sprintChallenge` similar to PRAssignment but logs out `student.name has begun sprint challenge on {subject}`

class Student extends Person {
  constructor(props) {
    super(props)
    this.previousBackground = props.previousBackground
    this.className = props.className
    this.favSubjects = props.favSubjects
    this.grade = props.grade || 0
  }
  listSubjects() {
    return this.favSubjects
  }
  PRAssignments(subject) {
    return `${this.name} has submitted a PR for ${subject}`
  }
  sprintChallenge(subject) {
    return `${this.name} has begun sprint challenge on ${subject}`
  }
}

// #### Project Mananger

// * Now that we have instructors and students, we'd be nowhere without our PM's
// * ProjectManagers are extensions of Instructors

// * ProjectManagers have the following uniqe props:
//   * `gradClassName`: i.e. CS1
//   * `favInstructor`: i.e. Sean
// * ProjectManangers have the following Methods:
//   * `standUp` a method that takes in a slack channel and logs `{name} announces to {channel}, @channel standy times!​​​​​
//   * `debugsCode` a method that takes in a student object and a subject and logs out `{name} debugs {student.name}'s code on {subject}`

class ProjectManager extends Instructor {
  constructor(props) {
    super(props)
    this.gradClassName = props.gradClassName
    this.favInstructor = props.favInstructor
  }
  standUp(channel) {
    return `${this.name} announces to ${channel}, @channel standy times!`
  }
  debugsCode(student, subject) {
    return `${this.name} debugs ${student.name}'s code on ${subject}`
  }
}

const fred = new Instructor({
  name: "Fred",
  location: "Bedrock",
  age: 37,
  gender: "male",
  favLanguage: "JavaScript",
  specialty: "Front-end",
  catchPhrase: `Don't forget the homies`
})

const jan = new Student({
  name: "Jan",
  age: 32,
  location: "New York",
  gender: "N/A",
  previousBackground: "Sculptor",
  className: "WEB17",
  favSubjects: ["Hermeneutics", "Hermetics", "Homotopy Type Theory"]
})

const todd = new ProjectManager({
  name: "Todd",
  location: "Billerica",
  age: 47,
  gender: "male",
  favLanguage: "Agda",
  specialty: "Front-end",
  catchPhrase: "Forgettabouddit",
  gradClassName: "CS-1",
  favInstructor: fred
})

const steve = new Student({
  name: "Steve",
  age: 82,
  location: "Yonkers",
  gender: undefined,
  previousBackground: "Retiree",
  className: "WEB17",
  favSubjects: ["Homotopy Type Theory", "Physics"],
  grade: 97
})

// Testing
const assert = require("assert")

const cases = [
  [todd.speak(), "Hello my name is Todd, I am from Billerica"],
  [jan.speak(), "Hello my name is Jan, I am from New York"],
  [fred.speak(), "Hello my name is Fred, I am from Bedrock"],
  [todd.standUp("#memes"), "Todd announces to #memes, @channel standy times!"],
  [todd.debugsCode(jan, "Perl"), "Todd debugs Jan's code on Perl"],
  [jan.favSubjects.join(", "), "Hermeneutics, Hermetics, Homotopy Type Theory"],
  [
    jan.sprintChallenge("Python-I"),
    "Jan has begun sprint challenge on Python-I"
  ],
  [jan.grade, 0],
  [steve.grade, 97]
]

const runTests = cases => {
  cases.forEach(([c, expect]) => {
    assert(c === expect, `Expected: ${expect}, received: ${c}`)
  })
  console.log("All tests passing!")
}

runTests(cases)

todd.setGrade(steve, 30)
