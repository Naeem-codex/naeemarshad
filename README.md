# Naeem Arshad Web Development Portfolio

A React + Vite portfolio website. The original navy/blue and orange color palette and typography have been kept.

## Run the website locally

1. Install Node.js (LTS) if it is not already installed.
2. Open this folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm install` once.
5. Run `npm run dev` and open the localhost address shown in the terminal (usually `http://localhost:5173/`).

## Where to edit things

- `src/data.js` — contact details, social links, platform names, service descriptions, FAQs and sample review cards.
- `src/components/Header.jsx` — logo text, top availability strip, WhatsApp ticker and main navigation.
- `src/components/Sections.jsx` — homepage hero, freelance platform logos, service cards, reviews, FAQs and enquiry section.
- `src/pages/ServicePage.jsx` — layout used by every individual service page.
- `src/components/Footer.jsx` — four footer columns and footer links.
- `src/components/HireForm.jsx` — project enquiry form. It prepares a WhatsApp message; it does not process payments.
- `src/styles.css` — visual styling, responsive layout and animations. New requested styling is grouped at the bottom under `CUSTOM UPDATES`.

## Latest changes

- Top bar: service names (click to open that service page) and an original WhatsApp chat link ticker.
- Hero texts rotate every 4 seconds (edit `heroEyebrows`, `heroHeadlines`, `heroIntros` in `src/components/Sections.jsx`).
- Platform logos: edit `platforms` in `src/data.js`. For official logos, save the files in `public/logos/` and set `logo:'/logos/upwork.svg'`.
- Service logos: edit `logo` per service in `src/data.js` (empty = icon).
- Portfolio: add projects to `portfolio` in `src/data.js` (image, description, link). Save screenshots in `public/portfolio/`.

## Update 3

- Every Hire Me button opens a popup form on the current page (`src/components/HireModal.jsx`); nothing redirects to the homepage. The form sends by WhatsApp or email.
- Section headlines: edit the `title` and `text` of each `<SectionHeading>` in `src/components/Sections.jsx`.
- The WhatsApp number shows in the top bar (blinking) and in the footer. Change it once in `src/data.js`.

## Important before publishing

- Replace the demo portrait in `src/components/Sections.jsx` with your own approved profile photo.
- Replace all sample reviews in `src/data.js` with genuine reviews you have permission to publish. Do not present the sample reviews as real client testimonials.
- Replace `#` social/profile URLs in `src/data.js` with your real profile URLs.
- Update the canonical domain and sitemap URLs in `index.html` and `public/sitemap.xml` before launch.
- The WhatsApp enquiry form opens WhatsApp with the visitor's message. It does not send an email or collect payment details.

## Helpful code comments

The updated components include comments explaining why the ticker repeats its content, how the review rotation works, where the one Hire Me form is placed on service pages, and which files to edit for future content changes.


## HOW TO EDIT (easy guide)

| I want to change... | Open this file |
|---|---|
| A service description, title, FAQs | `src/content/services/<service>.js` (one file per service) |
| Add a new service | copy a file in `src/content/services/`, then add it in `src/content/services/index.js` |
| FAQs shown on every service page | `commonFaqs` in `src/content/services/index.js` |
| A portfolio project (images, price, description, review) | `src/content/portfolio/<project>.js` |
| Add a new portfolio project | copy a file in `src/content/portfolio/`, then add it in `src/content/portfolio/index.js` |
| About page title, text, photo | `src/content/about.js` |
| Phone, email, address, platform logos, reviews, home FAQs | `src/data.js` |
| Banner texts, section headlines | `src/components/Sections.jsx` |

Images: save them in `public/` (for example `public/portfolio/my-project/1.jpg`) and write `'/portfolio/my-project/1.jpg'`.
Remember to replace YOUR-DOMAIN.com in `public/sitemap.xml` and `public/robots.txt` before publishing.

## Formatting a description
In any description: `## BIG HEADING`, `### small heading`, `* bullet point`, `**bold words**`, blank line = new paragraph.


## Visitor reviews with approval (Google Sheet)
1. Create a Google Sheet, open Extensions > Apps Script, and paste the code from `google-script/Code.gs`.
2. Run `authorize` once, then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
3. Copy the Web app link into `reviewsEndpoint` in `src/data.js`.
4. New reviews appear as rows in the sheet and in your email. Type YES in the Approved column to show a review on the website.
