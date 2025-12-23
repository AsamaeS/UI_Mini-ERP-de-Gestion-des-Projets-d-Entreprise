import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types/erp';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@inpt.ma': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@inpt.ma',
      name: 'Mohammed Alami',
      role: 'admin',
      department: 'IT',
      isActive: true,
      createdAt: new Date(),
    },
  },
  'chef@inpt.ma': {
    password: 'chef123',
    user: {
      id: '2',
      email: 'chef@inpt.ma',
      name: 'Fatima Benali',
      role: 'chef_projet',
      department: 'Développement',
      isActive: true,
      createdAt: new Date(),
    },
  },
  'rh@inpt.ma': {
    password: 'rh123',
    user: {
      id: '3',
      email: 'rh@inpt.ma',
      name: 'Ahmed Tazi',
      role: 'rh_manager',
      department: 'Ressources Humaines',
      isActive: true,
      createdAt: new Date(),
    },
  },
  'employe@inpt.ma': {
    password: 'emp123',
    user: {
      id: '4',
      email: 'employe@inpt.ma',
      name: 'Sara Idrissi',
      role: 'employe',
      department: 'Développement',
      isActive: true,
      createdAt: new Date(),
    },
  },
  'direction@inpt.ma': {
    password: 'dir123',
    user: {
      id: '5',
      email: 'direction@inpt.ma',
      name: 'Karim Fassi',
      role: 'direction',
      department: 'Direction Générale',
      isActive: true,
      createdAt: new Date(),
    },
  },
  'auditeur@inpt.ma': {
    password: 'audit123',
    user: {
      id: '6',
      email: 'auditeur@inpt.ma',
      name: 'Nadia Chraibi',
      role: 'auditeur',
      department: 'Audit',
      isActive: true,
      createdAt: new Date(),
    },
  },
};

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['all'],
  chef_projet: ['projects.manage', 'tasks.manage', 'documents.manage', 'reports.view'],
  rh_manager: ['leaves.manage', 'employees.view', 'reports.hr'],
  employe: ['projects.view', 'tasks.own', 'leaves.request', 'documents.view'],
  direction: ['projects.view', 'reports.all', 'documents.view'],
  auditeur: ['audit.view', 'reports.view', 'documents.view'],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('erp_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser = mockUsers[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem('erp_user', JSON.stringify(mockUser.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('erp_user');
  }, []);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      const permissions = rolePermissions[user.role];
      return permissions.includes('all') || permissions.includes(permission);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
