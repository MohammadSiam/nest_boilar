import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './database/ormconfig.service';
import { DailyReviewModule } from './modules/daily-review/daily-review.module';
import { WeeklyReviewModule } from './modules/weekly-review/weekly-review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    DailyReviewModule,
    WeeklyReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
