// menu-item.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';
import { MenuItem } from 'src/Entity/menu-item.entity';
import { Menu } from 'src/Entity/menu.entity';  // Import Menu entity

@Module({
    imports: [TypeOrmModule.forFeature([MenuItem, Menu])],  // Register both entities
    controllers: [MenuItemController],
    providers: [MenuItemService],
})
export class MenuItemModule { }
