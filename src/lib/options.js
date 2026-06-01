// Chef Tool — full option library for the tag picker

const CT_DIETARY = [
  'Vegan', 'Vegetarian', 'Pescatarian', 'Flexitarian',
  'Dairy-free', 'Gluten-free', 'Egg-free', 'Soy-free', 'Nut-free', 'Corn-free',
  'Keto', 'Paleo', 'Whole30', 'Carnivore', 'Low-carb', 'Low-fat', 'Low-sodium',
  'Low-sugar', 'Low-FODMAP', 'High-protein',
  'Mediterranean', 'Diabetic-friendly', 'Heart-healthy', 'Anti-inflammatory',
  'Halal', 'Kosher', 'Raw', 'Macrobiotic',
];

const CT_ALLERGIES = [
  'Peanuts', 'Tree nuts', 'Almonds', 'Cashews', 'Walnuts', 'Pecans', 'Pistachios',
  'Shellfish', 'Shrimp', 'Crab', 'Lobster',
  'Fish', 'Salmon', 'Tuna', 'Cod',
  'Eggs', 'Dairy', 'Milk', 'Cheese', 'Butter',
  'Wheat', 'Gluten', 'Soy', 'Sesame', 'Corn', 'Mustard',
  'Sulfites', 'Nightshades', 'Tomatoes', 'Peppers', 'Eggplant',
  'Onion', 'Garlic', 'Citrus', 'Coconut',
  'Alcohol', 'Caffeine', 'Lupin', 'Celery',
];

const CT_CUISINES = [
  // Asia
  'Japanese', 'Korean', 'Chinese', 'Cantonese', 'Szechuan', 'Thai', 'Vietnamese',
  'Indonesian', 'Filipino', 'Indian', 'Pakistani', 'Sri Lankan', 'Nepali',
  // Middle East & Africa
  'Lebanese', 'Persian', 'Turkish', 'Israeli', 'Moroccan', 'Ethiopian',
  'West African', 'Egyptian',
  // Europe
  'Italian', 'French', 'Spanish', 'Greek', 'Portuguese', 'German',
  'British', 'Scandinavian', 'Eastern European',
  // Americas
  'Mexican', 'Peruvian', 'Brazilian', 'Argentine', 'Cuban',
  'Jamaican', 'Caribbean', 'American Southern', 'Cajun / Creole', 'Tex-Mex',
  // Other
  'Fusion', 'New Nordic', 'Modern European',
];

const CT_EQUIPMENT = [
  'No oven', 'No stovetop', 'No stand mixer', 'No food processor', 'No blender',
  'Instant Pot', 'Air fryer', 'Slow cooker', 'Rice cooker',
  'Single skillet only', 'One pot only', 'Sheet pan only',
  'Microwave only', 'No grill', 'Outdoor grill only',
];

const CT_SKILLS = ['Beginner', 'Comfortable', 'Pro'];

const CT_POPULAR = [
  { label: 'Vegan',       type: 'Dietary'   },
  { label: 'Gluten-free', type: 'Dietary'   },
  { label: 'Dairy-free',  type: 'Dietary'   },
  { label: 'Keto',        type: 'Dietary'   },
  { label: 'Peanuts',     type: 'Allergies' },
  { label: 'Shellfish',   type: 'Allergies' },
  { label: 'Italian',     type: 'Cuisine'   },
  { label: 'Japanese',    type: 'Cuisine'   },
  { label: 'Mexican',     type: 'Cuisine'   },
  { label: 'Korean',      type: 'Cuisine'   },
];
