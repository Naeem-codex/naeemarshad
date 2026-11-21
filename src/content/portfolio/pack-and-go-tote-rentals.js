// PORTFOLIO PROJECT: Pack and Go Tote Rentals
// HOW TO EDIT: change the text inside the quotes or backticks. Keep the commas.
// In the description use: ## BIG HEADING, ### small heading, * bullet point, **bold words**
export default {
  slug: 'pack-and-go-tote-rentals',     // page address: /portfolio/pack-and-go-tote-rentals
  title: 'Pack and Go Tote Rentals',
  type: 'Shopify Store',                // small label on the card
  price: '',                            // shown as "Project price" (for example '$350'). '' hides it.
  link: 'https://www.packandgotote.com/', // live website ('' = "Live link coming soon")
  note: '',                             // optional note next to the link (for example a store password)
  short: 'A full Shopify store built and launched for a US moving bin rental business, with rental packages, a booking calendar and delivery setup.',

  // FULL DESCRIPTION: shown on the project page. Write between the two backticks `.
  description: `## PROJECT OVERVIEW
Pack and Go Tote Rentals is a US business that rents moving totes and moving equipment. The owner needed a clean, professional Shopify store where customers can choose a rental package, pick their rental dates and book online.

I built and launched the full store from start to finish: the homepage, collections, products, app integration, delivery setup, custom Liquid code edits and the custom domain. This project was completed on Upwork and received a **5.0 star rating** from the client.

## WHAT I DID
### Homepage and store design.
* Homepage with a banner, a short benefits row, rental packages and an FAQ section
* Simple navigation: Home, Moving Totes, Rental Add-ons and Contact
* Layouts that work well on computers, tablets and phones

### Products and collections.
* Moving tote rental packages (20, 40 and 60 bin packs) set up as products
* Rental add-ons such as a hand truck, an extra moving bin and a rental extension
* Collections for moving totes and rental add-ons
* Clear product pages with what is included, features and booking notes

### Booking and delivery.
* Booking calendar app integration, so customers choose their rental dates before they order
* Delivery setup for the store
* Customers are guided from the package to the date selection and then to the cart

### Setup and launch.
* Small Liquid code edits and custom theme changes
* Footer links and an email sign-up form
* Custom domain connection and launch

## RESULT
The store is live at packandgotote.com. The client's review on Upwork is shown below, with a screenshot of the original review.`,

  // IMAGES: first image is the card cover. Click an image on the project page to open it full size.
images: [
  `${import.meta.env.BASE_URL}portfolio/pack-and-go-tote-rentals/1-homepage.jpg`,
  `${import.meta.env.BASE_URL}portfolio/pack-and-go-tote-rentals/2-product-page.jpg`,
  `${import.meta.env.BASE_URL}portfolio/pack-and-go-tote-rentals/3-booking-calendar.jpg`
],

  // CUSTOMER REVIEW for this project. Delete the whole review block if there is no review yet.
  review: {
    name: 'Jheanell Savage',
    role: 'Store owner, USA',
    platform: 'Upwork',
    rating: 5,
    text: `Muhammad was extremely professional, knowledgeable, and attentive to my store's needs. He offered valuable suggestions that I hadn't even considered, all of which will help create a smoother and more seamless transaction experience for my customers.

His communication was excellent, and he was very responsive throughout the process. He genuinely took the time to understand my needs and provide helpful recommendations.

Muhammad is a solid, dependable professional who clearly takes pride in what he does. I highly recommend him to anyone looking for someone knowledgeable, professional, and committed to delivering great service!`,
    link: '',          // link to the review on Upwork ('' = no link)
    image: '',         // client photo ('' = none)
    screenshot: '/portfolio/pack-and-go-tote-rentals/review-upwork.jpg'
  }
}
