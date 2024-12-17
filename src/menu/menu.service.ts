// menu.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from 'src/Entity/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
    ) { }

    // Create a new menu
    async create(restaurantId: number, category: string, description: string): Promise<Menu> {
        const menu = new Menu();
        menu.restaurant = { id: restaurantId } as any; // link the restaurant by its ID
        menu.category = category;
        menu.description = description;

        return this.menuRepository.save(menu);
    }

    // Get all menus
    async findAll(): Promise<Menu[]> {
        return this.menuRepository.find({ relations: ['restaurant'] }); // Including related restaurant data
    }

    // Get a menu by ID
    async findOne(id: number): Promise<Menu> {
        return this.menuRepository.findOne({
            where: { id },
            relations: ['restaurant'], // Including related restaurant data
        });
    }

    // Update menu by ID
    async update(id: number, category: string, description: string): Promise<Menu> {
        const menu = await this.menuRepository.findOne({ where: { id } });
        if (!menu) {
            throw new Error('Menu not found');
        }

        menu.category = category;
        menu.description = description;

        return this.menuRepository.save(menu);
    }

    // Delete menu by ID
    async remove(id: number): Promise<void> {
        const menu = await this.menuRepository.findOne({ where: { id } });
        if (!menu) {
            throw new Error('Menu not found');
        }

        await this.menuRepository.remove(menu);
    }
}
