import bcryp from 'bcryptjs';

const users = [
    {
        name: "Admin",
        email: "admin@admin.com",
        password: bcryp.hashSync('123', 10),
        isAdmin: true,
    },
    {
        name: "Quoc",
        email: "quoc@bao.com",
        password: bcryp.hashSync('123', 10),
    },
    {
        name: "Bao",
        email: "bao@quoc.com",
        password: bcryp.hashSync('123', 10),
    },
]

export default users;