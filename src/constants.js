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
};

export const HolidayTags = {
  PUBLIC: "public",
  RELIGIOUS: "religious",
  CHRISTIAN: "christian",
  MUSLIM: "muslim",
  STATE: "state",
  CULTURAL: "cultural",
  OTHER: "other",
};

export const keyToTewsakMap = {
  nineveh: "NINEVEH",
  abiyTsome: "ABIY_TSOME",
  debreZeit: "DEBRE_ZEIT",
  hosanna: "HOSANNA",
  siklet: "SIKLET",
  fasika: "TINSAYE",
  rikbeKahnat: "RIKBE_KAHNAT",
  erget: "ERGET",
  paraclete: "PARACLETE",
  tsomeHawaryat: "TSOME_HAWARYAT",
  tsomeDihnet: "TSOME_DIHENET",
};

export const PERIOD_LABELS = {
  day: "ጠዋት",
  night: "ማታ",
};

// Renamed from holidayNames and restructured for i18n
export const holidayInfo = {
  enkutatash: {
    name: { amharic: "እንቁጣጣሽ", english: "Ethiopian New Year (Enkutatash)" },
    description: {
      amharic: "የኢትዮጵያ አዲስ ዓመት መጀመሪያ፤ የዝናብ ወቅት ማብቃቱን እና ዳግም መታደስን ያመለክታል።",
      english:
        "Marks the start of the Ethiopian year; symbolizes renewal and the end of the rainy season.",
    },
  },
  meskel: {
    name: { amharic: "መስቀል", english: "Finding of the True Cross (Meskel)" },
    description: {
      amharic: "በ4ኛው መቶ ክፍለ ዘመን በንግሥት እሌኒ አማካኝነት የጌታችን መስቀል መገኘቱን ያከብራል።",
      english:
        "Commemorates the discovery of the True Cross by Empress Helena in the 4th century.",
    },
  },
  beherbehereseb: {
    name: {
      amharic: "የብሔር ብሔረሰቦች ቀን",
      english: "Nations, Nationalities, and Peoples' Day",
    },
    description: {
      amharic:
        "የኢትዮጵያ ብሔር ብሔረሰቦችን ልዩነት የሚያከብር፣ እኩል መብታቸውን የሚያረጋግጥ እና በባህልና ቋንቋ አንድነትን የሚያጠናክር በዓል ነው።",
      english:
        "Acknowledges and celebrates the diversity of Ethiopia's ethnic groups, affirming their equal rights and fostering unity.",
    },
  },
  gena: {
    name: { amharic: "ገና", english: "Ethiopian Christmas (Genna)" },
    description: {
      amharic: "የኢየሱስ ክርስቶስን ልደት የሚያከብር የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በዓል።",
      english:
        "Ethiopian Orthodox Christmas celebrating the birth of Jesus Christ.",
    },
  },
  timket: {
    name: { amharic: "ጥምቀት", english: "Ethiopian Epiphany (Timket)" },
    description: {
      amharic: "የኢየሱስ ክርስቶስን በዮርዳኖስ ወንዝ መጠመቁን ያከብራል።",
      english: "Commemorates the baptism of Jesus in the Jordan River.",
    },
  },
  martyrsDay: {
    name: { amharic: "የሰማዕታት ቀን", english: "Martyrs' Day" },
    description: {
      amharic: "ለኢትዮጵያ ነፃነትና ክብር ሕይወታቸውን የሠዉ ሰማዕታትን ያስባል።",
      english:
        "Honors those who sacrificed their lives for Ethiopia’s freedom and independence.",
    },
  },
  adwa: {
    name: { amharic: "የአድዋ ድል በዓል", english: "Victory of Adwa" },
    description: {
      amharic: "በ1896 ዓ.ም. ኢትዮጵያ በጣሊያን ቅኝ ገዥዎች ላይ የተቀዳጀችውን ድል ያከብራል።",
      english: "Celebrates Ethiopia’s victory over Italian colonizers in 1896.",
    },
  },
  labour: {
    name: { amharic: "የሰራተኞች ቀን", english: "International Labour Day" },
    description: {
      amharic: "ዓለም አቀፍ የሠራተኞችና የሥራ መብቶች ቀን ነው።",
      english: "A global celebration of workers and labor rights.",
    },
  },
  patriots: {
    name: { amharic: "የአርበኞች ቀን", english: "Patriots' Victory Day" },
    description: {
      amharic: "የጣሊያን ወረራን የተቋቋሙ ኢትዮጵያውያን አርበኞችን ድል ያስባል።",
      english:
        "Honors Ethiopian resistance fighters who defeated Italian occupation.",
    },
  },
  nineveh: {
    name: { amharic: "ጾመ ነነዌ", english: "Fast of Nineveh" },
    description: {
      amharic: "የነነዌ ሰዎች ንስሐ መግባታቸውን የሚያስታውስ የሦስት ቀን ጾም ነው።",
      english:
        "A three-day fast commemorating the repentance of the people of Nineveh.",
    },
  },
  abiyTsome: {
    name: { amharic: "ዐቢይ ጾም", english: "Great Lent" },
    description: {
      amharic: "ከፋሲካ በፊት የሚጾም የ55 ቀናት የጾም ወቅት ነው።",
      english: "The Great Lent, a 55-day fasting period before Easter.",
    },
  },
  debreZeit: {
    name: { amharic: "ደብረ ዘይት", english: "Mid-Lent Sunday" },
    description: {
      amharic: "ኢየሱስ በደብረ ዘይት ተራራ ያስተማረውን ትምህርት የሚያስታውስ የዐቢይ ጾም አጋማሽ እሑድ።",
      english:
        "Mid-Lent Sunday, commemorating Jesus's sermon on the Mount of Olives.",
    },
  },
  hosanna: {
    name: { amharic: "ሆሳዕና", english: "Palm Sunday" },
    description: {
      amharic: "ኢየሱስ በክብር ወደ ኢየሩሳሌም መግባቱን የሚያስታውስ በዓል።",
      english:
        "Palm Sunday, commemorating Jesus's triumphal entry into Jerusalem.",
    },
  },
  siklet: {
    name: { amharic: "ስቅለት", english: "Good Friday" },
    description: {
      amharic: "የኢየሱስ ክርስቶስን ስቅለት የሚያስታውስ ነው።",
      english: "Marks the crucifixion of Jesus Christ.",
    },
  },
  fasika: {
    name: { amharic: "ፋሲካ", english: "Ethiopian Easter" },
    description: {
      amharic:
        "የኢየሱስ ክርስቶስን ከሙታን መነሣት ያከብራል። በኢትዮጵያ ውስጥ ካሉ ክርስቲያናዊ በዓላት አንዱና ዋነኛው ነው።",
      english:
        "Celebrates the resurrection of Jesus Christ. One of the most important Christian holidays in Ethiopia.",
    },
  },
  rikbeKahnat: {
    name: { amharic: "ርክበ ካህናት", english: "Meeting of the Priests" },
    description: {
      amharic: "ከፋሲካ 24 ቀናት በኋላ የሚከበር የካህናት መሰባሰብ በዓል ነው።",
      english: "The Meeting of the Priests, 24 days after Easter.",
    },
  },
  erget: {
    name: { amharic: "ዕርገት", english: "Ascension" },
    description: {
      amharic: "ከፋሲካ 40 ቀናት በኋላ ኢየሱስ ወደ ሰማይ ማረጉን ያከብራል።",
      english: "The Ascension of Jesus into heaven, 40 days after Easter.",
    },
  },
  paraclete: {
    name: { amharic: "ጰራቅሊጦስ", english: "Pentecost" },
    description: {
      amharic: "መንፈስ ቅዱስ በሐዋርያት ላይ መውረዱን የሚያከብር በዓል፣ ከፋሲካ 50 ቀናት በኋላ።",
      english:
        "Pentecost, celebrating the descent of the Holy Spirit upon the Apostles, 50 days after Easter.",
    },
  },
  tsomeHawaryat: {
    name: { amharic: "ጾመ ሐዋርያት", english: "Apostles' Fast" },
    description: {
      amharic: "ከጰራቅሊጦስ ማግስት የሚጀምር የሐዋርያት ጾም ነው።",
      english:
        "The Fast of the Apostles, which begins the day after Pentecost.",
    },
  },
  tsomeDihnet: {
    name: { amharic: "ጾመ ድኅነት", english: "Fast of Salvation" },
    description: {
      amharic: "በየሳምንቱ ረቡዕ እና ዓርብ የሚጾም የድኅነት ጾም ነው።",
      english: "The Fast of Salvation, observed on Wednesdays and Fridays.",
    },
  },
  eidFitr: {
    name: { amharic: "ዒድ አል ፈጥር", english: "Eid al-Fitr" },
    description: {
      amharic: "የረመዳን ጾም ወር መገባደድን የሚያመለክት በዓል።",
      english: "Marks the end of Ramadan, the month of fasting for Muslims.",
    },
  },
  eidAdha: {
    name: { amharic: "ዒድ አል አድሐ", english: "Eid al-Adha" },
    description: {
      amharic: "አብርሃም ለእግዚአብሔር በመታዘዝ ልጁን ለመሠዋት ፈቃደኝነቱን የሚያስታውስ በዓል።",
      english:
        "Commemorates Abraham’s willingness to sacrifice his son as an act of obedience to God.",
    },
  },
  moulid: {
    name: { amharic: "መውሊድ", english: "Birth of the Prophet" },
    description: {
      amharic: "የነቢዩ ሙሐመድን የልደት በዓል ያከብራል።",
      english: "Celebrates the birthday of the Prophet Mohammed.",
    },
  },

  jummah: {
    name: { amharic: "ጁምዓ", english: "Jummah" },
    description: {
      amharic: "ሳምንታዊ የሙስሊሞች የጋራ ስግደት።",
      english: "The weekly Muslim congregational prayer."
    }
  }
};

// Bahire Hasab related constants
export const evangelistNames = {
  english: { 1: "Matthew", 2: "Mark", 3: "Luke", 0: "John" },
  amharic: { 1: "ማቴዎስ", 2: "ማርቆስ", 3: "ሉቃስ", 0: "ዮሐንስ" },
};

export const tewsakMap = {
  Sunday: 7,
  Monday: 6,
  Tuesday: 5,
  Wednesday: 4,
  Thursday: 3,
  Friday: 2,
  Saturday: 8,
};

export const movableHolidayTewsak = {
  NINEVEH: 0,
  ABIY_TSOME: 14,
  DEBRE_ZEIT: 41,
  HOSANNA: 62,
  SIKLET: 67,
  TINSAYE: 69,
  RIKBE_KAHNAT: 93,
  ERGET: 108,
  PARACLETE: 118,
  TSOME_HAWARYAT: 119,
  TSOME_DIHENET: 121,
};

export const movableHolidays = {
  nineveh: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  abiyTsome: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  debreZeit: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  hosanna: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  siklet: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN, HolidayTags.PUBLIC] },
  fasika: {
    tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
  rikbeKahnat: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  erget: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  paraclete: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  tsomeHawaryat: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  tsomeDihnet: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
  eidFitr: {
    tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
  },
  eidAdha: {
    tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
  },
  moulid: {
    tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
  },
};

// Canonical fasting keys and list to avoid hardcoded strings
export const FastingKeys = {
  ABIY_TSOME: 'ABIY_TSOME',
  TSOME_HAWARYAT: 'TSOME_HAWARYAT',
  TSOME_NEBIYAT: 'TSOME_NEBIYAT',
  NINEVEH: 'NINEVEH',
  FILSETA: 'FILSETA',
  RAMADAN: 'RAMADAN',
  TSOME_DIHENET: 'TSOME_DIHENET',
};

// Fasting metadata similar to holidayInfo, with i18n-friendly names and descriptions
export const fastingInfo = {
  ABIY_TSOME: {
    name: { amharic: "ዐቢይ ጾም (ሁዳዴ)", english: "Great Lent (Abiy Tsome)" },
    description: {
      amharic: "ከፋሲካ በፊት የሚጾም 55 ቀናት የጾም ወቅት ነው።",
      english: "A 55-day fasting season observed before Easter in the Ethiopian Orthodox Church.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
  NINEVEH: {
    name: { amharic: "ጾመ ነነዌ", english: "Fast of Nineveh" },
    description: {
      amharic: "የነነዌ ሰዎች ለሰሩት ሐጢያት የእግዚአብሔርን ምህረትና ይቅርታ ለመጠየቅ የፆሙትን ለማስታወስ ነው።",
      english: "A three-day fast commemorating the repentance of the people of Nineveh.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
  TSOME_HAWARYAT: {
    name: { amharic: "ጾመ ሐዋርያት", english: "Apostles' Fast (Tsome Hawaryat)" },
    description: {
      amharic: "ክርስቶስ ከሙታን ተለይቶ ከተነሳ በሃላ ቅዱሳን ሀዋርያት ሰማያዊ ተልእኮ ስለተሰማቸው ከ50ቀን በሃላ በበአለ ጰራቅሊጦስ ማግስት መፆም ጀመሩ።",
      english: "Begins after Pentecost and lasts until Hamle 4 in the Ethiopian calendar.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
  TSOME_NEBIYAT: {
    name: { amharic: "የገና-ፆም (ጾመ ነቢያት)", english: "Fast of the Prophets (Tsome Nebiyat)" },
    description: {
      amharic: "ከህዳር 15 እስከ ታሕሳስ 28 ድረስ የሚጠብቅ የቋሚ ጾም ነው።",
      english: "A fixed fast observed from Hidar 15 to Tahsas 28.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
  FILSETA: {
    name: { amharic: "ፍልሰታ", english: "Filseta" },
    description: {
      amharic: "ፆመ ፍልሰታ /ከነሐሴ 1 እስከ ነሐሴ 14 ቀን/ የእመቤታችን ዕረፍት፣ ትንሣኤና ዕርገቷ የሚታሰብበት ወቅት ነው፡፡",
      english: "A fixed 14-day fast (Nehase 1–14) commemorating the Dormition, Resurrection, and Assumption of the Virgin Mary; a season of prayer and intercession.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
  RAMADAN: {
    name: { amharic: "ረመዳን", english: "Ramadan" },
    description: {
      amharic: "ረመዳን በሂጅራ አቆጣጠር ዘጠነኛው ወር እና በሙስሊሞች ዘንድ የጾም፣ ጸሎት ወር ነው",
      english: "The Islamic month of fasting from dawn to sunset; a time of prayer, reflection, and charity.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
  },
  TSOME_DIHENET: {
    name: { amharic: "ጾመ ድኅነት (ረቡእ·ዓርብ)", english: "Fast of Salvation (Wed & Fri)" },
    description: {
      amharic: "ከበአለ ሀምሳ ውጭ በሳምንት ረቡእ እና አርብ የምንፆመው ነው።",
      english: "A fast observed on Wednesdays and Fridays outside of the 50 days after Easter.",
    },
    tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
  },
};
