import { IconPack, config, library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import * as solvIcons from "assets/svg/icons";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
export function setupFontAwesomeIcons() {
  library.add(far);
  library.add(fas);

  library.add({ ...solvIcons } as IconPack);
}
