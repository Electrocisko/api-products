
const userDTO = (user) => {
    return {
        user_id: user.user_id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone || "No data",
        creation_date: user.creation_date,
        update_date: user.update_date
    }
}

export  default userDTO;