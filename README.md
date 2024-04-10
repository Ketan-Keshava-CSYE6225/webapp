# Cloud Native Web Application

## Tech Stack for the Application

- Programming Language: JavaScript 
- ⁠Relational Database: ⁠ PostgreSQL ⁠
- ⁠Backend Frameworks: ⁠ Node.js, ⁠ Express.js ⁠
- ⁠ORM Framework: ⁠ Sequelize ⁠

## How to Run the Application
To run the application locally, follow these steps:

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/KetanKeshava/Ketan_Keshava_002685540_01.git
   ```

2. Navigate to the project directory:
   ```
   cd Ketan_Keshava_002685540_01
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following environment variables:
   ```
   DB_USERNAME=<your_database_username>
   DB_PASSWORD=<your_database_password>
   DB_NAME=<your_database_name>
   DB_HOST=<your_database_host>
   DB_DIALECT=<your_database_dialect>
   PORT=<desired_port>
   ```

5. To run the application:
   ```
   npm run start
   ```

6. To debug the application:
   ```
   npm run dev
   ```

7. The server will start running at the specified port, and you should see a message indicating the port number in the console.

## Commands
- `npm install`: Install project dependencies.
- `npm run start`: Start the server and run the application.
- `npm run dev`: Start the server and run the application in debug mode.

## References used

- ⁠[Sequelize](https://sequelize.org/docs/v6/getting-started/)
- [REST API with Node.js, Express, and Sequelize](https://medium.com/@mtalhanasir96/building-your-first-rest-api-with-node-js-express-and-sequelize-b041f9910b8a)

## Learning Outcomes
By completing this assignment, I have:

- Efficient GitHub repository organization and setup techniques.
- Understanding the significance of branch protection rules in upholding code quality standards.
- Implementing API design principles and exploring token-based authentication mechanisms.
- Setting up continuous integration with GitHub Actions for streamlined development workflows.

**Note:** Please ensure that the database is configured and accessible before running the application. The application should handle database failures gracefully as per the assignment requirements.
