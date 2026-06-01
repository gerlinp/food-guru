// Ingredient database for the Fridge Raid autocomplete
// Structure: Category → Sub-category → [ingredients]
// Add new items by appending to any sub-category array, or add a new sub-category object.

const INGREDIENT_DB = {

  'Poultry': {
    'Chicken': [
      'whole chicken', 'rotisserie chicken',
      'chicken breast', 'boneless skinless chicken breast', 'bone-in chicken breast',
      'chicken cutlets', 'chicken tenders', 'chicken tenderloin',
      'chicken thighs', 'boneless skinless chicken thighs', 'bone-in chicken thighs',
      'skin-on chicken thighs', 'chicken leg quarters', 'chicken drumsticks',
      'chicken wings', 'chicken wing flats', 'chicken wing drumettes', 'chicken wingettes',
      'ground chicken', 'chicken liver', 'chicken hearts', 'chicken gizzards', 'chicken feet',
      'chicken back', 'chicken carcass',
    ],
    'Turkey': [
      'whole turkey', 'turkey breast', 'bone-in turkey breast', 'turkey cutlets',
      'turkey thighs', 'turkey drumsticks', 'turkey wings', 'ground turkey',
      'turkey bacon', 'turkey sausage', 'turkey liver',
    ],
    'Duck & Other': [
      'duck breast', 'duck legs', 'duck confit', 'whole duck', 'ground duck',
      'duck fat', 'goose breast', 'quail', 'quail eggs', 'Cornish hen',
    ],
  },

  'Beef': {
    'Ground': [
      'ground beef', 'ground beef 80/20', 'ground beef 90/10', 'ground chuck',
      'ground sirloin', 'ground brisket', 'beef patties',
    ],
    'Steaks': [
      'ribeye steak', 'bone-in ribeye', 'NY strip steak', 'sirloin steak',
      'top sirloin steak', 'T-bone steak', 'porterhouse steak', 'filet mignon',
      'beef tenderloin', 'flank steak', 'skirt steak', 'hanger steak',
      'flat iron steak', 'Denver steak', 'chuck eye steak', 'tri-tip steak',
    ],
    'Roasts & Braises': [
      'beef chuck roast', 'beef brisket', 'brisket flat', 'brisket point',
      'beef short ribs', 'flanken short ribs', 'beef back ribs',
      'beef shank', 'oxtail', 'beef cheek', 'beef tongue', 'beef top round',
      'beef bottom round', 'eye of round', 'beef rump roast',
    ],
    'Other': [
      'beef liver', 'beef heart', 'bone marrow', 'beef suet', 'corned beef',
      'pastrami', 'beef stew meat', 'beef cubes',
    ],
  },

  'Pork': {
    'Chops & Tenderloin': [
      'pork chops', 'bone-in pork chops', 'boneless pork chops', 'thick-cut pork chops',
      'pork tenderloin', 'pork loin', 'pork loin roast', 'pork sirloin',
    ],
    'Ribs': [
      'pork ribs', 'baby back ribs', 'spare ribs', 'St. Louis ribs',
      'country-style ribs', 'pork rib tips',
    ],
    'Shoulder & Belly': [
      'pork shoulder', 'pork butt', 'Boston butt', 'pork belly',
      'skin-on pork belly', 'pork picnic',
    ],
    'Cured & Sausage': [
      'bacon', 'thick-cut bacon', 'pancetta', 'guanciale', 'prosciutto',
      'prosciutto di Parma', 'speck', 'coppa', 'mortadella', 'salami',
      'pepperoni', 'ham', 'smoked ham', 'ham hock', 'ground pork',
      'pork sausage', 'Italian sausage', 'sweet Italian sausage', 'hot Italian sausage',
      'chorizo', 'Spanish chorizo', 'Mexican chorizo', 'bratwurst',
      'andouille sausage', 'kielbasa', 'hot dogs', 'pork rinds',
    ],
    'Other': [
      'pork liver', 'pork jowl', 'pork neck bones', 'pig feet',
      'pig ears', 'pork blood',
    ],
  },

  'Lamb & Game': {
    'Lamb': [
      'lamb chops', 'lamb loin chops', 'lamb rib chops', 'rack of lamb',
      'lamb shoulder', 'bone-in lamb shoulder', 'lamb leg', 'bone-in leg of lamb',
      'lamb shank', 'ground lamb', 'lamb neck', 'lamb ribs',
    ],
    'Veal': [
      'veal chops', 'veal cutlets', 'veal scallopini', 'veal osso buco',
      'veal shank', 'ground veal',
    ],
    'Game': [
      'venison', 'venison steak', 'ground venison', 'bison', 'ground bison',
      'elk', 'wild boar', 'rabbit', 'rabbit legs',
    ],
  },

  'Seafood': {
    'Fish — Fillets': [
      'salmon fillet', 'skin-on salmon', 'salmon belly', 'whole salmon',
      'tuna steak', 'ahi tuna', 'yellowfin tuna', 'cod fillet', 'halibut fillet',
      'sea bass fillet', 'striped bass', 'mahi mahi', 'swordfish steak',
      'tilapia fillet', 'trout fillet', 'rainbow trout', 'whole trout',
      'flounder fillet', 'sole fillet', 'snapper fillet', 'red snapper',
      'grouper fillet', 'catfish fillet', 'pollock', 'haddock',
      'branzino', 'whole branzino', 'mackerel', 'sardines', 'anchovies',
      'herring', 'smoked salmon', 'lox', 'smoked trout', 'canned tuna',
      'canned salmon', 'canned sardines',
    ],
    'Shrimp': [
      'shrimp', 'large shrimp', 'jumbo shrimp', 'medium shrimp',
      'extra large shrimp', 'U/10 shrimp', 'U/15 shrimp',
      'peeled shrimp', 'deveined shrimp', 'shell-on shrimp',
      'head-on shrimp', 'frozen shrimp', 'wild-caught shrimp',
      'tiger shrimp', 'spot prawns', 'prawns',
    ],
    'Shellfish': [
      'scallops', 'sea scallops', 'bay scallops', 'dry-packed scallops',
      'lobster', 'lobster tail', 'lobster claws', 'live lobster',
      'crab', 'Dungeness crab', 'blue crab', 'king crab legs',
      'snow crab legs', 'crab meat', 'imitation crab',
      'clams', 'littleneck clams', 'manila clams', 'cherrystone clams',
      'mussels', 'PEI mussels', 'oysters', 'raw oysters',
      'squid', 'calamari rings', 'octopus', 'baby octopus',
      'cuttlefish', 'sea urchin', 'uni',
    ],
  },

  'Vegetables': {
    'Alliums': [
      'yellow onion', 'white onion', 'red onion', 'sweet onion', 'Vidalia onion',
      'pearl onions', 'cipollini onions', 'shallots', 'green onions', 'scallions',
      'leeks', 'chives', 'ramps', 'garlic', 'garlic cloves', 'whole head of garlic',
      'elephant garlic', 'black garlic',
    ],
    'Leafy Greens': [
      'spinach', 'baby spinach', 'kale', 'curly kale', 'lacinato kale', 'baby kale',
      'arugula', 'baby arugula', 'romaine lettuce', 'iceberg lettuce', 'butter lettuce',
      'red leaf lettuce', 'green leaf lettuce', 'Little Gem lettuce', 'bibb lettuce',
      'Swiss chard', 'rainbow chard', 'red chard', 'collard greens', 'mustard greens',
      'bok choy', 'baby bok choy', 'Shanghai bok choy', 'napa cabbage', 'savoy cabbage',
      'green cabbage', 'red cabbage', 'Brussels sprouts', 'watercress',
      'radicchio', 'endive', 'Belgian endive', 'frisée', 'escarole', 'dandelion greens',
    ],
    'Brassicas': [
      'broccoli', 'broccoli florets', 'broccolini', 'broccoli rabe', 'rapini',
      'cauliflower', 'cauliflower florets', 'purple cauliflower', 'Romanesco',
      'kohlrabi', 'turnip greens',
    ],
    'Root Vegetables': [
      'carrots', 'baby carrots', 'rainbow carrots', 'parsnips', 'turnips',
      'rutabaga', 'beets', 'red beets', 'golden beets', 'chioggia beets',
      'radishes', 'daikon radish', 'watermelon radish', 'black radish',
      'celeriac', 'celery root', 'salsify', 'scorzonera', 'jicama',
    ],
    'Potatoes': [
      'russet potatoes', 'Yukon Gold potatoes', 'red potatoes', 'fingerling potatoes',
      'baby potatoes', 'purple potatoes', 'new potatoes', 'sweet potatoes',
      'Japanese sweet potatoes', 'purple sweet potatoes', 'yams', 'taro',
      'cassava', 'yuca',
    ],
    'Nightshades': [
      'roma tomatoes', 'cherry tomatoes', 'grape tomatoes', 'beefsteak tomatoes',
      'heirloom tomatoes', 'plum tomatoes', 'sun gold tomatoes', 'green tomatoes',
      'red bell pepper', 'green bell pepper', 'yellow bell pepper', 'orange bell pepper',
      'mini sweet peppers', 'jalapeño', 'serrano pepper', 'Fresno pepper',
      'habanero', 'scotch bonnet', 'ghost pepper', 'Thai chili', 'bird\'s eye chili',
      'poblano pepper', 'anaheim pepper', 'New Mexico green chile', 'banana pepper',
      'cubanelle pepper', 'shishito peppers', 'padron peppers',
      'eggplant', 'Italian eggplant', 'Japanese eggplant', 'Chinese eggplant',
      'fairy tale eggplant', 'tomatillos',
    ],
    'Squash': [
      'zucchini', 'yellow squash', 'pattypan squash', 'delicata squash',
      'butternut squash', 'acorn squash', 'kabocha squash', 'honeynut squash',
      'spaghetti squash', 'hubbard squash', 'turban squash', 'pumpkin',
      'sugar pumpkin', 'calabaza',
    ],
    'Mushrooms': [
      'white button mushrooms', 'cremini mushrooms', 'baby bella mushrooms',
      'portobello mushrooms', 'shiitake mushrooms', 'oyster mushrooms',
      'king oyster mushrooms', 'maitake mushrooms', 'hen of the woods',
      'chanterelles', 'morel mushrooms', 'porcini mushrooms', 'enoki mushrooms',
      'lion\'s mane mushrooms', 'wood ear mushrooms', 'dried porcini',
      'dried shiitake', 'dried mixed mushrooms',
    ],
    'Other Vegetables': [
      'celery', 'celery stalks', 'fennel', 'fennel bulb', 'asparagus',
      'thin asparagus', 'white asparagus', 'artichokes', 'baby artichokes',
      'corn', 'corn on the cob', 'sweet corn', 'peas', 'fresh peas',
      'snap peas', 'snow peas', 'sugar snap peas', 'green beans', 'haricot verts',
      'yellow wax beans', 'romano beans', 'long beans', 'cucumber',
      'English cucumber', 'Persian cucumber', 'Kirby cucumber', 'avocado',
      'Hass avocado', 'okra', 'hearts of palm', 'bamboo shoots',
      'bean sprouts', 'mung bean sprouts', 'water chestnuts', 'lotus root',
      'bitter melon', 'chayote', 'nopales',
    ],
  },

  'Fresh Herbs': {
    'Common': [
      'parsley', 'flat-leaf parsley', 'curly parsley', 'cilantro', 'basil',
      'sweet basil', 'Thai basil', 'purple basil', 'mint', 'spearmint', 'peppermint',
      'dill', 'chives', 'tarragon', 'French tarragon',
    ],
    'Woody': [
      'thyme', 'lemon thyme', 'rosemary', 'sage', 'oregano', 'marjoram',
      'bay leaves', 'fresh bay leaves',
    ],
    'Asian': [
      'lemongrass', 'kaffir lime leaves', 'shiso', 'perilla', 'green shiso',
      'red shiso', 'Vietnamese mint', 'culantro', 'epazote',
      'makrut lime leaves', 'galangal', 'turmeric root',
    ],
  },

  'Fruits': {
    'Citrus': [
      'lemon', 'Meyer lemon', 'lime', 'Key lime', 'orange', 'navel orange',
      'blood orange', 'cara cara orange', 'grapefruit', 'pink grapefruit',
      'white grapefruit', 'clementine', 'mandarin', 'tangerine', 'yuzu',
      'pomelo', 'kumquat',
    ],
    'Stone Fruits': [
      'peach', 'white peach', 'nectarine', 'plum', 'Italian prune plum',
      'pluot', 'apricot', 'cherries', 'sweet cherries', 'sour cherries',
      'Bing cherries',
    ],
    'Berries': [
      'strawberries', 'blueberries', 'wild blueberries', 'raspberries',
      'blackberries', 'cranberries', 'dried cranberries', 'gooseberries',
      'currants', 'black currants', 'huckleberries', 'elderberries',
    ],
    'Tropical': [
      'mango', 'Ataulfo mango', 'Tommy Atkins mango', 'pineapple',
      'papaya', 'guava', 'passion fruit', 'lychee', 'longan', 'rambutan',
      'jackfruit', 'durian', 'dragon fruit', 'star fruit', 'tamarind',
      'plantain', 'green plantain', 'ripe plantain', 'banana',
    ],
    'Pome & Other': [
      'apple', 'Honeycrisp apple', 'Granny Smith apple', 'Fuji apple',
      'Gala apple', 'Braeburn apple', 'Pink Lady apple',
      'pear', 'Bartlett pear', 'Bosc pear', 'Asian pear',
      'quince', 'fig', 'fresh figs', 'dried figs', 'medjool dates',
      'Deglet Noor dates', 'pomegranate', 'grapes', 'red grapes',
      'green grapes', 'concord grapes', 'watermelon', 'cantaloupe',
      'honeydew', 'kiwi', 'golden kiwi', 'persimmon', 'raisins',
      'golden raisins', 'dried apricots', 'prunes', 'dried cherries',
    ],
  },

  'Dairy': {
    'Butter & Cream': [
      'unsalted butter', 'salted butter', 'European butter', 'cultured butter',
      'ghee', 'clarified butter', 'brown butter', 'compound butter',
      'heavy cream', 'heavy whipping cream', 'light cream', 'half and half',
      'whipping cream', 'double cream',
    ],
    'Milk': [
      'whole milk', '2% milk', '1% milk', 'skim milk', 'raw milk',
      'buttermilk', 'evaporated milk', 'condensed milk', 'sweetened condensed milk',
      'dry milk powder',
    ],
    'Soft Cheese & Cultured': [
      'cream cheese', 'Neufchâtel', 'mascarpone', 'ricotta', 'whole milk ricotta',
      'part-skim ricotta', 'cottage cheese', 'small curd cottage cheese',
      'sour cream', 'full-fat sour cream', 'crème fraîche', 'quark',
      'fromage blanc', 'labneh', 'Greek yogurt', 'whole milk yogurt',
      'plain yogurt', 'skyr', 'kefir',
    ],
    'Fresh & Soft Mold': [
      'fresh mozzarella', 'mozzarella', 'buffalo mozzarella', 'burrata',
      'stracciatella', 'brie', 'Camembert', 'goat cheese', 'chèvre',
      'feta', 'Bulgarian feta', 'paneer', 'halloumi', 'queso fresco',
      'queso blanco', 'cotija', 'ricotta salata',
    ],
    'Aged & Hard': [
      'Parmesan', 'Parmigiano-Reggiano', 'Pecorino Romano', 'aged Pecorino',
      'Grana Padano', 'Asiago', 'cheddar', 'sharp cheddar', 'extra sharp cheddar',
      'white cheddar', 'aged cheddar', 'Gruyère', 'Comté', 'Emmental',
      'Swiss cheese', 'Jarlsberg', 'Havarti', 'Fontina', 'Provolone',
      'aged Provolone', 'Gouda', 'aged Gouda', 'smoked Gouda', 'Manchego',
      'aged Manchego', 'Monterey Jack', 'pepper jack', 'Colby Jack',
      'blue cheese', 'Gorgonzola', 'Roquefort', 'Stilton', 'Maytag blue',
    ],
  },

  'Eggs': {
    'Eggs': [
      'large eggs', 'extra large eggs', 'medium eggs', 'small eggs',
      'egg whites', 'egg yolks', 'whole eggs', 'pasture-raised eggs',
      'free-range eggs', 'hard-boiled eggs', 'duck eggs',
    ],
  },

  'Grains & Pasta': {
    'Rice': [
      'white rice', 'long grain white rice', 'short grain white rice',
      'medium grain white rice', 'jasmine rice', 'basmati rice',
      'sushi rice', 'calrose rice', 'arborio rice', 'carnaroli rice',
      'brown rice', 'long grain brown rice', 'short grain brown rice',
      'wild rice', 'forbidden black rice', 'red rice', 'parboiled rice',
    ],
    'Long Pasta': [
      'spaghetti', 'spaghettini', 'thin spaghetti', 'linguine', 'fettuccine',
      'tagliatelle', 'pappardelle', 'bucatini', 'mafaldine',
    ],
    'Short Pasta': [
      'penne', 'penne rigate', 'rigatoni', 'ziti', 'farfalle', 'fusilli',
      'rotini', 'cavatappi', 'campanelle', 'gemelli', 'orecchiette',
      'ditalini', 'macaroni', 'elbow macaroni', 'conchiglie', 'lumache',
    ],
    'Specialty Pasta': [
      'orzo', 'fregola', 'acini di pepe', 'couscous', 'Israeli couscous',
      'pearl couscous', 'lasagna sheets', 'no-boil lasagna sheets',
      'egg noodles', 'wide egg noodles', 'gnocchi', 'fresh pasta',
    ],
    'Asian Noodles': [
      'udon noodles', 'fresh udon', 'dried udon', 'soba noodles',
      'ramen noodles', 'fresh ramen', 'dried ramen', 'rice noodles',
      'wide rice noodles', 'thin rice noodles', 'rice vermicelli',
      'glass noodles', 'mung bean noodles', 'sweet potato glass noodles',
      'lo mein noodles', 'chow mein noodles', 'wonton noodles',
      'dan dan noodles', 'knife-cut noodles', 'hand-pulled noodles',
    ],
    'Whole Grains': [
      'quinoa', 'white quinoa', 'red quinoa', 'tricolor quinoa',
      'farro', 'semi-pearled farro', 'barley', 'pearl barley', 'hulled barley',
      'bulgur', 'fine bulgur', 'medium bulgur', 'freekeh', 'cracked freekeh',
      'millet', 'buckwheat', 'buckwheat groats', 'amaranth', 'spelt',
      'kamut', 'teff', 'sorghum',
    ],
    'Corn': [
      'polenta', 'quick-cooking polenta', 'fine cornmeal', 'coarse cornmeal',
      'masa harina', 'grits', 'quick grits', 'stone-ground grits', 'hominy',
      'popcorn',
    ],
    'Oats': [
      'rolled oats', 'old-fashioned oats', 'quick oats', 'instant oats',
      'steel cut oats', 'whole oat groats',
    ],
    'Flour': [
      'all-purpose flour', 'bread flour', 'whole wheat flour',
      'whole wheat pastry flour', 'cake flour', 'pastry flour',
      'semolina flour', '00 flour', 'almond flour', 'almond meal',
      'oat flour', 'rice flour', 'white rice flour', 'brown rice flour',
      'tapioca flour', 'tapioca starch', 'arrowroot starch', 'cornstarch',
      'potato starch', 'chickpea flour', 'sorghum flour', 'cassava flour',
    ],
    'Bread': [
      'white sandwich bread', 'whole wheat bread', 'sourdough bread',
      'sourdough boule', 'baguette', 'ciabatta', 'focaccia', 'brioche',
      'challah', 'pita bread', 'naan', 'roti', 'paratha', 'lavash',
      'flour tortillas', 'corn tortillas', 'panko breadcrumbs',
      'plain breadcrumbs', 'Italian breadcrumbs', 'pretzel rolls',
    ],
  },

  'Legumes': {
    'Beans': [
      'black beans', 'dried black beans', 'canned black beans',
      'kidney beans', 'dark red kidney beans', 'light red kidney beans',
      'cannellini beans', 'Great Northern beans', 'navy beans',
      'pinto beans', 'dried pinto beans', 'canned pinto beans',
      'chickpeas', 'garbanzo beans', 'dried chickpeas', 'canned chickpeas',
      'fava beans', 'dried fava beans', 'lima beans', 'baby lima beans',
      'butter beans', 'edamame', 'shelled edamame', 'black-eyed peas',
      'cranberry beans', 'borlotti beans', 'flageolet beans', 'Anasazi beans',
    ],
    'Lentils': [
      'green lentils', 'brown lentils', 'French green lentils', 'Puy lentils',
      'red lentils', 'split red lentils', 'black lentils', 'beluga lentils',
    ],
    'Split Peas': [
      'yellow split peas', 'green split peas', 'mung beans', 'split mung beans',
      'urad dal', 'chana dal', 'toor dal', 'moong dal',
    ],
    'Soy': [
      'tofu', 'firm tofu', 'extra firm tofu', 'soft tofu', 'silken tofu',
      'medium tofu', 'baked tofu', 'smoked tofu', 'tempeh',
      'seitan', 'wheat gluten', 'textured vegetable protein', 'TVP',
      'miso paste', 'white miso', 'red miso', 'yellow miso', 'barley miso',
    ],
  },

  'Oils & Fats': {
    'Oils': [
      'extra virgin olive oil', 'olive oil', 'light olive oil',
      'vegetable oil', 'canola oil', 'grapeseed oil', 'sunflower oil',
      'safflower oil', 'avocado oil', 'peanut oil', 'corn oil',
      'coconut oil', 'refined coconut oil', 'toasted sesame oil',
      'sesame oil', 'walnut oil', 'hazelnut oil', 'truffle oil',
      'chili oil', 'garlic oil',
    ],
    'Animal Fats': [
      'lard', 'leaf lard', 'duck fat', 'chicken fat', 'schmaltz',
      'beef tallow', 'suet',
    ],
  },

  'Canned & Jarred': {
    'Tomatoes': [
      'canned whole peeled tomatoes', 'canned crushed tomatoes',
      'canned diced tomatoes', 'canned fire-roasted tomatoes',
      'tomato paste', 'tomato purée', 'passata', 'marinara sauce',
      'sun-dried tomatoes', 'sun-dried tomatoes in oil',
    ],
    'Stocks & Broth': [
      'chicken stock', 'chicken broth', 'low-sodium chicken broth',
      'beef stock', 'beef broth', 'vegetable broth', 'vegetable stock',
      'fish stock', 'dashi', 'bonito dashi', 'kombu dashi', 'clam juice',
      'bone broth',
    ],
    'Other': [
      'canned corn', 'canned coconut milk', 'roasted red peppers',
      'artichoke hearts', 'hearts of palm', 'capers', 'caper brine',
      'green olives', 'kalamata olives', 'black olives', 'olive tapenade',
      'pickled jalapeños', 'banana peppers', 'pepperoncini',
    ],
  },

  'Sauces & Condiments': {
    'Asian': [
      'soy sauce', 'low-sodium soy sauce', 'tamari', 'coconut aminos',
      'fish sauce', 'Thai fish sauce', 'oyster sauce', 'hoisin sauce',
      'dark soy sauce', 'light soy sauce', 'sweet soy sauce', 'kecap manis',
      'mirin', 'sake', 'Shaoxing wine', 'rice wine', 'Chinkiang vinegar',
      'gochujang', 'doenjang', 'ssamjang', 'gochugaru', 'doubanjiang',
      'XO sauce', 'chili bean paste', 'black bean sauce', 'fermented black beans',
      'sesame paste', 'chili oil', 'chili crisp', 'Lao Gan Ma',
    ],
    'Hot Sauces': [
      'sriracha', 'sambal oelek', 'chili garlic sauce', 'sweet chili sauce',
      'Tabasco', 'Frank\'s RedHot', 'Crystal hot sauce', 'Valentina',
      'Tapatio', 'habanero hot sauce', 'ghost pepper sauce',
    ],
    'Western': [
      'ketchup', 'yellow mustard', 'Dijon mustard', 'whole grain mustard',
      'spicy brown mustard', 'honey mustard', 'mayonnaise', 'Duke\'s mayo',
      'Worcestershire sauce', 'A1 steak sauce', 'BBQ sauce',
      'sweet BBQ sauce', 'spicy BBQ sauce', 'Kansas City BBQ',
      'Carolina BBQ sauce', 'ranch dressing', 'Caesar dressing',
      'balsamic glaze',
    ],
    'Middle Eastern & Other': [
      'tahini', 'harissa', 'rose harissa', 'pomegranate molasses',
      'tamarind paste', 'tamarind concentrate', 'amba',
      'zhug', 'chermoula', 'chimichurri', 'salsa verde',
      'pesto', 'basil pesto', 'sun-dried tomato pesto', 'romesco',
      'hummus', 'tzatziki', 'baba ganoush',
    ],
    'Sweet': [
      'honey', 'raw honey', 'hot honey', 'maple syrup', 'pure maple syrup',
      'agave nectar', 'molasses', 'blackstrap molasses', 'corn syrup',
      'light corn syrup', 'dark corn syrup', 'golden syrup',
    ],
    'Vinegars': [
      'balsamic vinegar', 'aged balsamic', 'red wine vinegar',
      'white wine vinegar', 'apple cider vinegar', 'rice wine vinegar',
      'seasoned rice vinegar', 'sherry vinegar', 'champagne vinegar',
      'white vinegar', 'malt vinegar',
    ],
  },

  'Spices & Seasonings': {
    'Everyday': [
      'kosher salt', 'sea salt', 'flaky sea salt', 'Maldon salt',
      'pink Himalayan salt', 'black pepper', 'white pepper',
      'red pepper flakes', 'cayenne pepper', 'garlic powder',
      'granulated garlic', 'onion powder', 'granulated onion',
    ],
    'Warm Spices': [
      'cinnamon', 'ground cinnamon', 'cinnamon sticks', 'nutmeg', 'whole nutmeg',
      'allspice', 'ground allspice', 'cloves', 'ground cloves',
      'cardamom', 'ground cardamom', 'green cardamom pods', 'black cardamom',
      'star anise', 'mace', 'ginger powder',
    ],
    'Earthy & Smoky': [
      'cumin', 'ground cumin', 'whole cumin seeds', 'coriander', 'ground coriander',
      'coriander seeds', 'turmeric', 'smoked paprika', 'sweet paprika',
      'hot paprika', 'Hungarian paprika', 'chipotle powder', 'ancho chili powder',
      'guajillo powder', 'Aleppo pepper', 'Urfa biber',
    ],
    'Seeds': [
      'mustard seeds', 'yellow mustard seeds', 'black mustard seeds',
      'fennel seeds', 'caraway seeds', 'celery seeds', 'nigella seeds',
      'black sesame seeds', 'white sesame seeds', 'poppy seeds',
      'fenugreek seeds', 'ajwain',
    ],
    'Dried Herbs': [
      'dried oregano', 'dried thyme', 'dried rosemary', 'dried basil',
      'dried sage', 'dried dill', 'dried marjoram', 'dried tarragon',
      'dried bay leaves', 'dried parsley', 'herbes de Provence', 'Italian seasoning',
      'bouquet garni',
    ],
    'Blends': [
      'chili powder', 'curry powder', 'Madras curry powder', 'garam masala',
      'tandoori masala', 'za\'atar', 'sumac', 'ras el hanout', 'baharat',
      'berbere', 'dukkah', 'hawaij', 'Chinese five spice', 'seven spice',
      'Old Bay', 'Cajun seasoning', 'Creole seasoning', 'jerk seasoning',
      'blackening seasoning', 'everything bagel seasoning', 'furikake',
      'shichimi togarashi',
    ],
    'Other': [
      'MSG', 'nutritional yeast', 'dried mushroom powder', 'truffle salt',
      'saffron', 'vanilla bean', 'vanilla extract', 'almond extract',
      'liquid smoke',
    ],
  },

  'Baking': {
    'Leavening & Binders': [
      'baking soda', 'baking powder', 'active dry yeast', 'instant yeast',
      'fresh yeast', 'cream of tartar', 'gelatin', 'unflavored gelatin',
      'agar agar', 'xanthan gum', 'psyllium husk',
    ],
    'Sugar & Sweeteners': [
      'granulated sugar', 'white sugar', 'caster sugar', 'brown sugar',
      'light brown sugar', 'dark brown sugar', 'powdered sugar',
      'confectioners sugar', 'raw sugar', 'turbinado sugar',
      'coconut sugar', 'palm sugar',
    ],
    'Chocolate': [
      'dark chocolate', '70% dark chocolate', '85% dark chocolate',
      'semisweet chocolate', 'bittersweet chocolate', 'milk chocolate',
      'white chocolate', 'cocoa powder', 'Dutch process cocoa',
      'natural cocoa powder', 'chocolate chips', 'semisweet chips',
      'dark chocolate chips', 'cacao nibs',
    ],
  },

  'Nuts & Seeds': {
    'Tree Nuts': [
      'almonds', 'whole almonds', 'sliced almonds', 'slivered almonds',
      'blanched almonds', 'walnuts', 'walnut halves', 'pecans', 'pecan halves',
      'cashews', 'whole cashews', 'cashew pieces', 'pistachios', 'shelled pistachios',
      'hazelnuts', 'pine nuts', 'macadamia nuts', 'Brazil nuts', 'chestnuts',
    ],
    'Peanuts': [
      'peanuts', 'dry roasted peanuts', 'honey roasted peanuts',
      'peanut butter', 'creamy peanut butter', 'crunchy peanut butter',
      'natural peanut butter',
    ],
    'Nut Butters': [
      'almond butter', 'cashew butter', 'hazelnut butter', 'sunflower seed butter',
      'tahini', 'pistachio paste',
    ],
    'Seeds': [
      'sunflower seeds', 'pumpkin seeds', 'pepitas', 'sesame seeds',
      'chia seeds', 'flaxseeds', 'ground flaxseed', 'hemp seeds',
      'poppy seeds',
    ],
  },

  'Dairy Alternatives': {
    'Milk': [
      'oat milk', 'barista oat milk', 'almond milk', 'unsweetened almond milk',
      'soy milk', 'unsweetened soy milk', 'coconut milk beverage',
      'cashew milk', 'rice milk', 'macadamia milk', 'pea milk',
    ],
    'Other': [
      'vegan butter', 'plant-based butter', 'coconut cream', 'vegan cream cheese',
      'cashew cream', 'vegan mozzarella', 'vegan Parmesan', 'nutritional yeast',
      'coconut yogurt', 'almond yogurt', 'soy yogurt', 'oat milk creamer',
    ],
  },

  'Alcohol': {
    'Wine': [
      'dry white wine', 'Chardonnay', 'Sauvignon Blanc', 'Pinot Grigio',
      'Pinot Gris', 'dry red wine', 'Cabernet Sauvignon', 'Merlot',
      'Pinot Noir', 'dry sherry', 'Marsala wine', 'sweet Marsala',
      'dry Marsala', 'port', 'Madeira', 'white vermouth', 'dry vermouth',
    ],
    'Beer': [
      'lager', 'pale ale', 'IPA', 'stout', 'Guinness', 'porter', 'ale',
      'wheat beer', 'dark beer', 'amber ale',
    ],
    'Spirits': [
      'bourbon', 'whiskey', 'Scotch', 'rye whiskey', 'brandy', 'cognac',
      'rum', 'dark rum', 'white rum', 'spiced rum', 'vodka', 'gin',
      'tequila', 'blanco tequila', 'mezcal', 'Kahlúa', 'Grand Marnier',
      'amaretto', 'sambuca',
    ],
  },
};

// Flat sorted list for fast autocomplete — generated from the nested structure above
const INGREDIENT_LIST = Object.values(INGREDIENT_DB)
  .flatMap(category => Object.values(category).flat());
