import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SkillsCreationAttrs {
  title: string;
  description: string;
  image: any;
  filters: Array<string>;
}

@Table({ tableName: 'skills' })
export class Skills extends Model<Skills, SkillsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  filters: Array<string>;
}
