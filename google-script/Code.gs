// ============================================================================
// WEBSITE REVIEWS - Google Apps Script
// This script lives inside your Google Sheet. It:
//   1) receives reviews sent from your website and saves them as new rows,
//   2) saves the reviewer's photo in your Google Drive,
//   3) emails you when a new review arrives,
//   4) gives only the APPROVED reviews (Approved column = YES) back to your website.
// ============================================================================

const OWNER_EMAIL = 'arshaddigitalsolution365@gmail.com'  // new review emails go here
const SHEET_NAME = 'Reviews'                              // name of the tab in your Google Sheet
const PHOTO_FOLDER = 'Website review photos'              // Google Drive folder for photos
const HEADERS = ['Date', 'Name', 'Country', 'Rating', 'Review', 'Photo link', 'Approved']

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
  }
  return sheet
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

// Removes tags and limits the length of text that comes from the website.
function clean_(value, max) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max)
}

// Saves the (small) review photo in Google Drive and returns a link that works in a website image.
function savePhoto_(dataUrl) {
  const m = String(dataUrl).match(/^data:image\/(jpeg|png|webp);base64,(.+)$/)
  if (!m) return ''
  const ext = m[1] === 'jpeg' ? 'jpg' : m[1]
  const blob = Utilities.newBlob(Utilities.base64Decode(m[2]), 'image/' + m[1], 'review-' + Date.now() + '.' + ext)
  const folders = DriveApp.getFoldersByName(PHOTO_FOLDER)
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(PHOTO_FOLDER)
  const file = folder.createFile(blob)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
  return 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w300'
}

// A visitor sends a review from the website.
function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(20000)
    const data = JSON.parse(e.postData.contents)
    if (data.website) return out_({ ok: true })  // hidden spam-trap field was filled: ignore

    const name = clean_(data.name, 60)
    const country = clean_(data.country, 60)
    const review = clean_(data.review, 400)
    const rating = Math.round(Number(data.rating))
    if (!name || !country || !review || !(rating >= 1 && rating <= 5)) return out_({ ok: false, error: 'Missing details' })

    let photoUrl = ''
    if (typeof data.photo === 'string' && data.photo.length > 0 && data.photo.length < 400000) photoUrl = savePhoto_(data.photo)

    // Text format first, so nothing a visitor types can run as a formula in the sheet.
    const sheet = getSheet_()
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, HEADERS.length)
    range.setNumberFormat('@')
    const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm')
    range.setValues([[date, name, country, String(rating), review, photoUrl, '']])

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      name: 'Website reviews',
      subject: 'New website review (waiting for your approval)',
      body: 'Name: ' + name + '\nCountry: ' + country + '\nRating: ' + rating + ' / 5\nReview: ' + review +
        '\nPhoto: ' + (photoUrl || 'none') +
        '\n\nTo show it on your website, open your Google Sheet and type YES in the Approved column:\n' +
        SpreadsheetApp.getActiveSpreadsheet().getUrl()
    })
    CacheService.getScriptCache().remove('reviews')
    return out_({ ok: true })
  } catch (err) {
    return out_({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// The website asks for the approved reviews (rows where Approved = YES).
function doGet() {
  const cache = CacheService.getScriptCache()
  let json = cache.get('reviews')
  if (!json) {
    const rows = getSheet_().getDataRange().getValues().slice(1)
    const list = []
    rows.forEach(function (r, i) {
      if (String(r[6]).trim().toUpperCase() !== 'YES') return
      list.push({ id: 'g' + (i + 2), name: String(r[1]), country: String(r[2]), rating: Number(r[3]), quote: String(r[4]), image: String(r[5] || '') })
    })
    list.reverse() // newest first
    json = JSON.stringify({ reviews: list })
    cache.put('reviews', json, 300) // kept for 5 minutes, so approved reviews appear within a few minutes
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON)
}

// Run this ONCE from the editor (Run button) so Google asks for the permissions the script needs.
function authorize() {
  getSheet_()
  DriveApp.getRootFolder()
  MailApp.getRemainingDailyQuota()
}
