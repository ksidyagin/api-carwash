import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { TokenVerify } from 'src/modules/token/models/token-verify.interface';
import { TokenService } from 'src/modules/token/services/token.service';
import { User, UserStatus } from 'src/modules/user/models/user.interface';
import { UserService } from 'src/modules/user/service/user.service';
import { ITokenPayload } from '../models/token-payload.model';
const bcrypt = require('bcrypt');
import * as moment from 'moment';
import { SignOptions } from 'jsonwebtoken';
import { UserEntity } from 'src/modules/user/models/user.entity';
import { TokenVerifyEntity } from 'src/modules/token/models/token-verify.entity';


export class EmailSend {
    email_receiver?: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private tokenService: TokenService,
    private mailerService: MailerService){}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable <string> {
        return from<string>(bcrypt.hash(password, 12));

    }

    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(bcrypt.compare(newPassword, passwortHash));
    }

    verifyToken(token): any {
        try {
            const data = this.jwtService.verify(token) as ITokenPayload;
            const tokenExists = this.tokenService.findOne(data.id, token);

            if (tokenExists) {
                return data;
            }


        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private async saveToken(UserToken: TokenVerify) {
        const userToken = await this.tokenService.create(UserToken);
        return userToken;
    }

    private generateToken(data: ITokenPayload, options?: SignOptions): string {
        return this.jwtService.sign(data, options);
    }

    sendEmail(user: UserEntity) {
        const expiresIn = 60 * 60 * 24; // 24 hours
        const tokenPayload: ITokenPayload = {
            id: user.id,
            status: user.status,
            role: user.role,
        };
        const expireAtMoment = moment()
            .add(1, 'day')
            .toISOString();

        const token =  this.generateToken(tokenPayload, { expiresIn });
        const confirmLink = `${process.env.API_URL}/users/confirm/${token}`;
        const tokenVerify: TokenVerifyEntity = {
            id: user.id,
            token: token,
            expireAt: expireAtMoment
        };
        this.saveToken(tokenVerify);

        this.mailerService.sendMail({
           to: `${user.email}`, // list of receivers
           from: `${process.env.MAILDEV_USER}`, // sender address
           subject: 'Testing Nest MailerModule ✔', // Subject line
           text: 'welcome!', // plaintext body
           html: `<b>Welcome!</b> 
           <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
           Don't tell it anyone!`, // HTML body content
         })
         .then(() => {})
         .catch(() => {});
   
     }
}
