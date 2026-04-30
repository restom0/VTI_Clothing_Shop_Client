import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useI18n } from "../../i18n";
import { useThemeMode } from "../../theme";

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonIcon,
  system: ComputerDesktopIcon,
};

const ThemeSwitcher = () => {
  const { t } = useI18n();
  const { activeTheme, setTheme, theme, themeOptions } = useThemeMode();
  const ActiveIcon = THEME_ICONS[activeTheme] ?? ComputerDesktopIcon;

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          size="sm"
          className="flex items-center gap-1 px-2 py-2"
          aria-label={t("theme.switcher_label")}
        >
          <ActiveIcon className="h-4 w-4" />
          <span className="hidden text-xs font-semibold sm:inline">
            {t(`theme.${theme}`)}
          </span>
          <ChevronDownIcon className="h-3 w-3" strokeWidth={2.5} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {themeOptions.map(({ value, labelKey }) => {
          const Icon = THEME_ICONS[value];

          return (
            <MenuItem
              key={value}
              className={`flex items-center gap-3 rounded ${
                value === theme ? "bg-blue-gray-50" : ""
              }`}
              onClick={() => setTheme(value)}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{t(labelKey)}</span>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ThemeSwitcher;
