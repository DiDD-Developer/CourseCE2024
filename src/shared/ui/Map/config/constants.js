import {
  CheckIcon,
  CancelIcon,
  BarIcon,
  CinemaIcon,
  RestIcon,
  MusicIcon,
  TheatreIcon,
} from "#shared/ui/Icons/index.js";

export const classNames = {
  ballonContent: "yandexMap__ballonContent",
  ballonLayout: "yandexMap__ballonLayout",
  ballonTitle: "yandexMap__ballonTitle",
  ballonMark: "yandexMap__ballonMark",
  ballonMarkText: "yandexMap__ballonMarkText",
  ballonMarkTextAddress: "yandexMap__ballonMarkTextAddress",
  ballonMarkText1: "yandexMap__ballonMarkText1",
  ballonMarksEditAndDelete: "yandexMap__ballonMarksEditAndDelete",
  mark: "yandexMap__mark",
};

export const iconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 88,
};

export const iconsPresets = {
  1: BarIcon({ iconColor: "var(--colorRed)" }),
  2: CinemaIcon({ iconColor: "var(--colorMantis)" }),
  3: RestIcon({ iconColor: "var(--colorOrangeWeb)" }),
  4: MusicIcon({ iconColor: "var(--colorPictonBlue)" }),
  5: TheatreIcon({ iconColor: "var(--colorVeronica)" }),
  6: CheckIcon({ extraClasses: ["btn--isGreenLightIcon"] }),
  7: CancelIcon({ extraClasses: ["btn--isRedIcon"] }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
