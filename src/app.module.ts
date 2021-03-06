import { MailerModule } from '@nestjs-modules/mailer';
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
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { ProductModule } from './modules/product/product.module';
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
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAILDEV_USER,
          pass: process.env.MAILDEV_PASS,
        },
      },
      defaults: {
        from:`"No reply" <${process.env.MAILDEV_USER}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    AuthModule,
    CarwashModule,
    CategoryModule,
    ServiceModule,
    OrderModule,
    ClientModule,
    ClientAutoModule,
    WarehouseModule,
    ProductModule

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
