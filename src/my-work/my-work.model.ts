import { Table, Model, DataType, Column } from 'sequelize-typescript';

interface MyWorkCreationAttrs {
  id: number;
  title: string;
  link: string;
  imageSrc: string;
}

@Table({ tableName: 'my-work' })
export class MyWork extends Model<MyWork, MyWorkCreationAttrs> {
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
  link: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageSrc: string;
}
