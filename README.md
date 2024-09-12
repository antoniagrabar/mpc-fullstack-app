# mpc-fullstack-app

This repository contains the project created for my master's thesis. The project demonstrates the application of Secure Multiparty Computation (MPC) technology to develop a privacy-preserving web platform. The platform enables secure data collection and analysis on the frequency of cyberattacks while ensuring the privacy of individual user data. By leveraging MPC, the platform showcases that it is possible to analyze sensitive data without breaching confidentiality.

## Project Structure
The project is structured into the following directories:
- `client`: The client-side application built with Next.js.
- `server-service-provider`: Server-side application that handles service provider functionalities.
- `server-analyst`: Server-side application responsible for data analysis.

## Getting Started

### Cloning the Repository
To clone the repository to your local machine, run the following command:
```bash
git clone https://github.com/antoniagrabar/mpc-fullstack-app.git
```

### Installation
Install the required dependencies by running the following command in each directory:
```bash
npm install
```

### Setting Up MongoDB
For local database implementation, I used MongoDB Community Edition. Follow the instructions on MongoDB's official installation guide for your operating system.
After installation, start MongoDB using the following command (for MacOS):
```bash
brew services start mongodb-community@7.0
```
You can use MongoDB Compass GUI to manage and visualize your database.

### Configuration
Create .env.local files in all directories, following the templates provided in the .env-example files. 

#### MongoDB URI
In the .env.local file of both server directories, define the MONGO_URI variable with the following format:
```bash
MONGO_URI="mongodb://localhost:27017/{database_name}"
```
For the service provider, use the database name serviceProvider, and for the analyst, use analyst.

####  Service Provider .env.local
Add the following variables:
- PORT: Define a port number
- JWT_SECRET_KEY: Generate a JWT secret key using this command:
```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
- ANALYST_URL: The URL for accessing the analyst API (e.g., http://localhost:{port}/api).

#### Analyst .env.local
Add the following variables:
- PORT: Define a port number different from the service provider
- SYMMETRIC_KEY: Generate a 32-byte symmetric encryption key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

#### Client .env.local
Add the following variables:
- NEXT_PUBLIC_SERVICE_PROVIDER_URL: URL for accessing the service provider API
- NEXT_PUBLIC_ANALYST_URL: URL for accessing the analyst API
- NEXTAUTH_URL: Local address of the client app
- NEXTAUTH_SECRET: Should match JWT_SECRET_KEY in the service provider's .env.local
- NEXT_PUBLIC_ANALYST_EMAIL: Email used to log in as an analyst


### Generating RSA Keys
In the server-analyst directory, run the following commands to generate RSA keys for encryption:
```bash
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out publickey.crt
```

### Running the Application
To run the application, in each directory run:
```bash
npm run dev
```
