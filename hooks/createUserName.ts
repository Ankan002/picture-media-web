export const createUserName = (email: string) => {
    const prefix = (email.split('@'))[0]
    return prefix.trim()+'_gal'
}