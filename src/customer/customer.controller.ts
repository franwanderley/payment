import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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
import { IdempotencyInterceptor } from 'src/idempotency.interceptor';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(IdempotencyInterceptor)
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiCreatedResponse({ description: 'Cliente criado com sucesso.' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiHeader({
    name: 'idempotency-key',
    description: 'Chave de idempotência para evitar requisições duplicadas',
    required: true,
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiOkResponse({ description: 'Lista de clientes retornada com sucesso.' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca um cliente pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiOkResponse({ description: 'Cliente encontrado.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Atualiza um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiNoContentResponse({ description: 'Cliente atualizado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiHeader({
    name: 'idempotency-key',
    description: 'Chave de idempotência para evitar requisições duplicadas',
    required: true,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente' })
  @ApiNoContentResponse({ description: 'Cliente removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  remove(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.customerService.remove(id);
  }
}
