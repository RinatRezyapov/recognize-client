import * as uuid from 'uuid';

class ProtocolCommand {

  id: string;
  service: string;
  method: string;
  data: any;

  constructor(
    service: string,
    method: string,
    data?: any,
  ) {
    this.id = uuid.v4();
    this.service = service;
    this.method = method;
    this.data = data || {};
  }

  construct(): any {
    return {
        id: this.id,
        service: this.service,
        method: this.method,
        data: this.data,
    }
  }
}

export default ProtocolCommand;
