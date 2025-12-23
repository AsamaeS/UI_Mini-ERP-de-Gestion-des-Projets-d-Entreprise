import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
}

interface AlertCardProps {
  alerts: Alert[];
  className?: string;
}

const alertStyles = {
  warning: {
    bg: 'bg-warning-light',
    border: 'border-warning/30',
    icon: AlertTriangle,
    iconColor: 'text-warning',
  },
  error: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: AlertCircle,
    iconColor: 'text-destructive',
  },
  info: {
    bg: 'bg-info-light',
    border: 'border-info/30',
    icon: Info,
    iconColor: 'text-info',
  },
  success: {
    bg: 'bg-success-light',
    border: 'border-success/30',
    icon: CheckCircle,
    iconColor: 'text-success',
  },
};

export function AlertCard({ alerts, className }: AlertCardProps) {
  if (alerts.length === 0) {
    return (
      <div className={cn('erp-card p-4', className)}>
        <div className="flex items-center gap-3 text-muted-foreground">
          <CheckCircle className="w-5 h-5 text-success" />
          <p className="text-sm">Aucune alerte en cours</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {alerts.map((alert) => {
        const style = alertStyles[alert.type];
        const Icon = style.icon;

        return (
          <div
            key={alert.id}
            className={cn(
              'p-4 rounded-lg border flex items-start gap-3',
              style.bg,
              style.border
            )}
          >
            <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', style.iconColor)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{alert.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {alert.timestamp}
            </span>
          </div>
        );
      })}
    </div>
  );
}
