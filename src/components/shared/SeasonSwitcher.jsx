import { Button } from "@material-tailwind/react/components/Button";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react/components/Menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSeasonMode } from "../../theme/SeasonProvider";

// Season accent colors for the swatch dot in each menu item
const SEASON_DOT_COLORS = {
  auto: "linear-gradient(135deg, #C2586B 0%, #0098A6 33%, #BC5E2A 66%, #1B509A 100%)",
  spring: "#C2586B",
  summer: "#0098A6",
  autumn: "#BC5E2A",
  winter: "#1B509A",
};

const SeasonDot = ({ value, size = 10 }) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: SEASON_DOT_COLORS[value] ?? "#999",
      flexShrink: 0,
      border: "1.5px solid rgba(0,0,0,0.12)",
    }}
  />
);

const SeasonSwitcher = () => {
  const { activeSeason, season, setSeason, seasonOptions } = useSeasonMode();

  // Find the display option for the currently stored selection (could be "auto")
  const currentOption = seasonOptions.find((o) => o.value === season) ?? seasonOptions[0];

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          size="sm"
          className="flex items-center gap-1.5 px-2 py-2"
          aria-label="Chọn mùa"
          title={`Mùa hiện tại: ${currentOption.label}`}
        >
          <SeasonDot value={season} size={10} />
          <span className="hidden text-xs font-semibold sm:inline">
            {currentOption.emoji} {currentOption.label}
          </span>
          <ChevronDownIcon className="h-3 w-3" strokeWidth={2.5} />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 min-w-[9rem]">
        {seasonOptions.map(({ value, emoji, label }) => {
          const isActive = value === season;
          const isCurrentSeason = value === activeSeason && season === "auto";

          return (
            <MenuItem
              key={value}
              className={`flex items-center gap-3 rounded px-3 py-2 ${
                isActive ? "bg-blue-gray-50 dark:bg-blue-gray-900" : ""
              }`}
              onClick={() => setSeason(value)}
            >
              <SeasonDot value={value} size={10} />
              <span className="text-sm leading-none">
                {emoji} {label}
                {isCurrentSeason && <span className="ml-1 text-xs opacity-60">(nay)</span>}
              </span>
              {isActive && (
                <span className="ml-auto text-xs" style={{ color: "var(--color-primary)" }}>
                  ✓
                </span>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default SeasonSwitcher;
