import { ExerciseType } from "@common/enums/exercise-type.enum";
import { Equipment } from "@common/models/equipment.model";
import { Exercise, IExercise } from "@common/models/exercise.model";
import { Muscle } from "@common/models/muscle.model";
import { dbStore } from "seeder/helpers/db-store";
import { IExerciseCSV } from "seeder/helpers/load-exercises-dataset";
import { seederWrapper } from "seeder/helpers/seeder-wrapper";

export default seederWrapper(Exercise, async () => {
  console.log('preparing exercises data... (this may take a while)');
  let randomDuration = 30 + Math.floor(Math.random() * 60);
  const data = (await Promise.all(dbStore.excerisesDataset.map(async function (e: IExerciseCSV) {
    const primaryMuscle = await Muscle.findOne({ name: e.target }).exec();
    const equipment = await Equipment.findOne({ name: e.equipment }).exec();
    
    // Skip exercises where muscle or equipment is not found in DB
    if (!primaryMuscle || !equipment) {
      console.warn(`Skipping exercise "${e.name}": muscle "${e.target}" or equipment "${e.equipment}" not found`);
      return null;
    }
    
    return {
      name: e.name,
      category: e.bodyPart,
      exerciseType: e.type,
      ...(
        e.type === ExerciseType.WEIGHT &&
        {
          reps: 10 + Math.floor(Math.random() * 10),
          sets: e.sets,
          duration: 0,
        }
        ||
        {
          duration: randomDuration,
        }
      ),

      expectedDurationRange: (e.type === ExerciseType.WEIGHT && {
        min: 10 + Math.floor(Math.random() * 10),
        max: 30 + Math.floor(Math.random() * 30),
      } ||
      {
        min: randomDuration,
        max: randomDuration,
      }),
      ...(
        e.instructions === "" &&
        {
          instructions: "Do this exercise",
        }
        ||
        {
          instructions: e.instructions,
        }
      ),
      ...(
        e.benefits === "" &&
        {
          benefits: "You will get stronger",
        }
        ||
        {
          benefits: e.benefits,
        }
      ),
      targetMuscles: {
        primary: primaryMuscle._id,
        secondary: primaryMuscle._id,
      },
      equipments: [equipment._id],
      coverImage: e.gif_url,
      media: {
        type: 'image',
        url: e.gif_url,
      },
      isDeleted: false,
    } satisfies IExercise;
  }))).filter(Boolean);
  console.log(`inserting ${data.length} exercises...`);
  // Insert in batches to avoid memory issues
  const batchSize = 100;
  for (let i = 0; i < data.length; i += batchSize) {
    await Exercise.insertMany(data.slice(i, i + batchSize), { ordered: false }).catch(err => {
      if (err.code !== 11000) throw err; // ignore duplicate key errors
    });
  }
})