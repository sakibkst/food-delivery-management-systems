import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from 'src/Entity/menu-item.entity';

@Injectable()
export class MenuItemService {
    constructor(
        @InjectRepository(MenuItem)
        private readonly menuItemRepository: Repository<MenuItem>,
    ) { }

    // Create a new menu item
    async create(menuId: number, name: string, price: number, description: string, availability: boolean): Promise<MenuItem> {
        const menuItem = new MenuItem();
        menuItem.menu = { id: menuId } as any;  // Manually linking the MenuItem to its Menu
        menuItem.name = name;
        menuItem.price = price;
        menuItem.description = description;
        menuItem.availability = availability;

        return await this.menuItemRepository.save(menuItem);
    }

    // Get a menu item by ID
    async findOne(id: number): Promise<MenuItem> {
        return this.menuItemRepository.findOne({
            where: { id },
            relations: ['menu'], // Include the 'menu' relation
        });
    }

    // Get all menu items
    async findAll(): Promise<MenuItem[]> {
        return this.menuItemRepository.find({
            relations: ['menu'], // Include the 'menu' relation for each item
        });
    }

    // Update menu item by ID
    async update(id: number, name: string, price: number, description: string, availability: boolean): Promise<MenuItem> {
        const menuItem = await this.menuItemRepository.findOne({ where: { id } });
        if (!menuItem) {
            throw new Error('Menu item not found');
        }

        menuItem.name = name;
        menuItem.price = price;
        menuItem.description = description;
        menuItem.availability = availability;

        return this.menuItemRepository.save(menuItem);
    }

    // Delete a menu item by ID
    async remove(id: number): Promise<void> {
        const menuItem = await this.menuItemRepository.findOne({ where: { id } });
        if (!menuItem) {
            throw new Error('Menu item not found');
        }

        await this.menuItemRepository.remove(menuItem);
    }
}
