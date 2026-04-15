import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "T1", value: 2400 },
  { name: "T2", value: 1398 },
  { name: "T3", value: 4800 },
  { name: "T4", value: 3908 },
  { name: "T5", value: 4800 },
  { name: "T6", value: 3800 },
  { name: "T7", value: 5300 },
  { name: "T8", value: 4900 },
  { name: "T9", value: 6100 },
  { name: "T10", value: 5400 },
  { name: "T11", value: 7200 },
  { name: "T12", value: 6800 },
];

const recentActivity = [
  { user: "Nguyễn Văn A", action: "Đã tạo dự án mới", time: "2 phút trước" },
  { user: "Trần Thị B", action: "Cập nhật cài đặt", time: "15 phút trước" },
  { user: "Lê Văn C", action: "Mời thành viên mới", time: "1 giờ trước" },
  { user: "Phạm Thị D", action: "Xuất báo cáo", time: "3 giờ trước" },
  { user: "Hoàng Văn E", action: "Đăng ký tài khoản", time: "5 giờ trước" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Tổng quan hoạt động của hệ thống</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tổng người dùng"
            value="12,847"
            change="+12.5% so với tháng trước"
            changeType="positive"
            icon={Users}
            index={0}
          />
          <StatCard
            title="Doanh thu"
            value="$48,352"
            change="+8.2% so với tháng trước"
            changeType="positive"
            icon={DollarSign}
            index={1}
          />
          <StatCard
            title="Tỷ lệ chuyển đổi"
            value="3.24%"
            change="-0.4% so với tháng trước"
            changeType="negative"
            icon={TrendingUp}
            index={2}
          />
          <StatCard
            title="Phiên hoạt động"
            value="1,429"
            change="Ổn định"
            changeType="neutral"
            icon={Activity}
            index={3}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Doanh thu theo tháng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis dataKey="name" stroke="hsl(220, 10%, 46%)" fontSize={12} />
                      <YAxis stroke="hsl(220, 10%, 46%)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(0, 0%, 100%)",
                          border: "1px solid hsl(220, 13%, 91%)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(220, 70%, 50%)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {item.user[0]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{item.user}</p>
                        <p className="text-xs text-muted-foreground">{item.action}</p>
                        <p className="text-xs text-muted-foreground/60">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
