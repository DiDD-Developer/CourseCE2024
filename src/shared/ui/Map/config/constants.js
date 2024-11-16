import {
  CheckIcon,
  CancelIcon,
  BarIcon,
  CinemaIcon,
  RestIcon,
  MusicIcon,
  TheatreIcon,
} from "#shared/ui/Icons/index";

export const iconsPresets = {
  1: BarIcon({ iconColor: "var(--colorRed)" }),
  2: CinemaIcon({ iconColor: "var(--colorMantis)" }),
  3: RestIcon({ iconColor: "var(--colorOrangeWeb)" }),
  4: MusicIcon({ iconColor: "var(--colorPictonBlue)" }),
  5: TheatreIcon({ iconColor: "var(--colorVeronica)" }),
  6: CheckIcon({ extraClasses: ["btn--isGreenLightIcon"] }),
  7: CancelIcon({ extraClasses: ["btn--isRedIcon"] }),
};
