import { Test, TestingModule } from '@nestjs/testing';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { randomUUID } from 'crypto';

describe('ChargeController', () => {
  let controller: ChargeController;

  const mockChargeService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargeController],
      providers: [
        {
          provide: ChargeService,
          useValue: mockChargeService,
        },
      ],
    }).compile();

    controller = module.get<ChargeController>(ChargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new charge', async () => {
      const createChargeDto: CreateChargeDto = {
        amount: 100,
        currency: 'BRL',
        methodPay: 'credit_card',
        customerId: randomUUID(),
      };

      const result = { id: randomUUID(), ...createChargeDto };
      mockChargeService.create.mockResolvedValue(result);

      expect(await controller.create(createChargeDto)).toBe(result);
      expect(mockChargeService.create).toHaveBeenCalledWith(createChargeDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of charges', async () => {
      const result = [{ id: randomUUID(), amount: 100 }];
      mockChargeService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockChargeService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single charge', async () => {
      const id = randomUUID();
      const result = { id, amount: 100 };
      mockChargeService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(mockChargeService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a charge', async () => {
      const id = randomUUID();
      const updateChargeDto: UpdateChargeDto = {
        amount: 200,
        status: 'payd',
      };
      const result = { id, ...updateChargeDto };
      mockChargeService.update.mockResolvedValue(result);

      expect(await controller.update(id, updateChargeDto)).toBe(result);
      expect(mockChargeService.update).toHaveBeenCalledWith(
        id,
        updateChargeDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a charge', async () => {
      const id = randomUUID();
      const result = { deleted: true };
      mockChargeService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
      expect(mockChargeService.remove).toHaveBeenCalledWith(id);
    });
  });
});
