// menu.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from 'src/Entity/menu.entity';

@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    // Create a new menu
    @Post('create')
    async create(@Body() body: { restaurantId: number; category: string; description: string }): Promise<Menu> {
        return this.menuService.create(
            body.restaurantId,
            body.category,
            body.description,
        );
    }

    // Get all menus
    @Get('shows')
    async findAll(): Promise<Menu[]> {
        return this.menuService.findAll();
    }

    // Get a menu by ID
    @Get('show/:id')
    async findOne(@Param('id') id: number): Promise<Menu> {
        return this.menuService.findOne(id);
    }

    // Update a menu by ID
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() body: { category: string; description: string },
    ): Promise<Menu> {
        return this.menuService.update(id, body.category, body.description);
    }

    // Delete a menu by ID
    @Delete('delete/:id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.menuService.remove(id);
    }
}
