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

const orthodoxYearlyHolidays = [
  // Meskerem (September)
  {
    key: "ethiopian_new_year",
    name: {
      english:
        "Ethiopian New Year (Enkutatash) / Kidus Yohannes / Archangel Raguel",
      amharic: "አዲስ አመት (እንቁጣጣሽ) / ቅዱስ ዮሐንስ / ሩጫኤል",
    },
    geezDate: { month: "Meskerem", day: 1 },
    gregorianDate: { month: "September", day: 11 },
    isYearly: true,
  },
  {
    key: "beheading_st_john",
    name: {
      english: "Beheading of St. John the Baptist",
      amharic: "መርበብ ራስ ዮሐንስ",
    },
    geezDate: { month: "Meskerem", day: 2 },
    gregorianDate: { month: "September", day: 12 },
    isYearly: true,
  },
  {
    key: "miracle_mary_icon",
    name: {
      english: "Miracle of the Icon of St. Mary (Tsedenya)",
      amharic: "ተአምረ ድንቅ ስዕል ማርያም (ጸድናይ)",
    },
    geezDate: { month: "Meskerem", day: 10 },
    gregorianDate: { month: "September", day: 20 },
    isYearly: true,
  },
  {
    key: "st_stephen_relics",
    name: {
      english: "St. Stephen the First Martyr (Translation of Relics)",
      amharic: "ቅዱስ እስጢፋኖስ (ሥጋዊ ሕይወት መጨረሻ)",
    },
    geezDate: { month: "Meskerem", day: 15 },
    gregorianDate: { month: "September", day: 25 },
    isYearly: true,
  },
  {
    key: "meskel",
    name: {
      english: "Meskel (Finding of the True Cross)",
      amharic: "መስቀል",
    },
    geezDate: { month: "Meskerem", day: 17 },
    gregorianDate: { month: "September", day: 27 },
    isYearly: true,
  },
  {
    key: "st_ewostatewos",
    name: {
      english: "St. Ewostatewos",
      amharic: "ቅዱስ ኤዎስጣቴዎስ",
    },
    geezDate: { month: "Meskerem", day: 18 },
    gregorianDate: { month: "September", day: 28 },
    isYearly: true,
  },
  {
    key: "true_cross_gishen",
    name: {
      english: "Lodging of the True Cross Fragment at Gishen Debre Kerbe",
      amharic: "ትከሻ መስቀል በጊሸን ደብረ ከርቤ ገብቷል",
    },
    geezDate: { month: "Meskerem", day: 21 },
    gregorianDate: { month: "October", day: 1 },
    isYearly: true,
  },
  {
    key: "tsege_fast",
    name: {
      english: "Tsege Fast (Flight of the Holy Family to Egypt)",
      amharic: "ጸጋ ጾም (የቅድስት ቤተሰብ ወደ ግብጽ መሽተው)",
    },
    geezDate: { month: "Meskerem", day: 26 }, // Ends Hidar 6
    gregorianDate: { month: "October", day: 6 },
    isYearly: true,
  },
  {
    key: "martyrdom_st_arsema",
    name: {
      english: "Martyrdom of St. Arsema",
      amharic: "ክህደት ቅድስት አርሴማ",
    },
    geezDate: { month: "Meskerem", day: 29 },
    gregorianDate: { month: "October", day: 9 },
    isYearly: true,
  },

  // Teqemt (October)
  {
    key: "abuna_gabra_manfas_qeddus",
    name: {
      english: "Abuna Gabra Manfas Qeddus Received Covenant",
      amharic: "አቡነ ገብረ መንፈስ ቅዱስ ኪዳን ከእግዚአብሔር ተቀበሉ",
    },
    geezDate: { month: "Teqemt", day: 5 },
    gregorianDate: { month: "October", day: 15 },
    isYearly: true,
  },
  {
    key: "st_thomas_apostle",
    name: {
      english: "St. Thomas the Apostle",
      amharic: "ቅዱስ ቶማስ ሐዋርያ",
    },
    geezDate: { month: "Teqemt", day: 9 },
    gregorianDate: { month: "October", day: 19 },
    isYearly: true,
  },
  {
    key: "abuna_aragawi",
    name: {
      english: "Abuna Aragawi (Nine Saints) / Gabra Krestos / St. Philip",
      amharic: "አቡነ አራጉው (ከዘጠኝ ቅዱሳን) / ገብረ ክርስቶስ / ቅዱስ ፊሊጶስ",
    },
    geezDate: { month: "Teqemt", day: 14 },
    gregorianDate: { month: "October", day: 24 },
    isYearly: true,
  },
  {
    key: "st_stephen_ordination",
    name: {
      english: "St. Stephen the First Martyr (Ordination)",
      amharic: "ቅዱስ እስጢፋኖስ (የቀብር ቀን)",
    },
    geezDate: { month: "Teqemt", day: 17 },
    gregorianDate: { month: "October", day: 27 },
    isYearly: true,
  },
  {
    key: "st_mark_evangelist",
    name: {
      english: "St. Mark the Evangelist",
      amharic: "ቅዱስ ማርቆስ",
    },
    geezDate: { month: "Teqemt", day: 22 },
    gregorianDate: { month: "November", day: 1 },
    isYearly: true,
  },
  {
    key: "abuna_habibe",
    name: {
      english: "Abuna Habibe",
      amharic: "አቡነ ሐቢበ",
    },
    geezDate: { month: "Teqemt", day: 25 },
    gregorianDate: { month: "November", day: 4 },
    isYearly: true,
  },
  {
    key: "medhane_alem",
    name: {
      english: "Medhane Alem (Savior of the World) / Abba Meba Zion",
      amharic: "መድኃኔ ዓለም / አባ መባ ጽዮን",
    },
    geezDate: { month: "Teqemt", day: 27 },
    gregorianDate: { month: "November", day: 6 },
    isYearly: true,
  },
  {
    key: "st_emmanuel",
    name: {
      english: "St. Emmanuel",
      amharic: "ቅዱስ አማኑኤል",
    },
    geezDate: { month: "Teqemt", day: 28 },
    gregorianDate: { month: "November", day: 7 },
    isYearly: true,
  },
  {
    key: "birth_st_mark",
    name: {
      english: "Birth of St. Mark",
      amharic: "የቅዱስ ማርቆስ ልደት",
    },
    geezDate: { month: "Teqemt", day: 30 },
    gregorianDate: { month: "November", day: 9 },
    isYearly: true,
  },

  {
    key: "qusquam",
    name: {
      english: "Qusquam (Return of the Holy Family from Egypt)",
      amharic: "ቁስቋም (የቅድስት ቤተሰብ መመለስ)",
    },
    geezDate: { month: "Hidar", day: 6 },
    gregorianDate: { month: "November", day: 15 },
    isYearly: true,
  },
  {
    key: "st_george_consecration",
    name: {
      english: "St. George (Consecration of First Church)",
      amharic: "ቅዱስ ጊዮርጊስ (የመጀመሪያ ቤተ ክርስቲያን ሥርዓት)",
    },
    geezDate: { month: "Hidar", day: 7 },
    gregorianDate: { month: "November", day: 16 },
    isYearly: true,
  },
  {
    key: "four_living_creatures",
    name: {
      english: "Four Living Creatures (Cherubim) / Abba Kiros",
      amharic: "የአራቱ ሕያዋን እንስሳት (ከሩቢም) / አባ ኪሮስ",
    },
    geezDate: { month: "Hidar", day: 8 },
    gregorianDate: { month: "November", day: 17 },
    isYearly: true,
  },
  {
    key: "st_hanna",
    name: {
      english: "St. Hanna (Mother of Virgin Mary)",
      amharic: "ቅድስት ሐና (የእልፍ አባት ማርያም እናት)",
    },
    geezDate: { month: "Hidar", day: 11 },
    gregorianDate: { month: "November", day: 20 },
    isYearly: true,
  },
  {
    key: "archangel_michael_exodus",
    name: {
      english: "Archangel Michael (Exodus of Israel from Egypt)",
      amharic: "ቅዱስ ሚካኤል (እስራኤል ከግብጽ ማውጣት)",
    },
    geezDate: { month: "Hidar", day: 12 },
    gregorianDate: { month: "November", day: 21 },
    isYearly: true,
  },
  {
    key: "god_the_father",
    name: {
      english: "God the Father / Feast of Thousands of Angels",
      amharic: "እግዚአብሔር አብ / የሺህ መላእክት በዓል",
    },
    geezDate: { month: "Hidar", day: 13 },
    gregorianDate: { month: "November", day: 22 },
    isYearly: true,
  },
  {
    key: "fast_of_prophets",
    name: {
      english: "Fast of the Prophets (Tsome Nebiyat)",
      amharic: "የነቢያት ጾም (ታኅሳስ 28 - ጥር 6)",
    },
    geezDate: { month: "Hidar", day: 15 },
    gregorianDate: { month: "November", day: 25 },
    isYearly: true,
  },
  {
    key: "abba_iyesus_moa",
    name: {
      english: "Abba Iyesus-Mo'a (Founder of Hayq Monastery)",
      amharic: "አባ ኢየሱስ ሞአ (የሐይቅ ገበሬ ገዳም መስራች)",
    },
    geezDate: { month: "Hidar", day: 16 },
    gregorianDate: { month: "November", day: 26 },
    isYearly: true,
  },
  {
    key: "st_philip_apostle",
    name: {
      english: "St. Philip the Apostle",
      amharic: "ቅዱስ ፊሊጶስ ሐዋርያ",
    },
    geezDate: { month: "Hidar", day: 18 },
    gregorianDate: { month: "November", day: 28 },
    isYearly: true,
  },
  {
    key: "ark_of_covenant",
    name: {
      english: "Feast of the Ark of the Covenant's Arrival in Ethiopia",
      amharic: "የአርበኞች ቀን (የቃል ኪዳን ታቦት ወደ ኢትዮጵያ መምጣት)",
    },
    geezDate: { month: "Hidar", day: 21 },
    gregorianDate: { month: "November", day: 30 },
    isYearly: true,
  },
  {
    key: "twenty_four_priests",
    name: {
      english: "Feast of the 24 Priests of Heaven",
      amharic: "የሃያ አራት የሰማይ ካህናት በዓል",
    },
    geezDate: { month: "Hidar", day: 24 },
    gregorianDate: { month: "December", day: 3 },
    isYearly: true,
  },
  {
    key: "st_marqorewos",
    name: {
      english: "St. Marqorewos (Martyrdom)",
      amharic: "ቅዱስ ማርቆርዎስ (ክህደት)",
    },
    geezDate: { month: "Hidar", day: 25 },
    gregorianDate: { month: "December", day: 4 },
    isYearly: true,
  },
  {
    key: "abune_habte_mariam",
    name: {
      english: "Abune Habte Mariam / Abba Iyesus-Mo'a",
      amharic: "አቡነ ሐብተ ማርያም / አባ ኢየሱስ ሞአ",
    },
    geezDate: { month: "Hidar", day: 26 },
    gregorianDate: { month: "December", day: 5 },
    isYearly: true,
  },
  {
    key: "st_james_martyrdom",
    name: {
      english: "St. James (Martyrdom)",
      amharic: "ቅዱስ ያዕቆብ (ክህደት)",
    },
    geezDate: { month: "Hidar", day: 27 },
    gregorianDate: { month: "December", day: 6 },
    isYearly: true,
  },

  // Tahisas (December)
  {
    key: "prophet_elijah_birth",
    name: {
      english: "Prophet Elijah (Birth)",
      amharic: "ኤልያስ ነቢይ (ልደት)",
    },
    geezDate: { month: "Tahisas", day: 1 },
    gregorianDate: { month: "December", day: 10 },
    isYearly: true,
  },
  {
    key: "beata_mary_enters_temple",
    name: {
      english: "Beata (Virgin Mary Enters Temple at Age 3)",
      amharic: "ቤዛ (3 ዓመታት የሆነች ድንግል ማርያም ወደ ቤተ መቅደስ ገባች)",
    },
    geezDate: { month: "Tahisas", day: 3 },
    gregorianDate: { month: "December", day: 12 },
    isYearly: true,
  },
  {
    key: "st_andrew_apostle",
    name: {
      english: "St. Andrew the Apostle",
      amharic: "ቅዱስ አንድሬዎስ ሐዋርያ",
    },
    geezDate: { month: "Tahisas", day: 4 },
    gregorianDate: { month: "December", day: 13 },
    isYearly: true,
  },
  {
    key: "st_arsema_relics",
    name: {
      english: "St. Arsema (Translation of Relics)",
      amharic: "ቅድስት አርሴማ (ሥጋዊ ሕይወት መጨረሻ)",
    },
    geezDate: { month: "Tahisas", day: 6 },
    gregorianDate: { month: "December", day: 14 },
    isYearly: true,
  },
  {
    key: "sebket_prophets",
    name: {
      english: "Sebket (Prophets' Announcement Season)",
      amharic: "ሰብቀት (የነቢያት ትንቢት በዓል)",
    },
    geezDate: { month: "Tahisas", day: 7 },
    gregorianDate: { month: "December", day: 16 },
    isYearly: true,
  },
  {
    key: "abba_samuel",
    name: {
      english: "Abba Samuel of Waldebba Monastery",
      amharic: "አባ ሳሙኤል (የዋልድባ ገዳም)",
    },
    geezDate: { month: "Tahisas", day: 12 },
    gregorianDate: { month: "December", day: 21 },
    isYearly: true,
  },
  {
    key: "archangel_raphael_whale",
    name: {
      english: "Archangel Raphael (Stops Whale from Destroying Church)",
      amharic: "ቅዱስ ራፋኤል (ከተራ ዓሣ ቤተ ክርስቲያንን አዳነ)",
    },
    geezDate: { month: "Tahisas", day: 13 },
    gregorianDate: { month: "December", day: 22 },
    isYearly: true,
  },
  {
    key: "berhan",
    name: {
      english: "Berhan (God's Revelation as Sun of Justice)",
      amharic: "ብርሃን (የእግዚአብሔር መገለጥ በፀሐይ እንደ ጽድቅ)",
    },
    geezDate: { month: "Tahisas", day: 14 },
    gregorianDate: { month: "December", day: 23 },
    isYearly: true,
  },
  {
    key: "archangel_gabriel_furnace",
    name: {
      english: "Archangel Gabriel (Rescues Three Youths from Furnace)",
      amharic: "ቅዱስ ገብርኤል (ሦስቱ ልጆች ከእሳት እሳት አዳናቸው)",
    },
    geezDate: { month: "Tahisas", day: 19 },
    gregorianDate: { month: "December", day: 27 },
    isYearly: true,
  },
  {
    key: "nolawi",
    name: {
      english: "Nolawi (God as Shepherd Season)",
      amharic: "ኖላዊ (ጥጋብ ለበግ ልጆቹ ይላል)",
    },
    geezDate: { month: "Tahisas", day: 21 },
    gregorianDate: { month: "December", day: 30 },
    isYearly: true,
  },
  {
    key: "bisrate_gebriel",
    name: {
      english: "Bisrate Gebriel (Annunciation) / Daqseyos Holiday",
      amharic: "ብስራተ ገብርኤል (ወሬ መላክ) / ደቅሰዮስ በዓል",
    },
    geezDate: { month: "Tahisas", day: 22 },
    gregorianDate: { month: "December", day: 31 },
    isYearly: true,
  },

  {
    key: "abuna_takla_haymanot_birth",
    name: {
      english: "Abuna Takla Haymanot (Birth)",
      amharic: "አቡነ ተክለ ሃይማኖት (ልደት)",
    },
    geezDate: { month: "Tahisas", day: 24 },
    gregorianDate: { month: "January", day: 2 },
    isYearly: true,
  },

  {
    key: "genna_eve",
    name: {
      english: "Genna (Christmas Eve)",
      amharic: "ገና (በዓለ ልደት ቅድስት ሥላሴ)",
    },
    geezDate: { month: "Tahisas", day: 28 },
    gregorianDate: { month: "January", day: 6 },
    isYearly: true,
  },
  {
    key: "christmas",
    name: {
      english:
        "Christmas (Birth of Christ) / Birth of King Lalibela / Abuna Gebre Menfes Qidus",
      amharic: "ልደተ ኢየሱስ ክርስቶስ / ልደተ ላሊበላ / አቡነ ገብረ መንፈስ ቅዱስ",
    },
    geezDate: { month: "Tahisas", day: 29 },
    gregorianDate: { month: "January", day: 7 },
    isYearly: true,
  },

  // Tir (January)
  {
    key: "st_stephen_martyr",
    name: {
      english: "St. Stephen the First Martyr",
      amharic: "ቅዱስ እስጢፋኖስ (ክህደት)",
    },
    geezDate: { month: "Tir", day: 1 },
    gregorianDate: { month: "January", day: 9 },
    isYearly: true,
  },
  {
    key: "john_evangelist_ascension",
    name: {
      english: "John the Evangelist (Taken to Heaven)",
      amharic: "ዮሐንስ ወልደ ነጎዳጅ (ወደ ሰማይ ተወሰደ)",
    },
    geezDate: { month: "Tir", day: 4 },
    gregorianDate: { month: "January", day: 12 },
    isYearly: true,
  },
  {
    key: "circumcision_jesus",
    name: {
      english: "Circumcision of Jesus / Prophet Elijah (Ascension)",
      amharic: "ገዘረት (የኢየሱስ መገረዝ) / ኤልያስ ነቢይ (ወደ ሰማይ ተወሰደ)",
    },
    geezDate: { month: "Tir", day: 6 },
    gregorianDate: { month: "January", day: 14 },
    isYearly: true,
  },
  {
    key: "holy_trinity",
    name: {
      english: "Holy Trinity",
      amharic: "ቅድስት ሥላሴ",
    },
    geezDate: { month: "Tir", day: 7 },
    gregorianDate: { month: "January", day: 15 },
    isYearly: true,
  },
  {
    key: "ketera_eve_timket",
    name: {
      english: "KETERA - EVE OF TIMKET",
      amharic: "ቀትር (የጥምቀት ቀዳማይ ቀን)",
    },
    geezDate: { month: "Tir", day: 10 },
    gregorianDate: { month: "January", day: 18 },
    isYearly: true,
  },
  {
    key: "timket",
    name: {
      english: "Timket (Epiphany - Baptism of Jesus)",
      amharic: "ጥምቀት (የኢየሱስ ጥምቀት)",
    },
    geezDate: { month: "Tir", day: 11 },
    gregorianDate: { month: "January", day: 19 },
    isYearly: true,
  },
  {
    key: "cana_miracle",
    name: {
      english: "Miracle at Cana / Feast of Archangel Michael",
      amharic: "ቃና ዘገሊላ (የወይን ውኃ ተአምር) / በዓለ ሚካኤል",
    },
    geezDate: { month: "Tir", day: 12 },
    gregorianDate: { month: "January", day: 20 },
    isYearly: true,
  },
  {
    key: "aba_zara_buruk",
    name: {
      english: "Aba Zar'a-Buruk",
      amharic: "አባ ዘርአቡሩክ",
    },
    geezDate: { month: "Tir", day: 13 },
    gregorianDate: { month: "January", day: 21 },
    isYearly: true,
  },
  {
    key: "st_cyriacus_julietta",
    name: {
      english: "St. Cyriacus & St. Julietta (Martyrdom)",
      amharic: "ቅዱስ ቂርቆስ እና ቅድስት ይሁልታ (ክህደት)",
    },
    geezDate: { month: "Tir", day: 15 },
    gregorianDate: { month: "January", day: 23 },
    isYearly: true,
  },
  {
    key: "st_george_bones",
    name: {
      english: "St. George (Scattering of Bones)",
      amharic: "ቅዱስ ጊዮርጊስ (አጥንቶቹ ተበተኑ)",
    },
    geezDate: { month: "Tir", day: 18 },
    gregorianDate: { month: "January", day: 27 },
    isYearly: true,
  },
  {
    key: "departure_virgin_mary",
    name: {
      english: "Departure of Virgin Mary",
      amharic: "በዓለ ማርያም (ድንግል ማርያም ሞታ)",
    },
    geezDate: { month: "Tir", day: 21 },
    gregorianDate: { month: "January", day: 30 },
    isYearly: true,
  },
  {
    key: "archangel_uriel_covenant",
    name: {
      english: "Archangel Uriel (Received Covenant)",
      amharic: "ቅዱስ ዑራኤል (ኪዳን ተቀበለ)",
    },
    geezDate: { month: "Tir", day: 22 },
    gregorianDate: { month: "January", day: 31 },
    isYearly: true,
  },
  {
    key: "st_timothy",
    name: {
      english: "St. Timothy the Evangelist",
      amharic: "ቅዱስ ጢሞቴዎስ",
    },
    geezDate: { month: "Tir", day: 23 },
    gregorianDate: { month: "February", day: 1 },
    isYearly: true,
  },
  {
    key: "abuna_takla_haymanot_miracle",
    name: {
      english: "Abuna Takla Haymanot (7-Year Standing Miracle)",
      amharic: "አቡነ ተክለ ሃይማኖት (7 ዓመት በአንድ እግር ቆመው አንዱ እግራቸው ተሰበረ)",
    },
    geezDate: { month: "Tir", day: 24 },
    gregorianDate: { month: "February", day: 2 },
    isYearly: true,
  },
  {
    key: "emmanuel_loaves",
    name: {
      english: "Emmanuel (Multiplication of Loaves)",
      amharic: "አማኑኤል (የእንጀራ ብዛት ተአምር)",
    },
    geezDate: { month: "Tir", day: 28 },
    gregorianDate: { month: "February", day: 5 },
    isYearly: true,
  },

  // Yekatit (February)
  {
    key: "simeon_elder",
    name: {
      english: "Simeon the Elder (Birth) / Presentation of Jesus at Temple",
      amharic: "ስምዖን አያት (ልደት) / የኢየሱስ ወደ ቤተ መቅደስ ገባ",
    },
    geezDate: { month: "Yekatit", day: 8 },
    gregorianDate: { month: "February", day: 15 },
    isYearly: true,
  },
  {
    key: "kidane_mehret",
    name: {
      english: "Kidane Mehret (Covenant of Mary)",
      amharic: "ቂዳነ ምሕረት (የድንግል ማርያም ኪዳን)",
    },
    geezDate: { month: "Yekatit", day: 16 },
    gregorianDate: { month: "February", day: 23 },
    isYearly: true,
  },
  {
    key: "st_george_adwa",
    name: {
      english: "St. George (Battle of Adwa)",
      amharic: "ቅዱስ ጊዮርጊስ (የአድዋ ድል)",
    },
    geezDate: { month: "Yekatit", day: 23 },
    gregorianDate: { month: "March", day: 2 },
    isYearly: true,
  },

  // Megabit (March)
  {
    key: "abuna_gebre_menfes_qidus_death",
    name: {
      english: "Abuna Gebre Menfes Qidus (Death)",
      amharic: "አቡነ ገብረ መንፈስ ቅዱስ (ሞት)",
    },
    geezDate: { month: "Megabit", day: 5 },
    gregorianDate: { month: "March", day: 14 },
    isYearly: true,
  },
  {
    key: "st_matthias_apostle",
    name: {
      english: "St. Matthias the Apostle",
      amharic: "ቅዱስ ማቴዎስ ሐዋርያ",
    },
    geezDate: { month: "Megabit", day: 8 },
    gregorianDate: { month: "March", day: 17 },
    isYearly: true,
  },
  {
    key: "finding_true_cross",
    name: {
      english: "Finding of the True Cross",
      amharic: "የቅዱስ መስቀል ፈለግ",
    },
    geezDate: { month: "Megabit", day: 10 },
    gregorianDate: { month: "March", day: 19 },
    isYearly: true,
  },
  {
    key: "hosanna",
    name: {
      english: "Hosanna (Palm Sunday)",
      amharic: "ሆሳዕና (የወይን ቃጭል በዓል)",
    },
    geezDate: { month: "Megabit", day: 22 },
    gregorianDate: { month: "March", day: 31 },
    isYearly: true,
  },
  {
    key: "tente_sikletu",
    name: {
      english: "Tente Sikletu (Original Crucifixion Day)",
      amharic: "ተንተ ስክሊቱ (የመስቀል ቀን – የኢየሱስ መስቀል ቀን)",
    },
    geezDate: { month: "Megabit", day: 27 },
    gregorianDate: { month: "April", day: 5 },
    isYearly: true,
  },
  {
    key: "baale_wald",
    name: {
      english: "Baale Wald (Incarnation of Christ)",
      amharic: "በዓለ ወልድ (የኢየሱስ ሥጋ መዋለቅ)",
    },
    geezDate: { month: "Megabit", day: 29 },
    gregorianDate: { month: "April", day: 7 },
    isYearly: true,
  },

  // Miyazia (April)
  {
    key: "iyachem_death",
    name: {
      english: "Iyachem (Father of Virgin Mary) – Death",
      amharic: "ኢያኬም (የድንግል ማርያም አባት) ሞት",
    },
    geezDate: { month: "Miyazia", day: 7 },
    gregorianDate: { month: "April", day: 15 },
    isYearly: true,
  },
  {
    key: "st_james_apostle",
    name: {
      english: "St. James the Apostle",
      amharic: "ቅዱስ ያዕቆብ ሐዋርያ",
    },
    geezDate: { month: "Miyazia", day: 17 },
    gregorianDate: { month: "April", day: 25 },
    isYearly: true,
  },
  {
    key: "st_george_lydda",
    name: {
      english: "St. George of Lydda (Martyrdom)",
      amharic: "ቅዱስ ጊዮርጊስ ከሊድያ (ክህደት)",
    },
    geezDate: { month: "Miyazia", day: 23 },
    gregorianDate: { month: "May", day: 1 },
    isYearly: true,
  },
  {
    key: "st_mark_evangelist_martyrdom",
    name: {
      english: "St. Mark the Evangelist (Martyrdom)",
      amharic: "ቅዱስ ማርቆስ ሐዋርያ (ክህደት)",
    },
    geezDate: { month: "Miyazia", day: 30 },
    gregorianDate: { month: "May", day: 8 },
    isYearly: true,
  },

  // Ginbot (May)
  {
    key: "ledeta_maryam",
    name: {
      english: "Ledeta Mariam (Nativity of Virgin Mary)",
      amharic: "ልደተ ማርያም (የድንግል ማርያም ልደት)",
    },
    geezDate: { month: "Ginbot", day: 1 },
    gregorianDate: { month: "May", day: 9 },
    isYearly: true,
  },
  {
    key: "st_yared_ascension",
    name: {
      english: "St. Yared (Ascension)",
      amharic: "ቅዱስ ያሬድ (ወደ ሰማይ ተወሰደ)",
    },
    geezDate: { month: "Ginbot", day: 11 },
    gregorianDate: { month: "May", day: 19 },
    isYearly: true,
  },
  {
    key: "st_tekle_haymanot_veneration",
    name: {
      english: "St. Tekle Haymanot (Veneration of Relics)",
      amharic: "ቅዱስ ተክለ ሃይማኖት (አስተናግዶ የተከበረበት ቀን)",
    },
    geezDate: { month: "Ginbot", day: 12 },
    gregorianDate: { month: "May", day: 20 },
    isYearly: true,
  },
  {
    key: "st_gebre_kristos",
    name: {
      english: "St. Gebre Kristos (Left All for Christ)",
      amharic: "ቅዱስ ገብረ ክርስቶስ (ለክርስቶስ ሁሉን ትቶ ወዳለም ሄደ)",
    },
    geezDate: { month: "Ginbot", day: 14 },
    gregorianDate: { month: "May", day: 22 },
    isYearly: true,
  },
  {
    key: "mary_apparition_debre_mitmak",
    name: {
      english: "Apparition of Virgin Mary at Debre Mitmak",
      amharic: "ድንግል ማርያም በደብረ ምትማቅ ቤተ ክርስቲያን ታየች",
    },
    geezDate: { month: "Ginbot", day: 21 },
    gregorianDate: { month: "May", day: 29 },
    isYearly: true,
  },
  {
    key: "holy_family_egypt",
    name: {
      english: "Entry of the Holy Family into Egypt",
      amharic: "የቅድስት ቤተሰብ ግብጽ ገቡ",
    },
    geezDate: { month: "Ginbot", day: 24 },
    gregorianDate: { month: "June", day: 1 },
    isYearly: true,
  },
  {
    key: "st_thomas_martyrdom",
    name: {
      english: "St. Thomas the Apostle (Martyrdom)",
      amharic: "ቅዱስ ቶማስ ሐዋርያ (ክህደት)",
    },
    geezDate: { month: "Ginbot", day: 26 },
    gregorianDate: { month: "June", day: 3 },
    isYearly: true,
  },
  {
    key: "emmanuel",
    name: {
      english: "Emmanuel",
      amharic: "አማኑኤል",
    },
    geezDate: { month: "Ginbot", day: 28 },
    gregorianDate: { month: "June", day: 5 },
    isYearly: true,
  },
  // Ginbot (May)
  {
    key: "ledata_mariam",
    name: {
      english: "Ledata Mariam, The nativity of Our Holy Mother Virgin Mariam",
      amharic: "ልደተ ማርያም (የድንግል ማርያም ልደት)",
    },
    geezDate: { month: "Ginbot", day: 1 },
    gregorianDate: { month: "May", day: 9 },
    isYearly: true,
  },
  {
    key: "st_yared_ascension",
    name: {
      english: "Taken to heaven of St. Yared",
      amharic: "ቅዱስ ያሬድ ወደ ሰማይ ተወሰደ",
    },
    geezDate: { month: "Ginbot", day: 11 },
    gregorianDate: { month: "May", day: 19 },
    isYearly: true,
  },
  {
    key: "st_tekle_haymanot_relics",
    name: {
      english:
        "The Veneration of Relics of Saint Tekle Haymanot / Saint Kristos Semra took out 10,000 souls from Sheol to Heaven",
      amharic:
        "ቅዱስ ተክለ ሃይማኖት አስተናጋጅ / ቅዱስ ክርስቶስ ሰምራ 10,000 ነፍሳት ከሲኦል ወደ ሰማይ አወጣ",
    },
    geezDate: { month: "Ginbot", day: 12 },
    gregorianDate: { month: "May", day: 20 },
    isYearly: true,
  },
  {
    key: "st_gebre_kristos",
    name: {
      english:
        "Saint Gebre Kristos, The groom, on his wedding night left everything behind and became hermit",
      amharic: "ቅዱስ ገብረ ክርስቶስ, በዳግም ሙቀቱ ሁሉን ትቶ ወዳለም ሄደ",
    },
    geezDate: { month: "Ginbot", day: 14 },
    gregorianDate: { month: "May", day: 22 },
    isYearly: true,
  },
  {
    key: "mary_apparition_debre_mitmak",
    name: {
      english:
        "The appearance of Our Holy Mother Virgin Mariam in the church of Debre Mitmak",
      amharic: "ድንግል ማርያም በደብረ ምትማቅ ቤተ ክርስቲያን ታየች",
    },
    geezDate: { month: "Ginbot", day: 21 },
    gregorianDate: { month: "May", day: 29 },
    isYearly: true,
  },
  {
    key: "holy_family_egypt",
    name: {
      english: "The Entry of the holy family into Egypt",
      amharic: "የቅድስት ቤተሰብ ግብጽ ገቡ",
    },
    geezDate: { month: "Ginbot", day: 24 },
    gregorianDate: { month: "June", day: 1 },
    isYearly: true,
  },
  {
    key: "st_thomas_martyrdom",
    name: {
      english: "St. Thomas the Apostle, his martyrdom",
      amharic: "ቅዱስ ቶማስ ሐዋርያ, ክህደቱ",
    },
    geezDate: { month: "Ginbot", day: 26 },
    gregorianDate: { month: "June", day: 3 },
    isYearly: true,
  },
  {
    key: "amanuel",
    name: {
      english: "Amanu'el",
      amharic: "አማኑኤል",
    },
    geezDate: { month: "Ginbot", day: 28 },
    gregorianDate: { month: "June", day: 5 },
    isYearly: true,
  },
  {
    key: "abba_guba",
    name: {
      english: "Abba Guba one of the Nine Saints, Departed on this day",
      amharic: "አባ ጉባ ከዘጠኝ ቅዱሳን, ሞቱ",
    },
    geezDate: { month: "Ginbot", day: 29 },
    gregorianDate: { month: "June", day: 6 },
    isYearly: true,
  },

  // Sene (June)
  {
    key: "mary_thirst",
    name: {
      english:
        "Our Holy Mother was thirsty, and her son commanded the rock and water came",
      amharic: "ድንግል ማርያም ጠማች ፣ ልጅዋ አለት እንዲፈልቅ አዘዘ",
    },
    geezDate: { month: "Sene", day: 8 },
    gregorianDate: { month: "June", day: 15 },
    isYearly: true,
  },
  {
    key: "archangel_michael_feast",
    name: {
      english:
        "Annual Feast of Archangel Saint Michael, the deliverance of Bahiran from the hand of the wicked rich man/the deliverance of Saint Afomeya from the hand of Satan/ Saint Lalibela departed from this world",
      amharic: "ዓመታዊ በዓለ ሚካኤል, ባህራንን ከክፉ ሰው አዳነ/አፎሜያን ከሰይጣን አዳነ/ ላሊበላ ሞቱ",
    },
    geezDate: { month: "Sene", day: 12 },
    gregorianDate: { month: "June", day: 19 },
    isYearly: true,
  },
  {
    key: "first_mary_church",
    name: {
      english:
        "Henesate Beta Krestiyan - Establishment of the First Church Dedicated to Our Holy Mother Virgin Mariam at Philippi",
      amharic: "ሄነሳተ ቤተ ክርስቲያን - የመጀመሪያዋ የማርያም ቤተ ክርስቲያን በፊሊጵስ ተመሠረተ",
    },
    geezDate: { month: "Sene", day: 20 },
    gregorianDate: { month: "June", day: 27 },
    isYearly: true,
  },
  {
    key: "sene_golgota",
    name: {
      english:
        "Sene Golgota - Our Holy Mother Virgin Mariam prayed at Golgotha / the Consecration of the First Church Dedicated to Our Holy Mother Virgin Mariam at Philippi",
      amharic: "ሰኔ ጎልጎታ - ድንግል ማርያም በጎልጎታ ጸለየች / የፊሊጵስ ቤተ ክርስቲያን ሥርዓት",
    },
    geezDate: { month: "Sene", day: 21 },
    gregorianDate: { month: "June", day: 28 },
    isYearly: true,
  },
  {
    key: "st_jude_martyrdom",
    name: {
      english: "Saint Jude, son of Alpheus, the Apostle, his martyrdom",
      amharic: "ቅዱስ ይሁዳ የአልፋዎስ ልጅ ሐዋርያ, ክህደቱ",
    },
    geezDate: { month: "Sene", day: 25 },
    gregorianDate: { month: "July", day: 2 },
    isYearly: true,
  },
  {
    key: "john_baptist_birth",
    name: {
      english: "Birth date of John the Baptist",
      amharic: "የቅዱስ ዮሐንስ መጥምቅ ልደት",
    },
    geezDate: { month: "Sene", day: 30 },
    gregorianDate: { month: "July", day: 7 },
    isYearly: true,
  },

  // Hamle (July)
  {
    key: "thaddeus_martyrdom",
    name: {
      english: "Thaddeus the Apostle, his martyrdom",
      amharic: "ቅዱስ ታዴዎስ ሐዋርያ, ክህደቱ",
    },
    geezDate: { month: "Hamle", day: 2 },
    gregorianDate: { month: "July", day: 9 },
    isYearly: true,
  },
  {
    key: "peter_paul_martyrdom",
    name: {
      english:
        "Peter and Paul, the Apostles, martyrdom / departure of Abba Gerima the founder of Abba Gerima monastery",
      amharic: "ቅዱስ ጴጥሮስ እና ጳውሎስ ሐዋርያት, ክህደታቸው / አባ ገሪማ ከዚህ ዓለም ተለዩ",
    },
    geezDate: { month: "Hamle", day: 5 },
    gregorianDate: { month: "July", day: 12 },
    isYearly: true,
  },
  {
    key: "holy_trinity_feast",
    name: {
      english:
        "Kidist Selassie/ The Holy Trinity, the visit of God to Abraham in the form of three guests /Aba Girorgies zegasecha- Departed from this world",
      amharic:
        "ቅድስት ሥላሴ, እግዚአብሔር ለአብርሃም በሦስት እንግዶች መልክ መገኘት / አባ ጊሮርጊስ ዘገሰጫ ከዚህ ዓለም ተለዩ",
    },
    geezDate: { month: "Hamle", day: 7 },
    gregorianDate: { month: "July", day: 14 },
    isYearly: true,
  },
  {
    key: "abba_kiros",
    name: {
      english: "Abba Kiros -Departed from this world",
      amharic: "አባ ኪሮስ - ከዚህ ዓለም ተለዩ",
    },
    geezDate: { month: "Hamle", day: 8 },
    gregorianDate: { month: "July", day: 15 },
    isYearly: true,
  },
  {
    key: "bartholomew_martyrdom",
    name: {
      english: "Bartholomew or Nathanael, his martyrdom",
      amharic: "ቅዱስ በርተሎሜዎስ (ናታናኤል), ክህደቱ",
    },
    geezDate: { month: "Hamle", day: 10 },
    gregorianDate: { month: "July", day: 17 },
    isYearly: true,
  },
  {
    key: "cyriacus_julietta_martyrdom",
    name: {
      english:
        "St. Qirqos (Cyriacus) and his mother St. Iyyeluta (Julietta), their martyrdom",
      amharic: "ቅዱስ ቂርቆስ እና እናቱ ቅድስት ይሁልታ, ክህደታቸው",
    },
    geezDate: { month: "Hamle", day: 15 },
    gregorianDate: { month: "July", day: 22 },
    isYearly: true,
  },
  {
    key: "john_son_of_thunder",
    name: {
      english: "John, 'the Son of Thunder' his taken away to heaven",
      amharic: "ዮሐንስ 'የነጐዳጅ ልጅ' ወደ ሰማይ ተወሰደ",
    },
    geezDate: { month: "Hamle", day: 16 },
    gregorianDate: { month: "July", day: 23 },
    isYearly: true,
  },
  {
    key: "james_apostle_martyrdom",
    name: {
      english: "James, the Apostle, his martyrdom",
      amharic: "ቅዱስ ያዕቆብ ሐዋርያ, ክህደቱ",
    },
    geezDate: { month: "Hamle", day: 18 },
    gregorianDate: { month: "July", day: 25 },
    isYearly: true,
  },
  {
    key: "gabriel_rescue_cyriacus",
    name: {
      english:
        "The angel of God, St. Gabriel rescue Qirqos (Cyriacus) and his mother St. Iyyeluta (Julietta)",
      amharic: "ቅዱስ ገብርኤል ቂርቆስን እና እናቱን አዳኑ",
    },
    geezDate: { month: "Hamle", day: 19 },
    gregorianDate: { month: "July", day: 26 },
    isYearly: true,
  },
  {
    key: "archangel_uriel",
    name: {
      english: "Archangel Uriel",
      amharic: "ቅዱስ ዑራኤል",
    },
    geezDate: { month: "Hamle", day: 22 },
    gregorianDate: { month: "July", day: 29 },
    isYearly: true,
  },
  {
    key: "st_joseph_frumentius",
    name: {
      english:
        "Saint Joseph, departed from this world, Abba Salama- Frumentius, the Enlightener of Ethiopia departed from this world",
      amharic: "ቅዱስ ዮሴፍ ከዚህ ዓለም ተለዩ, አባ ሰላማ - ፍሩሜንጢዎስ ኢትዮጵያን ያበራ ከዚህ ዓለም ተለዩ",
    },
    geezDate: { month: "Hamle", day: 26 },
    gregorianDate: { month: "August", day: 2 },
    isYearly: true,
  },
  {
    key: "andrew_apostle_martyrdom",
    name: {
      english: "Andrew, the Apostle, his martyrdom",
      amharic: "ቅዱስ አንድሬዎስ ሐዋርያ, ክህደቱ",
    },
    geezDate: { month: "Hamle", day: 30 },
    gregorianDate: { month: "August", day: 6 },
    isYearly: true,
  },

  // Nehasie (August)
  {
    key: "tsome_filseta",
    name: {
      english:
        "Tsome Filseta, The Fast of the Assumption of Our Holy Mother Virgin Mariam",
      amharic: "ጾመ ፍልሰታ, የድንግል ማርያም ልደታ ጾም",
    },
    geezDate: { month: "Nehasie", day: 1 }, // Ends Nehasie 15
    gregorianDate: { month: "August", day: 7 },
    isYearly: true,
  },
  {
    key: "conception_of_mary",
    name: {
      english:
        "Ts'inseta LeMariam- Saint Hanna's Conception of Blessed Virgin Saint Mariam",
      amharic: "ጽንሰተ ለማርያም - ቅድስት ሐና ድንግል ማርያምን አረገዙ",
    },
    geezDate: { month: "Nehasie", day: 7 },
    gregorianDate: { month: "August", day: 13 },
    isYearly: true,
  },
  {
    key: "archangel_michael",
    name: {
      english: "The Archangel Michael",
      amharic: "ቅዱስ ሚካኤል",
    },
    geezDate: { month: "Nehasie", day: 12 },
    gregorianDate: { month: "August", day: 18 },
    isYearly: true,
  },
  {
    key: "transfiguration",
    name: {
      english: "Mount Tabor - transfiguration (Debre Tabor)",
      amharic: "ደብረ ታቦር - ለውጥ (ደብረ ታቦር)",
    },
    geezDate: { month: "Nehasie", day: 13 },
    gregorianDate: { month: "August", day: 19 },
    isYearly: true,
  },
  {
    key: "assumption_of_mary",
    name: {
      english: "Feast of the Assumption of Our Holy Mother Virgin Mariam",
      amharic: "በዓለ ልደታ ድንግል ማርያም",
    },
    geezDate: { month: "Nehasie", day: 16 },
    gregorianDate: { month: "August", day: 23 },
    isYearly: true,
  },
  {
    key: "takla_haymanot_kristos_semera",
    name: {
      english:
        "Abuna Takla Haymanot departed from this world / Saint Kristos Semera departed from this world",
      amharic: "አቡነ ተክለ ሃይማኖት ከዚህ ዓለም ተለዩ / ቅዱስ ክርስቶስ ሰምራ ከዚህ ዓለም ተለዩ",
    },
    geezDate: { month: "Nehasie", day: 24 },
    gregorianDate: { month: "August", day: 30 },
    isYearly: true,
  },

  // Pagumen (September)
  {
    key: "st_titus_martyrdom",
    name: {
      english: "Saint Titus the evangelical, his martyrdom",
      amharic: "ቅዱስ ቲቶስ ሐዋርያ, ክህደቱ",
    },
    geezDate: { month: "Pagumen", day: 2 },
    gregorianDate: { month: "September", day: 7 },
    isYearly: true,
  },
  {
    key: "archangel_raphael_feast",
    name: {
      english:
        "The Festival of the Archangel Raphael, commemorates the miracle of Raphael as written on the Book of Tobit /Melchisedek",
      amharic: "የቅዱስ ራፋኤል በዓል, ከመጽሐፈ ሶብት የተጻፈው ተአምር / መልከ ጼዴቅ",
    },
    geezDate: { month: "Pagumen", day: 3 },
    gregorianDate: { month: "September", day: 8 },
    isYearly: true,
  },
];
const orthodoxMonthlydays = {
  // 1. Ledata Mariam
ledeta_mariam: {
    key: "ledeta_mariam",
    name: {
      english: "Ldata Mariam",
      amharic: "ልደታ ማርያም ",
    },
    desc: {
      amharic: "ልደታ ማርያም",
      english: "The nativity of Our Holy Mother Virgin Mariam"
    },
    recuringDate: 1,
    major: 3,
    neges: 3
  },
  Archangel_Raguel : {
    key: "Archangel Raguel",
    name: {
      english: "Archangel Raguel",
      amharic: "ራጉኤል",
    },
    desc: {
      amharic: "ራጉኤል",
      english: "Archangel Raguel"
    },
    recuringDate: 1,
    major: 1,
    neges: 1
  },
  Bartholomew_the_Apostle : {
     key: "Bartholomew_the_Apostle",
    name: {
      english: "Bartholomew_the_Apostle",
      amharic: "ሐዋርያው በርተሎሜዎስ",
    },
    desc: {
      amharic: "ሐዋርያው በርተሎሜዎስ",
      english: "Bartholomew_the_Apostle"
    },
    recuringDate: 1,
    major: 1,
    neges: 1

  },
  Prophet_Elijah : {
     key: "Prophet_Elijah",
    name: {
      english: "Prophet_Elijah",
      amharic: "ነብዩ ኤልያስ",
    },
    desc: {
      amharic: "ነብዩ ኤልያስ",
      english: "Prophet_Elijah"
    },
    recuringDate: 1,
    major: 1,
    neges: 1


  },
  

  // 2. Thaddeus the Apostle
   Thaddeus_the_Apostle : {
    key: "Thaddeus_the_Apostle",
    name: {
      english: "Thaddeus the Apostle",
      amharic: "ሐዋርያው ታድዮስ",
    },
    desc: {
      amharic: "ሐዋርያው ታድዮስ",
      english: "Thaddeus the Apostle"
    },
    recuringDate: 2,
    major: 3,
    neges: 3

    
   
  },
   Abba_Guba : {
    key: "Abba Guba",
    name: {
      english: "Abba Guba",
      amharic: "አባ ጉባ",
    },
     desc: {
      amharic: "አባ ጉባ",
      english: "Abba Guba, one of the Nine Saints"
    },

    recuringDate: 2,
    major: 3,
    neges: 3
   
  },

  // 3. Beata
  beata :{
    key: "beata",
    name: {
      english:
        "Beata: The Entrance the three years old Virgin Mariam into the Temple /Abune Zena Markos/ Archangel Phanuel/ Saint Neakuto Leab",
      amharic: "በአታለማርያም ፣ አቡነ ዜና ማርቆስ ፣ ቅዱስ ፋኑኤል",
    },
     desc: {
      amharic: "በአታለማርያም",
      english: "The Entrance the three years old Virgin Mariam into the Temple "
    },
    recuringDate: 3,
    major: 3,
    neges: 3
    // geezDate: { month: "Tahisas", day: 3 },
    // gregorianDate: { month: "December", day: 12 },
    // isYearly: true,
  },
   Abune_Zena_Markos :{
    key: "Abune_Zena_Markos",
    name: {
      english:
        "Abune Zena Markos",
      amharic: "አቡነ ዜና ማርቆስ",
    },
     desc: {
      amharic: "አቡነ ዜና ማርቆስ",
      english: "Abune Zena Markos"
    },
    recuringDate: 2,
    major: 3,
    neges: 3
    // geezDate: { month: "Tahisas", day: 3 },
    // gregorianDate: { month: "December", day: 12 },
    // isYearly: true,
  },
   Archangel_Phanuel :{
    key: "Archangel_Phanuel",
    name: {
      english:
        "Archangel Phanuel",
      amharic: "ቅዱስ ፋኑኤል",
    },
     desc: {
      amharic: "ቅዱስ ፋኑኤል",
      english: "Archangel Phanuel "
    },
    recuringDate: 2,
    major: 3,
    neges: 3
    // geezDate: { month: "Tahisas", day: 3 },
    // gregorianDate: { month: "December", day: 12 },
    // isYearly: true,
  },

  // 4. John the son of the Thunder
 jYohannis_Welde_Negedguad :  {
    key: "jYohannis_Welde_Negedguad",
    name: {
      english:
        "John the son of the Thunder (Yohannis Welde Negedguad) / Andrew the Apostle",
      amharic: "ዮሐንስ ወልደ ነጎድጓድ ፣ ሐዋርያው እንድርያስ",
    },
      desc: {
      amharic: "ዮሐንስ ወልደ ነጎድጓድ",
      english: "John the son of the Thunder (Yohannis Welde Negedguad) "
    },
    recuringDate: 2,
    major: 3,
    neges: 3

    // geezDate: { month: "Hamle", day: 16 },
    // gregorianDate: { month: "July", day: 23 },
    // isYearly: true,
  },
 Andrew_the_Apostle : {
    key: "Andrew_the_Apostle",
    name: {
      english: "Andrew_the_Apostle",
      amharic: " ሐዋርያው እንድርያስ",
    },
    desc: {
      amharic: " ሐዋርያው እንድርያስ",
      english: "Andrew the Apostle"
    },
    recuringDate: 2,
    major: 3,
    neges: 3
    // geezDate: { month: "Hamle", day: 16 },
    // gregorianDate: { month: "July", day: 23 },
    // isYearly: true,
  },

  // 5. Petros we Paulos
  peter_paul :{
    key: "peter_paul",
    name: {
      english:
        "Petros we Paulos (Peter and Paul) ",
      amharic: "ጴጥሮስወ ጳውሎስ",
    },
     desc: {
      amharic: "ጴጥሮስወ ጳውሎስ",
      english: "Petros we Paulos (Peter and Paul)"
    },
    recuringDate: 5,
    major: 3,
    neges: 3
    // geezDate: { month: "Hamle", day: 5 },
    // gregorianDate: { month: "July", day: 12 },
    // isYearly: true,
  },
    Gebre_Menfes_Kidus :{
    key: "Gebre_Menfes_Kidus",
    name: {
      english:
        "Abuna Gebre Menfes Kidus ",
      amharic: "ገብረ መንፈስ ቅዱስ ",
    },
     desc: {
      amharic: "ገብረ መንፈስ ቅዱስ",
      english: "Gebre Menfes Kidus"
    },
    recuringDate: 5,
    major: 3,
    neges: 3
    // geezDate: { month: "Hamle", day: 5 },
    // gregorianDate: { month: "July", day: 12 },
    // isYearly: true,
  },
  Abune_Arone : {
    key: "Abune_Arone",
    name: {
      english:
        "Abune Arone",
      amharic: " አቡነ አሮን",
    },
     desc: {
      amharic: " አቡነ አሮን",
      english: "Abune Arone"
    },
    recuringDate: 5,
    major: 3,
    neges: 3
    // geezDate: { month: "Hamle", day: 5 },
    // gregorianDate: { month: "July", day: 12 },
    // isYearly: true,

  }

  // 6. Iyyasu
  iyyasu :{
    key: "iyyasu",
    name: {
      english: "Iyyasus / Dabra Quesqam Mariam / Saint Arsema",
      amharic: "ኢየሱስ ፣ ቁስቋም ማርያም ፣ አርሴማ",
    },
     desc: {
      amharic: "ኢየሱስ",
      english: "Iyyasus"
    },
    recuringDate: 6,
    major: 3,
    neges: 3
    // geezDate: { month: "Hidar", day: 6 },
    // gregorianDate: { month: "November", day: 15 },
    // isYearly: true,
  },

     Dabra_Quesqam_Mariam :{
    key: "Dabra_Quesqam_Mariam",
    name: {
      english: "Dabra_Quesqam_Mariam",
      amharic: "ቁስቋም ማርያም ",
    },
     desc: {
      amharic: "ቁስቋም ማርያም",
      english: "Dabra_Quesqam_Mariam"
    },
    recuringDate: 6,
    major: 3,
    neges: 3
    // geezDate: { month: "Hidar", day: 6 },
    // gregorianDate: { month: "November", day: 15 },
    // isYearly: true,
  },
    Saint_Arsema :{
    key: "Saint_Arsema",
    name: {
      english: "Saint_Arsema",
      amharic: "አርሴማ ",
    },
     desc: {
      amharic: "አርሴማ",
      english: "Dabra_Quesqam_Mariam"
    },
    recuringDate: 6,
    major: 3,
    neges: 3
    // geezDate: { month: "Hidar", day: 6 },
    // gregorianDate: { month: "November", day: 15 },
    // isYearly: true,
  },
  // 7. Holy Trinity
 holy_trinity :  {
    key: "holy_trinity",
    name: {
      english: "Holy Trinity",
      amharic: "አጋዕዝተ አለም ስላሴ",
    },
     desc: {
      amharic: "አጋዕዝተ አለም ስላሴ",
      english: "Holy Trinity"
    },
    recuringDate: 7,
    major: 3,
    neges: 3
    // geezDate: { month: "Hamle", day: 7 },
    // gregorianDate: { month: "July", day: 14 },
    // isYearly: true,
  },

  // 8. Cherubim
  cherubim : {
    key: "cherubim",
    name: {
      english:
        "Cherubim",
      amharic: "ኪሩቤል አርባእቱ እንስሳ",
    },
    desc: {
      amharic:"ኪሩቤል አርባእቱ እንስሳ ",
      english:  "Cherubim"
    },
    recuringDate: 8,
    major: 3,
    neges: 3
    // geezDate: { month: "Hidar", day: 8 },
    // gregorianDate: { month: "November", day: 17 },
    // isYearly: true,
  },
  Matthias_the_Apostle : {
    key: "cherubim",
    name: {
      english:
        "Saint Matthias the Apostle / Abune Kiros / Abba Banuda",
      amharic: "ሐዋርያው ማትያስ ፣ አቡነ ኪሮስ",
    },
    desc: {
      amharic:"ሐዋርያው ማትያስ ",
      english:  "Saint Matthias the Apostle"
    },
    recuringDate: 8,
    major: 3,
    neges: 3
    // geezDate: { month: "Hidar", day: 8 },
    // gregorianDate: { month: "November", day: 17 },
    // isYearly: true,
  },
   Abune_Kiros : {
    key: "Abune_Kiros",
    name: {
      english:
        " Abune Kiros",
      amharic: "አቡነ ኪሮስ",
    },
    desc: {
      amharic:"አቡነ ኪሮስ ",
      english:"Abune Kiros"
    },
    recuringDate: 8,
    major: 3,
    neges: 3
    // geezDate: { month: "Hidar", day: 8 },
    // gregorianDate: { month: "November", day: 17 },
    // isYearly: true,
  },


  // 9. Saint Thomas
 Thomas_the_Apostle : {
    key: "Thomas_the_Apostle",
    name: {
      english:
        "Saint Thomas the Apostle",
      amharic: "ሐዋርያው ቶማስ ",
    },
    desc: {
      amharic:"ሐዋርያው ቶማስ ",
      english:"Thomas the Apostle"
    },
    recuringDate: 9,
    major: 3,
    neges: 3
    // geezDate: { month: "Ginbot", day: 26 },
    // gregorianDate: { month: "June", day: 3 },
    // isYearly: true,
  },
selestu_meit : {
    key: "selestu_meit",
    name: {
      english:
        "selestu_meit",
      amharic: "ሰልስቱ ምዕት",
    },
    desc: {
      amharic:"ሰልስቱ ምዕት ",
      english:" The 318 holy fathers assembled in the city of nice"
    },
    recuringDate: 9,
    major: 3,
    neges: 3
    // geezDate: { month: "Ginbot", day: 26 },
    // gregorianDate: { month: "June", day: 3 },
    // isYearly: true,
  },
  Abune_Isitinifase_Kirisitosi : {
    key: "Abune_Isitinifase_Kirisitosi",
    name: {
      english:
        "Abune Isitinifase Kirisitosi",
      amharic: " አቡነ እስትንፋሰ ክርስቶስ",
    },
    desc: {
      amharic:" አቡነ እስትንፋሰ ክርስቶስ",
      english:"Abune Isitinifase Kirisitosi"
    },
    recuringDate: 9,
    major: 3,
    neges: 3
    // geezDate: { month: "Ginbot", day: 26 },
    // gregorianDate: { month: "June", day: 3 },
    // isYearly: true,
  },
  // 10. Holy Cross
 holy_cross :  {
    key: "holy_cross",
    name: {
      english: "Holy Cross (Masqal)/ Ts'edeniya Mariyami/Simon the Zealot",
      amharic: "መስቀለ ክርስቶስ ፣ ስምኦን ቀኖናዊ ሐዋርያ ፣ ፀደንያ ማርያም",
    },
    desc: {
      amharic:"መስቀለ ክርስቶስ ",
      english:"Holy Cross (Masqal)"
    },
    recuringDate: 10,
    major: 3,
    neges: 3
  //   geezDate: { month: "Meskerem", day: 17 },
  //   gregorianDate: { month: "September", day: 27 },
  //   isYearly: true,
  },
   Tsedeniya_Mariyami :  {
    key: "Tsedeniya_Mariyami",
    name: {
      english: "Ts'edeniya Mariyami",
      amharic: " ፀደንያ ማርያም",
    },
    desc: {
      amharic:" ፀደንያ ማርያም ",
      english:"Ts'edeniya Mariyami"
    },
    recuringDate: 10,
    major: 3,
    neges: 3
  //   geezDate: { month: "Meskerem", day: 17 },
  //   gregorianDate: { month: "September", day: 27 },
  //   isYearly: true,
   },

    Simon_the_Zealot :  {
    key: "Simon_the_Zealot",
    name: {
      english: "Simon the Zealot",
      amharic: "ስምኦን ቀኖናዊ ሐዋርያ",
    },
    desc: {
      amharic:" ስምኦን ቀኖናዊ ሐዋርያ ",
      english:"Simon the Zealot"
    },
    recuringDate: 10,
    major: 3,
    neges: 3
  //   geezDate: { month: "Meskerem", day: 17 },
  //   gregorianDate: { month: "September", day: 27 },
  //   isYearly: true,
   },

  // 11. Saint Hanna
  {
    key: "saint_hanna",
    name: {
      english:
        "Saint Hanna, the mother of our holy Mother/ Saint Joachim, the father of our holy Mother/ Saint Yared/Abune Hara",
      amharic: "ሐና እና ኢያቄም ፣ ቅዱስ ያሬድ ፣ አቡነ ሐራ",
    },
    geezDate: { month: "Hidar", day: 11 },
    gregorianDate: { month: "November", day: 20 },
    isYearly: true,
  },

  // 12. Archangel Michael
  {
    key: "archangel_michael",
    name: {
      english:
        "Archangel Michael /Matthew the Apostle/ Abba Samuel from Waldeba",
      amharic: "ቅዱስ ሚካኤል፣ አባ ሳሙኤል ፣ ሐዋርያ ማቴዎስ",
    },
    geezDate: { month: "Hidar", day: 12 },
    gregorianDate: { month: "November", day: 21 },
    isYearly: true,
  },

  // 13. God the Father
  {
    key: "god_the_father",
    name: {
      english:
        "Egziabher Abe (God the Father)/Archangel Raphael /Saint Abba Zar'a-Buruk",
      amharic: "እግዚአብሔር አብ ፣ ቅዱስ ሩፋኤል ፣ አቡነ ዘርአ ብሩክ",
    },
    geezDate: { month: "Hidar", day: 13 },
    gregorianDate: { month: "November", day: 22 },
    isYearly: true,
  },

  // 14. Abuna Aragwi
  {
    key: "abuna_aragwi",
    name: {
      english: "Abuna Aragwi-one of the Nine Saints/Gabra Krestos the hermit",
      amharic: "አቡነ አረጋዊ ፣ገብረ ክርስቶስ/ገብረ መርአዊ",
    },
    geezDate: { month: "Teqemt", day: 14 },
    gregorianDate: { month: "October", day: 24 },
    isYearly: true,
  },

  // 15. St. Cyriacus and St. Julietta
  {
    key: "cyriacus_julietta",
    name: {
      english: "St. Cyriacus and St. Julietta",
      amharic: "ቂርቆስና እየሉጣ",
    },
    geezDate: { month: "Hamle", day: 15 },
    gregorianDate: { month: "July", day: 22 },
    isYearly: true,
  },

  // 16. Kidane Meheret
  {
    key: "kidane_meheret",
    name: {
      english: "Kidane Meheret - Our Lady, Covenant of Mercy",
      amharic: "ኪዳነ ምህረት",
    },
    geezDate: { month: "Yekatit", day: 16 },
    gregorianDate: { month: "February", day: 23 },
    isYearly: true,
  },

  // 17. Saint Stefanos
  {
    key: "saint_stefanos",
    name: {
      english:
        "Saint Stefanos (Stephen the Martyr) - the First Martyr and Archdeacon)/ James the apostle /Abba Gerima (one of the Nine saints)",
      amharic: "ቅዱስ እስጢፋኖስ ፣ ሐዋርያውያዕቆብ ወልደ ዘብዲዮስ ፣ አባ ገሪማ",
    },
    geezDate: { month: "Teqemt", day: 17 },
    gregorianDate: { month: "October", day: 27 },
    isYearly: true,
  },

  // 18. Philip the Apostle
  {
    key: "philip_apostle",
    name: {
      english: "Philip the Apostle /Abune Ewostatewos",
      amharic: "ሐዋርያው ፊሊጶስ ፣ ኢዩስጣቲዮስ",
    },
    geezDate: { month: "Hidar", day: 18 },
    gregorianDate: { month: "November", day: 28 },
    isYearly: true,
  },

  // 19. Gabriel the Archangel
  {
    key: "gabriel_archangel",
    name: {
      english: "Gabriel the Archangel",
      amharic: "ቅዱስ ገብርኤል",
    },
    geezDate: { month: "Tahisas", day: 19 },
    gregorianDate: { month: "December", day: 27 },
    isYearly: true,
  },

  // 20. Hnstata Betkerestyan
  {
    key: "hnstata_betkerestyan",
    name: {
      english:
        "Hnstata Betkerestyan- The Building up of the church in the name of our Holy virgin Mariam",
      amharic: "ሕንፀተ ቤተ ክርስቲያን",
    },
    geezDate: { month: "Sene", day: 20 },
    gregorianDate: { month: "June", day: 27 },
    isYearly: true,
  },

  // 21. Egze'et-na Maryam
  {
    key: "egzeet_na_maryam",
    name: {
      english: "Egze'et-na Maryam: Our Holy Mother Maryam, Mother of God",
      amharic: "ቅድስት ድንግል ማርያም",
    },
    geezDate: { month: "Tahisas", day: 21 },
    gregorianDate: { month: "December", day: 30 },
    isYearly: true,
  },

  // 22. Archangel Uriel
  {
    key: "archangel_uriel",
    name: {
      english:
        "Archangel Uriel/ Saint Daqsyos/ Commemoration of the Annunciation/ Saint Lukas",
      amharic: "ቅዱስ ኡራኤል ፣ ደቅስዮስ ፣ ሉቃስ ፣ ብስራተ ገብርኤል",
    },
    geezDate: { month: "Hamle", day: 22 },
    gregorianDate: { month: "July", day: 29 },
    isYearly: true,
  },

  // 23. Saint Georgis
  {
    key: "saint_georgis",
    name: {
      english: "Saint Georgis - George of Lydda",
      amharic: "ቅዱስ ጊዮርጊስ",
    },
    geezDate: { month: "Miyazia", day: 23 },
    gregorianDate: { month: "May", day: 1 },
    isYearly: true,
  },

  // 24. Abuna Takla Haymanot
  {
    key: "takla_haymanot",
    name: {
      english:
        "Abuna Takla Haymanot/ Saint Kirstos Semera / 24 Heavenly Priests",
      amharic: "አቡነ ተክለ ሐይማኖት ፣ ቅድስት ክርስረቶስ ሰምራ ፣ 24ቱ ካህናተ ሰማይ",
    },
    geezDate: { month: "Nehasie", day: 24 },
    gregorianDate: { month: "August", day: 30 },
    isYearly: true,
  },

  // 25. Saint Marqorewos
  {
    key: "saint_marqorewos",
    name: {
      english: "Saint Marqorewos (Merkorios)/ Abune Habibe",
      amharic: "ቅዱስ መርቆሬዎስ ፣አቡነ ሀቢብ (አባ ቡላ)",
    },
    geezDate: { month: "Hidar", day: 25 },
    gregorianDate: { month: "December", day: 4 },
    isYearly: true,
  },

  // 26. Saint Joseph
  {
    key: "saint_joseph",
    name: {
      english:
        "Saint Joseph / Abba Salama- Frumentius, the Enlightener of Ethiopia/Thomas the apostle/ Abune Habte Mariam / Aba Eyesus Moe`a",
      amharic:
        "አረጋዊው ዮሴፍ ፣ አባ ሰላማ ከሳቴ ብርሀን ፣ ቶማስ ዘህንደኬ ፣ አቡነ ሀብተ ማርያም ፣ አባ ኢየሱስ ሞአ",
    },
    geezDate: { month: "Hamle", day: 26 },
    gregorianDate: { month: "August", day: 2 },
    isYearly: true,
  },

  // 27. Medhane Alem
  {
    key: "medhane_alem",
    name: {
      english: "Medhane Alem -The Saviour of the world/ Abune Mebea Zion",
      amharic: "መድሐኔአለም ፣ አቡነ መባዓ ፅዮን",
    },
    geezDate: { month: "Teqemt", day: 27 },
    gregorianDate: { month: "November", day: 6 },
    isYearly: true,
  },

  // 28. Emmanuel
  {
    key: "emmanuel",
    name: {
      english: "Emmanuel",
      amharic: "አማኑኤል",
    },
    geezDate: { month: "Ginbot", day: 28 },
    gregorianDate: { month: "June", day: 5 },
    isYearly: true,
  },

  // 29. Ba'ale Wold
  {
    key: "baale_wold",
    name: {
      english: "Ba`ale Wold (Feast of God The Son) / Saint Lalibela",
      amharic: "በዓለወልድ፣ ቅዱስ ላሊበላ",
    },
    geezDate: { month: "Megabit", day: 29 },
    gregorianDate: { month: "April", day: 7 },
    isYearly: true,
  },

  // 30. John the Baptist
  {
    key: "john_baptist",
    name: {
      english: "John the baptist / Saint Markos -St. Mark the Evangelist",
      amharic: "ዮሐንስ መጥምቅ ፣ ቅዱስ ማርቆስ",
    },
    geezDate: { month: "Sene", day: 30 },
    gregorianDate: { month: "July", day: 7 },
    isYearly: true,
  },
};
