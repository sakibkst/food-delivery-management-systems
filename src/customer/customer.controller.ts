import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from 'src/dtos/create-customer.dto';
import { Customer } from 'src/Entity/customer.entity';

@Controller('customers')  // Base URL for the controller
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    // Create a new customer
    @Post('create')  // API name: /customers/create
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.create(createCustomerDto);
    }

    // Get all customers
    @Get('shows')  // API name: /customers/list
    async findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    // Get a customer by ID
    @Get('show/:id')  // API name: /customers/:id
    async findOne(@Param('id') id: number): Promise<Customer> {
        return this.customerService.findOne(id);
    }

    // Update customer by ID
    @Put('update/:id')  // API name: /customers/update/:id
    async update(
        @Param('id') id: number,
        @Body() createCustomerDto: CreateCustomerDto,
    ): Promise<Customer> {
        return this.customerService.update(id, createCustomerDto);
    }

    // Delete customer by ID
    @Delete('delete/:id')  // API name: /customers/delete/:id
    @HttpCode(200)  // Optional: To ensure a 200 OK status code is returned
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.customerService.remove(id);
        return { message: 'Customer deleted successfully' };
    }
}
