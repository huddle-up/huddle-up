import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1623241863298 implements MigrationInterface {
    name = 'CreateDatabase1623241863298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "predefined" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conference" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meetingId" uuid NOT NULL, "providerProps" json NOT NULL, "publishedAt" TIMESTAMP, "stoppedAt" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_b3f51c4f4394423812f828c461" UNIQUE ("meetingId"), CONSTRAINT "PK_e203a214f53b0eeefb3db00fdb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "meetingId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5442bab90fc96ddde456c69e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meeting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "hostId" uuid NOT NULL, "maximumParticipants" integer, "prepareDate" TIMESTAMP NOT NULL DEFAULT now(), "canceledOn" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" character varying, "biography" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth_user" ("sub" character varying NOT NULL, "issuer" character varying NOT NULL, "email" character varying NOT NULL, "userId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3d29d788cd69d1ddf87e88e01eb" UNIQUE ("email"), CONSTRAINT "REL_4a558982b7a6be5169b8357210" UNIQUE ("userId"), CONSTRAINT "PK_cdaba4a076a16e4988c6160ec30" PRIMARY KEY ("sub", "issuer"))`);
        await queryRunner.query(`CREATE TABLE "meeting_tags_tag" ("meetingId" uuid NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_22ca3a8491dcc7eabeb15ed01f6" PRIMARY KEY ("meetingId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71c58d5b2225db416429055429" ON "meeting_tags_tag" ("meetingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_316cdadda893dc947f42ef1879" ON "meeting_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "conference" ADD CONSTRAINT "FK_b3f51c4f4394423812f828c461a" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participation" ADD CONSTRAINT "FK_8ed09e9b7e0a3a150f9515f254f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participation" ADD CONSTRAINT "FK_f041b8951b7ae5cdcc8533c212b" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting" ADD CONSTRAINT "FK_cad9f9392de84ea417ff7cce375" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_user" ADD CONSTRAINT "FK_4a558982b7a6be5169b83572108" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting_tags_tag" ADD CONSTRAINT "FK_71c58d5b2225db4164290554298" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meeting_tags_tag" ADD CONSTRAINT "FK_316cdadda893dc947f42ef1879a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_tags_tag" DROP CONSTRAINT "FK_316cdadda893dc947f42ef1879a"`);
        await queryRunner.query(`ALTER TABLE "meeting_tags_tag" DROP CONSTRAINT "FK_71c58d5b2225db4164290554298"`);
        await queryRunner.query(`ALTER TABLE "auth_user" DROP CONSTRAINT "FK_4a558982b7a6be5169b83572108"`);
        await queryRunner.query(`ALTER TABLE "meeting" DROP CONSTRAINT "FK_cad9f9392de84ea417ff7cce375"`);
        await queryRunner.query(`ALTER TABLE "participation" DROP CONSTRAINT "FK_f041b8951b7ae5cdcc8533c212b"`);
        await queryRunner.query(`ALTER TABLE "participation" DROP CONSTRAINT "FK_8ed09e9b7e0a3a150f9515f254f"`);
        await queryRunner.query(`ALTER TABLE "conference" DROP CONSTRAINT "FK_b3f51c4f4394423812f828c461a"`);
        await queryRunner.query(`DROP INDEX "IDX_316cdadda893dc947f42ef1879"`);
        await queryRunner.query(`DROP INDEX "IDX_71c58d5b2225db416429055429"`);
        await queryRunner.query(`DROP TABLE "meeting_tags_tag"`);
        await queryRunner.query(`DROP TABLE "auth_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "meeting"`);
        await queryRunner.query(`DROP TABLE "participation"`);
        await queryRunner.query(`DROP TABLE "conference"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
