// PORTFOLIO PROJECT: Business Website (Sample)
// HOW TO EDIT: change the text inside the quotes or backticks. Keep the commas.
export default {
  slug: 'wordpress-business-sample',            // page address: /portfolio/wordpress-business-sample
  title: 'Business Website (Sample)',
  type: 'WordPress',                  // small label on the card
  price: '',                  // shown as "Project price" (write it as you like, e.g. '$350' or 'USD 350'). '' hides it.
  link: '',                  // live website or demo store link ('' = "Live link coming soon")
  note: '',                  // optional note next to the link (for example a store password)
  short: 'Sample card. Replace with a real WordPress project.',     // 1-2 lines shown on the portfolio card

  // FULL DESCRIPTION: shown on the project page. Write between the two backticks `.
  description: `Sample project. Replace this text, the images and the details with a real WordPress project.`,

  // IMAGES: first image is the card cover. Add as many as you like.
  // Use your own screenshots: save them in public/portfolio/wordpress-business-sample/ and write '/portfolio/wordpress-business-sample/1.jpg'
  images: [
    'https://picsum.photos/seed/wp-1/1200/750',
    'https://picsum.photos/seed/wp-2/1200/750',
    'https://picsum.photos/seed/wp-3/1200/750'
  ],

  // CUSTOMER REVIEW for this project. Delete the whole review block if there is no review yet.
  // screenshot: your screenshot of the review (for example from Upwork) saved in public/portfolio/wordpress-business-sample/ ('' = none)
  review: null
}
