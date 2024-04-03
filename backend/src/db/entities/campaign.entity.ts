import { Column, Entity, OneToMany } from "typeorm";
import { CURRENCY, PREFIX } from "../../types";
import BaseEntity from "./base";
import { Voucher } from "./voucher.entity";

@Entity()
export class Campaign extends BaseEntity {
  @Column({
    name: "from",
    nullable: false,
    default: new Date(),
  })
  from!: Date;

  @Column({
    name: "to",
    nullable: false,
    default: new Date(),
  })
  to!: Date;

  @Column({
    nullable: false,
    default: 0,
  })
  amount!: number;

  @Column({
    nullable: false,
    default: "",
  })
  name!: string;

  @Column({
    type: "enum",
    enum: CURRENCY,
    nullable: false,
    default: CURRENCY.USD,
  })
  currency!: CURRENCY;

  @Column({
    type: "text",
    nullable: false,
    unique: true,
  })
  prefix!: PREFIX;

  @OneToMany(() => Voucher, (voucher) => voucher.campaign, {
    cascade: true,
    eager: true,
  })
  vouchers!: Voucher[];
}
