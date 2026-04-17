import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Shield, Search, X, UserPlus } from "lucide-react";

type Profile = {
  id: string;
  user_id: string;
  display_name: string;
  email: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
};

type UserRole = {
  id: string;
  user_id: string;
  role: "admin" | "editor" | "viewer";
};

const ROLES: ("admin" | "editor" | "viewer")[] = ["admin", "editor", "viewer"];

const UsersPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<Profile | null>(null);
  const [editForm, setEditForm] = useState({ display_name: "", email: "" });
  const [deleteUser, setDeleteUser] = useState<Profile | null>(null);
  const [rolesUser, setRolesUser] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<"admin" | "editor" | "viewer">("viewer");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState<{ email: string; display_name: string; role: "admin" | "editor" | "viewer" }>({
    email: "",
    display_name: "",
    role: "viewer",
  });

  // Fetch profiles
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Profile[];
    },
  });

  // Fetch all user roles
  const { data: userRoles = [] } = useQuery({
    queryKey: ["user_roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data as UserRole[];
    },
  });

  // Check if current user is admin
  const isAdmin = userRoles.some(
    (r) => r.user_id === user?.id && r.role === "admin"
  );

  // Get roles for a specific user
  const getRolesForUser = (userId: string) =>
    userRoles.filter((r) => r.user_id === userId);

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async ({ id, display_name, email }: { id: string; display_name: string; email: string }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name, email })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast({ title: t("users_page.success"), description: t("users_page.user_updated") });
      setEditUser(null);
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

  // Toggle active mutation
  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

  // Delete profile mutation
  const deleteProfile = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("profiles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast({ title: t("users_page.success"), description: t("users_page.user_deleted") });
      setDeleteUser(null);
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

  // Assign role mutation
  const assignRole = useMutation({
    mutationFn: async ({ user_id, role }: { user_id: string; role: string }) => {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id, role } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_roles"] });
      toast({ title: t("users_page.success"), description: t("users_page.role_assigned") });
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

  // Remove role mutation
  const removeRole = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase.from("user_roles").delete().eq("id", roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_roles"] });
      toast({ title: t("users_page.success"), description: t("users_page.role_removed") });
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

  // Invite user mutation
  const inviteUser = useMutation({
    mutationFn: async (payload: { email: string; display_name: string; role: string }) => {
      const { data, error } = await supabase.functions.invoke("invite-user", {
        body: { ...payload, redirect_to: `${window.location.origin}/auth` },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      return data;
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["user_roles"] });
      toast({
        title: t("users_page.invite_sent"),
        description: t("users_page.invite_sent_desc", { email: vars.email }),
      });
      setInviteOpen(false);
      setInviteForm({ email: "", display_name: "", role: "viewer" });
    },
    onError: (err: Error) => {
      toast({ title: t("users_page.error"), description: err.message, variant: "destructive" });
    },
  });

  const filtered = profiles.filter(
    (p) =>
      p.display_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (profile: Profile) => {
    setEditForm({ display_name: profile.display_name, email: profile.email || "" });
    setEditUser(profile);
  };

  const roleColor = (role: string) => {
    switch (role) {
      case "admin": return "destructive" as const;
      case "editor": return "default" as const;
      default: return "secondary" as const;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("users_page.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("users_page.subtitle")}</p>
          </div>
          {isAdmin && (
            <Button onClick={() => setInviteOpen(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              {t("users_page.invite_user")}
            </Button>
          )}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-base font-medium">{t("users_page.all_users")}</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("users_page.search_placeholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">{t("users_page.no_users")}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("users_page.name")}</TableHead>
                    <TableHead>{t("users_page.email")}</TableHead>
                    <TableHead>{t("users_page.roles")}</TableHead>
                    <TableHead>{t("users_page.status")}</TableHead>
                    <TableHead className="text-right">{t("users_page.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => {
                    const roles = getRolesForUser(p.user_id);
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {p.display_name?.[0]?.toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{p.display_name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{p.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 flex-wrap">
                            {roles.length === 0 ? (
                              <span className="text-xs text-muted-foreground">{t("users_page.no_roles")}</span>
                            ) : (
                              roles.map((r) => (
                                <Badge key={r.id} variant={roleColor(r.role)} className="text-xs capitalize">
                                  {r.role}
                                </Badge>
                              ))
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={p.is_active ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              if (isAdmin || p.user_id === user?.id) {
                                toggleActive.mutate({ id: p.id, is_active: !p.is_active });
                              }
                            }}
                          >
                            {p.is_active ? t("users_page.active") : t("users_page.inactive")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(p)}
                              disabled={!isAdmin && p.user_id !== user?.id}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setRolesUser(p)}
                              disabled={!isAdmin}
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteUser(p)}
                              disabled={!isAdmin || p.user_id === user?.id}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("users_page.edit_user")}</DialogTitle>
            <DialogDescription>{editUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>{t("users_page.display_name")}</Label>
              <Input
                value={editForm.display_name}
                onChange={(e) => setEditForm((f) => ({ ...f, display_name: e.target.value }))}
                placeholder={t("users_page.display_name_placeholder")}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("users_page.email")}</Label>
              <Input
                value={editForm.email}
                onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                placeholder={t("users_page.email_placeholder")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>{t("users_page.cancel")}</Button>
            <Button
              onClick={() => {
                if (editUser) {
                  updateProfile.mutate({ id: editUser.id, ...editForm });
                }
              }}
              disabled={updateProfile.isPending}
            >
              {t("users_page.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("users_page.delete_confirm")}</AlertDialogTitle>
            <AlertDialogDescription>{t("users_page.delete_confirm_desc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("users_page.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUser && deleteProfile.mutate(deleteUser.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("users_page.delete_user")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Manage Roles Dialog */}
      <Dialog open={!!rolesUser} onOpenChange={(open) => !open && setRolesUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("users_page.manage_roles")}</DialogTitle>
            <DialogDescription>{rolesUser?.display_name} — {rolesUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Current roles */}
            <div className="space-y-2">
              <Label>{t("users_page.roles")}</Label>
              <div className="flex flex-wrap gap-2">
                {rolesUser &&
                  getRolesForUser(rolesUser.user_id).map((r) => (
                    <Badge key={r.id} variant={roleColor(r.role)} className="gap-1 capitalize">
                      {r.role}
                      <button
                        onClick={() => removeRole.mutate(r.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                {rolesUser && getRolesForUser(rolesUser.user_id).length === 0 && (
                  <span className="text-sm text-muted-foreground">{t("users_page.no_roles")}</span>
                )}
              </div>
            </div>

            {/* Assign new role */}
            <div className="space-y-2">
              <Label>{t("users_page.assign_role")}</Label>
              <div className="flex gap-2">
                <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as any)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r} className="capitalize">
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    if (rolesUser) {
                      assignRole.mutate({ user_id: rolesUser.user_id, role: selectedRole });
                    }
                  }}
                  disabled={
                    assignRole.isPending ||
                    (rolesUser
                      ? getRolesForUser(rolesUser.user_id).some((r) => r.role === selectedRole)
                      : false)
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {t("users_page.assign_role")}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UsersPage;
