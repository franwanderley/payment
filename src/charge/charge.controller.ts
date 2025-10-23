import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { UUID } from 'crypto';

@Controller('charge')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post()
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargeService.create(createChargeDto);
  }

  @Get()
  findAll() {
    return this.chargeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.chargeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargeService.update(id, updateChargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.chargeService.remove(id);
  }
}
