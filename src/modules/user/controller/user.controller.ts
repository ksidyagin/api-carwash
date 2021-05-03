import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { access } from 'fs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/modules/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { AuthService, EmailSend } from 'src/modules/auth/services/auth.service';
import { User, UserRole } from '../models/user.interface';
import { ConfirmAccountDto } from '../service/accountConfirm';
import { UserService } from '../service/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService) {}

    @Post()
    async create(@Body()user: User): Promise<Observable<User | Object>> {
        return (await this.userService.create(user)).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    
    login(@Body()user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {return {access_token: jwt}  
        }),
        catchError(err => of({ error: err.message}))
        )
    }
    

    @Get(':id')
    findOne(@Param('id') id: number): Observable<any> {
        return this.userService.findOne(id);
    }

    @Get()
    index( @Query('page') page: number = 1,
    @Query('limit') limit: number = 10): Observable<Pagination<User>> {
       limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/users' });
    }

    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()user: User): Observable<any>  {
        return this.userService.updateOne(Number(id), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id')id: string, @Body() user: User ): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }

    @Get('confirm/:token')
    async confirm(@Param('token')query: string): Promise<boolean> {
        await this.userService.confirm(query);
        return true;
    }

    @Get('findEmail/:email')
    findUserByEmail(@Param('email')email: string): Observable<User> {
        return this.userService.findUserByEmail(email);
    }
}
