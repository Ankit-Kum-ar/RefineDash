# RefineDash 🚀

RefineDash is an enterprise-level dashboard application built using **React**, **GraphQL**, **TypeScript**, **Ant Design**, and the **Refine-dev** framework. It provides an intuitive user interface with features like task management, company management, and a detailed overview of upcoming events, activities, and deals.

## Overview 🌟

RefineDash provides a powerful set of tools for managing tasks, tracking company data, and visualizing business metrics. It includes:

- **Authentication**: Login, Sign-up, and Forget Password functionality.
- **Dashboard**: Overview of events, activities, and deals (graph of wins and losses).
- **Companies Page**: List of companies with the ability to perform CRUD operations.
- **Tasks Page**: Interactive task management system with drag-and-drop functionality.
- **Logout**: Ability to log out of the application securely.

## Features 🔧

- **User Authentication**: Secure login, sign-up, and forgot password.
- **Interactive Dashboard**: Displays key metrics such as deals, activities, contacts, and companies.
- **Company Management**: CRUD functionality on the Companies page for editing and deleting companies.
- **Task Management**: A Kanban-style board for managing tasks across different categories (Unassigned, Todo, In Progress, In Review, Done).
  - Drag and drop tasks between categories.
  - Edit and delete task cards.

## Tech Stack 🛠️

- **Frontend**: React, TypeScript, Ant Design
- **Backend**: GraphQL (for data querying and mutations)
- **State Management**: React Context API (or other preferred state management libraries)
- **UI Framework**: Ant Design (for responsive and clean UI components)
- **Framework**: Refine-dev (for admin panel and rapid application development)

## Installation ⬇️

### Prerequisites

Make sure you have **Node.js** (version 14 or higher) and **npm** or **yarn** installed.

### Steps to Get Started

1. Clone the repository:
   ```bash
    git clone https://github.com/Ankit-Kum-ar/refinedash.git
    cd refinedash
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    ```

4. **Open in your browser**: 
    Navigate to `http://localhost:5173/` to see the Dashboard.


## Usage 🖥️

- **Login**:  Users will first need to authenticate by entering their username/email and password.
- **Dashboard**: Once logged in, the user is redirected to the Dashboard, which provides an overview of events, activities, and deals.
- **Companies**: The user can view and manage companies (CRUD operations).
- **Tasks**: The user can manage tasks using a drag-and-drop interface, changing the task status by moving them between categories (Unassigned, Todo, In Progress, In Review, Done).
- **Logout**: Click on the logout button to end the session.

## Authentication Flow 🔑

The authentication flow is the starting point of the application. It contains the following pages:

- **Login Page**: Allows users to log in with their credentials.
- **Sign Up Page**: A registration page for new users.
- **Forgot Password Page**: If the user has forgotten their password, they can request a reset.

Once logged in, users are redirected to the Dashboard page.

## Dashboard 📊

The Dashboard is the home screen after login and includes:

- **Upcoming Events**: A list of scheduled events.
- **Latest Activities**: Recent actions or activities by the user or the team.
- **Deals (Graph of Wins and Losses)**: A graph showing the number of successful and unsuccessful deals.
- **Stats**: Information about contacts and companies in the system.

## Companies 🏢

The Companies page provides a list of companies and allows you to:

- **View Details**: Click on a company to view detailed information.
- **Edit**: Update information about the company.
- **Delete**: Remove a company from the system.

## Tasks 📋

The Tasks page features a Kanban-style board with the following sections:

- **Unassigned**: Tasks that are not yet assigned to anyone.
- **Todo**: Tasks that are planned but not yet started.
- **In Progress**: Tasks currently being worked on.
- **In Review**: Tasks that are under review before completion.
- **Done**: Tasks that have been completed.

The most interesting feature of the Tasks page is the **drag-and-drop** functionality that allows users to move tasks from one section to another. Users can also **edit** or **delete** task cards.

## Refine-dev 🔥

[Refine](https://refine.dev) is a framework that accelerates the development of admin panels and internal tools. It is built to be highly customizable and extensible, and it integrates seamlessly with React and TypeScript.

### Refine Features Used in RefineDash

- **Data Providers**: RefineDash utilizes Refine’s built-in GraphQL provider to manage data fetching, mutations, and pagination for the Companies and Tasks pages.
- **CRUD Operations**: The Companies page leverages Refine's CRUD operations to allow users to perform Create, Read, Update, and Delete actions easily on the companies list.
- **Auth Provider**: The authentication system is handled using Refine’s customizable AuthProvider. This integrates the login, sign-up, and password reset functionalities.
- **Customizable UI**: Refine integrates smoothly with **Ant Design** to provide out-of-the-box UI components like forms, tables, and modals, which are used throughout the app.

Refine's structure helps to simplify the development process by providing built-in components and logic, reducing boilerplate code and allowing you to focus on customizing the features according to your needs.

For more information, check out the official [Refine Documentation](https://refine.dev/docs).

## Contributing 🤝

We welcome contributions to RefineDash! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch to your fork.
5. Open a Pull Request.

### Guidelines

- Ensure code quality by following TypeScript conventions.
- Write clear and concise commit messages.
- Test your changes before submitting a PR.

---

## 🙏 Thank You for Exploring RefineDash!
Happy coding! 🚀

