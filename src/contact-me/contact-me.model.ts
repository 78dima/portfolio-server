import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ContactMeCreationAttrs {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Table({ tableName: 'contact-me' })
export class ContactMe extends Model<ContactMe, ContactMeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  subject: string;

  @Column({ type: DataType.STRING, allowNull: false })
  message: string;
}
