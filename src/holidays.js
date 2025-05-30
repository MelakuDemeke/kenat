export const HolidayTags = {
    PUBLIC: 'public',
    RELIGIOUS: 'religious',
    CHRISTIAN: 'christian',
    MUSLIM: 'muslim',
    STATE: 'state',
    CULTURAL: 'cultural',
    OTHER: 'other'
};

export const fixedHolidayName = {

    enkutatash: {
        key: 'enkutatash',
        month: 1,
        day: 1,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.CULTURAL],
        name: {
            amharic: 'እንቁጣጣሽ',
            english: 'Ethiopian New Year (Enkutatash)'
        },
        description: 'Marks the start of the Ethiopian year; symbolizes renewal and the end of the rainy season.'
    },

    meskel: {
        key: 'meskel',
        month: 1,
        day: 17,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: {
            amharic: 'መስቀል',
            english: 'Finding of the True Cross (Meskel)'
        },
        description: 'Commemorates the discovery of the True Cross by Empress Helena in the 4th century.'
    },

    beherbehereseb: {
        key: 'beherbehereseb',
        month: 3,
        day: 20,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: {
            amharic: 'የብሔር ብሔረሰቦች ቀን',
            english: 'Ethiopian National Unity Day'
        },
        description: 'This holiday acknowledges and celebrates the diversity of Ethiopias ethnic groups, affirming their equal rights and fostering unity through culture and language '
    },

    gena: {
        key: 'gena',
        month: 4,
        day: 29,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: {
            amharic: 'ገና',
            english: 'Ethiopian Christmas (Genna)'
        },
        description: 'Ethiopian Orthodox Christmas celebrating the birth of Jesus Christ.'
    },

    timket: {
        key: 'timket',
        month: 5,
        day: 11,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: {
            amharic: 'ጥምቀት',
            english: 'Ethiopian Epiphany (Timket)'
        },
        description: 'Commemorates the baptism of Jesus in the Jordan River.'
    },

    MartyrsDay: {
        key: 'martyrsDay',
        month: 6,
        day: 12,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: {
            amharic: 'የሰማዕታት ቀን',
            english: 'Ethiopian Martyrs’ Day'
        },
        description: 'Honors those who sacrificed their lives for Ethiopia’s freedom and independence.'
    },

    adwa: {
        key: 'adwa',
        month: 6,
        day: 23,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: {
            amharic: 'ድል አድዋ',
            english: 'Victory of Adwa'
        },
        description: 'Celebrates Ethiopia’s victory over Italian colonizers in 1896.'
    },

    labour: {
        key: 'labour',
        month: 8,
        day: 23,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: {
            amharic: 'የሰራተኞች ቀን',
            english: 'International Labour Day'
        },
        description: 'A global celebration of workers and labor rights.'
    },

    patriots: {
        key: 'patriots',
        month: 8,
        day: 27,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: {
            amharic: 'የአርበኞች (የድል) ቀን',
            english: 'Ethiopian Patriots’ Victory Day'
        },
        description: 'Honors Ethiopian resistance fighters who defeated Italian occupation.'
    },
};

export const movableHolidays = {

    eidFitr: {
        key: 'eidFitr',
        month: 7,
        day: 11,
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: {
            amharic: 'ዒድ አል ፈጥር',
            english: 'Eid al-Fitr (Arafa)'
        },
        description: 'Marks the end of Ramadan, the month of fasting for Muslims.'
    },

    siklet: {
        key: 'siklet',
        month: 8,
        day: 2,
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: {
            amharic: 'ስቅለት',
            english: 'Good Friday (Siklet)'
        },
        description: 'Marks the crucifixion of Jesus Christ.'
    },

    fasika: {
        key: 'fasika',
        month: 8,
        day: 4,
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: {
            amharic: 'ፋሲካ',
            english: 'Ethiopian Easter (Fasika)'
        },
        description: 'Celebrates the resurrection of Jesus Christ. One of the most important Christian holidays in Ethiopia.'
    },

    eidAdha: {
        key: 'eidAdha',
        month: 9,
        day: 18,
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: {
            amharic: 'ዒድ አል አድሐ ',
            english: 'Eid al-Adha'
        },
        description: 'Commemorates Abraham’s willingness to sacrifice his son as an act of obedience to God.'
    },

    moulid: {
        key: 'moulid',
        month: 11,
        day: 20,
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: {
            amharic: 'መውሊድ',
            english: 'Birth of Prophet Mohammed (Moulid)'
        },
        description: 'Celebrates the birthday of the Prophet Mohammed.'
    },
}