import {MigrationInterface, QueryRunner} from "typeorm";

export class bootstrapTable1644797217154 implements MigrationInterface {
    name = 'bootstrapTable1644797217154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ratings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`bookId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_reactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_liked\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`bookId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`bookId\` int NULL, \`tagId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`featured\` tinyint NOT NULL DEFAULT 0, \`img_url\` varchar(255) NOT NULL, \`authored_year\` datetime NOT NULL, \`publisher\` varchar(255) NOT NULL, \`release_date\` datetime NOT NULL, \`quantity\` int NOT NULL, \`price\` double NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_4dc5a40933419641440fbd95e8\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genres\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_genres\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`bookId\` int NULL, \`genreId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ratings\` ADD CONSTRAINT \`FK_0563ca767066800a8b2123e6d15\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ratings\` ADD CONSTRAINT \`FK_4d0b0e3a4c4af854d225154ba40\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_reactions\` ADD CONSTRAINT \`FK_cf9bddafda97499b79f5a907f08\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_reactions\` ADD CONSTRAINT \`FK_6fb92b44b17762f9be832b41916\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_tags\` ADD CONSTRAINT \`FK_fb0dcd0aa910991f5b6e12545b8\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_tags\` ADD CONSTRAINT \`FK_8ac2abe3c4afa41f2968ddd4271\` FOREIGN KEY (\`tagId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_genres\` ADD CONSTRAINT \`FK_3d7277e26c03e07fe1ad1dd315f\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_genres\` ADD CONSTRAINT \`FK_346e0792ef07fd64c9faf856a56\` FOREIGN KEY (\`genreId\`) REFERENCES \`genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_genres\` DROP FOREIGN KEY \`FK_346e0792ef07fd64c9faf856a56\``);
        await queryRunner.query(`ALTER TABLE \`book_genres\` DROP FOREIGN KEY \`FK_3d7277e26c03e07fe1ad1dd315f\``);
        await queryRunner.query(`ALTER TABLE \`book_tags\` DROP FOREIGN KEY \`FK_8ac2abe3c4afa41f2968ddd4271\``);
        await queryRunner.query(`ALTER TABLE \`book_tags\` DROP FOREIGN KEY \`FK_fb0dcd0aa910991f5b6e12545b8\``);
        await queryRunner.query(`ALTER TABLE \`book_reactions\` DROP FOREIGN KEY \`FK_6fb92b44b17762f9be832b41916\``);
        await queryRunner.query(`ALTER TABLE \`book_reactions\` DROP FOREIGN KEY \`FK_cf9bddafda97499b79f5a907f08\``);
        await queryRunner.query(`ALTER TABLE \`ratings\` DROP FOREIGN KEY \`FK_4d0b0e3a4c4af854d225154ba40\``);
        await queryRunner.query(`ALTER TABLE \`ratings\` DROP FOREIGN KEY \`FK_0563ca767066800a8b2123e6d15\``);
        await queryRunner.query(`DROP TABLE \`book_genres\``);
        await queryRunner.query(`DROP TABLE \`genres\``);
        await queryRunner.query(`DROP INDEX \`IDX_4dc5a40933419641440fbd95e8\` ON \`books\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP TABLE \`book_tags\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
        await queryRunner.query(`DROP TABLE \`book_reactions\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`ratings\``);
    }

}
