import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const ExerciseSchema = new mongoose.Schema({}, { strict: false });
const Exercise = mongoose.model("Exercise", ExerciseSchema, "exercises");

const CATEGORY_GIFS: Record<string, string> = {
  "waist":       "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg",
  "chest":       "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Barbell_Bench_Press/0.jpg",
  "back":        "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg",
  "shoulders":   "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Arnold_Dumbbell_Press/0.jpg",
  "upper arms":  "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Alternate_Hammer_Curl/0.jpg",
  "lower arms":  "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Barbell_Wrist_Curl/0.jpg",
  "upper legs":  "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Barbell_Full_Squat/0.jpg",
  "lower legs":  "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Ankle_Circles/0.jpg",
  "cardio":      "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Air_Bike/0.jpg",
  "neck":        "https://raw.githubusercontent.com/riteekgore37-cmyk/free-exercise-db/main/exercises/Anterior_Tibialis-SMR/0.jpg",
};

async function updateGifs() {
  await mongoose.connect(process.env.DB_URI!);
  console.log("✅ Connected to MongoDB");

  for (const [category, imageUrl] of Object.entries(CATEGORY_GIFS)) {
    const result = await Exercise.updateMany(
      { category },
      { $set: { coverImage: imageUrl, "media.url": imageUrl } }
    );
    console.log(`✅ ${category}: updated ${result.modifiedCount} exercises`);
  }

  await mongoose.disconnect();
  console.log("✅ All done!");
}

updateGifs().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});