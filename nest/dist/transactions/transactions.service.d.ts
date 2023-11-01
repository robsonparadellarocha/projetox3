import { TenantService } from './../tenant/tenant/tenant.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
export declare class TransactionsService {
    private transactionModel;
    private tenantService;
    constructor(transactionModel: typeof Transaction, tenantService: TenantService);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findOne(id: number): string;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): string;
}
