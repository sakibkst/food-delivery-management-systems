import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPersonController } from './delivery-person.controller';

describe('DeliveryPersonController', () => {
  let controller: DeliveryPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPersonController],
    }).compile();

    controller = module.get<DeliveryPersonController>(DeliveryPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
