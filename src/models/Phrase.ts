import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface PhraseInstance extends Model {
  id: number;
  author: string;
  text: string;
}

export const Phrase = sequelize.define<PhraseInstance>(
  "Phrase",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "phrases",
    timestamps: false,
  }
);
