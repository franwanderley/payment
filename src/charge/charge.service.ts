import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository: Repository<Charge>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createChargeDto: CreateChargeDto) {
    const customer = await this.findCustomerById(createChargeDto.customerId);
    const charge = this.chargeRepository.create({
      amount: createChargeDto.amount,
      currency: createChargeDto.currency,
      methodPay: createChargeDto.methodPay,
      customer,
      status: 'pending',
    } as Charge);
    return await this.chargeRepository.save(charge);
  }

  findAll() {
    return this.chargeRepository.find({
      relations: ['customer', 'creditCard', 'bankSlip', 'instantPay'],
    });
  }

  async findOne(id: UUID) {
    const charge = await this.chargeRepository.findOneBy({ id });
    if (!charge) {
      throw new NotFoundException(`charge with ID "${id}" not found`);
    }
    return charge;
  }

  async findCustomerById(id: UUID | undefined): Promise<Customer> {
    if (!id) {
      throw new BadRequestException('id its required');
    }
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new BadRequestException(`Customer with ID "${id}" not found`);
    }
    return customer;
  }

  async update(id: UUID, updateChargeDto: UpdateChargeDto) {
    const customer = await this.findCustomerById(updateChargeDto.customerId);
    const charge = await this.chargeRepository.preload({
      id,
      ...updateChargeDto,
      customer,
    } as Charge);

    if (!charge) {
      throw new NotFoundException(`Charge with ID "${id}" not found`);
    }

    return this.chargeRepository.save(charge);
  }

  async remove(id: UUID) {
    const charge = await this.findOne(id);
    await this.chargeRepository.remove(charge);
  }
}
