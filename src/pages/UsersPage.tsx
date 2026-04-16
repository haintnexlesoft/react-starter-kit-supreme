import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const users = [
  { name: "Nguyễn Văn A", email: "a@example.com", role: "Admin", activeKey: "users_page.active" },
  { name: "Trần Thị B", email: "b@example.com", role: "Editor", activeKey: "users_page.active" },
  { name: "Lê Văn C", email: "c@example.com", role: "Viewer", activeKey: "users_page.inactive" },
  { name: "Phạm Thị D", email: "d@example.com", role: "Editor", activeKey: "users_page.active" },
  { name: "Hoàng Văn E", email: "e@example.com", role: "Viewer", activeKey: "users_page.active" },
];

const UsersPage = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("users_page.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("users_page.subtitle")}</p>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">{t("users_page.all_users")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("users_page.name")}</TableHead>
                  <TableHead>{t("users_page.email")}</TableHead>
                  <TableHead>{t("users_page.role")}</TableHead>
                  <TableHead>{t("users_page.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">{u.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={u.activeKey === "users_page.active" ? "default" : "outline"}>
                        {t(u.activeKey)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
