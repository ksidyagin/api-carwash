import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User, UserRole } from '../models/user.interface';
import {switchMap, map, catchError} from 'rxjs/operators';
import { use } from 'passport';
import {
    paginate,
    Pagination,
    IPaginationOptions} from 'nestjs-typeorm-paginate';
import { ClientService } from 'src/modules/client/services/client/client.service';
import { ClientEntity } from 'src/modules/client/models/client.entity';
import { Client } from 'src/modules/client/models/client.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

export class EmailSend {
    email_receiver?: string;
}

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
      @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
      private authService: AuthService, private mailerService: MailerService
  ){}

    private code: string;
    generateCode(): string {
        let code: string = "";
    
        do {
            code += randomBytes(3).readUIntBE(0, 3);
            // code += Number.parseInt(randomBytes(3).toString("hex"), 16);
        } while (code.length < 6);
    
        return code.slice(0, 6);
    }
    sendEmail(receiverEmail: EmailSend): void {
     this.code = this.generateCode();
     this.mailerService.sendMail({
        to: `${receiverEmail.email_receiver}`, // list of receivers
        from: `${process.env.MAILDEV_USER}`, // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome!', // plaintext body
        html: `<b>Welcome!</b> 
        <br> Is your code for registration : <p> ${this.code} </p> <br>
        Don't tell it to anyone!`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

    async create(user: User): Promise<Observable<User>> {
        return (await this.authService.hashPassword(user.password)).pipe(
            switchMap((passwordHash: string) => {
                if(this.findByEmail(user.email) != null)
                {
                    throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
                }
                const newUser = new UserEntity();
                const newClient= new ClientEntity();
                newUser.firstName = user.firstName;
                newUser.lastName = user.lastName;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.phone = user.phone;
                newUser.city = user.city;  
                newUser.role = UserRole.USER;
                newClient.name = user.firstName;
                newClient.description = "";
                this.clientRepository.save(newClient);
                newUser.client_entry = newClient;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }


  findOne(id: number): Observable<User> {
      return from(this.userRepository.findOne({id})).pipe(
          map((user: User) => {
            const {password, ...result} = user;
            return result;
          })
      )
  }

  findAll(): Observable<User[]> {
      return from(this.userRepository.find()).pipe(
          map((users: User[]) => {
           users.forEach(function(v) {delete v.password});
           return users;
          })
      );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
        map((usersPageable: Pagination<User>) => {
            usersPageable.items.forEach(function(v) {delete v.password});

            return usersPageable;
        })
    )
  }

  deleteOne(id: number): Observable<any> {
      return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
      delete user.email;
      delete user.password;
      delete user.role;
      return from(this.userRepository.update(id, user));
  }

  updateRoleOfUser(id: number, user: User): Observable<any> {
      return from(this.userRepository.update(id, user));
  }

  login(user: User): Observable<string> {
      return this.validateUser(user.email, user.password).pipe(
          switchMap((user: User) => {
              if(user){
                  return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
              }
              else {
                throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
              }
          })
      )
  }

  validateUser(email: string, password: string): Observable<User> {
      return this.findByEmail(email).pipe(
          switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
              map((match: boolean) => {
                  if(match){
                      const {password, ...result} = user;
                      return result;
                  }
                  else {
                      throw Error;
                  }
              })
          ))
      )
  }

  findByEmail(email: string): Observable<User> {
      return from(this.userRepository.findOne({email}));
  }
}
