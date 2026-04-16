import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    { name: "Website Redesign", statusKey: "projects.in_progress", progress: 68, members: 4 },
    { name: "Mobile App v2", statusKey: "projects.in_progress", progress: 42, members: 6 },
    { name: "API Integration", statusKey: "projects.completed", progress: 100, members: 3 },
    { name: "Dashboard Analytics", statusKey: "projects.pending_review", progress: 85, members: 2 },
    { name: "Payment Gateway", statusKey: "projects.in_progress", progress: 30, members: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("projects.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("projects.subtitle")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const status = t(p.statusKey);
            return (
              <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-medium">{p.name}</CardTitle>
                      <Badge variant={p.statusKey === "projects.completed" ? "default" : p.statusKey === "projects.pending_review" ? "outline" : "secondary"}>
                        {status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("projects.progress")}</span>
                        <span className="font-medium text-foreground">{p.progress}%</span>
                      </div>
                      <Progress value={p.progress} className="h-1.5" />
                    </div>
                    <p className="text-xs text-muted-foreground">{p.members} {t("projects.members")}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
