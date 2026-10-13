import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo,
} from "sequelize-typescript";
import Aluno from "../Aluno/aluno.js";
import Desafio from "../Desafio/desafio.js";
import Sessoes from "../Sessoes/sessoes.js";

@Table({ tableName: "research_events", timestamps: false })
export default class ResearchEvent extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ForeignKey(() => Aluno)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare aluno_id: number;

  @ForeignKey(() => Sessoes)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare sessao_id: number;

  @ForeignKey(() => Desafio)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare desafio_id: number;

  @Column({ allowNull: false, type: DataType.STRING(32) })
  declare event_type: string;

  @Column({ allowNull: false, defaultValue: DataType.NOW, type: DataType.DATE })
  declare occurred_at: Date;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  declare execution_success: boolean | null;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  declare correct_solution: boolean | null;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare completion_time_ms: number | null;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare score: number | null;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare tipo_erro_id: number | null;

  @Column({ allowNull: true, type: DataType.INTEGER })
  declare tipo_feedback_id: number | null;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare feedback_text: string | null;

  @Column({ allowNull: true, type: DataType.STRING(64) })
  declare hint_key: string | null;

  @BelongsTo(() => Aluno, { foreignKey: "aluno_id" })
  declare aluno: Aluno;

  @BelongsTo(() => Sessoes, { foreignKey: "sessao_id" })
  declare sessao: Sessoes;

  @BelongsTo(() => Desafio, { foreignKey: "desafio_id" })
  declare desafio: Desafio;
}
