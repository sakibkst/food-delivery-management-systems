import { Test, TestingModule } from '@nestjs/testing';
import { LiveChatController } from './live-chat.controller';

describe('LiveChatController', () => {
  let controller: LiveChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveChatController],
    }).compile();

    controller = module.get<LiveChatController>(LiveChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
