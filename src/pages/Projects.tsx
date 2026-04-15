import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const projects = [
  { name: "Website Redesign", status: "Đang thực hiện", progress: 68, members: 4 },
  { name: "Mobile App v2", status: "Đang thực hiện", progress: 42, members: 6 },
  { name: "API Integration", status: "Hoàn thành", progress: 100, members: 3 },
  { name: "Dashboard Analytics", status: "Chờ duyệt", progress: 85, members: 2 },
  { name: "Payment Gateway", status: "Đang thực hiện", progress: 30, members: 5 },
];

const Projects = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Dự án</h1>
        <p className="text-sm text-muted-foreground">Theo dõi tiến độ các dự án</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base font-medium">{p.name}</CardTitle>
                  <Badge
                    variant={
                      p.status === "Hoàn thành" ? "default" : p.status === "Chờ duyệt" ? "outline" : "secondary"
                    }
                  >
                    {p.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiến độ</span>
                    <span className="font-medium text-foreground">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} className="h-1.5" />
                </div>
                <p className="text-xs text-muted-foreground">{p.members} thành viên</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Projects;
