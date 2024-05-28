import { WeeklyReview } from "src/modules/weekly-review/entities/weekly-review.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tblDailyReviews')
export class DailyReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
        default: () => 'current_date'
    })
    date: Date;

    @Column()
    sleepScore: number;

    @Column()
    walk: boolean;

    @Column()
    exercise: boolean;

    @Column('text')
    comment: string;


    @ManyToOne(() => WeeklyReview, weeklyReview => weeklyReview.dailyReviews)
    weeklyReview: WeeklyReview;
}