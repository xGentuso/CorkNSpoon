-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 19, 2024 at 04:09 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `instructions` text NOT NULL,
  `prep_time` int(11) DEFAULT NULL,
  `cook_time` int(11) DEFAULT NULL,
  `servings` int(11) DEFAULT NULL,
  `difficulty` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `description`, `instructions`, `prep_time`, `cook_time`, `servings`, `difficulty`, `image_url`, `author`, `created_at`, `updated_at`) VALUES
(1, 'Basic Pancakes', 'Fluffy and delicious breakfast pancakes', '1. Mix dry ingredients\n2. Add wet ingredients\n3. Cook on griddle until golden brown', 15, 20, 4, 'easy', NULL, 'Admin', '2024-12-19 13:36:46', '2024-12-19 13:36:46'),
(2, 'Classic Spaghetti Carbonara', 'A creamy Italian pasta dish with pancetta and parmesan', '1. Cook spaghetti in salted water until al dente\n2. Fry pancetta until crispy\n3. Mix eggs, cheese, and pepper\n4. Combine pasta with egg mixture and pancetta\n5. Serve immediately with extra cheese', 10, 20, 4, 'medium', NULL, 'Chef Mario', '2024-12-19 14:59:15', '2024-12-19 14:59:15'),
(3, 'Chicken Stir-Fry', 'Quick and healthy Asian-inspired stir-fry with vegetables', '1. Cut chicken into bite-sized pieces\n2. Prepare vegetables\n3. Stir-fry chicken until golden\n4. Add vegetables and sauce\n5. Serve hot with rice', 20, 15, 3, 'easy', NULL, 'Chef Sarah', '2024-12-19 14:59:33', '2024-12-19 14:59:33'),
(4, 'Chocolate Chip Cookies', 'Soft and chewy cookies with melty chocolate chips', '1. Cream butter and sugars\n2. Add eggs and vanilla\n3. Mix in dry ingredients\n4. Fold in chocolate chips\n5. Bake at 350°F for 12 minutes', 15, 12, 24, 'easy', NULL, 'Baker John', '2024-12-19 14:59:44', '2024-12-19 14:59:44');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_categories`
--

CREATE TABLE `recipe_categories` (
  `recipe_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_categories`
--

INSERT INTO `recipe_categories` (`recipe_id`, `category_id`) VALUES
(1, 1),
(1, 5),
(2, 3),
(3, 3),
(3, 8),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_categories`
--
ALTER TABLE `recipe_categories`
  ADD PRIMARY KEY (`recipe_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`recipe_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipe_categories`
--
ALTER TABLE `recipe_categories`
  ADD CONSTRAINT `recipe_categories_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recipe_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Add categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add some sample categories
INSERT INTO categories (name) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Dessert'),
('Vegetarian'),
('Quick Meals'),
('Italian'),
('Asian'),
('American');

-- Create ingredients table if it doesn't exist
CREATE TABLE IF NOT EXISTS ingredients (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add some sample ingredients
INSERT INTO ingredients (name) VALUES
('All-purpose flour'),
('Sugar'),
('Eggs'),
('Milk'),
('Butter'),
('Salt'),
('Baking powder'),
('Vanilla extract'),
('Chocolate chips'),
('Olive oil'),
('Spaghetti'),
('Pancetta'),
('Parmesan cheese'),
('Chicken breast'),
('Mixed vegetables'),
('Soy sauce'),
('Rice'),
('Brown sugar'),
('Baking soda');

-- Add some sample recipe-ingredient relationships
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
-- Basic Pancakes
(1, 1, 1.5, 'cups'),    -- flour
(1, 2, 0.25, 'cup'),    -- sugar
(1, 3, 1, 'piece'),     -- egg
(1, 4, 1.25, 'cups'),   -- milk
(1, 5, 3, 'tablespoons'), -- butter
(1, 7, 2, 'teaspoons'), -- baking powder

-- Spaghetti Carbonara
(2, 11, 1, 'pound'),    -- spaghetti
(2, 12, 0.5, 'pound'),  -- pancetta
(2, 3, 3, 'pieces'),    -- eggs
(2, 13, 1, 'cup'),      -- parmesan

-- Chicken Stir-Fry
(3, 14, 1, 'pound'),    -- chicken breast
(3, 15, 2, 'cups'),     -- mixed vegetables
(3, 16, 0.25, 'cup'),   -- soy sauce
(3, 17, 2, 'cups'),     -- rice

-- Chocolate Chip Cookies
(4, 1, 2.25, 'cups'),   -- flour
(4, 2, 0.75, 'cup'),    -- sugar
(4, 18, 0.75, 'cup'),   -- brown sugar
(4, 3, 2, 'pieces'),    -- eggs
(4, 5, 1, 'cup'),       -- butter
(4, 8, 1, 'teaspoon'),  -- vanilla
(4, 9, 2, 'cups');      -- chocolate chips
