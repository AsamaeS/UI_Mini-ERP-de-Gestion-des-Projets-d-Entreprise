import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  FileText,
  FolderKanban,
  Users,
} from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  type: 'leave' | 'document' | 'task' | 'project';
  status: 'pending' | 'approved' | 'rejected';
  initiator: string;
  currentApprover: string;
  createdAt: string;
  steps: number;
  currentStep: number;
}

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Demande congé - Sara Idrissi',
    type: 'leave',
    status: 'pending',
    initiator: 'Sara Idrissi',
    currentApprover: 'Ahmed Tazi',
    createdAt: '2025-01-10',
    steps: 2,
    currentStep: 1,
  },
  {
    id: '2',
    name: 'Validation document - Rapport Q4',
    type: 'document',
    status: 'approved',
    initiator: 'Karim Fassi',
    currentApprover: 'Direction',
    createdAt: '2025-01-08',
    steps: 3,
    currentStep: 3,
  },
  {
    id: '3',
    name: 'Approbation budget - Module RH',
    type: 'project',
    status: 'pending',
    initiator: 'Fatima Benali',
    currentApprover: 'Mohammed Alami',
    createdAt: '2025-01-05',
    steps: 2,
    currentStep: 2,
  },
  {
    id: '4',
    name: 'Validation tâche - Migration API',
    type: 'task',
    status: 'rejected',
    initiator: 'Nadia Chraibi',
    currentApprover: 'Fatima Benali',
    createdAt: '2025-01-03',
    steps: 1,
    currentStep: 1,
  },
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Mohammed Alami',
    userRole: 'Administrateur',
    action: 'CREATE',
    module: 'Utilisateurs',
    details: 'Création du compte utilisateur: test@inpt.ma',
    timestamp: '2025-01-12 14:32:15',
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Fatima Benali',
    userRole: 'Chef de Projet',
    action: 'UPDATE',
    module: 'Projets',
    details: 'Modification du projet: Migration ERP v2',
    timestamp: '2025-01-12 11:20:45',
    ipAddress: '192.168.1.105',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Ahmed Tazi',
    userRole: 'RH Manager',
    action: 'APPROVE',
    module: 'Congés',
    details: 'Approbation de la demande de congé #2024-089',
    timestamp: '2025-01-11 16:45:30',
    ipAddress: '192.168.1.112',
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sara Idrissi',
    userRole: 'Employé',
    action: 'UPLOAD',
    module: 'Documents',
    details: 'Téléversement du fichier: specification_v2.pdf',
    timestamp: '2025-01-11 09:15:22',
    ipAddress: '192.168.1.120',
  },
  {
    id: '5',
    userId: '1',
    userName: 'Mohammed Alami',
    userRole: 'Administrateur',
    action: 'DELETE',
    module: 'Utilisateurs',
    details: 'Suppression du compte utilisateur: ancien@inpt.ma',
    timestamp: '2025-01-10 17:00:00',
    ipAddress: '192.168.1.100',
  },
];

const typeConfig: Record<string, { icon: typeof GitBranch; color: string }> = {
  leave: { icon: Users, color: 'text-info' },
  document: { icon: FileText, color: 'text-success' },
  task: { icon: CheckCircle, color: 'text-warning' },
  project: { icon: FolderKanban, color: 'text-primary' },
};

const statusConfig: Record<string, { label: string; variant: 'pending' | 'active' | 'error' }> = {
  pending: { label: 'En cours', variant: 'pending' },
  approved: { label: 'Approuvé', variant: 'active' },
  rejected: { label: 'Rejeté', variant: 'error' },
};

const actionColors: Record<string, string> = {
  CREATE: 'bg-success-light text-success',
  UPDATE: 'bg-info-light text-info',
  DELETE: 'bg-destructive/10 text-destructive',
  APPROVE: 'bg-success-light text-success',
  REJECT: 'bg-destructive/10 text-destructive',
  UPLOAD: 'bg-primary/10 text-primary',
  LOGIN: 'bg-muted text-muted-foreground',
  LOGOUT: 'bg-muted text-muted-foreground',
};

export default function Workflow() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  const isAuditor = user?.role === 'auditeur';

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workflow & Audit</h1>
          <p className="text-muted-foreground mt-1">
            Suivi des processus de validation et journal d'audit
          </p>
        </div>

        <Tabs defaultValue={isAuditor ? 'audit' : 'workflows'}>
          <TabsList>
            {!isAuditor && <TabsTrigger value="workflows">Workflows</TabsTrigger>}
            <TabsTrigger value="audit">Journal d'Audit</TabsTrigger>
          </TabsList>

          {/* Workflows Tab */}
          {!isAuditor && (
            <TabsContent value="workflows" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-warning-light">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {mockWorkflows.filter((w) => w.status === 'pending').length}
                      </p>
                      <p className="text-sm text-muted-foreground">En attente</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-success-light">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {mockWorkflows.filter((w) => w.status === 'approved').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Approuvés</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-destructive/10">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {mockWorkflows.filter((w) => w.status === 'rejected').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Rejetés</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    Workflows en cours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {mockWorkflows.map((workflow) => {
                      const TypeIcon = typeConfig[workflow.type].icon;
                      return (
                        <div key={workflow.id} className="p-4 flex items-center gap-4">
                          <div className={`p-2 rounded-lg bg-muted`}>
                            <TypeIcon className={`w-5 h-5 ${typeConfig[workflow.type].color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{workflow.name}</p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {workflow.initiator}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(workflow.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: workflow.steps }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < workflow.currentStep
                                        ? 'bg-primary'
                                        : 'bg-muted-foreground/30'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Étape {workflow.currentStep}/{workflow.steps}
                              </p>
                            </div>
                            <Badge variant={statusConfig[workflow.status].variant}>
                              {statusConfig[workflow.status].label}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Audit Tab */}
          <TabsContent value="audit" className="mt-6 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher dans le journal..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={moduleFilter} onValueChange={setModuleFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Module" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les modules</SelectItem>
                      <SelectItem value="Utilisateurs">Utilisateurs</SelectItem>
                      <SelectItem value="Projets">Projets</SelectItem>
                      <SelectItem value="Congés">Congés</SelectItem>
                      <SelectItem value="Documents">Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Journal d'Audit
                  {isAuditor && (
                    <Badge variant="info" className="ml-2">
                      Mode lecture seule
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Date & Heure</th>
                        <th>Utilisateur</th>
                        <th>Rôle</th>
                        <th>Action</th>
                        <th>Module</th>
                        <th>Détails</th>
                        <th>IP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <span className="text-sm font-mono">{log.timestamp}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>{log.userName}</span>
                            </div>
                          </td>
                          <td>
                            <span className="text-sm text-muted-foreground">{log.userRole}</span>
                          </td>
                          <td>
                            <Badge className={`${actionColors[log.action] || 'bg-muted text-muted-foreground'}`}>
                              {log.action}
                            </Badge>
                          </td>
                          <td>
                            <Badge variant="secondary">{log.module}</Badge>
                          </td>
                          <td>
                            <span className="text-sm text-muted-foreground max-w-xs truncate block">
                              {log.details}
                            </span>
                          </td>
                          <td>
                            <span className="text-xs font-mono text-muted-foreground">
                              {log.ipAddress}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  );
}
