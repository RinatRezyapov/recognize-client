import { Id } from '../api/entities';
import config from '../config/config';

export const generateFileLink = (fileId: Id<File>) => `${config.apiEndPointHttp}/file/${fileId.value}`
