import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

async function transformRecipe(recipe, dietaryRestriction) {
  const apiKey = process.env.OPENAI_API_KEY
  const endpoint = 'https://api.openai.com/v1/chat/completions'

  const prompt = `Here is a recipe: ${recipe}. Please modify it to be suitable for a ${dietaryRestriction} diet.`

  try {
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that specializes in recipes. When making changes also explain why the change was made. while also making recommendations to products',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(response.data.choices[0].message.content)
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    )
  }
}

let recipe = `
Ingredients

AD
Homemade Pie Crust or All Butter Pie Crust (both recipes make 2 crusts, 1 for bottom and 1 for top)
1 pound (450g) skinless boneless chicken breast or thighs, cubed
1 cup (about 130g) sliced carrots (about 2 carrots)
1/2 cup (about 40g) sliced celery
1/3 cup (5 Tbsp; 71g) unsalted butter
1/3 cup (45g) chopped yellow onion (1/2 of a small onion)
1 teaspoon minced garlic
1/3 cup (41g) all-purpose flour
3/4 teaspoon salt
1/2 teaspoon freshly ground black pepper
1 teaspoon dried thyme leaves

AD
1 and 3/4 cups (420ml) chicken broth/stock (I recommend reduced sodium)
2/3 cup (160ml) half-and-half*
1 cup (125g) frozen peas
egg wash: 1 large egg beaten with 1 Tablespoon (15ml) milk
optional: sprigs of fresh thyme for garnish
`

let dietaryRestriction = 'gluten-free and no allergic to lemons'

transformRecipe(recipe, dietaryRestriction)

// const textarea = document.getElementById('recipe-text')
// let grantWish = document.querySelector('#grant-wish')
// let wish = document.querySelector('#wish')

// textarea.addEventListener('input', function () {
//   this.style.height = 'auto' // Reset height to auto to get scrollHeight
//   this.style.height = this.scrollHeight + 'px' // Set height to scrollHeight
// })

// grantWish.addEventListener('click', function () {
//   let ogrecipe = document.querySelector('#recipe-text')
//   wish.value = ogrecipe.value // Set the wish textarea value to the recipe input

//   // Adjust height of the wish textarea
//   wish.style.height = 'auto' // Reset height to auto
//   wish.style.height = wish.scrollHeight + 'px' // Set height to scrollHeight

//   // Move to the spinner slide (next slide)
//   const carousel = bootstrap.Carousel.getInstance(
//     document.querySelector('#carouselExampleFade')
//   )
//   carousel.next() // Move to the spinner slide

//   // Set a timeout to move to the "Magically Delicious" slide after 5 seconds
//   setTimeout(() => {
//     carousel.next() // Move to the "Magically Delicious" slide
//   }, 3000) // 5000 milliseconds = 5 seconds
// })
