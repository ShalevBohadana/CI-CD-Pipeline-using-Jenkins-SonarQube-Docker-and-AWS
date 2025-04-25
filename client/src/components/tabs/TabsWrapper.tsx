import React from 'react';
import {
  Tab as TabBase,
  TabList as TabListBase,
  TabPanel as TabPanelBase,
  Tabs as TabsBase,
} from 'react-tabs';

const TabsComponent = TabsBase as unknown as React.JSXElementConstructor<any>;
const TabListComponent = TabListBase as unknown as React.JSXElementConstructor<any>;
const TabComponent = TabBase as unknown as React.JSXElementConstructor<any>;
const TabPanelComponent = TabPanelBase as unknown as React.JSXElementConstructor<any>;

export {
  TabsComponent as Tabs,
  TabListComponent as TabList,
  TabComponent as Tab,
  TabPanelComponent as TabPanel,
};
