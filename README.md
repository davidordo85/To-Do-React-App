# ToDo App

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The ToDo app is a task management application that allows users to organize their tasks into lists, providing a convenient way to keep track of their activities. Users can create, delete, and modify both lists and tasks. Additionally, the app supports the ability to move tasks between lists.

## Features

- **Create Lists:**

  - Users can create new task lists to categorize their tasks.

- **Delete Lists:**

  - Lists can be deleted to remove unnecessary categorizations.

- **Create Tasks:**

  - Users can add tasks to specific lists, providing details such as task name, due date, description, priority, and estimated duration.

- **Delete Tasks:**

  - Tasks can be deleted when they are completed or no longer relevant.

- **Modify Tasks:**

  - Users can update task details, including name, due date, description, priority, and estimated duration.

- **Move Tasks Between Lists:**
  - Tasks can be easily moved between different lists to adapt to changing priorities or categories.

## Data Storage

This application uses local storage to store your task lists and tasks on your device. Local storage is a simple and secure way to ensure that your data is saved, allowing you to access your tasks even if you close or refresh your browser. Rest assured that your information is stored locally and is not shared with any external services.

## Privacy Information

This application uses your browser's local storage to save your task lists and tasks directly on your device. Your data remains on your device and is not sent or stored on external servers. We respect your privacy, and your information is entirely under your control.

### What is Stored Locally?

- Task Lists: Names of your task lists.
- Tasks: Details such as task names, due dates, descriptions, priorities, and estimated durations.

### Your Control:

- Your data is fully controlled by you, and it is stored securely within your browser's local storage.
- No data is transmitted to external servers.

### Data Security:

- We prioritize the security of your data, and it is stored following the security measures of your browser's local storage.

## Getting Started

Follow these steps to set up the ToDo app on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/davidordo85/To-Do-React-App
   ```

2. Navigate to the project directory:

   ```bash
   cd todoApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be accessible at http://localhost:5137.

## Usage

1. Create a List:

   - Click on the "Create list" button, enter the list name, and press "Create."

2. Add Task:

   - Within a list, click on "Create task" to add a new task with relevant details.

3. Modify Tasks:

   - Click on the task's "Edit" icon to modify its details.

4. Move Tasks:

   - Drag and drop tasks between lists to reorganize them.

5. Delete Lists or Tasks:
   - Click on the "Delete" button next to a list or task to remove it.

## License

This project is licensed under the [MIT License](LICENSE.txt).
