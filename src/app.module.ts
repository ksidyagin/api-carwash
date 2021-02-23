import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CarwashModule } from './modules/carwash/carwash.module';
import { CategoryModule } from './modules/category/category.module';
import { ClientAutoModule } from './modules/client-auto/client-auto.module';
import { ClientModule } from './modules/client/client.module';
import { OrderModule } from './modules/order/order.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres", 
      url: process.env.DATABASE_URL,
      // host: process.env.HOST,
      // port: 8888,
      // username: 'superadmin',
      // password: process.env.PASSWORD,
      // database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CarwashModule,
    CategoryModule,
    ServiceModule,
    OrderModule,
    ClientModule,
    ClientAutoModule
    

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
