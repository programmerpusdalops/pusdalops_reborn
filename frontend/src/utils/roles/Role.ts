import Acces from "./Acces";

export const Read = (menus: [] | any | undefined, menu: string, izin: boolean) => {
    const tampil = Acces(menus, menu)[0]?.can_read === izin
    return tampil
}

export const Create = (menus: [] | any | undefined, menu: string, izin: boolean) => {
    const tampil = Acces(menus, menu)[0]?.can_create === izin
    return tampil
}

export const Update = (menus: [] | any | undefined, menu: string, izin: boolean) => {
    const tampil = Acces(menus, menu)[0]?.can_update === izin
    return tampil
}

export const Delete = (menus: [] | any | undefined, menu: string, izin: boolean) => {
    const tampil = Acces(menus, menu)[0]?.can_delete === izin
    return tampil
}

export const Export= (menus: [] | any | undefined, menu: string, izin: boolean) => {
    const tampil = Acces(menus, menu)[0]?.can_export === izin
    return tampil
}

export const Other = (menus: [] | any | undefined, menu: string, izin: boolean) => {
    const tampil = Acces(menus, menu)[0]?.can_other === izin
    return tampil
}