import { Tab, Tabs, TabsHeader } from "@material-tailwind/react/components/Tabs";
import PropTypes from "prop-types";
import { useI18n } from "../../i18n";

/** Handles tablist. */
const Tablist = ({ TABS, tab, setTab }) => {
  const { t } = useI18n();
  /** Handles tab. */
  const handleTab = (value) => setTab(value);
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-3">
      <Tabs value={tab} className="w-full" as="div">
        <TabsHeader>
          {TABS.map(({ label, labelKey, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                handleTab(value);
              }}
            >
              &nbsp;&nbsp;{labelKey ? t(labelKey) : label}&nbsp;&nbsp;
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
};

Tablist.propTypes = {
  TABS: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      labelKey: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
};

export default Tablist;
