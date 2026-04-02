import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export interface Group {
  id: string;
  name: string;
  members: number;
  status: string;
  balanceLabel: string;
  balanceAmt: string;
  balanceColor: string;
  bgColor: string;
  emoji: string;
}

interface GroupContextType {
  groups: Group[];
  addGroup: (group: Omit<Group, 'id'>) => void;
  updateGroup: (id: string, updates: Partial<Group>) => void;
  removeGroup: (id: string) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

const INITIAL_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Flatmates',
    members: 4,
    status: 'Active split',
    balanceLabel: 'You owe',
    balanceAmt: '₹1,200',
    balanceColor: '#FF716C',
    bgColor: '#2A1A1F',
    emoji: '🏠',
  },
  {
    id: '2',
    name: 'Trip to Bali',
    members: 6,
    status: 'Upcoming',
    balanceLabel: 'Owed to you',
    balanceAmt: '₹500',
    balanceColor: '#73FFE3',
    bgColor: '#1A2A24',
    emoji: '🏝',
  },
  {
    id: '3',
    name: 'Office Coffee',
    members: 12,
    status: 'Recurring',
    balanceLabel: 'Settled',
    balanceAmt: '₹0',
    balanceColor: '#ADAAAA',
    bgColor: '#242424',
    emoji: '☕',
  },
];

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      const stored = await storageService.getItem('expensio_groups');
      if (stored) {
        setGroups(JSON.parse(stored));
      } else {
        setGroups(INITIAL_GROUPS);
      }
    };
    loadGroups();
  }, []);

  const saveGroups = async (newGroups: Group[]) => {
    setGroups(newGroups);
    await storageService.setItem('expensio_groups', JSON.stringify(newGroups));
  };

  const addGroup = (group: Omit<Group, 'id'>) => {
    const newGroup = {
      ...group,
      id: Math.random().toString(36).substr(2, 9),
    };
    saveGroups([newGroup, ...groups]);
  };

  const updateGroup = (id: string, updates: Partial<Group>) => {
    saveGroups(groups.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const removeGroup = (id: string) => {
    saveGroups(groups.filter(g => g.id !== id));
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup, updateGroup, removeGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
};
