import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const SettingsPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("settings.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("settings.subtitle")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("settings.account_info")}</CardTitle>
            <CardDescription>{t("settings.account_info_desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("auth.email")}</Label>
              <Input defaultValue={user?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>{t("settings.display_name")}</Label>
              <Input placeholder={t("settings.display_name_placeholder")} />
            </div>
            <Button>{t("settings.save")}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("settings.notifications")}</CardTitle>
            <CardDescription>{t("settings.notifications_desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t("settings.email_notifications")}</p>
                <p className="text-xs text-muted-foreground">{t("settings.email_notifications_desc")}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t("settings.security_alerts")}</p>
                <p className="text-xs text-muted-foreground">{t("settings.security_alerts_desc")}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{t("settings.product_updates")}</p>
                <p className="text-xs text-muted-foreground">{t("settings.product_updates_desc")}</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base text-destructive">{t("settings.danger_zone")}</CardTitle>
            <CardDescription>{t("settings.danger_zone_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">{t("settings.delete_account")}</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
