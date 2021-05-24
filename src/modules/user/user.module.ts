import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from './models/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ClientModule } from '../client/client.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TokenModule } from '../token/token.module';
import { CarwashModule } from '../carwash/carwash.module';
import { UserToCarwashEntity } from '../user-to-carwash/models/user_to_carwash.entity';
import { UserToCarwashModule } from '../user-to-carwash/user-to-carwash.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    
    forwardRef(() => AuthModule),
    forwardRef(()=> ClientModule),
    forwardRef(() => TokenModule),
    forwardRef(() => CarwashModule),
    forwardRef(()=> UserToCarwashModule)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
