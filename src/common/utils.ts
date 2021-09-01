export function permissoesUsuario(user) {
    try {
        const p = JSON.parse(user.permissao)
        return p instanceof Array ? p : [];
    } catch (e) {
        return []
    }
}