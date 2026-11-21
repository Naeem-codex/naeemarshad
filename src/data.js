// EDIT THIS FILE for contact details, platform logos, reviews and home page FAQs.
export const CONTACT = {
  phone: '+971561687484',
  email: 'arshaddigitalsolution365@gmail.com',
  whatsapp: 'https://wa.me/971561687484',
  // Original WhatsApp chat link used in the top ticker (opens a chat with a ready message).
  whatsappChat: 'https://wa.me/971561687484?text=Hello%20Naeem%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20project.',
  // FORM EMAIL: paste your Formspree link here (for example 'https://formspree.io/f/abcdwxyz').
  // When it is filled, the form's "Send by email" button sends the enquiry straight to your inbox.
  formEndpoint: 'https://formspree.io/f/xvkaqegz',
  // REVIEWS LINK: paste the Google Apps Script "Web app" link here (see google-script/Code.gs and the README).
  // When it is filled, reviews sent from the website go to your Google Sheet, and the ones you approve (YES) show on the site.
  reviewsEndpoint: 'https://script.google.com/macros/s/AKfycbwyGft-r8q_4c-XC_4Yiq5YibiFdsf8JTGp9HLRuIIY34hNg-YOetiwuSa-8_-U7pg8Hw/exec',
  address: 'Dubai, United Arab Emirates',
  // Add your real social profile URLs here.
  socials: 
  { LinkedIn: '#', Instagram: '#', Facebook: '#', GitHub: '#' }
}

// FREELANCE MARKETPLACES shown in the logo strip.
// logo: use an official logo file you saved in public/logos (e.g. '/logos/upwork.svg').
// Leave logo '' to show the platform name as text instead.
export const platforms = [
  { name:'Upwork', logo:'https://cdn.simpleicons.org/upwork/14A800' },
  { name:'Fiverr', logo:'https://cdn.simpleicons.org/fiverr/1DBF73' },
  { name:'Freelancer', logo:'https://cdn.simpleicons.org/freelancer/29B2FE' },
  { name:'Guru', logo:'' },
  { name:'WorkChest', logo:'' },
  { name:'PeoplePerHour', logo:'https://cdn.simpleicons.org/peopleperhour/EE4B5A' },
  { name:'Truelancer', logo:'' },
  { name:'LinkedIn', logo:'' }
]

// SERVICES and PORTFOLIO now live in their own easy files:
//   src/content/services/   (one file per service: description, FAQs, title...)
//   src/content/portfolio/  (one file per project: images, price, description, review)
export { services, commonFaqs } from './content/services'
export { portfolio } from './content/portfolio'

// SAMPLE CONTENT ONLY: replace these six cards with genuine, permission-approved client reviews.
// Reviews sent from the website are approved in your Google Sheet (type YES in the Approved column) and show automatically.
// Reviews written below always show (use this for your Upwork / Fiverr reviews).
// REVIEWS: replace these samples with your real reviews. Real reviews do not need  sample:true  (that removes the
// "SAMPLE REVIEW" label). link = the review page on the freelance platform ('' = no link icon).
export const reviews = [
  { id:0, platform:'Upwork', name:'Jheanell Savage', role:'Store owner, USA', rating:5, quote:'Muhammad was extremely professional, knowledgeable, and attentive to my store\'s needs. He offered valuable suggestions that I hadn\'t even considered…', image:'', link:'' },
  
]

export const homeFaqs = [
  ['Do I need to provide a domain and hosting?','For most websites, yes. You own the domain and hosting accounts. I can guide you on suitable options and help with setup.'],
  ['How do we start a project?','Use the Hire Me form with your project details. I will review the requirements and reply with the next steps.'],
  ['Do you offer revisions?','The number of revisions and project scope will be agreed before work begins.'],
  ['Can you update my existing website?','Yes. Share your website link and a short list of the changes you need.'],
  ['Can I pay in advance?','Payment milestones or an advance can be agreed in writing before the project starts. Secure payment depends on the platform or payment provider used.']
]
