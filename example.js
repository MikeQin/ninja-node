const Joi = require("joi");
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Data
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

// Root
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// Get All Courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Get A Course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send(`The course with the given ID ${req.params.id} was not found`);
    return;
  }
  res.send(course);
});

// Create A Course
app.post("/api/courses", (req, res) => {
  // object destructor {error} equals to 'result.error'
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// Update A Course
app.put("/api/courses/:id", (req, res) => {
  // 1. find the course to be updated
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send(`The course with the given ID ${req.params.id} was not found`);
    return;
  }

  // 2. Validate the course
  const { error } = validateCourse(req.body); // destructor {error} equals to 'result.error'
  if (error) {
    res.status(400).send(error.details[0].message);
    //res.status(400).send(result.error);
    return;
  }

  // 3. Update the course
  course.name = req.body.name;

  // 4. Send the updated course back
  res.send(course);
});

// Delete A Course
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send(`The course with the given ID ${req.params.id} was not found`);
    return;
  }

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// Test Request Params: /api/posts/2019/5
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// Test Query Params: /api/posts?sortedBy=name&number=1
app.get("/api/posts", (req, res) => {
  console.log(`Query Params sortedBy: ${req.query.sortedBy}`);
  console.log(`Query Params number: ${req.query.number}`);
  res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

function validateCourse(course) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required()
  });

  return Joi.validate(course, schema);
}
