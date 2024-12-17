// menu.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/Entity/menu.entity';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])], // Import the Menu entity for the repository
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule { }
