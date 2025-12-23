import { useAuth } from '@/contexts/AuthContext';
import { roleLabels } from '@/types/erp';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FolderKanban,
  Clock,
  Users,
  FileText,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Données de simulation pour le prototype
// TODO: connecter avec l'API backend en production
const projectData = [
  { name: 'Jan', completed: 4, inProgress: 8 },
  { name: 'Fév', completed: 6, inProgress: 7 },
  { name: 'Mar', completed: 8, inProgress: 5 },
  { name: 'Avr', completed: 5, inProgress: 9 },
  { name: 'Mai', completed: 7, inProgress: 6 },
  { name: 'Jun', completed: 9, inProgress: 4 },
];

const absenceData = [
  { name: 'Lun', taux: 2.5 },
  { name: 'Mar', taux: 3.2 },
  { name: 'Mer', taux: 4.1 },
  { name: 'Jeu', taux: 2.8 },
  { name: 'Ven', taux: 5.5 },
];

const projectStatusData = [
  { name: 'En cours', value: 12, color: 'hsl(217, 91%, 40%)' },
  { name: 'Terminé', value: 8, color: 'hsl(142, 76%, 36%)' },
  { name: 'En pause', value: 3, color: 'hsl(38, 92%, 50%)' },
  { name: 'Annulé', value: 1, color: 'hsl(0, 72%, 51%)' },
];

// Projets récents - Exemples basés sur les besoins réels identifiés
const recentProjects = [
  { id: 1, name: 'Migration ERP v2', status: 'in_progress', progress: 68, deadline: '15 Jan 2025' },
  { id: 2, name: 'Module RH', status: 'in_progress', progress: 45, deadline: '28 Jan 2025' },
  { id: 3, name: 'API Gateway', status: 'completed', progress: 100, deadline: '10 Jan 2025' },
  { id: 4, name: 'Dashboard Analytics', status: 'pending', progress: 12, deadline: '20 Fév 2025' },
];

const alerts = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Projet en retard',
    message: 'Le projet "Module RH" dépasse la deadline prévue de 3 jours',
    timestamp: 'Il y a 2h',
  },
  {
    id: '2',
    type: 'error' as const,
    title: 'Surcharge équipe Dev',
    message: "L'équipe développement atteint 120% de capacité",
    timestamp: 'Il y a 5h',
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'Nouvelle demande de congé',
    message: 'Ahlam ELBechari a soumis une demande pour le 20-25 janvier',
    timestamp: 'Il y a 1j',
  },
];

// Mapping des statuts projet vers les variantes de badges UI
const statusBadges: Record<string, { variant: 'active' | 'pending' | 'inactive' | 'success'; label: string }> = {
  in_progress: { variant: 'active', label: 'En cours' },
  completed: { variant: 'success', label: 'Terminé' },
  pending: { variant: 'pending', label: 'En attente' },
  on_hold: { variant: 'inactive', label: 'En pause' },
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue, {user?.name} • {user && roleLabels[user.role]}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Projets Actifs"
            value={12}
            subtitle="3 en phase critique"
            icon={<FolderKanban className="w-5 h-5" />}
            trend={{ value: 8, label: 'vs mois dernier' }}
            variant="primary"
          />
          <KPICard
            title="Tâches en Retard"
            value={7}
            subtitle="Sur 45 tâches totales"
            icon={<Clock className="w-5 h-5" />}
            trend={{ value: -12, label: 'vs semaine dernière' }}
            variant="warning"
          />
          <KPICard
            title="Absences en Cours"
            value={4}
            subtitle="2 congés, 2 maladies"
            icon={<Users className="w-5 h-5" />}
            variant="info"
          />
          <KPICard
            title="Documents Récents"
            value={23}
            subtitle="Cette semaine"
            icon={<FileText className="w-5 h-5" />}
            trend={{ value: 15, label: 'vs semaine dernière' }}
            variant="success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Progress Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Avancement des Projets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="completed" name="Terminés" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inProgress" name="En cours" fill="hsl(217, 91%, 40%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Project Status Pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Répartition Projets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {projectStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Absence Rate */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Taux d'Absence (Semaine)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={absenceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="taux"
                      stroke="hsl(38, 92%, 50%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(38, 92%, 50%)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Projets Récents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentProjects.map((project) => (
                  <div key={project.id} className="px-4 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground w-8">
                        {project.progress}%
                      </span>
                    </div>
                    <Badge variant={statusBadges[project.status]?.variant || 'muted'}>
                      {statusBadges[project.status]?.label || project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Alertes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AlertCard alerts={alerts} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
