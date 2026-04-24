import { BadRequestException, Controller, Get, Param, Query, Post, Body, Patch, Delete } from '@nestjs/common';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
    constructor(private readonly tarefasService: TarefasService) { }

    @Get()
    listar(
        @Query('status') status?: string,
        @Query('prioridade') prioridade?: string,
    ) {
        return this.tarefasService.listar(status, prioridade);
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        const idNumero = Number(id);

        if (Number.isNaN(idNumero)) {
            throw new BadRequestException('Parametro "id" deve ser numerico');
        }

        return this.tarefasService.buscarPorId(idNumero);
    }

    @Post()
    criar(
        @Body()
        body: {
            titulo: string;
            descricao: string;
            status: 'aberta' | 'em_andamento' | 'concluida';
            prioridade: 'baixa' | 'media' | 'alta';
        },
    ) {
        if (!body.titulo || !body.descricao || !body.status || !body.prioridade) {
            throw new BadRequestException('Campos obrigatorios: titulo, descricao, status e prioridade');
        }

        return this.tarefasService.criar(body);
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: string,
        @Body()
        body: {
            titulo?: string;
            descricao?: string;
            status?: 'aberta' | 'em_andamento' | 'concluida';
            prioridade?: 'baixa' | 'media' | 'alta';
        },
    ) {
        const idNumero = Number(id);

        if (Number.isNaN(idNumero)) {
            throw new BadRequestException('Parametro "id" deve ser numerico');
        }

        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Envie ao menos um campo para atualizacao');
        }

        return this.tarefasService.atualizarParcial(idNumero, body);
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        const idNumero = Number(id);

        if (Number.isNaN(idNumero)) {
            throw new BadRequestException('Parametro "id" deve ser numerico');
        }

        return this.tarefasService.remover(idNumero);
    }
}