import {
  CheckIcon,
  CancelIcon,
  CenterMapIcon,
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
  ballonSwiperContent: "yandexMap__ballonSwiperContent",
  mark: "yandexMap__mark",
  centerMarker: "yandexMap__centerMarker",
  tooltip: "yandexMap__tooltip",
  tooltipText: "yandexMap__tooltipText",
  ToolTipCenterMarker: "yandexMap__ToolTipCenterMarker",
};

export const iconShapeCfg = {
  type: "Circle",
  coordinates: [0, 0],
  radius: 50,
};

export const iconsPresets = {
  bars: BarIcon({ iconColor: "var(--colorRed)" }),
  cinema: CinemaIcon({ iconColor: "var(--colorMantis)" }),
  restaurant: RestIcon({ iconColor: "var(--colorOrangeWeb)" }),
  trk: MusicIcon({ iconColor: "var(--colorPictonBlue)" }),
  theatre: TheatreIcon({ iconColor: "var(--colorVeronica)" }),
  6: CheckIcon({ extraClasses: ["btn--isGreenLightIcon"] }),
  7: CancelIcon({ extraClasses: ["btn--isRedIcon"] }),
  centerMarker: CenterMapIcon({ iconColor: "var(--colorGray)" }),
};

export const yandexMapCustomEventNames = {
  markClicked: "yandexMap::markClicked",
};
