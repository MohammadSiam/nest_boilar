import { DailyReview } from "src/modules/daily-review/entities/daily-review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tblWeeklyReview')
export class WeeklyReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
        default: () => 'current_date'
    })
    date: Date;

    @Column()
    sleepScoreAvg: number;

    @Column()
    walkCount: number;

    @Column()
    exerciseCount: number;


    @OneToMany(() => DailyReview, dailyReview => dailyReview.weeklyReview)
    dailyReviews: DailyReview[]
}