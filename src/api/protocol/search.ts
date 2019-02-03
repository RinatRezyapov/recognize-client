import ProtocolCommand from './ProtocolCommand';
import { SearchQuery } from '../entities';

export class SimpleSearch extends ProtocolCommand {
  constructor(query: SearchQuery) {
      super('Search', 'SimpleSearch', { query })
  }
}
