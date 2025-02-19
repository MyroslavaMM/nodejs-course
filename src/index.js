const express = require("express");
const { swaggerUi, specs } = require("./swagger");

const app = express();
const PORT = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Health check endpoint
 *     description: Checks if the server is running.
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "Server is running"
 */
app.get("/health-check", (req, res) => {
  res.status(200).json({
    status: "200",
    message: "Server is running",
  });
});

/**
 * @swagger
 * /test-data:
 *   get:
 *     summary: Get test data
 *     description: Test the data
 *     responses:
 *       200:
 *         description: Test the data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "name"
 *                 lastName:
 *                   type: string
 *                   example: "last name"
 */
app.get("/test-data", (req, res) => {
  res.status(200).json({
    name: "username",
    lastName: "lastName",
  });
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with a name and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *       400:
 *         description: Bad request
 */
app.post("/user", (req, res) => {
  const {name, lastName} = req.body;
  if (!name || !lastName) {
    return res.status(400).json({ message: "Name and last name are required" });
  }
  const newUser = { id: Date.now(), name, lastName };
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

