import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserToCarwashEntity } from './models/user_to_carwash.entity';
import { UserToCarwashController } from './user-to-carwash/user-to-carwash.controller';
import { UserToCarwashService } from './user-to-carwash/user-to-carwash.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserToCarwashEntity]),
    forwardRef(() => AuthModule)

],
  controllers: [UserToCarwashController],
  providers: [UserToCarwashService],
  exports:[UserToCarwashService, TypeOrmModule]

})
export class UserToCarwashModule {}
