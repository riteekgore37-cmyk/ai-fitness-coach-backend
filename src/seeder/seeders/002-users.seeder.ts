import { AuthenticatableType } from "@common/enums/authenticatable-type.enum";
import { FitnessGoal } from "@common/enums/fitness-goal.enum";
import { FitnessLevel } from "@common/enums/fitness-level.enum";
import { Gender } from "@common/enums/gender.enum";
import { Injury } from "@common/enums/injury.enum";
import { PreferredDay } from "@common/enums/preferred-day.enum";
import { PreferredEquipment } from "@common/enums/preferred-equipment.enum";
import { WorkoutPlace } from "@common/enums/workout-place.enum";
import { IUser, User } from "@common/models/user.model";
import { seederWrapper } from "seeder/helpers/seeder-wrapper";

export default seederWrapper(User, async () => {

  // User 1 — Riteek (your main test user)
  await User.create({
    name: "Riteek Gore",
    email: "riteek@gmail.com",
    password: "android1234",
    image: "https://placehold.co/300x400",
    gender: Gender.MALE,
    height: 170,
    weight: 70,
    fitness_level: FitnessLevel.INTERMEDIATE,
    preferences: {
      fitness_goal: FitnessGoal.GAIN_MUSCLE,
      target_weight: 65,
      workout_frequency: 3,
      preferred_days: [PreferredDay.MONDAY, PreferredDay.WEDNESDAY, PreferredDay.FRIDAY],
      workout_place: WorkoutPlace.GYM,
      preferred_equipment: [PreferredEquipment.DUMBBELLS],
    },
    injuries: [],
    dob: new Date(2000, 1, 1),
    role: AuthenticatableType.USER,
  });

  // User 2
  await User.create({
    name: "User Two",
    email: "user2@app.com",
    password: "password",
    image: "https://placehold.co/300x400",
    gender: Gender.FEMALE,
    height: 165,
    weight: 60,
    fitness_level: FitnessLevel.BEGINNER,
    preferences: {
      fitness_goal: FitnessGoal.LOSE_WEIGHT,
      target_weight: 55,
      workout_frequency: 3,
      preferred_days: [PreferredDay.TUESDAY, PreferredDay.THURSDAY],
      workout_place: WorkoutPlace.HOME,
      preferred_equipment: [PreferredEquipment.BODYWEIGHT],
    },
    injuries: [],
    dob: new Date(1998, 5, 15),
    role: AuthenticatableType.USER,
  });

  // User 3
  await User.create({
    name: "User Three",
    email: "user3@app.com",
    password: "password",
    image: "https://placehold.co/300x400",
    gender: Gender.MALE,
    height: 175,
    weight: 80,
    fitness_level: FitnessLevel.ADVANCED,
    preferences: {
      fitness_goal: FitnessGoal.GET_FITTER,
      target_weight: 75,
      workout_frequency: 5,
      preferred_days: [PreferredDay.MONDAY, PreferredDay.TUESDAY, PreferredDay.THURSDAY],
      workout_place: WorkoutPlace.GYM,
      preferred_equipment: [PreferredEquipment.BARBELLS],
    },
    injuries: [Injury.KNEES],
    dob: new Date(1995, 3, 20),
    role: AuthenticatableType.USER,
  });

  // User 4
  await User.create({
    name: "User Four",
    email: "user4@app.com",
    password: "password",
    image: "https://placehold.co/300x400",
    gender: Gender.FEMALE,
    height: 160,
    weight: 55,
    fitness_level: FitnessLevel.BEGINNER,
    preferences: {
      fitness_goal: FitnessGoal.LOSE_WEIGHT,
      target_weight: 50,
      workout_frequency: 3,
      preferred_days: [PreferredDay.WEDNESDAY, PreferredDay.FRIDAY],
      workout_place: WorkoutPlace.HOME,
      preferred_equipment: [PreferredEquipment.RESISTANCE_BAND],
    },
    injuries: [],
    dob: new Date(2001, 8, 10),
    role: AuthenticatableType.USER,
  });

  console.log("✅ 4 users created");
});
