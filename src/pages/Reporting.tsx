import { useState } from 'react';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  FolderKanban,
  FileText,
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
  AreaChart,
  Area,
} from 'recharts';

const projectPerformanceData = [
  { month: 'Jan', completed: 12, delayed: 3, onTime: 9 },
  { month: 'Fév', completed: 15, delayed: 2, onTime: 13 },
  { month: 'Mar', completed: 18, delayed: 4, onTime: 14 },
  { month: 'Avr', completed: 14, delayed: 1, onTime: 13 },
  { month: 'Mai', completed: 20, delayed: 3, onTime: 17 },
  { month: 'Jun', completed: 22, delayed: 2, onTime: 20 },
];

const hrMetricsData = [
  { month: 'Jan', absences: 12, leaves: 8, sickDays: 4 },
  { month: 'Fév', absences: 15, leaves: 10, sickDays: 5 },
  { month: 'Mar', absences: 10, leaves: 7, sickDays: 3 },
  { month: 'Avr', absences: 18, leaves: 12, sickDays: 6 },
  { month: 'Mai', absences: 14, leaves: 9, sickDays: 5 },
  { month: 'Jun', absences: 11, leaves: 8, sickDays: 3 },
];

const departmentDistribution = [
  { name: 'Développement', value: 35, color: 'hsl(217, 91%, 40%)' },
  { name: 'RH', value: 15, color: 'hsl(142, 76%, 36%)' },
  { name: 'Direction', value: 10, color: 'hsl(38, 92%, 50%)' },
  { name: 'Audit', value: 8, color: 'hsl(199, 89%, 48%)' },
  { name: 'Support', value: 20, color: 'hsl(280, 65%, 60%)' },
  { name: 'Marketing', value: 12, color: 'hsl(0, 72%, 51%)' },
];

const documentActivityData = [
  { day: 'Lun', uploads: 15, downloads: 28 },
  { day: 'Mar', uploads: 22, downloads: 35 },
  { day: 'Mer', uploads: 18, downloads: 42 },
  { day: 'Jeu', uploads: 25, downloads: 38 },
  { day: 'Ven', uploads: 12, downloads: 20 },
];

const budgetTrendData = [
  { month: 'Jul', allocated: 150000, spent: 120000 },
  { month: 'Aoû', allocated: 150000, spent: 135000 },
  { month: 'Sep', allocated: 180000, spent: 145000 },
  { month: 'Oct', allocated: 180000, spent: 160000 },
  { month: 'Nov', allocated: 200000, spent: 175000 },
  { month: 'Déc', allocated: 200000, spent: 190000 },
];

export default function Reporting() {
  const [period, setPeriod] = useState('6months');
  const [project, setProject] = useState('all');

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reporting & Statistiques</h1>
            <p className="text-muted-foreground mt-1">
              Tableaux de bord et indicateurs de performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 mois</SelectItem>
                <SelectItem value="3months">3 mois</SelectItem>
                <SelectItem value="6months">6 mois</SelectItem>
                <SelectItem value="1year">1 an</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FolderKanban className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Projets actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success-light">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-sm text-muted-foreground">Taux de réussite</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-info-light">
                  <Users className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">48</p>
                  <p className="text-sm text-muted-foreground">Employés actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-warning-light">
                  <FileText className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Performance des Projets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="onTime" name="À temps" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="delayed" name="En retard" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* HR Metrics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-info" />
                Indicateurs RH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hrMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="leaves"
                      name="Congés"
                      stackId="1"
                      stroke="hsl(217, 91%, 40%)"
                      fill="hsl(217, 91%, 40%)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="sickDays"
                      name="Maladie"
                      stackId="1"
                      stroke="hsl(38, 92%, 50%)"
                      fill="hsl(38, 92%, 50%)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Répartition par Département</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {departmentDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground truncate">{item.name}</span>
                    <span className="font-medium text-foreground ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tendance Budgétaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={budgetTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} MAD`]}
                    />
                    <Line
                      type="monotone"
                      dataKey="allocated"
                      name="Alloué"
                      stroke="hsl(217, 91%, 40%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(217, 91%, 40%)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="spent"
                      name="Dépensé"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(142, 76%, 36%)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-warning" />
              Activité Documentaire (Semaine)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={documentActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="uploads" name="Téléversements" fill="hsl(217, 91%, 40%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="downloads" name="Téléchargements" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
