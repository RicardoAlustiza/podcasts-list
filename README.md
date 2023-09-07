# Postify: Your podcasts App
This application is running on React using Typescript and Vite as a bundler.

## Installation
  To run the project you need to have installed Node.js and npm. Then you need to install dependencies using 'npm install'.

## Enviroments
  - To run the project on Developer mode use 'npm run dev'. Then open your browser on 'http://localhost:5173'.
  - To run the project on Production mode use 'npm run build' and 'npm run preview'. Then open your browser on 'http://localhost:4173'.
  - To stop the project use 'Ctrl + C' on your terminal.

## Project Structure
  - The project is divided in 2 main folders:
    - **src**: Contains all the source code of the project.
    - **public**: Contains all the static files of the project.

  - The **src** folder is divided in 4 main folders:
    - **assets**: Contains all the assets of the project.
    - **components**: Contains all the components of the project.
    - **services**: Contains all the services of the project.
    - **types**: Contains all the types of the project.

  - The **components** folder is divided in 3 main folders:
    - **HeaderComponent**: Contains all the components of the header.
    - **PodcastsListComponent**: Contains all the components of the Podcasts List, Podcasts Details & Podcasts Items.
    - **shared**: Contains all the shared components of the project such as SpinnerComponent.

## Architecture ##
  - The project is using a **MVC** architecture.
  - The **Model** is represented by the **types** folder.
  - The **View** is represented by the **components** folder.
  - The **Controller** is represented by the **services** folder.