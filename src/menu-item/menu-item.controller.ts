import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItem } from 'src/Entity/menu-item.entity';

@Controller('menu-items')
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) { }

    // Create a new menu item
    @Post('create')  // API endpoint to create a new menu item
    async create(
        @Body() body: {
            menuId: number;
            name: string;
            price: number;
            description: string;
            availability: boolean;
        }
    ): Promise<MenuItem> {
        return this.menuItemService.create(
            body.menuId,
            body.name,
            body.price,
            body.description,
            body.availability
        );
    }

    // Get all menu items
    @Get('shows')  // API endpoint to get all menu items
    async findAll(): Promise<MenuItem[]> {
        return this.menuItemService.findAll();
    }

    // Get a menu item by ID
    @Get('show/:id')  // API endpoint to get a specific menu item by ID
    async findOne(@Param('id') id: number): Promise<MenuItem> {
        return this.menuItemService.findOne(id);
    }

    // Update a menu item by ID
    @Put('update/:id')  // API endpoint to update a menu item by ID
    async update(
        @Param('id') id: number,
        @Body() body: {
            name: string;
            price: number;
            description: string;
            availability: boolean;
        }
    ): Promise<MenuItem> {
        return this.menuItemService.update(
            id,
            body.name,
            body.price,
            body.description,
            body.availability
        );
    }

    // Delete a menu item by ID
    @Delete('delete/:id')  // API endpoint to delete a menu item by ID
    async remove(@Param('id') id: number): Promise<void> {
        return this.menuItemService.remove(id);
    }
}
