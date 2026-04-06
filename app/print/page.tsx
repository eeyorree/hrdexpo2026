import { google } from "googleapis";
import PrintClient from "./PrintClient";

async function getResponses() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "시트1!A2:G",
  });

  const rows = res.data.values ?? [];

  return rows.map((row) => ({
    timestamp: row[0] ?? "",
    name: row[1] ?? "",
    company: row[2] ?? "",
    position: row[3] ?? "",
    email: row[4] ?? "",
    phone: row[5] ?? "",
    answer: row[6] ?? "",
  }));
}

export default async function PrintPage() {
  const responses = await getResponses();

  return <PrintClient responses={responses} />;
}
