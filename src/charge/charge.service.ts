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
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository: Repository<Charge>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createChargeDto: CreateChargeDto) {
    const customer = await this.findCustomerById(createChargeDto.customerId);

    this.validateMethodPay(createChargeDto);

    const charge = this.chargeRepository.create({
      amount: createChargeDto.amount,
      currency: createChargeDto.currency,
      methodPay: createChargeDto.methodPay,
      instantPay: createChargeDto.instantPay,
      bankSlip: createChargeDto.bankSlip,
      creditCard: createChargeDto.creditCard,
      customer,
    } as Charge);
    return await this.chargeRepository.save(charge);
  }

  validateMethodPay({
    methodPay,
    creditCard,
    bankSlip,
    instantPay,
  }: Partial<CreateChargeDto>) {
    if (methodPay === 'credit_card' && !creditCard) {
      throw new BadRequestException(
        'Dados do cartão de crédito são obrigatórios para este método de pagamento.',
      );
    }
    if (methodPay === 'bank_slip' && !bankSlip) {
      throw new BadRequestException(
        'Dados do boleto são obrigatórios para este método de pagamento.',
      );
    }
    if (methodPay === 'instant_payment' && !instantPay) {
      throw new BadRequestException(
        'Dados do pagamento instantâneo(PIX) são obrigatórios para este método de pagamento.',
      );
    }

    const paymentMethodsProvided = [creditCard, bankSlip, instantPay].filter(
      (method) => method !== undefined,
    ).length;

    if (paymentMethodsProvided > 1) {
      throw new BadRequestException(
        'Apenas um método de pagamento pode ser fornecido.',
      );
    }
  }

  findAll() {
    return this.chargeRepository.find({
      relations: ['customer', 'creditCard', 'bankSlip', 'instantPay'],
    });
  }

  async findOne(id: UUID) {
    const charge = await this.chargeRepository.findOne({
      where: { id },
      relations: ['customer', 'creditCard', 'bankSlip', 'instantPay'],
    });
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
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const charge = await transactionalEntityManager.findOne(Charge, {
        where: { id },
        relations: ['customer', 'creditCard', 'bankSlip', 'instantPay'],
      });

      if (!charge) {
        throw new NotFoundException(`Charge with ID "${id}" not found`);
      }

      this.validateMethodPay(updateChargeDto);

      const isMethodPayChanged =
        updateChargeDto.methodPay &&
        updateChargeDto.methodPay !== charge.methodPay;

      if (isMethodPayChanged) {
        await this.handleOldPaymentMethodRemoval(
          charge,
          transactionalEntityManager,
        );
      }

      const customer = await this.findCustomerById(updateChargeDto.customerId);

      transactionalEntityManager.merge(Charge, charge, {
        ...updateChargeDto,
        customer,
      } as Charge);

      return transactionalEntityManager.save(charge);
    });
  }

  private async handleOldPaymentMethodRemoval(
    charge: Charge,
    manager: EntityManager,
  ) {
    const oldPaymentMethod =
      charge.creditCard || charge.bankSlip || charge.instantPay;

    if (oldPaymentMethod) {
      charge.creditCard = null;
      charge.bankSlip = null;
      charge.instantPay = null;
      await manager.save(charge);
      await manager.remove(oldPaymentMethod);
    }
  }

  async remove(id: UUID) {
    const charge = await this.findOne(id);
    await this.chargeRepository.remove(charge);
  }
}
