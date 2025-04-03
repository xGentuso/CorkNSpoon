# Cork & Spoon 🍽️

Cork & Spoon is a modern web application that helps users discover, create, and manage recipes while exploring wine pairings and nutritional information. Built with React and powered by the Spoonacular API, it offers a seamless culinary experience.

## ✨ Features

* 🔍 Recipe Discovery & Search
* 🍷 Wine Pairing Recommendations
* 📊 Nutritional Information Analysis
* 💾 Save Favorite Recipes
* 🛒 Product Recommendations
* 📱 Responsive Design
* 🎨 Modern UI/UX

## 🛠️ Tech Stack

* **Frontend:**
  * React 18+
  * React Router DOM
  * Axios
  * React Icons
  * React Toastify
  * Bootstrap 5

* **Backend:**
  * Node.js
  * Express.js
  * MongoDB
  * Spoonacular API Integration

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm (v9 or higher)
* Spoonacular API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xGentuso/Grocerly.git
cd CorkSpoon
```

2. Install frontend dependencies:
```bash
cd recipesite
npm install
```

3. Install backend dependencies:
```bash
cd ../recipe-backend
npm install
```

4. Create a `.env` file in the backend directory with your Spoonacular API key:
```env
SPOONACULAR_API_KEY=your_api_key_here
```

5. Start the development servers:

Backend:
```bash
cd recipe-backend
npm start
```

Frontend:
```bash
cd recipesite
npm start
```

6. Visit `http://localhost:3000` in your browser.

## 📁 Project Structure

```
CorkSpoon/
├── recipe-backend/          # Backend server
│   ├── routes/             # API routes
│   └── server.js           # Server configuration
│
└── recipesite/             # React frontend
    ├── public/             # Static files
    └── src/
        ├── components/     # React components
        ├── styles/        # CSS styles
        └── config/        # Configuration files
```

## 🌟 Key Features in Detail

### Recipe Discovery
* Browse through curated recipes
* Search by ingredients or dish names
* Filter by dietary restrictions and cuisine types

### Wine Pairing
* Get wine recommendations for dishes
* View detailed wine descriptions
* Explore complementary flavors

### Nutritional Information
* Detailed nutritional breakdown
* Caloric information
* Dietary indicators

### Product Recommendations
* Find ingredients and cooking tools
* Compare prices
* View product details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Ryan Mota - ryan.mota@triosstudent.com

Project Link: [https://github.com/xGentuso/Grocerly](https://github.com/xGentuso/Grocerly)
