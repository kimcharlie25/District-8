/*
  # District 8 Menu Items Migration
  
  This migration adds all menu items and categories for District 8.
  
  1. Categories
    - Creates categories: Mains, Pasta, Pizza, Salad, Soup, Cakes, Add-ons, Beverages
  
  2. Menu Items
    - Adds all menu items with their respective prices
    - Uses auto-generated UUIDs for IDs
*/

-- Insert Categories
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
('mains', 'Mains', '🍽️', 1, true),
('pasta', 'Pasta', '🍝', 2, true),
('pizza', 'Pizza', '🍕', 3, true),
('salad', 'Salad', '🥗', 4, true),
('soup', 'Soup', '🍲', 5, true),
('cakes', 'Cakes', '🍰', 6, true),
('add-ons', 'Add-ons', '➕', 7, true),
('beverages', 'Beverages', '🥤', 8, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Insert MAINS
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Filipino Beef Steak', 'Classic Filipino beef steak with onions and savory sauce', 380, 'mains', true, true),
('Beef Rendang', 'Rich and tender Indonesian-style beef curry', 380, 'mains', true, true),
('Battered Chicken', 'Crispy battered chicken with special seasoning', 285, 'mains', false, true),
('Chicken Afritada', 'Filipino-style chicken stew with tomato sauce and vegetables', 325, 'mains', false, true),
('Chicken Adobo', 'Traditional Filipino chicken cooked in vinegar and soy sauce', 325, 'mains', true, true),
('Special Chopsuey', 'Mixed vegetables with savory sauce', 295, 'mains', false, true),
('Tempura Shrimp', 'Crispy Japanese-style battered shrimp', 290, 'mains', false, true),
('Seafood Cajun', 'Spicy Cajun-style mixed seafood', 380, 'mains', true, true),
('Beef Broccoli', 'Tender beef with fresh broccoli in oyster sauce', 380, 'mains', false, true),
('Lumpia Shanghai', 'Filipino-style spring rolls with ground pork', 225, 'mains', true, true),
('Sweet & Sour Fish', 'Crispy fish fillet with sweet and sour sauce', 295, 'mains', false, true),
('Bihon Guisado', 'Stir-fried rice noodles with vegetables', 290, 'mains', false, true),
('Bam-E Guisado', 'Combination of egg noodles and rice noodles with vegetables', 290, 'mains', false, true),
('Canton Guisado', 'Stir-fried egg noodles with vegetables', 290, 'mains', false, true);

-- Insert PASTA
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Chicken Alfredo', 'Creamy Alfredo sauce with tender chicken', 279, 'pasta', true, true),
('Seafood Marinara', 'Mixed seafood with rich marinara sauce', 279, 'pasta', false, true),
('Cajun Shrimp Penne', 'Spicy Cajun shrimp with penne pasta', 279, 'pasta', false, true),
('Tuna Carbonara', 'Creamy carbonara with tuna', 279, 'pasta', false, true),
('Bolognese', 'Classic meat sauce pasta', 279, 'pasta', true, true);

-- Insert PIZZA
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Three Cheese', 'Mozzarella, cheddar, and parmesan cheese blend', 295, 'pizza', true, true),
('Beef & Mushroom', 'Savory beef with fresh mushrooms', 295, 'pizza', false, true),
('Beef Pepperoni', 'Classic pepperoni pizza', 295, 'pizza', true, true),
('Hawaiian', 'Ham and pineapple with mozzarella', 295, 'pizza', false, true),
('Creamy Spinach', 'White sauce pizza with fresh spinach', 295, 'pizza', false, true);

-- Insert SALAD
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Caesar Salad', 'Classic Caesar salad with croutons and parmesan', 210, 'salad', true, true),
('Kani Salad', 'Japanese-style crab stick salad', 220, 'salad', false, true),
('Garden Sesame Salad', 'Fresh garden vegetables with sesame dressing', 240, 'salad', false, true),
('Waldorf Salad', 'Apple, celery, and walnut salad with creamy dressing', 240, 'salad', false, true),
('Mexican Taco Salad', 'Taco-seasoned beef with fresh vegetables', 290, 'salad', false, true);

-- Insert SOUP
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Chicken Tinola', 'Filipino ginger chicken soup with green papaya', 320, 'soup', true, true),
('Blue Marlin Tinola', 'Ginger fish soup with blue marlin', 345, 'soup', false, true),
('Beef Nilaga', 'Filipino beef soup with vegetables', 380, 'soup', false, true),
('Shrimp Sinigang', 'Sour tamarind-based shrimp soup', 295, 'soup', true, true),
('Bangus Sinigang', 'Sour tamarind-based milkfish soup', 295, 'soup', false, true),
('Beef Sinigang', 'Sour tamarind-based beef soup', 380, 'soup', false, true);

-- Insert CAKES
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Blueberry Cheesecake', 'Rich and creamy blueberry cheesecake', 140, 'cakes', true, true),
('Strawberry Cheesecake', 'Classic strawberry cheesecake', 140, 'cakes', true, true),
('Mango Delight Cheesecake', 'Tropical mango cheesecake', 140, 'cakes', false, true),
('Ube Cake', 'Filipino purple yam cake', 125, 'cakes', false, true),
('Red Velvet', 'Classic red velvet cake with cream cheese frosting', 130, 'cakes', true, true),
('Chocolate Cake', 'Rich chocolate layer cake', 130, 'cakes', false, true),
('Carrot Cake', 'Moist carrot cake with cream cheese frosting', 130, 'cakes', false, true);

-- Insert ADD-ONS
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Extra Rice', 'Additional serving of steamed rice', 30, 'add-ons', false, true),
('Unli Rice', 'Unlimited rice for your meal', 90, 'add-ons', true, true),
('Extra Egg', 'Add a fried egg to your dish', 30, 'add-ons', false, true),
('Garlic Rice', 'Fragrant garlic fried rice', 45, 'add-ons', false, true);

-- Insert BEVERAGES
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
('Fresh Mango Shake', 'Fresh mango blended with milk', 150, 'beverages', true, true),
('Fresh Guyabano Shake', 'Refreshing soursop fruit shake', 150, 'beverages', false, true),
('Fresh Avocado Shake', 'Creamy avocado shake', 150, 'beverages', false, true),
('Coke Zero (in can)', 'Coca-Cola Zero Sugar in can', 60, 'beverages', false, true),
('Sprite', 'Sprite in a glass with ice', 39, 'beverages', false, true),
('Coke', 'Coca-Cola in a glass with ice', 39, 'beverages', false, true),
('Fruit Tea Blends', 'Assorted fruit tea flavors', 95, 'beverages', false, true),
('Soda Float', 'Soda with ice cream', 95, 'beverages', false, true),
('Ice Blended Frappe (16oz)', 'Frozen blended coffee frappe', 185, 'beverages', true, true),
('Ice Blended Frappe (22oz)', 'Large frozen blended coffee frappe', 185, 'beverages', false, true),
('Freshmilk Fruit Puree', 'Fresh milk with fruit puree', 185, 'beverages', false, true),
('Messy Frappe', 'Premium loaded frappe with toppings', 220, 'beverages', true, true),
('Cheesecake Milktea (16oz)', 'Creamy cheesecake-flavored milk tea', 170, 'beverages', false, true),
('Cheesecake Milktea (22oz)', 'Large creamy cheesecake-flavored milk tea', 170, 'beverages', false, true),
('Iced Coffee', 'Cold brewed iced coffee', 170, 'beverages', false, true),
('Juice in a Jar', 'Fresh fruit juice served in a jar', 180, 'beverages', false, true);

