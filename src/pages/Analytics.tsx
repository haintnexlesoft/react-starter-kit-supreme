import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const barData = [
  { name: "T2", visits: 4000, signups: 2400 },
  { name: "T3", visits: 3000, signups: 1398 },
  { name: "T4", visits: 2000, signups: 4800 },
  { name: "T5", visits: 2780, signups: 3908 },
  { name: "T6", visits: 1890, signups: 4800 },
  { name: "CN", visits: 2390, signups: 3800 },
];

const pieData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 10 },
];

const COLORS = ["hsl(220, 70%, 50%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)"];

const Analytics = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Phân tích</h1>
        <p className="text-sm text-muted-foreground">Dữ liệu chi tiết về hiệu suất hệ thống</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Lượt truy cập & Đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
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
                  <Bar dataKey="visits" fill="hsl(220, 70%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="signups" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Thiết bị sử dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-72 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </DashboardLayout>
);

export default Analytics;
