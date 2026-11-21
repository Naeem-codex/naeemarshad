// PORTFOLIO PROJECT: Online Shop (Sample)
// HOW TO EDIT: change the text inside the quotes or backticks. Keep the commas.
export default {
  slug: 'woocommerce-shop-sample',            // page address: /portfolio/woocommerce-shop-sample
  title: 'Online Shop (Sample)',
  type: 'WooCommerce',                  // small label on the card
  price: '',                  // shown as "Project price" (write it as you like, e.g. '$350' or 'USD 350'). '' hides it.
  link: '',                  // live website or demo store link ('' = "Live link coming soon")
  note: '',                  // optional note next to the link (for example a store password)
  short: 'Sample card. Replace with a real WooCommerce project.',     // 1-2 lines shown on the portfolio card

  // FULL DESCRIPTION: shown on the project page. Write between the two backticks `.
  description: `Sample project. Replace this text, the images and the details with a real WooCommerce project.`,

  // IMAGES: first image is the card cover. Add as many as you like.
  // Use your own screenshots: save them in public/portfolio/woocommerce-shop-sample/ and write '/portfolio/woocommerce-shop-sample/1.jpg'
  images: [
    'https://picsum.photos/seed/woo-1/1200/750',
    'https://picsum.photos/seed/woo-2/1200/750',
    'https://picsum.photos/seed/woo-3/1200/750'
  ],

  // CUSTOMER REVIEW for this project. Delete the whole review block if there is no review yet.
  // screenshot: your screenshot of the review (for example from Upwork) saved in public/portfolio/woocommerce-shop-sample/ ('' = none)
  review: null
}
