export type UserRole = 'admin' | 'chef_projet' | 'rh_manager' | 'employe' | 'direction' | 'auditeur';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  endDate: Date;
  progress: number;
  managerId: string;
  teamMembers: string[];
  budget?: number;
  createdAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  dueDate?: Date;
  createdAt: Date;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'other';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  approvedBy?: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  projectId?: string;
  folderId?: string;
  uploadedBy: string;
  size: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details?: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: Date;
}

export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrateur',
  chef_projet: 'Chef de Projet',
  rh_manager: 'RH / Manager',
  employe: 'Employé',
  direction: 'Direction',
  auditeur: 'Auditeur',
};

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ['all'],
  chef_projet: ['projects.manage', 'tasks.manage', 'documents.manage', 'reports.view'],
  rh_manager: ['leaves.manage', 'employees.view', 'reports.hr'],
  employe: ['projects.view', 'tasks.own', 'leaves.request', 'documents.view'],
  direction: ['projects.view', 'reports.all', 'documents.view'],
  auditeur: ['audit.view', 'reports.view', 'documents.view'],
};
