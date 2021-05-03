import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptInvoiceController } from './receipt-invoice.controller';

describe('ReceiptInvoiceController', () => {
  let controller: ReceiptInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptInvoiceController],
    }).compile();

    controller = module.get<ReceiptInvoiceController>(ReceiptInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
