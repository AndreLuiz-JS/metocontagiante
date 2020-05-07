export default [
    { to: "/admin/devotional", name: "Devocional", user_access: 'post_user' },
    { to: "/admin/cell", name: "Células", user_access: 'administrator_user' },
    { to: "/admin/user-manager", name: "Gerenciar acesso", user_access: 'administrator_user' },
    { to: "/admin/user", name: "Alterar Dados", user_access: 'read_only_user' },

]