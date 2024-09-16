import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInitialTables1629638561835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'event',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'startDate',
          type: 'timestamp',
        },
        {
          name: 'endDate',
          type: 'timestamp',
        },
        {
          name: 'location',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          precision: 10,
          scale: 7
        },
        {
          name: 'longitude',
          type: 'decimal',
          precision: 10,
          scale: 7
        }
      ]
    }));

    await queryRunner.createTable(new Table({
      name: 'attendee',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'attendanceDate',
          type: 'timestamp',
        },
        {
          name: 'eventId',
          type: 'int',
        }
      ],
      foreignKeys: [
        {
          columnNames: ['eventId'],
          referencedTableName: 'event',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendee');
    await queryRunner.dropTable('event');
  }
}
