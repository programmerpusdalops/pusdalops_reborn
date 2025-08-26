const Acces = (menus: any[], data: any) => {
    const menu = menus.filter((value: { menu: any; }) => value.menu === data)
                .map((value: any) => {
                return value
                }) 
    return menu
}

export default Acces;