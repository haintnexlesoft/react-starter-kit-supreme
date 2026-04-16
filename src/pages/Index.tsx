import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Jan", value: 2400 }, { name: "Feb", value: 1398 }, { name: "Mar", value: 4800 },
  { name: "Apr", value: 3908 }, { name: "May", value: 4800 }, { name: "Jun", value: 3800 },
  { name: "Jul", value: 5300 }, { name: "Aug", value: 4900 }, { name: "Sep", value: 6100 },
  { name: "Oct", value: 5400 }, { name: "Nov", value: 7200 }, { name: "Dec", value: 6800 },
];

const recentActivity = [
  { user: "Nguyễn Văn A", action: "Created a new project", time: "2m ago" },
  { user: "Trần Thị B", action: "Updated settings", time: "15m ago" },
  { user: "Lê Văn C", action: "Invited a new member", time: "1h ago" },
  { user: "Phạm Thị D", action: "Exported report", time: "3h ago" },
  { user: "Hoàng Văn E", action: "Signed up", time: "5h ago" },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("dashboard.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title={t("dashboard.total_users")} value="12,847" change={`+12.5% ${t("dashboard.from_last_month")}`} changeType="positive" icon={Users} index={0} />
          <StatCard title={t("dashboard.revenue")} value="$48,352" change={`+8.2% ${t("dashboard.from_last_month")}`} changeType="positive" icon={DollarSign} index={1} />
          <StatCard title={t("dashboard.growth")} value="3.24%" change={`-0.4% ${t("dashboard.vs_last_month")}`} changeType="negative" icon={TrendingUp} index={2} />
          <StatCard title={t("dashboard.active_now")} value="1,429" change="—" changeType="neutral" icon={Activity} index={3} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{t("dashboard.monthly_revenue")}</CardTitle>
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
                      <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" }} />
                      <Area type="monotone" dataKey="value" stroke="hsl(220, 70%, 50%)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">{t("dashboard.recent_activity")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{item.user[0]}</span>
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
