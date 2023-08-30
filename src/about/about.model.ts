import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'about' })
export class About extends Model<About> {
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
  years: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  site: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  stacking: Array<string>;
}
