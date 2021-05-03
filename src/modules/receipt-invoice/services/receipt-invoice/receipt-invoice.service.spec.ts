import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptInvoiceService } from './receipt-invoice.service';

describe('ReceiptInvoiceService', () => {
  let service: ReceiptInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptInvoiceService],
    }).compile();

    service = module.get<ReceiptInvoiceService>(ReceiptInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
