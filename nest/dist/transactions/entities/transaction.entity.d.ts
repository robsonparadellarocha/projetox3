import { Model } from 'sequelize-typescript';
export declare class Transaction extends Model {
    payment_date: Date;
    name: string;
    amount: number;
    subdomain: string;
}
