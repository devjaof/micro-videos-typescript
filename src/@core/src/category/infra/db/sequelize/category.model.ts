import { Model } from "sequelize";
import { Column, DataType, PrimaryKey, Table } from "sequelize-typescript";

type CategoryModelProps = {
  id: string;
  title: string;
  active: boolean;
  description: string | null;
  createdAt: Date;
}

@Table({tableName: 'categories', timestamps: false})
export class CategoryModel extends Model<CategoryModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  title: string;

  @Column({ allowNull: false })
  active: boolean;
  
  @Column({ type: DataType.TEXT})
  description: string | null;
  
  @Column({ allowNull: false })
  createdAt: Date;
}
