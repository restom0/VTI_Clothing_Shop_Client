import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useI18n } from "../../i18n";

const LanguageSwitcher = () => {
  const { language, setLanguage, supportedLanguages, t } = useI18n();

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          size="sm"
          className="flex items-center gap-1 px-2 py-2"
          aria-label={t("language.switcher_label")}
        >
          <GlobeAltIcon className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase">{language}</span>
          <ChevronDownIcon className="h-3 w-3" strokeWidth={2.5} />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {supportedLanguages.map(({ code, labelKey }) => (
          <MenuItem
            key={code}
            className={`flex items-center gap-3 rounded ${
              code === language ? "bg-blue-gray-50" : ""
            }`}
            onClick={() => setLanguage(code)}
          >
            <span className="w-7 text-xs font-semibold uppercase">{code}</span>
            <span className="text-sm">{t(labelKey)}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
