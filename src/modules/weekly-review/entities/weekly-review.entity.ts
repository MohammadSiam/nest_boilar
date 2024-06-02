import { DailyReview } from "src/modules/daily-review/entities/daily-review.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tblWeeklyReview')
export class WeeklyReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
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