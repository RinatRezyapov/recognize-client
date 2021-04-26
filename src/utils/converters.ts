import { Id } from '../api/entities';
import config from '../config';

export const generateFileLink = (fileId: Id<File>) => `${config.production.apiEndPointHttp}/file/${fileId.value}`
