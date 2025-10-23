import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { ChargeModule } from './charge/charge.module';
import { Charge } from './charge/entities/charge.entity';
import { CreditCard } from './charge/entities/credit-card.entity';
import { bankSlip } from './charge/entities/bank-slip.entity';
import { InstantPay } from './charge/entities/instant-pay.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Customer, Charge, CreditCard, bankSlip, InstantPay],
        synchronize: true,
      }),
    }),
    CustomerModule,
    ChargeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
