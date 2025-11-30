/**
 * @file The main logic for our Employee generator.
 */

// --- All constants and data ---
const MALE_NAMES = ["Jan", "Petr", "Pavel", "Jiří", "Martin", "Tomáš", "Jaroslav", "Miroslav", "Zdeněk", "Václav", "David", "Jakub", "Lukáš", "Michal", "František", "Karel", "Milan", "Josef", "Andrej", "Jindřich", "Ondřej", "Marek", "Roman", "Filip", "Antonín"];
const FEMALE_NAMES = ["Jana", "Marie", "Eva", "Hana", "Anna", "Lenka", "Kateřina", "Věra", "Lucie", "Alena", "Petra", "Veronika", "Martina", "Jitka", "Tereza", "Michaela", "Zuzana", "Monika", "Magdaléna", "Elena", "Kristýna", "Markéta", "Barbora", "Nikola", "Karolína"];

const MALE_SURNAMES = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Pokorný", "Hájek", "Král", "Jelínek", "Růžička", "Záruba", "Drapák", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman", "Kolář"];
const FEMALE_SURNAMES = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová", "Marková", "Pospíšilová", "Pokorná", "Hájková", "Králová", "Jelínková", "Růžičková", "Zárubová", "Drapáková", "Benešová", "Fialová", "Sedláčková", "Doležalová", "Zemanová", "Kolářová"];

const WORKLOADS = [10, 20, 30, 40];
const GENDERS = ["male", "female"];

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

// --- Helping functions ---

/**
 * Helper to pick random item from array.
 * @param {Array} array Source array
 * @returns {*} Random element
 */
function getRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

/**
 * Gets a random name and surname based on gender.
 * @param {string} gender either male/female
 * @returns {object} { name, surname }
 */
function generateName(gender) {
  if (gender === "male") {
    return {
      name: getRandomItem(MALE_NAMES),
      surname: getRandomItem(MALE_SURNAMES)
    };
  } else {
    return {
      name: getRandomItem(FEMALE_NAMES),
      surname: getRandomItem(FEMALE_SURNAMES)
    };
  }
}

/**
 * Calculates birthdate based on age range.
 * @param {number} minAge Minimum age
 * @param {number} maxAge Maximum age
 * @returns {string} ISO date string
 */
function generateBirthdate(minAge, maxAge) {
  const now = Date.now();
  
  const minTimestamp = now - (maxAge * MS_PER_YEAR);
  const maxTimestamp = now - (minAge * MS_PER_YEAR);

  const randomTimestamp = Math.random() * (maxTimestamp - minTimestamp) + minTimestamp;

  return new Date(randomTimestamp).toISOString();
}

/**
 * Generates a single employee object.
 * @param {number} minAge 
 * @param {number} maxAge 
 * @returns {object} Employee object
 */
function generateEmployee(minAge, maxAge) {
  const gender = getRandomItem(GENDERS);
  const workload = getRandomItem(WORKLOADS);
  const nameData = generateName(gender);
  const birthdate = generateBirthdate(minAge, maxAge);

  return {
    gender: gender,
    birthdate: birthdate,
    name: nameData.name,
    surname: nameData.surname,
    workload: workload
  };
}

// --- Main export ---

/**
 * Main function to generate employees.
 * @param {object} dtoIn Input data with count and age
 * @returns {Array} List of employees
 */
export function main(dtoIn) {
  if (!dtoIn || typeof dtoIn.count !== 'number' || !dtoIn.age) {
    throw new Error("Your input is invalid");
  }

  const count = dtoIn.count;
  const minAge = dtoIn.age.min;
  const maxAge = dtoIn.age.max;

  const dtoOut = [];

  for (let i = 0; i < count; i++) {
    const employee = generateEmployee(minAge, maxAge);
    dtoOut.push(employee);
  }

  return dtoOut;
}