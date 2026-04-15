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

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Cài đặt</h1>
          <p className="text-sm text-muted-foreground">Quản lý tài khoản và tùy chọn</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin tài khoản</CardTitle>
            <CardDescription>Cập nhật thông tin cá nhân</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Tên hiển thị</Label>
              <Input placeholder="Nhập tên của bạn" />
            </div>
            <Button>Lưu thay đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông báo</CardTitle>
            <CardDescription>Cấu hình cách nhận thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email thông báo</p>
                <p className="text-xs text-muted-foreground">Nhận thông báo qua email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Thông báo bảo mật</p>
                <p className="text-xs text-muted-foreground">Cảnh báo khi có đăng nhập mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Cập nhật sản phẩm</p>
                <p className="text-xs text-muted-foreground">Tin tức về tính năng mới</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base text-destructive">Vùng nguy hiểm</CardTitle>
            <CardDescription>Hành động không thể hoàn tác</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Xóa tài khoản</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
