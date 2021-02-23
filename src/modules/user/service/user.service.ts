import { Injectable } from '@nestjs/common';
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
@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
      @InjectRepository(ClientEntity) private readonly clientRepository: Repository<ClientEntity>,
      private authService: AuthService
  ){}


    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
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
                  return 'Wrong Credentials';
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
