import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from 'src/Entity/restaurant.entity';
import { CreateRestaurantDto } from 'src/dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/dtos/update-restaurant.dto';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }



    @Post('create')
    // @Roles('Admin', 'Restaurant')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantService.createRestaurant(createRestaurantDto);
    }

    @Put('update/:id')
    async updateRestaurant(
        @Param('id') id: number,
        @Body() updateRestaurantDto: UpdateRestaurantDto
    ) {
        return this.restaurantService.updateRestaurant(id, updateRestaurantDto);
    }

    @Delete('delete/:id')
    async deleteRestaurant(@Param('id') id: number) {
        await this.restaurantService.deleteRestaurant(id);
        return { message: 'Restaurant deleted successfully' };
    }

    @Get('show/:id')
    @Roles('Admin', 'Restaurant')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getRestaurantById(@Param('id') id: number) {
        return this.restaurantService.getRestaurantById(id);
    }
}
