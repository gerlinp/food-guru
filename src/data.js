// ─── Default data ────────────────────────────────────────────────────────────
const RECIPES_DEFAULT = [
  { id:'chicken-parm-sandwich', title:'Chicken Parm Sandwich', author:'Guru', cuisine:'Italian-American', category:'Sandwiches', tags:['comfort','crispy','weekend'], minutes:45, servings:2, difficulty:'Intermediate', rating:4.8, reviews:0, tint:'t2', photo:'images/recipes/chicken-parm.webp', date:'Aug 26, 2020',
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
  { id:'spicy-broiled-salmon', title:'Spicy Broiled Salmon', author:'Guru', cuisine:'Korean-Inspired', category:'Seafood', tags:['spicy','quick','healthy'], minutes:20, servings:1, difficulty:'Easy', rating:4.8, reviews:0, tint:'t3', photo:'images/recipes/spicy-broiled-salmon.webp', video:'https://www.youtube.com/watch?v=BCnYUrkSj8Y', date:'May 27, 2020', updated:'Sep 25, 2020',
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
  { id:'cremas', title:'Cremas', author:'Guru', cuisine:'Haitian', category:'Drinks', tags:['cocktail','creamy','holiday','haitian'], minutes:10, servings:8, difficulty:'Easy', rating:4.9, reviews:0, tint:'t7', photo:'images/recipes/cremas.webp', video:'https://www.youtube.com/watch?v=N3Kr-3stbtY', date:'Dec 23, 2019',
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
  { id:'korean-fried-chicken', title:'Korean Fried Chicken Wings', author:'Guru', cuisine:'Korean', category:'Chicken', tags:['crispy','spicy','fried','wings'], minutes:45, servings:4, difficulty:'Intermediate', rating:4.9, reviews:0, tint:'t2', photo:'images/recipes/korean-fried-chicken.webp', video:'https://www.youtube.com/watch?v=Yd3L4E3dDGo', date:'Dec 2, 2019', updated:'Feb 22, 2020',
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
  { id:'fall-off-the-bone-ribs', title:'Fall Off The Bone Ribs', author:'Guru', cuisine:'American', category:'BBQ', tags:['bbq','comfort','weekend','slow-cook'], minutes:195, servings:4, difficulty:'Intermediate', rating:4.9, reviews:0, tint:'t2', photo:'images/recipes/fall-off-the-bone-ribs-1.webp', photos:['images/recipes/fall-off-the-bone-ribs-1.webp','images/recipes/fall-off-the-bone-ribs-2.jpg'], video:'https://www.youtube.com/watch?v=aRPWOvKDPow', date:'Nov 18, 2019', updated:'Dec 2, 2019',
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
  { id:'chicken-sausage-gumbo', title:'Chicken and Sausage Gumbo', author:'Guru', cuisine:'Cajun', category:'Stew', tags:['comfort','slow-cook','one-pot','spicy'], minutes:210, servings:6, difficulty:'Intermediate', rating:4.9, reviews:0, tint:'t4', photo:'images/recipes/chicken-sausage-gumbo-1.webp', photos:['images/recipes/chicken-sausage-gumbo-1.webp','images/recipes/chicken-sausage-gumbo-2.webp'], video:'https://www.youtube.com/watch?v=p6CAmPTZdew', date:'Oct 20, 2019', updated:'Dec 2, 2019',
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
  { id:'apple-juice-pork-tenderloin', title:'Apple Juice Pork Tenderloin', author:'Guru', cuisine:'American', category:'Pork', tags:['quick','comfort','roast','weeknight'], minutes:50, servings:4, difficulty:'Easy', rating:4.8, reviews:0, tint:'t5', photo:'images/recipes/apple-juice-pork-tenderloin.webp', video:'https://www.youtube.com/watch?v=pDNIBVaznT4', date:'Sep 28, 2019',
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
  { id:'jerk-steak', title:'Jerk Steak', author:'Guru', cuisine:'Caribbean', category:'Grill', tags:['spicy','grill','quick','jamaican'], minutes:30, servings:2, difficulty:'Easy', rating:4.9, reviews:0, tint:'t1', photo:'images/recipes/jerk-steak.png', video:'https://www.youtube.com/watch?v=x7Q_W1VsCEE', date:'Sep 22, 2019',
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
  { id:'lemon-pepper-wings', title:'Lemon Pepper Wings', author:'Guru', cuisine:'American', category:'Chicken', tags:['crispy','fried','wings','quick'], minutes:35, servings:2, difficulty:'Easy', rating:4.8, reviews:0, tint:'t5', photo:'images/recipes/lemon-pepper-wings-1.webp', photos:['images/recipes/lemon-pepper-wings-1.webp','images/recipes/lemon-pepper-wings-2.jpg'], video:'https://www.youtube.com/watch?v=DjJZjJENi50', date:'Sep 14, 2019', updated:'Dec 6, 2019',
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
  { id:'fudge-smore-squares', title:'Fudge S\'more Squares', author:'Guru', cuisine:'American', category:'Dessert', tags:['chocolate','no-bake','sweet','bars'], minutes:30, servings:9, difficulty:'Easy', rating:4.9, reviews:0, tint:'t5', photo:'images/recipes/fudge-smore-squares-1.webp', photos:['images/recipes/fudge-smore-squares-1.webp','images/recipes/fudge-smore-squares-2.webp'], video:'https://www.youtube.com/watch?v=SroERjFZCl8', date:'Nov 29, 2019',
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
  { id:'bootleg-special', name:'Bootleg Special', cuisine:'Cajun Seafood', city:'Boston, MA', neighborhood:'South End', lat:42.3402, lng:-71.0733, rating:4.6, price:'$$$', author:'Guru', date:'Oct 4, 2019', headline:'A French Quarter fever dream in the South End.', excerpt:"Cajun seafood buried under lemon, garlic butter, and ambition in Boston's South End. The signature boil — lobster, clams, crawfish, sausage, corn — is a full event, and the Blue Bull cocktail is exactly what it sounds like: dangerously good.", tint:'t4', standout:'The Bootleg Special boil', photo:'images/reviews/bootleg-special/storefront.jpg', photos:[{src:'images/reviews/bootleg-special/seafood-boil.webp',caption:'The Bootleg Special'},{src:'images/reviews/bootleg-special/blue-bull-spread.webp',caption:'Blue Bull & the full spread'},{src:'images/reviews/bootleg-special/fried-shrimp-po-boy.webp',caption:'Fried Shrimp Po\' Boy'},{src:'images/reviews/bootleg-special/beignets.jpg',caption:'Specialty Beignets'}], body:["Right before my trip to New Orleans, I was invited to eat at Bootleg Special, a Cajun-themed restaurant located in the South End of Boston. Like most places deep in the city, there is no on-site parking, and finding a spot can be tough. But once you step inside, the restaurant makes up for it.","From the outside, Bootleg Special does not look especially flashy. But inside, it feels like you have been transported straight to the French Quarter. The restaurant has chandeliers, balcony-style decor that gives off Bourbon Street energy, and a concrete wall covered in urban artwork. Projectors playing old-school music videos added even more personality to the space.","For my drink, I ordered the Blue Bull, made with Cruzan coconut rum, pineapple rum, Coco Lopez, Blue Curaçao, and a coconut berry Red Bull float. It had just the right amount of sweetness and was honestly really good.","The menu had plenty of seafood options, including the Bootleg Special, Two-Somes where you can choose two types of seafood, a Build-a-Boil option, and Mama Sue's Big Bowl of Crabs — loaded with Alaskan king crab legs, Dungeness crab legs, snow crab legs, Jonah crab claws, sausage, and noodles tossed in Bootleg sauce.","The main dish we tried was the Bootleg Special, which is meant to feed about two to three people. It comes packed with seasoned lobster, clams, mussels, shrimp, crawfish, sausage, potatoes, and corn, all tossed in sauce, with extra sauce on the side and bread for dipping.","The lobster came broken into pieces, which made it much easier to eat and took away a lot of the work. The sauce was a flavorful mix of lemon, Cajun seasoning, and garlic butter. Everything looked amazing and tasted even better. Just be warned, this is definitely a messy meal, but in the best way possible.","We finished with the specialty beignets, which came with three sauce options: Chocolate Hazelnut, Bananas Foster, and my personal favorite, Bourbon Maple Pecan.","Overall, Bootleg Special had great food, a fun atmosphere, and good drinks. If you are looking for a seafood spot in New England with something a little different in flavor, I highly recommend checking this place out.","They also offer brunch, including some amazing-looking soufflé pancakes, but that will have to be a review for another time."] },
  { id:'poor-calvins', name:"Poor Calvin's", cuisine:'Asian Fusion', city:'Atlanta, GA', neighborhood:'Downtown', lat:33.7649, lng:-84.3744, rating:4.7, price:'$$$', author:'Guru', date:'Oct 9, 2019', headline:'Eight days in a row suddenly made sense.', excerpt:"A seasonal Asian fusion menu with Southern soul in the heart of Atlanta. The Korean BBQ beef deviled eggs — topped with caviar, mango, and lychee glaze — are one of the most surprising bites in the city.", tint:'t6', standout:'Korean BBQ beef deviled eggs', photo:'images/reviews/poor-calvins/storefront.jpg', photos:[{src:'images/reviews/poor-calvins/dumplings.png',caption:'Chicken and Pork Dumplings'},{src:'images/reviews/poor-calvins/deviled-eggs.png',caption:'Korean BBQ Deviled Eggs'},{src:'images/reviews/poor-calvins/crispy-chicken.jpg',caption:'Crispy Chicken'}], body:["While we were being seated at Poor Calvin's, we overheard the hostess say to the couple behind us, 'Eight days in a row for you two?' At first, that sounded unbelievable. Who goes to the same restaurant eight days in a row?","After eating there, I understood completely.","Poor Calvin's is located in downtown Atlanta, but parking was surprisingly easy. The restaurant even offered complimentary valet service, which was a nice bonus. Inside, the space is on the smaller side, with a cozy dining area, a bar, and outdoor patio seating. The Asian-inspired decor gives the restaurant a warm, stylish atmosphere that fits perfectly with the food.","The menu changes seasonally and focuses on Thai and Asian fusion with Southern influences. Honestly, everything looked good, which made choosing difficult. They offer brunch, dinner, small appetizers, and a market menu, so there were plenty of options to explore.","Since there were three of us, we decided to share two appetizers and one entrée.","We started with the Chicken and Pork Dumplings, which felt like a safe choice but still delivered. They were seasoned well, cooked perfectly, and came with a sauce that gave us a preview of the bold flavors to come.","Next, we tried the Deviled Eggs, topped with Korean BBQ beef, caviar, mango, and a lychee glaze. This was one of the most unique bites I've ever had. The mix of sweet, savory, rich, and tangy flavors worked surprisingly well together. It is one of those dishes you really have to experience for yourself.","For our entrée, we shared the Crispy Chicken, which came with collard greens and lobster mac and cheese. The fried chicken was good, although I still think mine might be better. But the real star of the plate was the lobster mac and cheese. They definitely did not skimp on the lobster. There was a generous amount in almost every bite.","Overall, everything looked good and tasted even better. Even the dishes coming out for other tables looked incredible. Their Instagram is basically food porn, and after eating there, I can see why.","By the end of the meal, we went from being skeptical of the couple who had eaten there eight days in a row to being jealous of them. We were leaving Atlanta in a few days, which meant we would not get the chance to come back and explore the rest of the menu.","Poor Calvin's is definitely a spot I would return to."] },
  { id:'atlanta-breakfast-club', name:'Atlanta Breakfast Club', cuisine:'Southern Brunch', city:'Atlanta, GA', neighborhood:'Downtown', lat:33.7605, lng:-84.3943, rating:4.5, price:'$$', author:'Guru', date:'Oct 10, 2019', headline:'The Peach Cobbler French Toast will ruin every brunch that follows.', excerpt:"Downtown Atlanta's most reliable brunch room, right across from the Aquarium. The Chicken and Waffles deliver, but it's the Peach Cobbler French Toast — warm peaches, buttery crumble, vanilla butter, powdered sugar — that earns the trip.", tint:'t2', standout:'Peach Cobbler French Toast', photo:'images/reviews/atlanta-breakfast-club/storefront.avif', photoPosition:'center bottom', photos:[{src:'images/reviews/atlanta-breakfast-club/breakfast-tacos.webp',caption:'Breakfast Tacos'},{src:'images/reviews/atlanta-breakfast-club/chicken-waffle.webp',caption:'Chicken & Waffle'},{src:'images/reviews/atlanta-breakfast-club/peach-cobbler-french-toast.webp',caption:'Peach Cobbler French Toast'}], body:["For my second restaurant visit during my short time in Atlanta, I decided to check out Atlanta Breakfast Club. Located downtown right across from the Georgia Aquarium, the restaurant is in a great spot, but parking can be a little tricky. They offer limited parking in the front and back, with plenty of paid parking options nearby. If you're visiting Atlanta and the Georgia Aquarium is already on your itinerary, I'd recommend parking there and simply walking across the street for brunch.","We got lucky and managed to grab a spot right out front just as someone was leaving.","Once again, Atlanta did not disappoint.","The menu had everything you would want from a Southern brunch spot, with standout items like Peach Cobbler French Toast, Biscuits with Fried Shrimp Gravy, Chicken Biscuits with Black Pepper Gravy, Shrimp and Grits, and plenty of classic breakfast favorites.","First, I'll talk about the Breakfast Tacos. They came with French toast-battered flour tortillas, smoked pork bacon, scrambled eggs, and house syrup. They were good, but compared to the other dishes at the table, they didn't impress me as much.","For my main dish, I went with the Chicken and Waffles. The chicken was seasoned perfectly, both inside and out, with crispy fried skin that had great flavor. The waffle had just the right amount of sweetness to complement the chicken, especially with a generous pour of syrup over everything.","But the best dish at the table was easily the Peach Cobbler French Toast. It came topped with warm buttery crumble, sweet peaches, creamy vanilla butter, and powdered sugar. This was honestly one of the best things I've ever tasted. At first, I wasn't sure I would like it because I thought it might be way too sweet, but they balanced the flavors perfectly. It was rich, satisfying, and sweet without being overwhelming.","Overall, Atlanta Breakfast Club gets my full approval. I would definitely come back again."] },
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
const REVIEW_CITIES = ['All cities', ...new Set(REVIEWS_DEFAULT.map(r => r.city))];

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
