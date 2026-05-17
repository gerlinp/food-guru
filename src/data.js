// ─── Default data ────────────────────────────────────────────────────────────
const RECIPES_DEFAULT = [
  { id:'chicken-parm-sandwich', title:'Chicken Parm Sandwich', author:'Guru', cuisine:'Italian-American', category:'Sandwiches', tags:['comfort','crispy','weekend'], minutes:45, servings:2, difficulty:'Intermediate', rating:4.8, reviews:0, tint:'t2', photo:'images/chicken-parm.webp', date:'Aug 26, 2020',
    description:'A proper chicken parm sandwich — pounded breast in a seasoned panko crust, quick tomato sauce, garlicky butter-toasted bread, and a two-minute mozzarella melt. One breast makes two sandwiches.',
    ingredients:[
      {qty:'1',       item:'chicken breast'},
      {qty:'to taste',item:'salt'},
      {qty:'to taste',item:'black pepper'},
      {qty:'to taste',item:'garlic powder'},
      {qty:'1 cup',   item:'flour (varies with breast size)'},
      {qty:'1–2',     item:'large eggs, beaten'},
      {qty:'to cover',item:'panko breadcrumbs'},
      {qty:'1 tsp',   item:'dried oregano (divided — some into panko, some into sauce)'},
      {qty:'1 tsp',   item:'red pepper flakes'},
      {qty:'1 tsp',   item:'sugar'},
      {qty:'1 can (15 oz)', item:'tomato sauce'},
      {qty:'1 can (6 oz)',  item:'tomato paste'},
      {qty:'4 tbsp',  item:'unsalted butter'},
      {qty:'2 cloves',item:'garlic, minced'},
      {qty:'to taste',item:'parsley flakes or fresh parsley'},
      {qty:'to taste',item:'Parmesan, grated'},
      {qty:'to cover',item:'fresh mozzarella, sliced'},
      {qty:'2',       item:'ciabatta or French bread rolls'},
      {qty:'as needed',item:'neutral cooking oil, for frying'},
      {qty:'drizzle', item:'olive oil, for finishing (optional)'},
    ],
    steps:[
      'Using a meat mallet, pound the chicken breast until it is completely even in thickness from end to end. Cut in half — one breast makes two sandwiches.',
      'Season both sides generously with salt, pepper, and garlic powder. Mix a pinch of garlic powder and a pinch of oregano into the panko breadcrumbs.',
      'Set up a breading station: flour, beaten eggs, then seasoned panko. Dip the chicken in each in that order, making sure it is fully coated at every stage before moving on.',
      'Fry in oil heated to 350°F for about 10 minutes, turning once, until golden and cooked through. Timing will vary with the thickness of the breast — keep watch.',
      'While the chicken fries, make the sauce: stir together the tomato sauce, tomato paste, 1 tsp oregano, 1 tsp red pepper flakes, 1 tsp garlic powder, 1 tsp sugar, and salt and pepper to taste.',
      'Make the garlic butter: mix softened butter with minced garlic, a handful of Parmesan, and parsley. Spread on the cut sides of the rolls and cook on a skillet or under the broiler until golden.',
      'Place the fried cutlets on a baking sheet. Spoon sauce over each and lay mozzarella on top. Bake at 375°F for 2–5 minutes, just until the cheese is melted — pull it before it dries out.',
      'To assemble: spread tomato sauce on the bottom bun, lay the sauced chicken on top, and drizzle with olive oil before crowning with the garlic bread top.',
    ],
    notes:'One breast makes two sandwiches — cut it before pounding so each half is uniformly thin and fries evenly. Do not skip the olive oil drizzle at the end; it pulls the whole thing together.' },
  { id:'spicy-broiled-salmon', title:'Spicy Broiled Salmon', author:'Guru', cuisine:'Korean-Inspired', category:'Seafood', tags:['spicy','quick','healthy'], minutes:20, servings:1, difficulty:'Easy', rating:4.8, reviews:0, tint:'t3', photo:'images/spicy-broiled-salmon.webp', video:'https://www.youtube.com/watch?v=BCnYUrkSj8Y', date:'May 27, 2020', updated:'Sep 25, 2020',
    description:'A deeply caramelized gochujang glaze on a broiled salmon fillet — spicy, sticky, and ready in under 20 minutes. The sauce doubles as a finishing drizzle over the rice.',
    ingredients:[
      {qty:'6 oz',    item:'salmon fillet'},
      {qty:'2 tbsp',  item:'gochujang'},
      {qty:'1–2',     item:'garlic cloves, crushed'},
      {qty:'1 tbsp',  item:'soy sauce'},
      {qty:'1 tsp',   item:'sesame oil'},
      {qty:'1 tbsp',  item:'honey'},
      {qty:'to taste',item:'salt'},
      {qty:'as needed',item:'cooked white rice, for serving'},
      {qty:'to garnish',item:'green onions or scallions, sliced (optional)'},
    ],
    steps:[
      'Preheat oven to broil.',
      'In a small bowl, combine the gochujang, garlic, soy sauce, sesame oil, honey, and a pinch of salt. Stir until smooth.',
      'Line a baking sheet with foil. Place the salmon fillet and coat all sides generously with the glaze.',
      'Place the baking sheet on the top rack, as close to the heating element as possible. Broil for 8–12 minutes, until the glaze is caramelized and the salmon is just cooked through. Watch it closely — the sugars in the gochujang move fast.',
      'Garnish with sliced green onions or scallions and serve immediately over white rice. Spoon any extra glaze over the rice.',
    ],
    notes:'Keep a close eye under the broiler — gochujang has a lot of sugar and goes from caramelized to burned quickly. If your oven runs hot, drop the rack one position. Any leftover glaze is excellent spooned over the rice.' },
  { id:'cremas', title:'Cremas', author:'Guru', cuisine:'Haitian', category:'Drinks', tags:['cocktail','creamy','holiday','haitian'], minutes:10, servings:8, difficulty:'Easy', rating:4.9, reviews:0, tint:'t7', photo:'images/cremas.webp', video:'https://www.youtube.com/watch?v=N3Kr-3stbtY', date:'Dec 23, 2019',
    description:"Cremas (Kremas or Cremasse) is a sweet and creamy alcoholic beverage native to Haiti. Recipes vary from person to person with a few differences in ingredients, but the overall look and taste still remain the same. Here's my favorite method.",
    ingredients:[
      {qty:'1 can',          item:'evaporated milk'},
      {qty:'2 cans',         item:'sweetened condensed milk'},
      {qty:'1 bottle (16 oz)',item:'cream of coconut'},
      {qty:'1 tsp',          item:'grated nutmeg'},
      {qty:'1 tsp',          item:'cinnamon'},
      {qty:'1 tsp',          item:'anise star extract'},
      {qty:'1 tsp',          item:'almond extract'},
      {qty:'1 tsp',          item:'vanilla extract'},
      {qty:'1 tsp',          item:'lime juice'},
      {qty:'1 cup',          item:'rum (preferably Barbancourt)'},
      {qty:'1 tsp',          item:'lime zest (optional)'},
    ],
    steps:[
      'Add the evaporated milk and sweetened condensed milk to a blender. Add the cream of coconut and blend thoroughly.',
      'Add the vanilla extract, almond extract, anise star extract, cinnamon, lime juice, and nutmeg. Add lime zest if using. Blend again until smooth.',
      'Add the rum and blend until fully combined. Taste and adjust rum to preference.',
      'Serve chilled over ice or straight from the refrigerator. Store leftovers in a sealed bottle in the fridge.',
    ],
    notes:"Barbancourt is the traditional choice — it's a Haitian rum that carries its own warmth and depth. Any good Caribbean rum works, but the flavor will shift slightly. Make a big batch; it keeps well in the fridge for up to two weeks and gets better as it sits." },
  { id:'korean-fried-chicken', title:'Korean Fried Chicken Wings', author:'Guru', cuisine:'Korean', category:'Chicken', tags:['crispy','spicy','fried','wings'], minutes:45, servings:4, difficulty:'Intermediate', rating:4.9, reviews:0, tint:'t2', photo:'images/korean-fried-chicken.webp', video:'https://www.youtube.com/watch?v=Yd3L4E3dDGo', date:'Dec 2, 2019', updated:'Feb 22, 2020',
    description:'Double-fried wings coated in a sticky gochujang glaze — extra crispy from the first fry, deeply caramelized from the second. The batter uses both flour and cornstarch for a shatter-crisp shell that holds up under the sauce.',
    ingredients:[
      {qty:'2 lbs',   item:'chicken wings'},
      {qty:'½ cup',   item:'cornstarch'},
      {qty:'⅓ cup',   item:'all-purpose flour'},
      {qty:'¼ tsp',   item:'black pepper'},
      {qty:'¼ tsp',   item:'salt'},
      {qty:'¼ tsp',   item:'baking powder'},
      {qty:'1',       item:'large egg'},
      {qty:'as needed',item:'frying oil (vegetable, peanut, or corn)'},
      {qty:'3 cloves',item:'garlic, minced (or ⅓ tsp garlic powder)'},
      {qty:'⅓ cup',   item:'ketchup'},
      {qty:'⅓ cup',   item:'corn syrup'},
      {qty:'¼ cup',   item:'gochujang'},
      {qty:'2 tsp',   item:'white vinegar'},
      {qty:'to taste',item:'crushed red pepper flakes (optional)'},
    ],
    steps:[
      'Preheat oil to 350°F.',
      'In a bowl combine the flour, cornstarch, black pepper, baking powder, and egg. Mix well with your hands — gloves recommended. Toss the wings until fully coated.',
      'Fry for 10–12 minutes, moving the wings around periodically to prevent sticking. The chicken may look a bit soggy or underdone — that is expected for a double fry.',
      'Remove from oil and rest for 5 minutes. Return to the oil and fry for another 10–12 minutes until deep golden brown and shatter-crispy.',
      'While the second fry is going, heat a saucepan over medium-high. Add the garlic and cook until fragrant, about 1 minute. Add the ketchup, corn syrup, gochujang, and vinegar. Stir until the sauce thickens slightly.',
      'Toss the hot wings in the sauce until fully coated. Finish with crushed red pepper flakes if you want more heat. Serve immediately.',
    ],
    notes:'The double fry is non-negotiable — the first fry cooks the chicken through, the 5-minute rest lets steam escape, and the second fry drives off the remaining moisture for a truly crispy shell. Crowding the basket drops the oil temperature and kills the crunch; fry in batches if needed.' },
  { id:'fall-off-the-bone-ribs', title:'Fall Off The Bone Ribs', author:'Guru', cuisine:'American', category:'BBQ', tags:['bbq','comfort','weekend','slow-cook'], minutes:195, servings:4, difficulty:'Intermediate', rating:4.9, reviews:0, tint:'t2', photo:'images/fall-off-the-bone-ribs-1.webp', photos:['images/fall-off-the-bone-ribs-1.webp','images/fall-off-the-bone-ribs-2.jpg'], video:'https://www.youtube.com/watch?v=aRPWOvKDPow', date:'Nov 18, 2019', updated:'Dec 2, 2019',
    description:'Low-and-slow pork ribs with a bold dry rub, wrapped tight in foil for 2½ to 3 hours, then finished with BBQ sauce caramelized over high heat. The membrane comes off, the fat renders down, and the bones slide clean.',
    ingredients:[
      {qty:'1 rack',   item:'pork ribs'},
      {qty:'to taste', item:'your favorite BBQ sauce (Sweet Baby Ray\'s Honey BBQ recommended)'},
      {qty:'½ cup',    item:'brown sugar'},
      {qty:'3 tbsp',   item:'salt'},
      {qty:'1 tsp',    item:'black pepper'},
      {qty:'1½ tbsp',  item:'cumin'},
      {qty:'1½ tbsp',  item:'onion powder'},
      {qty:'1½ tbsp',  item:'paprika'},
      {qty:'1½ tbsp',  item:'cayenne pepper'},
      {qty:'2 tsp',    item:'ground mustard'},
      {qty:'1½ tbsp',  item:'garlic powder'},
    ],
    steps:[
      'Preheat oven or grill to 300°F.',
      'Rinse the ribs and pat completely dry with paper towels — the drier the surface, the better the rub adheres.',
      'Trim any excess fat with a small knife. Flip the rack meat-side down and make a small cut at the corner of the membrane. Grip it with a paper towel and peel it off completely.',
      'Mix all dry rub ingredients together. Coat both sides of the ribs generously. Place meat-side down in a large baking pan and cover tightly with foil, shiny side out.',
      'Bake or grill at 300°F for 2½ to 3 hours. If grilling, use indirect heat — direct heat causes uneven cooking.',
      'Remove from heat and carefully open the foil. Expect liquid in the pan. Brush BBQ sauce generously on both sides.',
      'Caramelize the sauce: cook ribs 5 minutes per side, basting with more sauce each turn. For a crispier finish, crank to high heat or switch to broil — watch carefully to avoid burning.',
    ],
    notes:'Peeling the membrane is the step most people skip and the reason their ribs never fall off the bone — it acts as a barrier to both seasoning and heat. Take the 2 minutes. The cayenne amount is real; cut it back to 1 tsp if you want less heat.' },
  { id:'chicken-sausage-gumbo', title:'Chicken and Sausage Gumbo', author:'Guru', cuisine:'Cajun', category:'Stew', tags:['comfort','slow-cook','one-pot','spicy'], minutes:210, servings:6, difficulty:'Intermediate', rating:4.9, reviews:0, tint:'t4', photo:'images/chicken-sausage-gumbo-1.webp', photos:['images/chicken-sausage-gumbo-1.webp','images/chicken-sausage-gumbo-2.webp'], video:'https://www.youtube.com/watch?v=p6CAmPTZdew', date:'Oct 20, 2019', updated:'Dec 2, 2019',
    description:'A proper dark-roux gumbo built on chicken thighs and sausage, simmered low for three hours until thick, smoky, and deeply layered. The roux is everything — take the full 25 minutes to get it to a deep chocolate brown.',
    ingredients:[
      {qty:'1 lb',      item:'boneless skinless chicken thighs'},
      {qty:'to taste',  item:'salt'},
      {qty:'to taste',  item:'black pepper'},
      {qty:'to taste',  item:'cayenne pepper'},
      {qty:'½ cup',     item:'all-purpose flour'},
      {qty:'½ cup + 1 tbsp', item:'grape seed oil, divided'},
      {qty:'6 cloves',  item:'garlic'},
      {qty:'2 stalks',  item:'celery, diced'},
      {qty:'1',         item:'jalapeño, seeded and minced'},
      {qty:'1 small',   item:'green bell pepper, diced'},
      {qty:'1 small',   item:'yellow onion, diced'},
      {qty:'8 oz',      item:'amber beer (Guinness works well)'},
      {qty:'4 cups',    item:'chicken stock'},
      {qty:'3–5',       item:'bay leaves'},
      {qty:'1 lb',      item:'sausage, cut into coins'},
      {qty:'as needed', item:'cooked white rice, for serving (optional)'},
      {qty:'to garnish',item:'scallions, chopped (optional)'},
    ],
    steps:[
      'Season chicken thighs generously with salt and black pepper. Heat 1 tbsp of grape seed oil in a pan over medium-high and sear the chicken until golden brown on both sides. Set aside.',
      'In a thick-bottomed medium pot over medium heat, combine ½ cup grape seed oil and ½ cup flour. Whisk constantly — do not stop — until the roux reaches a deep chocolate brown color, about 25 minutes. This is the foundation of the gumbo; do not rush it.',
      'Add the garlic, celery, jalapeño, bell pepper, and onion to the roux. Cook for about 1 minute. Pour in the beer and stir for another minute.',
      'Add the chicken stock, bay leaves, and a tsp of black pepper. Stir slowly until the gumbo comes back to a simmer. Add the seared chicken and sausage. Bring to a simmer once more, cover, and cook for 3 hours, stirring every 15 minutes.',
      'Gumbo should be thick but not as thick as gravy. Season with cayenne to taste. Serve over white rice and top with chopped scallions.',
    ],
    notes:"The roux is non-negotiable — a pale roux gives you a bland gumbo. Stir constantly and trust the process; it goes from tan to peanut butter to milk chocolate to dark chocolate. Pull it off the heat one shade before you think it's done since the residual heat keeps cooking it. Don't walk away." },
  { id:'apple-juice-pork-tenderloin', title:'Apple Juice Pork Tenderloin', author:'Guru', cuisine:'American', category:'Pork', tags:['quick','comfort','roast','weeknight'], minutes:50, servings:4, difficulty:'Easy', rating:4.8, reviews:0, tint:'t5', photo:'images/apple-juice-pork-tenderloin.webp', video:'https://www.youtube.com/watch?v=pDNIBVaznT4', date:'Sep 28, 2019',
    description:'Pork tenderloin soaked in apple juice, seared until golden on all sides, basted in a Dijon-brown sugar glaze, then finished in a hot oven. The apple slices go in at the end and caramelize alongside the pork.',
    ingredients:[
      {qty:'1',        item:'pork tenderloin'},
      {qty:'to taste', item:'salt and pepper'},
      {qty:'as needed',item:'apple juice (for soaking + glaze)'},
      {qty:'½ cup',    item:'brown sugar'},
      {qty:'3 tbsp',   item:'Dijon mustard'},
      {qty:'3 tbsp',   item:'olive oil'},
      {qty:'1 tbsp',   item:'butter'},
      {qty:'1–2',      item:'apples, sliced (optional)'},
    ],
    steps:[
      'Submerge the tenderloin in apple juice and soak for 30 minutes to 1 hour at room temperature. Remove, pat completely dry with a paper towel, and season all sides generously with salt and pepper.',
      'In a small bowl combine the brown sugar, 2 tbsp apple juice, Dijon mustard, and olive oil. Stir until smooth.',
      'Preheat oven to 450°F. Heat 1 tbsp butter and 2 tbsp oil in an oven-safe pan over medium-high until shimmering.',
      'Sear the pork, flipping every 2–3 minutes. On the third flip, spoon the glaze over the top and begin basting. On the fifth flip, add the apple slices to the pan.',
      'Transfer the pan to the oven and roast for 10 minutes.',
      'Rest for 10 minutes before slicing — do not skip this. Serve with the pan juices and apples spooned over the top.',
    ],
    notes:'The apple juice soak is what keeps this tenderloin from drying out — pork tenderloin has almost no fat, so the brine matters. Use an oven-safe pan so you go straight from stovetop to oven without losing heat or fond.' },
  { id:'jerk-steak', title:'Jerk Steak', author:'Guru', cuisine:'Caribbean', category:'Grill', tags:['spicy','grill','quick','jamaican'], minutes:30, servings:2, difficulty:'Easy', rating:4.9, reviews:0, tint:'t1', photo:'images/jerk-steak.png', video:'https://www.youtube.com/watch?v=x7Q_W1VsCEE', date:'Sep 22, 2019',
    description:'A bold Jamaican jerk paste — allspice, scotch bonnets, scallions, and warm spices blended into a thick marinade — seared into a steak at the very end for a charred, spicy crust. One batch covers two steaks.',
    ingredients:[
      {qty:'1',       item:'steak (sauce is enough for 2)'},
      {qty:'½ cup',   item:'ground allspice'},
      {qty:'½ cup',   item:'packed brown sugar'},
      {qty:'6–8',     item:'garlic cloves'},
      {qty:'4–6',     item:'scotch bonnet peppers, seeded and cored'},
      {qty:'1 tbsp',  item:'ground thyme (or 2 tbsp fresh thyme leaves)'},
      {qty:'2 bunches',item:'scallions'},
      {qty:'1 tsp',   item:'cinnamon'},
      {qty:'½ tsp',   item:'nutmeg'},
      {qty:'2 tbsp',  item:'soy sauce'},
      {qty:'to taste',item:'kosher salt'},
      {qty:'to taste',item:'black pepper'},
    ],
    steps:[
      'Combine all paste ingredients in a blender or food processor and pulse until a smooth, thick paste forms.',
      'Salt the steak either immediately before cooking, or salt it and let it rest uncovered in the refrigerator for at least 40 minutes — or overnight for the best result.',
      'Let the steak come to room temperature for 30–50 minutes before cooking. Starting cold leads to uneven doneness.',
      'Cook the steak to your desired doneness on a grill or hot skillet.',
      'In the final minute, apply the jerk paste to both sides and cook for 1 minute per side to char and caramelize the paste. Serve immediately.',
    ],
    notes:'The paste goes on at the very end — not as a marinade. Adding it too early burns the sugar before the steak is cooked through. Scotch bonnets are genuinely hot; seed them thoroughly or swap half for habaneros if you want to dial back the heat.' },
  { id:'lemon-pepper-wings', title:'Lemon Pepper Wings', author:'Guru', cuisine:'American', category:'Chicken', tags:['crispy','fried','wings','quick'], minutes:35, servings:2, difficulty:'Easy', rating:4.8, reviews:0, tint:'t5', photo:'images/lemon-pepper-wings-1.webp', photos:['images/lemon-pepper-wings-1.webp','images/lemon-pepper-wings-2.jpg'], video:'https://www.youtube.com/watch?v=DjJZjJENi50', date:'Sep 14, 2019', updated:'Dec 6, 2019',
    description:'Fried wings with a seasoned flour dredge, finished in the oven with a melted butter and lemon pepper coating — the oven finish sets the sauce into the crust and keeps the wings crispy instead of soggy.',
    ingredients:[
      {qty:'10–12',   item:'chicken wings'},
      {qty:'1 cup',   item:'all-purpose flour'},
      {qty:'1 tsp',   item:'chili powder'},
      {qty:'1 tsp',   item:'paprika'},
      {qty:'1 tsp',   item:'garlic powder'},
      {qty:'1 tsp',   item:'black pepper'},
      {qty:'to taste',item:'salt'},
      {qty:'as needed',item:'vegetable oil, for frying'},
      {qty:'to coat', item:'melted unsalted butter'},
      {qty:'to taste',item:'lemon pepper seasoning'},
    ],
    steps:[
      'Preheat both oven and deep fryer to 350°F.',
      'Pat wings completely dry with paper towels. Season lightly with black pepper.',
      'Combine flour, chili powder, paprika, garlic powder, and 1 tsp black pepper in a bowl. Lightly dredge the wings in the flour mixture and shake off any excess.',
      'Fry for 10–15 minutes until golden brown. Remove and place on a baking sheet.',
      'Mix melted butter with lemon pepper seasoning. Brush evenly over all sides of the wings. Transfer to the oven immediately.',
      'Bake for 5 minutes. Pull straight from the oven and sprinkle a small pinch of salt over the wings while still hot. Serve immediately.',
    ],
    notes:'Salt goes on after baking, not before — it draws moisture out of the crust and softens it. The oven finish after frying is what locks the butter-lemon pepper coating into the crust rather than sitting on top of it.' },
  { id:'fudge-smore-squares', title:'Fudge S\'more Squares', author:'Guru', cuisine:'American', category:'Dessert', tags:['chocolate','no-bake','sweet','bars'], minutes:30, servings:9, difficulty:'Easy', rating:4.9, reviews:0, tint:'t5', photo:'images/fudge-smore-squares-1.webp', photos:['images/fudge-smore-squares-1.webp','images/fudge-smore-squares-2.webp'], video:'https://www.youtube.com/watch?v=SroERjFZCl8', date:'Nov 29, 2019',
    description:'A three-layer no-bake bar built on a graham cracker crust — dense chocolate fudge in the middle, a broiled marshmallow fluff top that turns golden and toasted. Everything a s\'more should be, in square form.',
    ingredients:[
      {qty:'9',      item:'honey graham crackers, crushed to crumbs'},
      {qty:'6 tbsp', item:'butter, melted'},
      {qty:'2 tbsp', item:'sugar'},
      {qty:'1 pinch',item:'salt'},
      {qty:'1 can (14 oz)', item:'sweetened condensed milk'},
      {qty:'2 cups', item:'semisweet chocolate chips'},
      {qty:'1 tsp',  item:'pure vanilla extract'},
      {qty:'½ jar+', item:'marshmallow fluff'},
    ],
    steps:[
      'In a bowl stir together the graham cracker crumbs, melted butter, sugar, and salt until the crumbs are evenly moist. Press firmly and evenly into an 8×8 pan. Transfer to the freezer while you make the fudge.',
      'In a small pot over the lowest heat setting, combine the condensed milk, chocolate chips, and vanilla. Stir continuously until the chips are fully melted and the mixture is smooth. Watch carefully — it burns fast on the bottom.',
      'Add a little more than half the jar of marshmallow fluff to a microwave-safe bowl. Microwave in 10-second bursts, checking each time, until it is soft enough to spread. A few drops of water helps loosen it. Do not overheat — overcooked fluff becomes impossible to spread.',
      'Preheat oven to broil. Pour the warm chocolate fudge over the chilled crust and spread evenly. Spoon the softened fluff over the chocolate and spread to all four corners.',
      'Broil for about 2 minutes until the fluff is golden and lightly toasted. Watch closely — it goes fast. Remove and freeze for at least 1 hour before slicing into squares.',
    ],
    notes:'Keep the heat under the fudge as low as possible — condensed milk scorches quickly. And do not skip the freeze before slicing; the layers need to be fully set or the squares will fall apart. Run a hot knife between cuts for clean edges.' },
];

const REVIEWS_DEFAULT = [
  { id:'nostro', name:'Nostro', cuisine:'Northern Italian', city:'Brooklyn, NY', neighborhood:'Cobble Hill', lat:40.6848, lng:-73.9960, rating:4.5, price:'$$$', author:'Lina Tovar', date:'May 12, 2026', headline:'A pasta room with bigger ideas than the dough.', excerpt:"The hand-pulled tagliarini gets top billing, but it's the brown-butter agnolotti — fragile, mineral, almost translucent — that lingers on the drive home.", tint:'t5', standout:'Brown-butter agnolotti' },
  { id:'sebo', name:'Sebo', cuisine:'Omakase', city:'San Francisco, CA', neighborhood:'Hayes Valley', lat:37.7765, lng:-122.4247, rating:4.9, price:'$$$$', author:'Hiro Watanabe', date:'May 6, 2026', headline:'The most quietly confident omakase on the West Coast.', excerpt:"Twelve courses, three hours, zero showmanship. Chef Kanazawa moves like he's been waiting for you all day. The kohada cure alone justifies the price of admission.", tint:'t4', standout:'Kohada (gizzard shad)' },
  { id:'casa-lola', name:'Casa Lola', cuisine:'Modern Mexican', city:'Mexico City, MX', neighborhood:'Roma Norte', lat:19.4156, lng:-99.1618, rating:4.8, price:'$$$', author:'Mariana Acosta', date:'Apr 29, 2026', headline:'A love letter to the corn she grew up on.', excerpt:"Chef Lola Sandoval cooks with a kind of reverent ferocity. The huitlacoche masa tarts and the goat-cheek tamal are the meal of the year so far.", tint:'t2', standout:'Goat-cheek tamal' },
  { id:'tatami', name:'Tatami', cuisine:'Izakaya', city:'Brooklyn, NY', neighborhood:'Bed-Stuy', lat:40.6826, lng:-73.9404, rating:4.6, price:'$$', author:'Sasha Aoki', date:'Apr 22, 2026', headline:'Late-night drinking food, treated like it matters.', excerpt:"A 24-seat counter, an open binchotan grill, and a list of nine highballs. The chicken-skin gyoza and the smoked sardine onigiri are reason enough to wait for a stool.", tint:'t6', standout:'Chicken-skin gyoza' },
  { id:'larder', name:'The Larder', cuisine:'Farm-to-table', city:'Asheville, NC', neighborhood:'West Asheville', lat:35.5951, lng:-82.5815, rating:4.4, price:'$$$', author:'Yasmin Beldi', date:'Apr 15, 2026', headline:'Quiet seasonal cooking that earns every ingredient.', excerpt:"It would be easy to call this place precious, but everything on the plate is the result of a real relationship with a real farm down the road. The whey-braised pork shoulder is a thing of beauty.", tint:'t1', standout:'Whey-braised pork' },
  { id:'meson', name:'Mesón Sevilla', cuisine:'Andalusian tapas', city:'Madrid, ES', neighborhood:'La Latina', lat:40.4137, lng:-3.7119, rating:4.7, price:'$$', author:'Paco Mendez', date:'Apr 4, 2026', headline:'A century-old tapas bar that still beats the new guard.', excerpt:"Stand at the bar, order three rounds of croquetas and the bone-in jamón, and don't leave until you've had the salt-cured anchovy. Cash only, no apologies.", tint:'t7', standout:'Croquetas de jamón' },
  { id:'akaroa', name:'Akaroa', cuisine:'Modern New Zealand', city:'Los Angeles, CA', neighborhood:'Silver Lake', lat:34.0868, lng:-118.2715, rating:4.6, price:'$$$', author:'Noor Habash', date:'Mar 28, 2026', headline:'Antipodean cooking that finally feels at home in LA.', excerpt:"The smoked kahawai dip is on every table for a reason. Chef Olafson's vegetable cookery — especially the charred cabbage with horopito — is the quiet star.", tint:'t3', standout:'Charred cabbage with horopito' },
];

const SITE_SETTINGS_DEFAULT = {
  brand:            'The Hungry Guru',
  heroEyebrow:      'Curated by the Guru',
  heroHeadline:     'Favorite recipes,',
  heroHeadlineEm:   'favorite restaurants.',
  heroSub:          'A working notebook of the dishes the Guru cooks on repeat and the rooms she keeps going back to — every recipe tested in three home kitchens, every restaurant visited at least twice before it makes the page.',
  featuredRecipeId: 'spicy-broiled-salmon',
  stats: [
    { num: '1,240+', label: 'Recipes from 84 cooks' },
    { num: '3×',     label: 'Home-kitchen tested' },
    { num: '32',     label: 'Cuisines covered' },
    { num: '4.9 ★',  label: 'Across 18,000 reviews' },
  ],
  footerDesc: "A working notebook of the Guru's favorite recipes and the restaurants she'd send you to. Tested twice, written honestly.",
  reviewsIntro: 'Long-form reviews from our editors and contributing cooks — written after at least two visits, never comped, and always with a recommendation we\'d send our closest friend. New entries every Wednesday.',
};

// ─── Live data ────────────────────────────────────────────────────────────────
const RECIPES = RECIPES_DEFAULT.map(r => ({...r}));
const REVIEWS = REVIEWS_DEFAULT.map(r => ({...r}));
const SITE_SETTINGS = {...SITE_SETTINGS_DEFAULT};

// ─── UI constants ─────────────────────────────────────────────────────────────
const CATEGORIES = ['All','Quick','Pasta','Vegetarian','Grill','Comfort','Baking','Desserts'];
const REVIEW_CITIES = ['All cities','Brooklyn, NY','San Francisco, CA','Mexico City, MX','Asheville, NC','Madrid, ES','Los Angeles, CA'];

const DT_DIETARY   = ['Vegan','Vegetarian','Pescatarian','Dairy-free','Gluten-free','Keto','Paleo','Low-FODMAP'];
const DT_ALLERGIES = ['Peanuts','Tree nuts','Shellfish','Eggs','Soy','Wheat','Sesame','Fish'];
const DT_CUISINES  = ['Keep as-is','Thai','Mexican','Japanese','Korean','Indian','Moroccan','French'];
const DT_EQUIPMENT = ['No oven','No stand mixer','Instant Pot','Air fryer','Single skillet only','Microwave only'];
const DT_SKILLS    = ['Beginner','Comfortable','Pro'];

// ─── Utilities ────────────────────────────────────────────────────────────────
function buildTranslation() {
  const A = s => ({ kind:'add',  text:s });
  const R = s => ({ kind:'rm',   text:s });
  const K = s => ({ kind:'keep', text:s });
  return {
    ingredients:[
      {qty:'18 oz',  item:[R('fresh tagliatelle'),  A('gluten-free fettuccine')]},
      {qty:'12 tbsp',item:[R('unsalted butter'),     A('vegan cultured butter')]},
      {qty:'30',     item:[K('fresh sage leaves')]},
      {qty:'3 cloves',item:[K('garlic, smashed')]},
      {qty:'¾ cup',  item:[R('Parmigiano-Reggiano'), A('aged cashew parm')]},
      {qty:'1½ tsp', item:[K('lemon zest')]},
      {qty:'⅜ tsp',  item:[K('freshly grated nutmeg')]},
      {qty:'2 tbsp', item:[A('nutritional yeast')],  isNew:true},
      {qty:'to taste',item:[K('flaky sea salt + black pepper')]},
    ],
    changes:[
      'Swapped butter for cultured vegan butter — it still browns and tastes nutty.',
      'Used gluten-free fettuccine; reduce cook time by 30 seconds, the starch behaves differently.',
      'Replaced Parmigiano with aged cashew parmesan + a hit of nutritional yeast for that savory edge.',
      'Scaled everything 1.5× to feed 6.',
      'Combined steps 2 and 3 to fit a 30-minute window — start the sauce while the water is heating.',
    ],
    steps:[
      'Bring a large pot of well-salted water to a boil. Drop the [gluten-free fettuccine] and cook to just shy of al dente, ~2 minutes less than the package says.',
      'While the water heats, melt the [vegan butter] in a wide skillet over medium heat. Add garlic and sage and swirl constantly until the solids turn deep hazelnut and smell toasted, ~4 minutes. Lift the sage onto a plate.',
      'Kill the heat. Add a ladle of pasta water to stop the cooking. Transfer the pasta straight in and toss for a full minute, splashing more pasta water until glossy.',
      'Off heat, shower with [cashew parm], [nutritional yeast], lemon zest, and nutmeg. Toss, taste, adjust salt.',
      'Plate, crown with crisp sage and a few cracks of pepper.',
    ],
  };
}

function scaleQty(qty, factor) {
  if (factor === 1) return qty;
  const fracs = {'½':0.5,'⅓':0.33,'¼':0.25,'⅛':0.125,'¾':0.75,'⅔':0.66,'⅜':0.375};
  const m = qty.match(/^([\d⅛¼⅓⅜½⅔¾]+(?:\.\d+)?)(.*)$/);
  if (!m) return qty;
  let n = parseFloat(m[1]);
  if (isNaN(n)) n = fracs[m[1]] || NaN;
  if (isNaN(n)) return qty;
  return `${Math.round(n * factor * 4) / 4}${m[2]}`;
}
