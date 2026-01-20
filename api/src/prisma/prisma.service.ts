import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private _category: any;
    public get category(): any {
        return this._category;
    }
    public set category(value: any) {
        this._category = value;
    }
  async onModuleInit() {
    await this.$connect();
  }
  async $connect() {
    return super.$connect();
  }
}
