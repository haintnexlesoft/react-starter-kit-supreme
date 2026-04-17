import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [editForm, setEditForm] = useState({ display_name: "" });

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id).single();
      if (error) throw error;
      return data as Profile;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async ({ display_name }: {display_name: string}) => {
      const { error } = await supabase
          .from("profiles")
          .update({ display_name })
          .eq("id", profile.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({ title: t("users_page.success"), description: t("settings.account_updated") });
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

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
              <Input defaultValue={profile?.display_name || ""}
                     onChange={(e) => setEditForm((f) => ({ ...f, display_name: e.target.value }))}
                     placeholder={t("settings.display_name_placeholder")} />
            </div>
            <Button onClick={() => {
                   updateProfile.mutate(editForm);
                     }
                 }
                disabled={updateProfile.isPending}
             >
              {t("settings.save")}
            </Button>
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
