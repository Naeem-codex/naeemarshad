// SERVICES LIST. The order here is the order on the website (top bar, menu, home page, footer).
// TO ADD A NEW SERVICE: 1) copy any file in this folder and rename it, 2) edit the text,
// 3) add an import line below and put its name in the list.
import shopify from './shopify'
import ecommerce from './ecommerce'
import wordpress from './wordpress'
import woocommerce from './woocommerce'
import custom_coding from './custom-coding'
import data_entry from './data-entry'
import mern_stack from './mern-stack'
import ads_manager from './ads-manager'

export const services = [
  shopify,
  ecommerce,
  wordpress,
  woocommerce,
  custom_coding,
  data_entry,
  mern_stack,
  ads_manager
]

// COMMON FAQS: shown at the end of the FAQs on EVERY service page. Edit once, changes everywhere.
export const commonFaqs = [
  ['How do I get started?', 'Click Hire Me and tell me about your project. I will reply with a plan, what I need from you and a fair price. If you prefer, we can have a free 15 to 30 minute Zoom meeting first.'],
  ['Can I see examples of your work?', 'Yes. Visit the Portfolio page for live websites and demo stores, each with its own details and client feedback where available.'],
  ['How will we communicate?', 'By WhatsApp, email or Zoom, whichever you prefer. I usually reply within a few hours and keep you updated during the project.']
]
