import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  FolderKanban,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  progress: number;
  manager: string;
  teamSize: number;
  budget: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Migration ERP v2',
    description: 'Migration complète vers la nouvelle version du système ERP',
    status: 'in_progress',
    priority: 'high',
    startDate: '2024-10-01',
    endDate: '2025-01-15',
    progress: 68,
    manager: 'Fatima Benali',
    teamSize: 8,
    budget: 150000,
  },
  {
    id: '2',
    name: 'Module RH',
    description: 'Développement du module de gestion des ressources humaines',
    status: 'in_progress',
    priority: 'medium',
    startDate: '2024-11-01',
    endDate: '2025-01-28',
    progress: 45,
    manager: 'Ahmed Tazi',
    teamSize: 5,
    budget: 80000,
  },
  {
    id: '3',
    name: 'API Gateway',
    description: 'Mise en place de la passerelle API pour les microservices',
    status: 'completed',
    priority: 'high',
    startDate: '2024-08-15',
    endDate: '2025-01-10',
    progress: 100,
    manager: 'Karim Fassi',
    teamSize: 4,
    budget: 60000,
  },
  {
    id: '4',
    name: 'Dashboard Analytics',
    description: 'Tableau de bord analytique pour la direction',
    status: 'planning',
    priority: 'medium',
    startDate: '2025-01-20',
    endDate: '2025-02-20',
    progress: 12,
    manager: 'Sara Idrissi',
    teamSize: 3,
    budget: 45000,
  },
  {
    id: '5',
    name: 'Mobile App',
    description: 'Application mobile pour les employés',
    status: 'on_hold',
    priority: 'low',
    startDate: '2024-12-01',
    endDate: '2025-03-15',
    progress: 25,
    manager: 'Nadia Chraibi',
    teamSize: 6,
    budget: 120000,
  },
];

const statusConfig: Record<string, { label: string; variant: 'active' | 'pending' | 'inactive' | 'success' | 'error' }> = {
  planning: { label: 'Planification', variant: 'pending' },
  in_progress: { label: 'En cours', variant: 'active' },
  on_hold: { label: 'En pause', variant: 'inactive' },
  completed: { label: 'Terminé', variant: 'success' },
  cancelled: { label: 'Annulé', variant: 'error' },
};

const priorityConfig: Record<string, { label: string; variant: 'priority-low' | 'priority-medium' | 'priority-high' | 'priority-critical' }> = {
  low: { label: 'Basse', variant: 'priority-low' },
  medium: { label: 'Moyenne', variant: 'priority-medium' },
  high: { label: 'Haute', variant: 'priority-high' },
  critical: { label: 'Critique', variant: 'priority-critical' },
};

export default function Projects() {
  const { user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const canManageProjects = hasPermission('projects.manage') || user?.role === 'admin';

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des Projets</h1>
            <p className="text-muted-foreground mt-1">
              {filteredProjects.length} projet(s) • {mockProjects.filter((p) => p.status === 'in_progress').length} en cours
            </p>
          </div>
          {canManageProjects && (
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="erp">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Projet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Créer un nouveau projet</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations du projet. Tous les champs marqués * sont obligatoires.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du projet *</Label>
                    <Input id="name" placeholder="Ex: Migration ERP" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Description du projet..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priorité *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Basse</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Haute</SelectItem>
                          <SelectItem value="critical">Critique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget (MAD)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
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
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="erp" onClick={() => setIsCreateOpen(false)}>
                    Créer le projet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="planning">Planification</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="on_hold">En pause</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Projet</th>
                    <th>Statut</th>
                    <th>Priorité</th>
                    <th>Progression</th>
                    <th>Équipe</th>
                    <th>Deadline</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderKanban className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.manager}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge variant={statusConfig[project.status].variant}>
                          {statusConfig[project.status].label}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant={priorityConfig[project.priority].variant}>
                          {priorityConfig[project.priority].label}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{project.teamSize}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(project.endDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </td>
                      <td className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              Voir détails
                            </DropdownMenuItem>
                            {canManageProjects && (
                              <>
                                <DropdownMenuItem className="gap-2">
                                  <Edit className="w-4 h-4" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
