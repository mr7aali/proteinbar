import { connectDatabase } from './config/database';
import { MenuItem, MenuCategory } from './modules/menu/model';
import { Product } from './modules/products/model';
import { Location } from './modules/locations/model';
import { MonthlyPlan } from './modules/monthly-plans/model';

const menuItems = [
  {
    id: 'leggs-day',
    name: "L'EGGS DAY",
    description:
      'Omelette (min 2 - max 6) œufs complets aux épinards et tomates cerises, patate douce au four, mesclun de salade, 200ml jus d\'orange frais.',
    priceMad: 45,
    calories: 794,
    protein: 48,
    carbs: 52,
    fat: 38,
    category: 'Breakfast',
    availability: 'Active' as const,
  },
  {
    id: 'good-morning',
    name: 'GOOD MORNING',
    description:
      'Bagel œuf-guacamole, bagel banane-beurre de cacahuète maison, 2 œufs au plat, mesclun de salade, 200ml jus d\'orange frais.',
    priceMad: 65,
    calories: 756,
    protein: 36,
    carbs: 90,
    fat: 28,
    category: 'Breakfast',
    availability: 'Active' as const,
  },
  {
    id: 'coleman',
    name: 'COLEMAN',
    description:
      'Pancakes salés, bresaola, œuf au plat, sirop d\'érable, graine de sésame, jus d\'orange 200ml.',
    priceMad: 65,
    calories: 528,
    protein: 36,
    carbs: 60,
    fat: 15,
    category: 'Breakfast',
    availability: 'Active' as const,
  },
];

const products = [
  {
    id: 'compose-plate',
    handle: 'im-composing',
    title: "I'm composing!",
    description: 'Build your own protein plate with your preferred macros.',
    priceMad: 0,
    image: '/food/food.png',
    category: 'custom',
    availability: 'Active' as const,
  },
  {
    id: 'keto-avocado-burger',
    handle: 'keto-avocado-burger',
    title: 'Keto avocado burger',
    description: 'Low-carb burger option for keto-focused diets.',
    priceMad: 90,
    image: '/food/food13.webp',
    category: 'Lunch',
    availability: 'Active' as const,
    nutritionalInfo: {
      calories: 450,
      protein: 35,
      carbs: 15,
      fat: 28,
    },
  },
  {
    id: 'pancake-beef-burger',
    handle: 'pancake-beef-burger',
    title: 'Pancake beef burger',
    description: 'Savory pancakes with beef patty and balanced macros.',
    priceMad: 90,
    image: '/food/food10.webp',
    category: 'Lunch',
    availability: 'Active' as const,
    nutritionalInfo: {
      calories: 520,
      protein: 40,
      carbs: 45,
      fat: 18,
    },
  },
  {
    id: 'healthy-salmon-avocado-pizza',
    handle: 'healthy-salmon-avocado-pizza',
    title: 'Healthy salmon avocado pizza',
    description: 'Fresh salmon and avocado on a light healthy crust.',
    priceMad: 190,
    image: '/food/food14.webp',
    category: 'Dinner',
    availability: 'Active' as const,
    nutritionalInfo: {
      calories: 580,
      protein: 38,
      carbs: 52,
      fat: 22,
    },
  },
];

const locations = [
  {
    id: 'anfa-casablanca',
    name: 'PROTEINBAR - Bourgone.',
    address: '7 Rue Ibnou Jahir, Casablanca',
    phone: '0520-206366',
    mapUrl: 'https://maps.google.com/?q=7+Rue+Ibnou+Jahir+Casablanca',
    city: 'Casablanca',
    isActive: true,
  },
  {
    id: 'maarif-casablanca',
    name: 'PROTEINBAR - Val Fleuri.',
    address: '95 Rue Bachir Laalej, Casablanca',
    phone: '0522-235539',
    mapUrl: 'https://maps.google.com/?q=95+Rue+Bachir+Laalej+Casablanca',
    city: 'Casablanca',
    isActive: true,
  },
];

const monthlyPlans = [
  {
    id: 'custom-plan',
    title: 'Custom Plan',
    description:
      'Build your own monthly subscription with meals and snacks aligned with your fitness goals.',
    image: '/food/food.png',
    pricing: {
      basePrice: 0,
      mealPrice: 18,
      snackPrice: 8,
    },
    features: ['Flexible meal selection', 'Custom macros', 'Daily or weekly delivery'],
    isActive: true,
  },
  {
    id: 'super-saver',
    title: 'Super Saver Subscription',
    description:
      'A balanced monthly plan focused on daily consistency, healthy variety, and affordable pricing.',
    image: '/food/food11.webp',
    pricing: {
      basePrice: 0,
      mealPrice: 15,
      snackPrice: 6,
    },
    features: ['Best value', 'Balanced nutrition', 'Daily delivery'],
    isActive: true,
  },
  {
    id: 'keto',
    title: 'Keto Plan',
    description: 'Low-carb, high-fat meal structure for people following ketogenic nutrition.',
    image: '/food/food13.webp',
    pricing: {
      basePrice: 0,
      mealPrice: 20,
      snackPrice: 10,
    },
    features: ['Low carb', 'High fat', 'Ketogenic meals'],
    isActive: true,
  },
  {
    id: 'lose-weight',
    title: 'Lose Weight',
    description:
      'A guided deficit approach with portioned meals that help cut fat while staying energized.',
    image: '/food/food2.png',
    pricing: {
      basePrice: 0,
      mealPrice: 18,
      snackPrice: 8,
    },
    features: ['Calorie deficit', 'Portion controlled', 'Fat loss focused'],
    isActive: true,
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    await connectDatabase();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await MenuItem.deleteMany({});
    await MenuCategory.deleteMany({});
    await Product.deleteMany({});
    await Location.deleteMany({});
    await MonthlyPlan.deleteMany({});

    // Seed menu items
    console.log('📝 Seeding menu items...');
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ Created ${createdMenuItems.length} menu items`);

    // Seed menu category
    console.log('📝 Seeding menu categories...');
    const breakfastCategory = await MenuCategory.create({
      id: 'high-protein-breakfast',
      name: 'BREAKFAST',
      description: 'Petits Déjeuners',
      items: createdMenuItems.map((item) => item._id),
      displayOrder: 1,
      isVisible: true,
    });
    console.log(`✅ Created menu category: ${breakfastCategory.name}`);

    // Seed products
    console.log('📝 Seeding products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Seed locations
    console.log('📝 Seeding locations...');
    const createdLocations = await Location.insertMany(locations);
    console.log(`✅ Created ${createdLocations.length} locations`);

    // Seed monthly plans
    console.log('📝 Seeding monthly plans...');
    const createdPlans = await MonthlyPlan.insertMany(monthlyPlans);
    console.log(`✅ Created ${createdPlans.length} monthly plans`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nSeeded data:');
    console.log(`  - ${createdMenuItems.length} menu items`);
    console.log(`  - 1 menu category`);
    console.log(`  - ${createdProducts.length} products`);
    console.log(`  - ${createdLocations.length} locations`);
    console.log(`  - ${createdPlans.length} monthly plans`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
