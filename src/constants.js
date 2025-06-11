export const monthNames = {
  english: [
    "Meskerem",
    "Tikimt",
    "Hidar",
    "Tahsas",
    "Tir",
    "Yekatit",
    "Megabit",
    "Miazia",
    "Ginbot",
    "Sene",
    "Hamle",
    "Nehase",
    "Pagume",
  ],
  amharic: [
    "መስከረም",
    "ጥቅምት",
    "ህዳር",
    "ታህሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዝያ",
    "ግንቦት",
    "ሰኔ",
    "ሀምሌ",
    "ነሐሴ",
    "ጳጉሜ",
  ],
  gregorian: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  //   TODO: add oromifa, tigrigna, afar, somali, sidama, wolaytta, gambela languges
};

export const daysOfWeek = {
  english: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  amharic: ["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"],
  //   TODO: add oromifa, tigrigna, afar, somali, sidama, wolaytta, gambela languges
};

export const holidayNames = {
  abiyTsome: {
    amharic: "ዐቢይ ጾም",
    english: "Great Lent (Abiy Tsome)",
  },
  debreZeit: {
    amharic: "ደብረ ዘይት",
    english: "Mid-Lent (Debre Zeit)",
  },
  hosanna: {
    amharic: "ሆሳዕና",
    english: "Palm Sunday (Hosanna)",
  },
  rikbeKahnat: {
    amharic: "ርክበ ካህናት",
    english: "Meeting of the Priests (Rikbe Kahnat)",
  },
  erget: {
    amharic: "ዕርገት",
    english: "Ascension (Erget)"
  },
  paraclete: {
    amharic: "ጰራቅሊጦስ",
    english: "Pentecost (Paraclete)"
  },
  tsomeHawaryat: {
    amharic: "ጾመ ሐዋርያት",
    english: "Apostles' Fast"
  },
  tsomeDihnet: {
    amharic: "ጾመ ድኅነት",
    english: "Fast of Salvation"
  },
  nineveh: {
    amharic: 'ጾመ ነነዌ',
    english: 'Fast of Nineveh'
  },
  enkutatash: {
    amharic: "እንቁጣጣሽ",
    english: "Ethiopian New Year (Enkutatash)",
    // oromifa: '...', etc.
  },
  meskel: {
    amharic: "መስቀል",
    english: "Finding of the True Cross (Meskel)",
  },
  beherbehereseb: {
    amharic: "የብሔር ብሔረሰቦች ቀን",
    english: "Ethiopian National Unity Day",
  },
  gena: {
    amharic: "ገና",
    english: "Ethiopian Christmas (Genna)",
  },
  timket: {
    amharic: "ጥምቀት",
    english: "Ethiopian Epiphany (Timket)",
  },
  martyrsDay: {
    amharic: "የሰማዕታት ቀን",
    english: "Ethiopian Martyrs’ Day",
  },
  adwa: {
    amharic: "የአድዋ ድል በዓል",
    english: "Victory of Adwa",
  },
  labour: {
    amharic: "የሰራተኞች ቀን",
    english: "International Labour Day",
  },
  patriots: {
    amharic: "የአርበኞች (የድል) ቀን",
    english: "Ethiopian Patriots’ Victory Day",
  },
  eidFitr: {
    amharic: "ዒድ አል ፈጥር",
    english: "Eid al-Fitr (Arafa)",
  },
  siklet: {
    amharic: "ስቅለት",
    english: "Good Friday (Siklet)",
  },
  fasika: {
    amharic: "ፋሲካ",
    english: "Ethiopian Easter (Fasika)",
  },
  eidAdha: {
    amharic: "ዒድ አል አድሐ",
    english: "Eid al-Adha",
  },
  moulid: {
    amharic: "መውሊድ",
    english: "Birth of Prophet Mohammed (Moulid)",
  },
};

export const PERIOD_LABELS = {
  day: "ከሰዓት",
  night: "ማታ",
};

export const evangelists = {
  1: "Matthew",
  2: "Mark",
  3: "Luke",
  0: "John",
};

export const newYearWeekdayMap = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

// As per the text, for calculating Mebaja Hamer
export const tewsakMap = {
  Sunday: 7,
  Monday: 6,
  Tuesday: 5,
  Wednesday: 4,
  Thursday: 3,
  Friday: 2,
  Saturday: 8,
};

// Tewsak values for major holidays relative to Nineveh
export const movableHolidayTewsak = {
  ABIY_TSOME: 14,
  DEBRE_ZEIT: 41,
  HOSANNA: 62,
  SIKLET: 67, // Good Friday
  TINSAYE: 69, // Easter/Fasika
  RIKBE_KAHNAT: 93,
  ERGET: 108, // Ascension
  PARACLETE: 118, // Pentecost
  TSOME_HAWARYAT: 119, // Apostles' Fast
  TSOME_DIHENET: 121, // Fast of Salvation (Wed/Fri)
};
