import { LinkData } from '../../../entities/link/link-data';
import { LinksRepository } from '../../../repositories/ports/links-repository';
import { PostgresHelper } from './helpers/postgres-helper';

export class PostgresLinksRepository implements LinksRepository {
  public async update(id: string, data: LinkData): Promise<void> {
    const query = {
      text: `
        UPDATE
          links
        SET
          id = $1,
          target = $2,
          created_at = $3,
          access_count = $4
        WHERE
          id = $5
        RETURNING
          *
      ;`,
      values: [data.id, data.target, data.createdAt, data.accessCount, id],
    };

    await PostgresHelper.client.query(query);
  }

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

    const { rows: [result] } = await PostgresHelper.client.query(query);
    return {
      id: result.id,
      target: result.target,
      accessCount: result.access_count,
      createdAt: result.created_at,
    };
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
