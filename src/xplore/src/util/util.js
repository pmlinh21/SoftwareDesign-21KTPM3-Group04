export function isBlocked(id_user, user_block){
    // check user_login có block id_user đó ko
    const userFound = user_block.find(user => user.id_user === id_user);
    if (userFound) {
        return true;
    }
    return false;
}