import { handleError } from '../../Utils/error.js';
import {
    Aluno,
    TipoErro,
    ErroJogador,
} from "../../Models/index.js"
import ResearchEvent from "../../Models/ResearchEvent/researchEvent.js";
import { col, fn, Op } from "sequelize";

export class ErrosService {

    static async getTipoDeErrosPorAluno(alunoId: number) {
        try {
            const aluno = await Aluno.findByPk(alunoId);

            if (!aluno) throw new Error('Aluno não encontrado');

            const errosDeExecucao = await ResearchEvent.findAll({
                where: {
                    aluno_id: alunoId,
                    event_type: "execution",
                    correct_solution: false,
                    tipo_erro_id: { [Op.ne]: null },
                },
                attributes: [
                    "tipo_erro_id",
                    [fn("COUNT", col("id")), "quantidade"],
                ],
                group: ["tipo_erro_id"],
                raw: true,
            });

            // Keep showing existing classifications for students who have not
            // generated research execution events yet.
            const quantidadeDeErros = errosDeExecucao.length > 0
                ? errosDeExecucao
                : await ErroJogador.findAll({
                where: {
                    aluno_id: alunoId
                },
                attributes: ["tipo_erro_id", "quantidade"],
                include: [
                    {
                        model: Aluno,
                        as: 'aluno',
                        attributes: ['id', 'nome']
                    },
                    {
                        model: TipoErro,
                        as: 'tipoErro',
                        attributes: ['id', 'nome']
                    },
                ]
            });

            const TipoDeErros = await TipoErro.findAll({
                attributes: ['id', 'nome']
            });

            return {
                quantidadeDeErros,
                TipoDeErros
            };
        } catch (error) {
            throw handleError('Erro ao buscar erros do aluno.', error);
        }
    }
}
