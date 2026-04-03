import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const BASE = "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises";

const CATEGORY_IMAGES: Record<string, string> = {
  "waist":       `${BASE}/3_4_Sit-Up/0.jpg`,
  "chest":       `${BASE}/Barbell_Bench_Press/0.jpg`,
  "back":        `${BASE}/Bent_Over_Barbell_Row/0.jpg`,
  "shoulders":   `${BASE}/Arnold_Dumbbell_Press/0.jpg`,
  "upper arms":  `${BASE}/Alternate_Hammer_Curl/0.jpg`,
  "lower arms":  `${BASE}/Barbell_Wrist_Curl/0.jpg`,
  "upper legs":  `${BASE}/Barbell_Full_Squat/0.jpg`,
  "lower legs":  `${BASE}/Ankle_Circles/0.jpg`,
  "cardio":      `${BASE}/Air_Bike/0.jpg`,
  "neck":        `${BASE}/Anterior_Tibialis-SMR/0.jpg`,
};

const csvPath = path.join(__dirname, "../src/resources/exercises.csv");
const content = fs.readFileSync(csvPath, "utf-8");
const lines = content.split("\n");

// First line is header
const header = lines[0];
const headers = header.split(",");
const bodyPartIndex = headers.indexOf("bodyPart");
const gifUrlIndex   = headers.indexOf("gif_url");

console.log(`📋 Header: bodyPart at col ${bodyPartIndex}, gif_url at col ${gifUrlIndex}`);

const updatedLines = lines.map((line, index) => {
  if (index === 0 || line.trim() === "") return line; // skip header and empty lines

  const cols = line.split(",");
  const category = cols[bodyPartIndex]?.trim().toLowerCase();
  const newUrl = CATEGORY_IMAGES[category];

  if (newUrl) {
    cols[gifUrlIndex] = newUrl;
    return cols.join(",");
  }
  return line;
});

const updatedContent = updatedLines.join("\n");
fs.writeFileSync(csvPath, updatedContent, "utf-8");
console.log("✅ exercises.csv updated with free GitHub image URLs!");
console.log(`📁 File: ${csvPath}`);