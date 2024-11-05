import path from 'path';
import { Entity } from '../../types/Entity.js';
import { fileURLToPath } from 'url';

function getsubdirectoryFromPath(): Partial<Uncapitalize<Entity>> {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let pathRequestEntity: Partial<Entity>;

  const entity = path.basename(__dirname);
  return entity as Partial<Entity>;
}
export default getsubdirectoryFromPath;