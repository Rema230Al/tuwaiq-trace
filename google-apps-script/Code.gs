/**
 * TUWAIQ INIT — receives one assessment submission and appends it to the "Responses" sheet.
 * Deploy as a Web App (Execute as: Me · Who has access: Anyone).
 */

const SHEET_NAME = "Responses";

const list_ = (v) => (Array.isArray(v) ? v.join(", ") : v || "");

// [header, value from the submitted JSON] — one entry per column, in order.
const COLUMNS = [
  ["Name", (d) => d.name || ""],
  ["Submitted At", (d) => (d.submittedAt ? new Date(d.submittedAt) : new Date())],
  ["Experience", (d) => d.experience || ""],
  ["Build Ability", (d) => d.buildAbility || ""],
  ["Worked Areas", (d) => list_(d.workedAreas)],
  ["Technologies", (d) => d.technologies || ""],
  ["Interests", (d) => list_(d.interests)],
  ["Learning Preference", (d) => d.learningPreference || ""],
  ["Expected Outcome", (d) => d.expectedOutcome || ""],
  ["Success Definition", (d) => d.successDefinition || ""],
  ["Favorite Color", (d) => (d.favoriteColor && d.favoriteColor.name) || ""],
  ["Favorite Color Hex", (d) => (d.favoriteColor && d.favoriteColor.hex) || ""],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    getSheet_().appendRow(COLUMNS.map(([, value]) => value(data)));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: "tuwaiq-init" });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
