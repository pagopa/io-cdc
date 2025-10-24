import { Tab, Tabs as MuiTabs } from '@mui/material';
const TABS_CONFIG = ['Codice a barre', 'Codice QR'];

type CodesTabsProps = {
  tabIndex: number;
  onChangeTab: (newTab: number) => void;
};
export const CodesTabs = ({ onChangeTab, tabIndex }: CodesTabsProps) => {
  return (
    <MuiTabs value={tabIndex} sx={{ width: '100%' }}>
      {TABS_CONFIG.map((tab, index) => (
        <Tab
          label={tab}
          sx={{ width: '50%', borderBottom: tabIndex === index ? 'none' : '0.5px solid #5C6F82' }}
          value={index}
          key={tab}
          onClick={() => onChangeTab(index)}
        />
      ))}
    </MuiTabs>
  );
};
