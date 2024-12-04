# Speedometer Project

## Project Overview
This is a full-stack Speedometer application with a React frontend, Node.js backend, and MySQL database, containerized using Docker Compose.

## Prerequisites
- Docker
- Docker Compose
- Node.js (optional, for local development)


## Getting Started

### 1. Clone the Repository
```bash

cd Speedometer

Environment Setup
Ensure you have Docker and Docker Compose installed on your system.


Running the Application

# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build


Accessing the Application

Frontend: http://localhost:5173
Backend API: http://localhost:5000

Services

Frontend: React application using Vite
Backend: Node.js server
Database: MySQL

Configuration

Database Credentials:

Root Password: Put_your_MySQL_password
Database Name: speedometer_db


Stopping the Application

docker-compose down