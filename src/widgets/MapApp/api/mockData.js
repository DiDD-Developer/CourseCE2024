export const filerCfg = {
  inputs: {
    search: {
      value: null,
      isChecked: "null",
      isDisabled: "null",
    },
    bars: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    restaurant: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    trk: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    theatre: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    cinema: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
  },
};

export const listMarsMockResponse = {
  marks: [
    { id: "1", type: "bars", cords: [53.5, 58.9] },
    { id: "2", type: "restaurant", cords: [54.5, 57.9] },
    { id: "3", type: "trk", cords: [53.5, 57.9] },
    { id: "4", type: "theatre", cords: [52.5, 57.9] },
    { id: "5", type: "cinema", cords: [51.5, 57.9] },
  ],
};

// export const listMarsMockResponse = {
//   marks: [
//     { id: "12", type: "1", cords: [53.5, 58.9] },
//     { id: "13", type: "2", cords: [54.5, 57.9] },
//     { id: "14", type: "3", cords: [53.5, 57.9] },
//     { id: "15", type: "4", cords: [52.5, 57.9] },
//     { id: "16", type: "5", cords: [51.5, 57.9] },
//   ],
// };

export const marksDetailMockResponse = [
  {
    id: "11",
    title: "Al Capone",
    type: "1",
    address: {
      city: "Челябинск",
      house: "12a",
      street: "ул. Братьев Кашириных",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями",
    images: [
      "/assets/marksDetail/bar1.png", // /assets/marksDetail/bar1.png
      "/assets/marksDetail/bar2.jpg",
      "/assets/marksDetail/bar3.jpg",
      "/assets/marksDetail/bar4.jpg",
    ],
  },
  {
    id: "12",
    title: "Al Capone 2",
    type: "1",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "13",
    title: "Al Capone 2",
    type: "1",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "14",
    title: "Al Capone 2",
    type: "1",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "15",
    title: "Al Capone 2",
    type: "1",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment:
      "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
];
