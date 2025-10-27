import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { UUID } from 'crypto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IdempotencyInterceptor } from '../idempotency.interceptor';

@ApiTags('charges')
@Controller('charges')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(IdempotencyInterceptor)
  @ApiOperation({ summary: 'Cria uma nova cobrança' })
  @ApiCreatedResponse({ description: 'Cobrança criada com sucesso.' })
  @ApiBody({ type: CreateChargeDto })
  @ApiHeader({
    name: 'idempotency-key',
    description: 'Chave de idempotência para evitar requisições duplicadas',
    required: true,
  })
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargeService.create(createChargeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todas as cobranças' })
  @ApiOkResponse({ description: 'Lista de cobranças retornada com sucesso.' })
  findAll() {
    return this.chargeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca uma cobrança pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da cobrança' })
  @ApiOkResponse({ description: 'Cobrança encontrada.' })
  @ApiNotFoundResponse({ description: 'Cobrança não encontrada.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.chargeService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(IdempotencyInterceptor)
  @ApiOperation({ summary: 'Atualiza uma cobrança' })
  @ApiParam({ name: 'id', description: 'ID da cobrança' })
  @ApiNoContentResponse({ description: 'Cobrança atualizada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Cobrança não encontrada.' })
  @ApiBody({ type: UpdateChargeDto })
  @ApiHeader({
    name: 'idempotency-key',
    description: 'Chave de idempotência para evitar requisições duplicadas',
    required: true,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateChargeDto: UpdateChargeDto,
  ) {
    return this.chargeService.update(id, updateChargeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove uma cobrança' })
  @ApiParam({ name: 'id', description: 'ID da cobrança' })
  @ApiNoContentResponse({ description: 'Cobrança removida com sucesso.' })
  @ApiNotFoundResponse({ description: 'Cobrança não encontrada.' })
  remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.chargeService.remove(id);
  }
}
