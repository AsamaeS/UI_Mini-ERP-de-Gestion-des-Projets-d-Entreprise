import { useState } from 'react';
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
import {
  Upload,
  Search,
  Folder,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Clock,
  User,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'image' | 'other';
  project?: string;
  folder: string;
  uploadedBy: string;
  size: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

interface Folder {
  id: string;
  name: string;
  documentCount: number;
  icon: string;
}

const mockFolders: Folder[] = [
  { id: '1', name: 'Projets', documentCount: 24, icon: 'folder' },
  { id: '2', name: 'RH', documentCount: 12, icon: 'folder' },
  { id: '3', name: 'Contrats', documentCount: 8, icon: 'folder' },
  { id: '4', name: 'Rapports', documentCount: 15, icon: 'folder' },
  { id: '5', name: 'Templates', documentCount: 6, icon: 'folder' },
];

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Cahier des charges ERP.pdf',
    type: 'pdf',
    project: 'Migration ERP v2',
    folder: 'Projets',
    uploadedBy: 'Fatima Benali',
    size: '2.4 MB',
    version: 3,
    createdAt: '2024-10-15',
    updatedAt: '2025-01-10',
  },
  {
    id: '2',
    name: 'Planning Q1 2025.xlsx',
    type: 'xlsx',
    project: 'Migration ERP v2',
    folder: 'Projets',
    uploadedBy: 'Ahmed Tazi',
    size: '856 KB',
    version: 2,
    createdAt: '2024-12-20',
    updatedAt: '2025-01-08',
  },
  {
    id: '3',
    name: 'Contrat prestataire.docx',
    type: 'docx',
    folder: 'Contrats',
    uploadedBy: 'Nadia Chraibi',
    size: '124 KB',
    version: 1,
    createdAt: '2025-01-05',
    updatedAt: '2025-01-05',
  },
  {
    id: '4',
    name: 'Rapport audit Q4.pdf',
    type: 'pdf',
    folder: 'Rapports',
    uploadedBy: 'Karim Fassi',
    size: '4.2 MB',
    version: 1,
    createdAt: '2025-01-02',
    updatedAt: '2025-01-02',
  },
  {
    id: '5',
    name: 'Architecture système.png',
    type: 'image',
    project: 'API Gateway',
    folder: 'Projets',
    uploadedBy: 'Mohammed Alami',
    size: '1.8 MB',
    version: 4,
    createdAt: '2024-09-10',
    updatedAt: '2024-12-28',
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-destructive" />;
    case 'docx':
      return <FileText className="w-5 h-5 text-primary" />;
    case 'xlsx':
      return <FileSpreadsheet className="w-5 h-5 text-success" />;
    case 'image':
      return <FileImage className="w-5 h-5 text-info" />;
    default:
      return <File className="w-5 h-5 text-muted-foreground" />;
  }
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion Documentaire</h1>
            <p className="text-muted-foreground mt-1">
              {mockDocuments.length} documents • {mockFolders.length} dossiers
            </p>
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="erp">
                <Upload className="w-4 h-4 mr-2" />
                Téléverser
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Téléverser un document</DialogTitle>
                <DialogDescription>
                  Sélectionnez un fichier et associez-le à un dossier ou projet.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Glissez-déposez un fichier ou{' '}
                    <span className="text-primary cursor-pointer">parcourir</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, XLS, Images (max 10MB)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Dossier de destination</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un dossier" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockFolders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Projet associé (optionnel)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Aucun projet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucun projet</SelectItem>
                      <SelectItem value="1">Migration ERP v2</SelectItem>
                      <SelectItem value="2">Module RH</SelectItem>
                      <SelectItem value="3">API Gateway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Annuler
                </Button>
                <Button variant="erp" onClick={() => setIsUploadOpen(false)}>
                  Téléverser
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Folders Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dossiers</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      !selectedFolder ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Folder className="w-4 h-4" />
                    <span className="text-sm font-medium">Tous les documents</span>
                  </button>
                  {mockFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedFolder === folder.name
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="w-4 h-4" />
                        <span className="text-sm font-medium">{folder.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{folder.documentCount}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Breadcrumb & Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Documents</span>
                    {selectedFolder && (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">{selectedFolder}</span>
                      </>
                    )}
                  </div>
                  <div className="relative flex-1 md:max-w-xs md:ml-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="erp-table">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Projet</th>
                        <th>Auteur</th>
                        <th>Version</th>
                        <th>Modifié</th>
                        <th>Taille</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              {getFileIcon(doc.type)}
                              <span className="font-medium text-foreground">{doc.name}</span>
                            </div>
                          </td>
                          <td>
                            {doc.project ? (
                              <Badge variant="secondary">{doc.project}</Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{doc.uploadedBy}</span>
                            </div>
                          </td>
                          <td>
                            <Badge variant="muted">v{doc.version}</Badge>
                          </td>
                          <td>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {new Date(doc.updatedAt).toLocaleDateString('fr-FR')}
                            </div>
                          </td>
                          <td className="text-sm text-muted-foreground">{doc.size}</td>
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
                                  Aperçu
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                  <Download className="w-4 h-4" />
                                  Télécharger
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
        </div>
      </div>
    </ERPLayout>
  );
}
