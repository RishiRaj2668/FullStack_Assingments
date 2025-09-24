import React from "react";

// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  getInfo() {
    return `${super.getInfo()}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getInfo() {
    return `${super.getInfo()}, Subject: ${this.subject}`;
  }
}

// React component to demo the classes
export default function PersonHierarchy() {
  const student = new Student("Priya", 21, "Computer Science");
  const teacher = new Teacher("Mr. Sharma", 50, "Mathematics");

  return (
    <div className="max-w-xl mx-auto p-6 border rounded space-y-4">
      <h1 className="text-2xl font-bold">Person Class Hierarchy</h1>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">Student Info</h2>
        <p>{student.getInfo()}</p>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">Teacher Info</h2>
        <p>{teacher.getInfo()}</p>
      </div>
    </div>
  );
}
