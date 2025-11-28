import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { randomUUID } from 'crypto';

describe('CustomerController', () => {
  let controller: CustomerController;

  const mockCustomerService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        document: '12345678901',
        phone: '5511999999999',
      };
      const result = { id: randomUUID(), ...createCustomerDto };

      mockCustomerService.create.mockResolvedValue(result);

      expect(await controller.create(createCustomerDto)).toBe(result);
      expect(mockCustomerService.create).toHaveBeenCalledWith(
        createCustomerDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result = [
        {
          id: randomUUID(),
          name: 'John Doe',
          email: 'john@example.com',
          document: '12345678901',
          phone: '5511999999999',
        },
      ];

      mockCustomerService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockCustomerService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const id = randomUUID();
      const result = {
        id,
        name: 'John Doe',
        email: 'john@example.com',
        document: '12345678901',
        phone: '5511999999999',
      };

      mockCustomerService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(mockCustomerService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const id = randomUUID();
      const updateCustomerDto: UpdateCustomerDto = { name: 'Jane Doe' };
      const result = {
        id,
        name: 'Jane Doe',
        email: 'john@example.com',
        document: '12345678901',
        phone: '5511999999999',
      };

      mockCustomerService.update.mockResolvedValue(result);

      expect(await controller.update(id, updateCustomerDto)).toBe(result);
      expect(mockCustomerService.update).toHaveBeenCalledWith(
        id,
        updateCustomerDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const id = randomUUID();
      const result = { deleted: true };

      mockCustomerService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
      expect(mockCustomerService.remove).toHaveBeenCalledWith(id);
    });
  });
});
