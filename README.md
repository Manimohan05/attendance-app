# Attendance Program

This project is a basic attendance system that allows users to log in, mark their attendance, and view attendance records. The application is built with Node.js and Express on the backend, uses SQLite for data management, and is deployed on Heroku.

## Features

- **User Authentication**: Users can register and log in to the system.
- **Mark Attendance**: Logged-in users can mark their attendance for the day.
- **View Attendance**: Users can view their attendance history.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Hosting**: Heroku

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (Node Package Manager)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. **Clone the repository**

    ```bash
    git clone https://github.com/Manimohan05/attendance-app.git
    cd attendance-program
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    DATABASE_URL=your_database_path_here
    ```

4. **Run the application**

    ```bash
    npm start
    ```

    This will start the server on `localhost:3000`.

## Deployment

To deploy this project on Heroku, follow these steps:

1. Create a Heroku account and log in.
2. Install the Heroku CLI and log in through the CLI.
3. Create a new Heroku app:

    ```bash
    heroku create
    ```

4. Push your repository to Heroku:

    ```bash
    git push heroku master
    ```

5. Open the application in your browser:

    ```bash
    heroku open
    ```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Manimohan05/attendance-app/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

For the versions available, see the [tags on this repository](https://github.com/Manimohan05/attendance-app/tags). 

## Authors

-  [Manimohan05](https://github.com/Manimohan05)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
