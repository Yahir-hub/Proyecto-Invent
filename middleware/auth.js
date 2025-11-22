// Middleware para verificar si el usuario está autenticado
export const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect('/login');
};

// Middleware para verificar si el usuario es administrador
export const requireAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'administrador') {
        return next();
    }
    return res.status(403).render('error', { 
        message: 'Acceso denegado. Se requieren permisos de administrador.' 
    });
};

// Middleware para pasar datos del usuario a las vistas
export const userMiddleware = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
};