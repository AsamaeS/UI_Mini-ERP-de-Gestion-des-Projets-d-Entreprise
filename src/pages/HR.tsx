import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  CalendarDays,
} from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'other';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  submittedAt: string;
  impactedProjects?: string[];
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeName: 'Sara Idrissi',
    department: 'Développement',
    type: 'annual',
    startDate: '2025-01-20',
    endDate: '2025-01-25',
    days: 5,
    status: 'pending',
    reason: 'Vacances familiales',
    submittedAt: '2025-01-10',
    impactedProjects: ['Migration ERP v2', 'Dashboard Analytics'],
  },
  {
    id: '2',
    employeeName: 'Ahmed Tazi',
    department: 'RH',
    type: 'sick',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    days: 3,
    status: 'approved',
    reason: 'Maladie',
    submittedAt: '2025-01-14',
  },
  {
    id: '3',
    employeeName: 'Karim Fassi',
    department: 'Direction',
    type: 'personal',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    days: 1,
    status: 'approved',
    reason: 'Rendez-vous administratif',
    submittedAt: '2025-01-12',
  },
  {
    id: '4',
    employeeName: 'Nadia Chraibi',
    department: 'Audit',
    type: 'annual',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    days: 8,
    status: 'pending',
    reason: 'Congé annuel',
    submittedAt: '2025-01-08',
    impactedProjects: ['Mobile App'],
  },
  {
    id: '5',
    employeeName: 'Mohammed Alami',
    department: 'IT',
    type: 'personal',
    startDate: '2025-01-18',
    endDate: '2025-01-18',
    days: 1,
    status: 'rejected',
    reason: 'Formation externe',
    submittedAt: '2025-01-05',
  },
];

const typeConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'info' | 'warning' }> = {
  annual: { label: 'Congé annuel', variant: 'default' },
  sick: { label: 'Maladie', variant: 'warning' },
  personal: { label: 'Personnel', variant: 'secondary' },
  maternity: { label: 'Maternité', variant: 'info' },
  other: { label: 'Autre', variant: 'secondary' },
};

const statusConfig: Record<string, { label: string; variant: 'pending' | 'active' | 'error'; icon: typeof Clock }> = {
  pending: { label: 'En attente', variant: 'pending', icon: Clock },
  approved: { label: 'Approuvé', variant: 'active', icon: CheckCircle },
  rejected: { label: 'Refusé', variant: 'error', icon: XCircle },
};

export default function HR() {
  const { user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const canManageLeaves = hasPermission('leaves.manage') || user?.role === 'admin' || user?.role === 'rh_manager';
  const canRequestLeave = hasPermission('leaves.request') || user?.role === 'employe';

  const filteredRequests = mockLeaveRequests.filter((request) => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockLeaveRequests.filter((r) => r.status === 'pending').length;
  const approvedCount = mockLeaveRequests.filter((r) => r.status === 'approved').length;

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">RH – Congés & Absences</h1>
            <p className="text-muted-foreground mt-1">
              {pendingCount} demande(s) en attente • {approvedCount} approuvée(s) ce mois
            </p>
          </div>
          {(canRequestLeave || canManageLeaves) && (
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="erp">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Demande
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Demande de congé</DialogTitle>
                  <DialogDescription>
                    Soumettez votre demande de congé. Elle sera examinée par votre responsable.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Type de congé *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Congé annuel</SelectItem>
                        <SelectItem value="sick">Maladie</SelectItem>
                        <SelectItem value="personal">Personnel</SelectItem>
                        <SelectItem value="maternity">Maternité</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date début *</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date fin *</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Motif</Label>
                    <Textarea placeholder="Décrivez le motif de votre demande..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="erp" onClick={() => setIsCreateOpen(false)}>
                    Soumettre
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning-light">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
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
                <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Approuvées</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-info-light">
                <CalendarDays className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Absences en cours</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Impact projets</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">Demandes</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-6 space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un employé..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="approved">Approuvé</SelectItem>
                      <SelectItem value="rejected">Refusé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Requests List */}
            <div className="space-y-4">
              {filteredRequests.map((request) => {
                const StatusIcon = statusConfig[request.status].icon;
                return (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{request.employeeName}</p>
                            <p className="text-sm text-muted-foreground">{request.department}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <Badge variant={typeConfig[request.type].variant}>
                            {typeConfig[request.type].label}
                          </Badge>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(request.startDate).toLocaleDateString('fr-FR')} -{' '}
                              {new Date(request.endDate).toLocaleDateString('fr-FR')}
                            </span>
                            <span className="font-medium text-foreground">({request.days}j)</span>
                          </div>

                          <Badge variant={statusConfig[request.status].variant}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[request.status].label}
                          </Badge>

                          {canManageLeaves && request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="success">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approuver
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                Refuser
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {request.impactedProjects && request.impactedProjects.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-warning" />
                            <span className="text-muted-foreground">Projets impactés:</span>
                            <span className="font-medium text-foreground">
                              {request.impactedProjects.join(', ')}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier des absences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Vue calendrier des absences à implémenter...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique des congés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Historique complet des congés passés...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  );
}
