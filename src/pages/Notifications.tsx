import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  { type: "success", icon: CheckCircle2, title: "Triển khai thành công", desc: "Phiên bản 2.1.0 đã được deploy lên production", time: "5 phút trước" },
  { type: "warning", icon: AlertCircle, title: "Cảnh báo bộ nhớ", desc: "Sử dụng bộ nhớ đã vượt 85% giới hạn", time: "30 phút trước" },
  { type: "info", icon: Info, title: "Thành viên mới", desc: "Trần Thị B đã tham gia workspace", time: "2 giờ trước" },
  { type: "info", icon: Bell, title: "Bảo trì hệ thống", desc: "Bảo trì định kỳ vào 22:00 hôm nay", time: "4 giờ trước" },
  { type: "success", icon: CheckCircle2, title: "Backup hoàn tất", desc: "Database backup đã được tạo thành công", time: "6 giờ trước" },
];

const typeStyles = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-primary/10 text-primary",
};

const Notifications = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Thông báo</h1>
        <p className="text-sm text-muted-foreground">Cập nhật và cảnh báo hệ thống</p>
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

export default Notifications;
