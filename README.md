# LLM Chatbot for WGV Insurance

## Overview

ChatLYN is a project aimed at developing a chatbot using GPT-4.0 for WGV Insurance. The chatbot serves as a sales assistant, helping customers with their insurance needs by providing information and guiding them through the sales process.

## Features

- **Intelligent Conversations**: Leverages GPT-4.0 to provide human-like responses and assist customers with their queries.
- **PDF Creator**: Generates PDFs based on customer interactions and data.
- **API Integration**: Connects to various APIs to retrieve and update customer information.
- **Dataset Management**: Utilizes a dataset specifically tailored for WGV Insurance to improve the chatbot's performance.

## Project Structure

├── angular/chatlyn
│ └── PDF Creator Success
├── dataset/WGV_Broschüren
│ └── Dataset for Chatbot 2.0
├── db
│ └── Initial Commit
├── server
│ └── Vorfinal (PDF download fehlt noch)
├── .dockerignore
│ └── Initial Commit
├── README.md
│ └── Initial Commit
└── docker-compose.yaml
└── API Connection to default GPT


### Directories

- **angular/chatlyn**: Contains the front-end code for the chatbot, built with Angular.
- **dataset/WGV_Broschüren**: Contains datasets used to train and improve the chatbot.
- **db**: Database files and configurations.
- **server**: Server-side code and API implementations.

## Getting Started

### Prerequisites

- Docker
- Node.js
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BuenyA/ChatLYN.git

2. Navigate to the project directory:
    cd ChatLYN

3. Install dependencies for the Angular app:
    cd angular/chatlyn
    npm install

4. Start the Docker containers:
    docker-compose up

### Usage

1. Run the Angular application:
    ng serve

2. Access the chatbot via your web browser at http://localhost:4200
