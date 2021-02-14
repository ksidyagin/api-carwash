import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CarwashModule } from './modules/carwash/carwash.module';
import { CategoryModule } from './modules/category/category.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 8888,
      username: 'superadmin',
      password: 'root',
      database: 'ololo',
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    CarwashModule,
    CategoryModule,
    ServiceModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
