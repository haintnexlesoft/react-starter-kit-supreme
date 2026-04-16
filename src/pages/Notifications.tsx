import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const typeStyles = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-primary/10 text-primary",
};

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    { type: "success", icon: CheckCircle2, title: t("notifications_page.deploy_success"), desc: t("notifications_page.deploy_desc"), time: t("notifications_page.time_5m") },
    { type: "warning", icon: AlertCircle, title: t("notifications_page.memory_warning"), desc: t("notifications_page.memory_desc"), time: t("notifications_page.time_30m") },
    { type: "info", icon: Info, title: t("notifications_page.new_member"), desc: t("notifications_page.new_member_desc"), time: t("notifications_page.time_2h") },
    { type: "info", icon: Bell, title: t("notifications_page.maintenance"), desc: t("notifications_page.maintenance_desc"), time: t("notifications_page.time_4h") },
    { type: "success", icon: CheckCircle2, title: t("notifications_page.backup_done"), desc: t("notifications_page.backup_desc"), time: t("notifications_page.time_6h") },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("notifications_page.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("notifications_page.subtitle")}</p>
        </div>
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <Card key={i}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className={cn("rounded-lg p-2", typeStyles[n.type as keyof typeof typeStyles])}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.desc}</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">{n.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
