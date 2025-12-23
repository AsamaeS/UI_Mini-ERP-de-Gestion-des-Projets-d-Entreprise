import { useAuth } from '@/contexts/AuthContext';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Shield,
  Bell,
  Database,
  Mail,
  Globe,
  Save,
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Settings() {
  const { user } = useAuth();

  // Only admin can access this page
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground mt-1">
            Configuration générale du système ERP
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general" className="gap-2">
              <Building2 className="w-4 h-4" />
              Général
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Database className="w-4 h-4" />
              Intégrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations de l'entreprise</CardTitle>
                <CardDescription>
                  Configurez les informations générales de votre organisation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'entreprise</Label>
                    <Input defaultValue="INPT - Institut National des Postes et Télécommunications" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email principal</Label>
                    <Input type="email" defaultValue="contact@inpt.ma" />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input defaultValue="+212 5 37 77 30 42" />
                  </div>
                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input defaultValue="Avenue Allal Al Fassi, Rabat, Maroc" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Préférences régionales</CardTitle>
                <CardDescription>
                  Configurez les paramètres de langue et de localisation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Langue</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger>
                        <Globe className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fuseau horaire</Label>
                    <Select defaultValue="africa-casablanca">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa-casablanca">Africa/Casablanca (GMT+1)</SelectItem>
                        <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format de date</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="erp">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Politique de mots de passe</CardTitle>
                <CardDescription>
                  Définissez les règles de sécurité pour les mots de passe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Longueur minimale</Label>
                    <Select defaultValue="8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 caractères</SelectItem>
                        <SelectItem value="8">8 caractères</SelectItem>
                        <SelectItem value="10">10 caractères</SelectItem>
                        <SelectItem value="12">12 caractères</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Expiration</Label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="60">60 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                        <SelectItem value="never">Jamais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Caractères spéciaux requis</p>
                      <p className="text-sm text-muted-foreground">
                        Au moins un caractère spécial (!@#$%^&*)
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Chiffres requis</p>
                      <p className="text-sm text-muted-foreground">Au moins un chiffre</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Majuscules requises</p>
                      <p className="text-sm text-muted-foreground">Au moins une lettre majuscule</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Authentification à deux facteurs (MFA)</CardTitle>
                <CardDescription>
                  Renforcez la sécurité avec l'authentification multi-facteurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Activer MFA pour les administrateurs</p>
                    <p className="text-sm text-muted-foreground">
                      Obligatoire pour tous les comptes administrateur
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Activer MFA pour tous les utilisateurs</p>
                    <p className="text-sm text-muted-foreground">
                      Optionnel pour les autres utilisateurs
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="erp">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notifications par email</CardTitle>
                <CardDescription>
                  Configurez les notifications envoyées par email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Nouvelles demandes de congé</p>
                    <p className="text-sm text-muted-foreground">
                      Notifier les managers des nouvelles demandes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Projets en retard</p>
                    <p className="text-sm text-muted-foreground">
                      Alerter quand un projet dépasse sa deadline
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Nouveaux documents</p>
                    <p className="text-sm text-muted-foreground">
                      Notifier quand un nouveau document est téléversé
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Connexions suspectes</p>
                    <p className="text-sm text-muted-foreground">
                      Alerter en cas de connexion depuis un nouvel appareil
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Configuration SMTP</CardTitle>
                <CardDescription>
                  Paramètres du serveur d'envoi d'emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Serveur SMTP</Label>
                    <Input placeholder="smtp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Port</Label>
                    <Input placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email d'envoi</Label>
                    <Input type="email" placeholder="noreply@inpt.ma" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Tester la configuration
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="erp">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Base de données</CardTitle>
                <CardDescription>
                  Informations sur la connexion à la base de données
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type de base</Label>
                    <Input value="PostgreSQL" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Version</Label>
                    <Input value="15.4" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Hôte</Label>
                    <Input value="localhost:5432" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom de la base</Label>
                    <Input value="mini_erp_inpt" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">API externes</CardTitle>
                <CardDescription>
                  Gérez les connexions aux services tiers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Database className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Supabase</p>
                        <p className="text-sm text-muted-foreground">Base de données et authentification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="erp">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ERPLayout>
  );
}
