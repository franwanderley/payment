import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    await this.validCustomer(createCustomerDto);

    const customer = this.customerRepository.create(createCustomerDto);

    return await this.customerRepository.save(customer);
  }

  async validCustomer(createCustomerDto: CreateCustomerDto): Promise<void> {
    const userByEmail = await this.customerRepository.findOneBy({
      email: createCustomerDto.email,
    });
    if (userByEmail) {
      throw new BadRequestException(
        `Já existe um usuário com o email ${createCustomerDto.email}`,
      );
    }
    const userByDocument = await this.customerRepository.findOneBy({
      document: createCustomerDto.document,
    });
    if (userByDocument) {
      throw new BadRequestException(
        `Já existe um usuário com esse cpf ${createCustomerDto.document}`,
      );
    }
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: UUID) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`customer with ID "${id}" not found`);
    }
    return customer;
  }

  async update(id: UUID, updateCustomerDto: UpdateCustomerDto) {
    const user = await this.customerRepository.preload({
      id,
      ...updateCustomerDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    await this.customerRepository.save(user);
  }

  async remove(id: UUID) {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}
