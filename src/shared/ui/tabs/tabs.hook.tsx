// src/hooks/useTabs.ts

import { useState, useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { getTabIndex, tabs } from '../../lib/tabs';

export default function useTabs() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const state = useRouterState();

  useEffect(
    () => setSelectedTabIndex(getTabIndex(state.location.pathname)),
    [state.location.pathname],
  );

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
  };

  return {
    selectedTabIndex,
    handleTabChange,
    tabs,
  };
}
