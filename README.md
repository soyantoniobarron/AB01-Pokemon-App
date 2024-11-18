# PokemonApp

This project was generated with Angular CLI version 18.2.11.

## Installation

To get started, follow these steps:

1. **Install Angular CLI**:
   - If you haven't installed Angular CLI yet, you can do so via **Node.js and npm** or **Homebrew**:

     - **Using npm**:
       ```bash
       npm install -g @angular/cli
       ```

     - **Using Homebrew** (for macOS users):
       ```bash
       brew install angular-cli
       ```

2. **Clone the repository**:
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-repo/pokemon-app.git
     cd pokemon-app
     ```

3. **Install dependencies**:
   - Once inside the project folder, install the required dependencies:
     ```bash
     npm install
     ```

## Running the Application

After installation, follow these steps to run the application:

1. **Start the development server**:
   - To launch the app locally, run:
     ```bash
     ng serve
     ```

2. **Navigate to the application**:
   - Open your browser and visit:
     ```
     http://localhost:4200/
     ```

   - The application will automatically reload if you make changes to any of the source files.

## Additional Features

The application has several key features:

- **Card View for Listing**: The list of Pokemons is displayed in a card format, offering a more visually appealing way to browse the data.
  
- **State Management with Signal**: Pokemon data is stored and managed using **Signal**, ensuring a smooth state management system across the app.

- **Error Messages in Full-Screen**: Any error messages are displayed in a full-screen modal, ensuring that users notice and address any issues.

- **Pokemon Search**: The application allows users to search for Pokémon based on the following parameters:
  - **ID**
  - **Name**
  - **Type**
  - **Weight**
  - **Abilities**

## Code Scaffolding

To generate a new component, service, directive, pipe, or other elements, you can use the following commands:

- Generate a new component:
  ```bash
  ng generate component component-name
  ```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
