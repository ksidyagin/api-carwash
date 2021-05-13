import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User, UserRole, UserStatus } from '../models/user.interface';
import {switchMap, map, catchError} from 'rxjs/operators';
import { use } from 'passport';
import {
    paginate,
    Pagination,
    IPaginationOptions} from 'nestjs-typeorm-paginate';
import { ClientService } from 'src/modules/client/services/client/client.service';
import { ClientEntity } from 'src/modules/client/models/client.entity';
import { Client } from 'src/modules/client/models/client.interface';
import { randomBytes } from 'crypto';
import { TokenService } from 'src/modules/token/services/token.service';


@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
      @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
      private authService: AuthService, private tokenService: TokenService
  ){}

    private code: string;
    generateCode(): string {
        let code: string = "";
    
        do {
            code += randomBytes(3).readUIntBE(0, 3);
        } while (code.length < 6);
    
        return code.slice(0, 6);
    }

    async create(user: User): Promise<Observable<User>> {
        return (await this.authService.hashPassword(user.password)).pipe(
            switchMap((passwordHash: string) => {
               
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
                newClient.phone = user.phone;
                newUser.client_entry = newClient;
                const email : string = user.email;
                return from(this.userRepository.findOne({email})).pipe(
                    switchMap((userFind: User) => {
                        if(userFind){
                            throw new HttpException("User with this email is already exists", HttpStatus.BAD_REQUEST);
                        }
                        else{
                            return from(this.userRepository.save(newUser)).pipe(
                                map((user: User) => {
                                    const {password, ...result} = user;
                                    this.authService.sendEmail(newUser);
                                    return result;
                                }),
                                catchError(err => throwError(err))
                            )
                        }
                    })
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
      return from(this.userRepository.findOne({id}, {relations: ['client_entry']})).pipe(
          map((user: User) => {
              if(user)
              {
                this.clientRepository.delete(user.client_entry.id);
                return from(this.userRepository.delete(id));
              }
              else
              {
                throw new HttpException("This user is not exists", HttpStatus.BAD_REQUEST);
              }
          })
      )
  }

  updateOne(id: number, user: User): Observable<any> {
    //   delete user.email;
    //   delete user.password;
    //   delete user.role;
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

  findUserByEmail(email: string): Observable<User> {
    return this.findByEmail(email).pipe(
        map((user: User) => {
            if(user){
                return user;
            }
            else {
                return null;
            }
        })
    );  
  }


   async confirm(token: string): Promise<Observable<any>> {
    const data =  this.authService.verifyToken(token);
    const user =  await this.userRepository.findOne(data.id);

    this.tokenService.deleteOne(data._id, token);

    if (user) {
        user.status = UserStatus.active;
        return from (this.userRepository.update(data.id, user));
    }
    throw new BadRequestException('Confirmation error');
    }
}
