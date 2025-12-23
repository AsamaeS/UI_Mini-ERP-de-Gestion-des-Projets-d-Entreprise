import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { roleLabels } from '@/types/erp';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
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
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Building,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Navigate } from 'react-router-dom';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'Mohammed Alami',
    email: 'admin@inpt.ma',
    role: 'admin',
    department: 'IT',
    isActive: true,
    lastLogin: '2025-01-12 14:32',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Fatima Benali',
    email: 'chef@inpt.ma',
    role: 'chef_projet',
    department: 'Développement',
    isActive: true,
    lastLogin: '2025-01-12 11:20',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Ahmed Tazi',
    email: 'rh@inpt.ma',
    role: 'rh_manager',
    department: 'Ressources Humaines',
    isActive: true,
    lastLogin: '2025-01-11 16:45',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Sara Idrissi',
    email: 'employe@inpt.ma',
    role: 'employe',
    department: 'Développement',
    isActive: true,
    lastLogin: '2025-01-11 09:15',
    createdAt: '2024-05-05',
  },
  {
    id: '5',
    name: 'Karim Fassi',
    email: 'direction@inpt.ma',
    role: 'direction',
    department: 'Direction Générale',
    isActive: true,
    lastLogin: '2025-01-10 17:00',
    createdAt: '2024-01-01',
  },
  {
    id: '6',
    name: 'Nadia Chraibi',
    email: 'auditeur@inpt.ma',
    role: 'auditeur',
    department: 'Audit',
    isActive: false,
    lastLogin: '2025-01-05 10:30',
    createdAt: '2024-06-15',
  },
];

const roleColors: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'info'> = {
  admin: 'default',
  chef_projet: 'success',
  rh_manager: 'info',
  employe: 'secondary',
  direction: 'warning',
  auditeur: 'secondary',
};

export default function Users() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Only admin can access this page
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const activeCount = mockUsers.filter((u) => u.isActive).length;

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h1>
            <p className="text-muted-foreground mt-1">
              {mockUsers.length} utilisateurs • {activeCount} actifs
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="erp">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un utilisateur</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouvel utilisateur au système. Un email d'activation sera envoyé.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom *</Label>
                    <Input placeholder="Prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input placeholder="Nom" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" placeholder="email@inpt.ma" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rôle *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="chef_projet">Chef de Projet</SelectItem>
                        <SelectItem value="rh_manager">RH / Manager</SelectItem>
                        <SelectItem value="employe">Employé</SelectItem>
                        <SelectItem value="direction">Direction</SelectItem>
                        <SelectItem value="auditeur">Auditeur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Département *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="dev">Développement</SelectItem>
                        <SelectItem value="rh">Ressources Humaines</SelectItem>
                        <SelectItem value="direction">Direction</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Annuler
                </Button>
                <Button variant="erp" onClick={() => setIsCreateOpen(false)}>
                  Créer l'utilisateur
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
                <p className="text-sm text-muted-foreground">Total utilisateurs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success-light">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Actifs</p>
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
                  {mockUsers.length - activeCount}
                </p>
                <p className="text-sm text-muted-foreground">Inactifs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning-light">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockUsers.filter((u) => u.role === 'admin').length}
                </p>
                <p className="text-sm text-muted-foreground">Administrateurs</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="chef_projet">Chef de Projet</SelectItem>
                  <SelectItem value="rh_manager">RH / Manager</SelectItem>
                  <SelectItem value="employe">Employé</SelectItem>
                  <SelectItem value="direction">Direction</SelectItem>
                  <SelectItem value="auditeur">Auditeur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Rôle</th>
                    <th>Département</th>
                    <th>Statut</th>
                    <th>Dernière connexion</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userData) => (
                    <tr key={userData.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{userData.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {userData.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge variant={roleColors[userData.role] || 'secondary'}>
                          {roleLabels[userData.role as keyof typeof roleLabels] || userData.role}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{userData.department}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Switch checked={userData.isActive} />
                          <span className={`text-sm ${userData.isActive ? 'text-success' : 'text-muted-foreground'}`}>
                            {userData.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-sm text-muted-foreground">{userData.lastLogin}</span>
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
                              <Edit className="w-4 h-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Shield className="w-4 h-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Supprimer
                            </DropdownMenuItem>
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
