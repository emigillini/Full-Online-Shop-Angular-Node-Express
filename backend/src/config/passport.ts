import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserModel } from '../DAO/models/user_model';
import { Secret } from 'jsonwebtoken';

const jwtSecret: Secret = process.env.JWT_SECRET 
if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
};
const jwtFromRequest = (req: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Token ')) {
        return authHeader.split(' ')[1]; // Retorna el token después de "Token "
    }
    return null; // No se encontró token
};

passport.use(new JwtStrategy({...options, jwtFromRequest}, async (jwtPayload, done) => {
    try {
        const user = await UserModel.findById(jwtPayload.id).exec();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

export default passport
