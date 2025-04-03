<<<<<<< HEAD
# reactapp3
=======
# Grocerly

Grocerly is a modern web application built with Angular that helps users manage recipes and shopping lists efficiently.

## Features

- 🔐 User Authentication (Login/Register)
- 📝 Recipe Management
- 🛒 Smart Shopping Lists
- 👤 User Profile Management
- 📱 Responsive Design
- 🎨 Material Design UI

## Tech Stack

- Angular 18.2.9
- Angular Material
- TypeScript
- RxJS
- Express.js (Backend)

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd grocerly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200/` in your browser.

## Project Structure

```
grocerly/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── shared/
│   │   │   ├── recipes/
│   │   │   └── shopping-list/
│   │   ├── services/
│   │   ├── models/
│   │   ├── guards/
│   │   └── interceptors/
│   ├── assets/
│   └── environments/
└── backend/
    └── src/
        └── routes/
```

## Available Scripts

- `ng serve` - Starts the development server
- `ng build` - Builds the project
- `ng test` - Executes unit tests
- `ng e2e` - Executes end-to-end tests

## Features in Detail

### Authentication
- User registration with email verification
- Secure login system
- Protected routes with auth guards

### Recipe Management
- Create, read, update, and delete recipes
- Search and filter recipes
- Categorize recipes
- Add ingredients and instructions

### Shopping List
- Create and manage shopping lists
- Add items from recipes
- Real-time item updates
- Mark items as purchased

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular Team for the amazing framework
- Material Design for the beautiful UI components
- All contributors who have helped with the project

## Contact

Your Name - [ryan.mota@triosstudent.com]
Project Link: [https://github.com/xGentuso/grocerly]
>>>>>>> 2ace3dc713c0a28dcce7a2b88a6abbaf8d9045b4
