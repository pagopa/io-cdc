import { Tab, Tabs as MuiTabs } from '@mui/material';
const TABS_CONFIG = ['Da spendere', 'Spesi'];

type TabsProps = {
  tabIndex: number;
  onChangeTab: (newTab: number) => void;
};
export const Tabs = ({ onChangeTab, tabIndex }: TabsProps) => {
  return (
    <MuiTabs value={tabIndex} sx={{ width: '100%' }}>
      {TABS_CONFIG.map((tab, index) => (
        <Tab
          label={tab}
          sx={{ width: '50%' }}
          value={index}
          key={tab}
          onClick={() => onChangeTab(index)}
        />
      ))}
    </MuiTabs>
  );
};
