import { LinkData } from '../../../entities/link/link-data';
import { LinksRepository } from '../../../repositories/ports/links-repository';
import { PostgresHelper } from './helpers/postgres-helper';

export class PostgresLinksRepository implements LinksRepository {
  public async findLinkById(id: string): Promise<LinkData | null> {
    const query = {
      text: `
        SELECT
          *
        FROM
          links
        WHERE
          id = $1
        LIMIT
          1
      ;`,
      values: [id],
    };

    const results = await PostgresHelper.client.query(query);
    return results.rows[0];
  }

  public async exists(id: string): Promise<boolean> {
    const query = {
      text: `
        SELECT
          *
        FROM
          links
        WHERE
          id = $1
        LIMIT
          1
      ;`,
      values: [id],
    };

    const results = await PostgresHelper.client.query(query);

    return results.rowCount > 0;
  }

  public async add(link: LinkData): Promise<void> {
    const query = {
      text: `
        INSERT INTO
          links (id, target, created_at, access_count)
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          *
      ;`,
      values: [link.id, link.target, link.createdAt, link.accessCount],
    };

    if (await this.exists(link.id)) return;
    await PostgresHelper.client.query(query);    
  }
}
