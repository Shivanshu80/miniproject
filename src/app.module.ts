import { Module } from '@nestjs/common';
import { AuthModule } from './authModule/auth.module'
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),MongooseModule.forRoot(process.env.MONGODB_URL as string),AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
